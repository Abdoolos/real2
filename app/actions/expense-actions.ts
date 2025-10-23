// app/actions/expense-actions.ts
'use server'

import { revalidateTag, revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

// استخدام مفتاح الخدمة للتعامل مع قاعدة البيانات من السيرفر
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface CreateExpenseData {
  family_id?: string | null;
  user_id: string;
  category_id: string;
  subcategory_id: string;
  amount: number;
  currency: string;
  amount_in_sar: number;
  exchange_rate: number;
  date: string;
  note?: string | null;
  receipt_url?: string | null;
}

export async function createExpenseAction(expenseData: CreateExpenseData) {
  try {
    console.log('🔄 Server Action: إنشاء مصروف جديد:', expenseData);

    // إنشاء المصروف في قاعدة البيانات
    const { data, error } = await supabaseAdmin
      .from('expenses')
      .insert([{
        family_id: expenseData.family_id,
        user_id: expenseData.user_id,
        category_id: expenseData.category_id,
        subcategory_id: expenseData.subcategory_id,
        amount: expenseData.amount,
        currency: expenseData.currency,
        amount_in_sar: expenseData.amount_in_sar,
        exchange_rate: expenseData.exchange_rate,
        date: expenseData.date,
        note: expenseData.note,
        receipt_url: expenseData.receipt_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select('*')
      .single();

    if (error) {
      console.error('❌ خطأ في إنشاء المصروف:', error);
      throw new Error(`فشل في حفظ المصروف: ${error.message}`);
    }

    console.log('✅ تم إنشاء المصروف بنجاح:', data);

    // إبطال Cache للمصاريف
    console.log('🔄 إبطال Cache للمصاريف...');
    revalidateTag('expenses');
    revalidateTag(`expenses-user-${expenseData.user_id}`);
    
    if (expenseData.family_id) {
      revalidateTag(`expenses-family-${expenseData.family_id}`);
    }

    // إبطال مسارات الصفحات ذات الصلة
    revalidatePath('/expenses-list');
    revalidatePath('/dashboard');
    revalidatePath('/family-dashboard');

    console.log('✅ تم إبطال Cache بنجاح');

    return {
      success: true,
      data: data,
      message: 'تم حفظ المصروف بنجاح'
    };

  } catch (error) {
    console.error('💥 خطأ في Server Action:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
      message: 'فشل في حفظ المصروف'
    };
  }
}

export async function updateSubcategoryUsage(subcategoryId: string) {
  try {
    console.log('🔄 تحديث استخدام الفئة الفرعية:', subcategoryId);

    // جلب العدد الحالي
    const { data: current, error: fetchError } = await supabaseAdmin
      .from('subcategories')
      .select('usage_count')
      .eq('id', subcategoryId)
      .single();

    if (fetchError) {
      console.warn('⚠️ لم يتم العثور على الفئة الفرعية للتحديث');
      return { success: false };
    }

    // تحديث العدد
    const { error: updateError } = await supabaseAdmin
      .from('subcategories')
      .update({ 
        usage_count: (current?.usage_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', subcategoryId);

    if (updateError) {
      console.warn('⚠️ فشل في تحديث عداد الاستخدام:', updateError);
      return { success: false };
    }

    console.log('✅ تم تحديث عداد الاستخدام');
    
    // إبطال cache للفئات الفرعية
    revalidateTag('subcategories');
    
    return { success: true };

  } catch (error) {
    console.warn('⚠️ خطأ في تحديث عداد الاستخدام:', error);
    return { success: false };
  }
}
