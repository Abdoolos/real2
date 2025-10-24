// app/actions/expense-actions.ts
'use server'

import { revalidateTag, revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb/connection';
import Expense from '@/lib/mongodb/models/Expense';
import Subcategory from '@/lib/mongodb/models/Subcategory';

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

    // الاتصال بقاعدة البيانات
    await connectToDatabase();

    // إنشاء المصروف في قاعدة البيانات
    const expenseDoc = new Expense({
      family_id: expenseData.family_id,
      user_id: expenseData.user_id,
      category_id: expenseData.category_id,
      subcategory_id: expenseData.subcategory_id,
      amount: expenseData.amount,
      currency: expenseData.currency,
      amount_in_sar: expenseData.amount_in_sar,
      exchange_rate: expenseData.exchange_rate,
      date: new Date(expenseData.date),
      note: expenseData.note,
      receipt_url: expenseData.receipt_url,
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedExpense = await expenseDoc.save();

    console.log('✅ تم إنشاء المصروف بنجاح:', savedExpense);

    // تحديث عداد استخدام الفئة الفرعية
    await updateSubcategoryUsage(expenseData.subcategory_id);

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
      data: savedExpense,
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

    // الاتصال بقاعدة البيانات
    await connectToDatabase();

    // البحث عن الفئة الفرعية وتحديث عداد الاستخدام
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { 
        $inc: { usage_count: 1 },
        $set: { updated_at: new Date() }
      },
      { new: true, upsert: false }
    );

    if (!updatedSubcategory) {
      console.warn('⚠️ لم يتم العثور على الفئة الفرعية للتحديث');
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
