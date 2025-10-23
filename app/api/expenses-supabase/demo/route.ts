// app/api/expenses-supabase/demo/route.ts
// إضافة مصروف تجريبي لاختبار النظام

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: 'User ID مطلوب' },
        { status: 400 }
      );
    }

    console.log('🧪 إضافة مصروف تجريبي للمستخدم:', userId);

    // جلب أول فئة فرعية متاحة
    const { data: subcategories, error: subError } = await supabaseAdmin
      .from('subcategories')
      .select('id, categoryId')
      .limit(1);

    if (subError || !subcategories || subcategories.length === 0) {
      console.error('❌ لا توجد فئات فرعية:', subError);
      return NextResponse.json(
        { ok: false, message: 'لا توجد فئات فرعية' },
        { status: 400 }
      );
    }

    const subcategory = subcategories[0];

    // إنشاء مصروف تجريبي بالبنية الصحيحة
    const demoExpense = {
      id: `expense-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: userId,
      categoryId: subcategory.categoryId,
      subcategoryId: subcategory.id,
      amount: 50,
      date: new Date().toISOString().split('T')[0],
      description: 'مصروف تجريبي لاختبار النظام 🧪'
    };

    console.log('📝 بيانات المصروف التجريبي:', demoExpense);

    const { data, error } = await supabaseAdmin
      .from('expenses')
      .insert([demoExpense])
      .select('*')
      .single();

    if (error) {
      console.error('❌ خطأ في إنشاء المصروف:', error);
      throw error;
    }

    console.log('✅ تم إنشاء المصروف التجريبي:', data);

    return NextResponse.json({
      ok: true,
      message: 'تم إضافة المصروف التجريبي بنجاح',
      data
    });

  } catch (error) {
    console.error('💥 خطأ في إضافة المصروف التجريبي:', error);
    return NextResponse.json(
      {
        ok: false,
        message: `خطأ: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      },
      { status: 500 }
    );
  }
}
