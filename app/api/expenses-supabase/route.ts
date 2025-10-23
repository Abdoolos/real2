// app/api/expenses-supabase/route.ts
// نسخة بديلة تستخدم Supabase REST API بدلاً من Prisma

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// استخدم مفتاح الخدمة على السيرفر لتجاوز RLS بأمان داخل Route Handler
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const familyId = searchParams.get('familyId');

    if (!userId) {
      return NextResponse.json(
        { ok: false, code: 'MISSING_USER_ID', message: 'User ID is required' },
        { status: 400 }
      );
    }

    console.log('🔍 [Supabase REST] جلب المصاريف لـ:', userId);

    let query = supabaseAdmin
      .from('expenses')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (familyId) query = query.eq('family_id', familyId);
    if (categoryId) query = query.eq('category_id', categoryId);
    if (subcategoryId) query = query.eq('subcategory_id', subcategoryId);

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: expenses, error, count } = await query;

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message);
    }

    console.log(`✅ [Supabase REST] تم العثور على ${expenses?.length || 0} مصروف`);

    // جلب الفئات والبنود لعمل join يدوي (لأنه قد لا توجد مفاتيح خارجية معرفة في القاعدة)
    const [catRes, subcatRes] = await Promise.all([
      supabaseAdmin.from('categories').select('*'),
      supabaseAdmin.from('subcategories').select('*'),
    ])

    const categories = catRes.data || []
    const subcategories = subcatRes.data || []
    const catById = new Map(categories.map((c: any) => [c.id, c]))
    const subById = new Map(subcategories.map((s: any) => [s.id, s]))

    const enriched = (expenses || []).map((e: any) => {
      const sub = e.subcategory_id ? subById.get(e.subcategory_id) : null
      const cat = e.category_id ? catById.get(e.category_id) : (sub ? catById.get(sub.category_id) : null)
      return {
        ...e,
        subcategory: sub || null,
        category: cat || null,
        user: undefined,
      }
    })

    return NextResponse.json({
      ok: true,
      data: enriched,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      source: 'supabase-rest+join'
    });

  } catch (error) {
    console.error('❌ خطأ في جلب المصاريف:', error);
    return NextResponse.json(
      {
        ok: false,
        code: 'FETCH_ERROR',
        message: `خطأ في جلب المصاريف: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from('expenses')
      .insert([body])
      .select(`
        *,
        category:categories(*),
        subcategory:subcategories(*)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      data
    });

  } catch (error) {
    console.error('❌ خطأ في إضافة المصروف:', error);
    return NextResponse.json(
      {
        ok: false,
        code: 'CREATE_ERROR',
        message: `خطأ في إضافة المصروف: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      },
      { status: 500 }
    );
  }
}
