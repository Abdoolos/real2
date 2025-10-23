import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const overrideUserId = searchParams.get('userId')
    // تحقّق من المستخدم الحالي عبر كوكيز Supabase (Anon)
    let response = NextResponse.next()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return request.cookies.get(name)?.value },
          set(name: string, value: string, options: any) {
            response.cookies.set(name, value, options)
          },
          remove(name: string, options: any) {
            response.cookies.set(name, '', { ...options, maxAge: 0 })
          },
        },
      }
    )

    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser()
    if (userErr) {
      console.error('Auth error:', userErr)
    }
    const supabaseUser = userData?.user
    const effectiveUserId = overrideUserId || supabaseUser?.id
    if (!effectiveUserId) {
      return NextResponse.json({ ok: false, message: 'الرجاء تسجيل الدخول أولاً أو تمرير userId' }, { status: 401 })
    }

    // عميل إداري للخادم (يتجاوز RLS) لتهيئة بيانات أساسية وإدخال المصروف
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // تأمين فئة وبند أساسيين (إن لم يكونا موجودين)
    const { data: cats } = await supabaseAdmin.from('categories').select('*').limit(1)
  let categoryId = cats && cats[0]?.id
    if (!categoryId) {
      const { data: newCat, error: catErr } = await supabaseAdmin
        .from('categories')
        .insert([{ id: 'cat-food', name: 'طعام', icon: '🍽️', color: '#F59E0B', isDefault: true, familyId: null }])
        .select('*')
        .single()
      if (catErr) throw catErr
      categoryId = newCat.id
    }

    const { data: subs } = await supabaseAdmin
      .from('subcategories')
      .select('*')
      .eq('categoryId', categoryId)
      .limit(1)

    let subcategoryId = subs && subs[0]?.id
    if (!subcategoryId) {
      const { data: newSub, error: subErr } = await supabaseAdmin
        .from('subcategories')
        .insert([{ id: 'sub-food-1', name: 'مطاعم', categoryId }])
        .select('*')
        .single()
      if (subErr) throw subErr
      subcategoryId = newSub.id
    }

    // إدراج مصروف تجريبي للمستخدم الحالي
    const demoExpense = {
      amount: 42.5,
      description: 'مصروف تجريبي',
      date: new Date().toISOString(),
      notes: 'تم الإنشاء تلقائياً للاختبار',
      categoryId,
      subcategoryId,
      userId: effectiveUserId,
      familyId: null,
      billId: null,
      currency: 'SAR',
    }

    const { data: inserted, error: insErr } = await supabaseAdmin
      .from('expenses')
      .insert([demoExpense])
      .select('*')
      .single()
    if (insErr) throw insErr

    return NextResponse.json({ ok: true, data: inserted })
  } catch (error) {
    console.error('❌ Demo insert error:', error)
    return NextResponse.json({ ok: false, message: (error as Error).message }, { status: 500 })
  }
}
