// اختبار سريع للنموذج المُحدث
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function quickTest() {
  try {
    console.log('🚀 اختبار سريع للنموذج المُحدث...\n');

    // 1. فحص الفئات الفرعية
    const { data: subs } = await supabase
      .from('subcategories')
      .select('id, categoryId')
      .limit(1);

    if (!subs || subs.length === 0) {
      console.log('❌ لا توجد فئات فرعية');
      return;
    }

    console.log('✅ فئة فرعية متاحة:', subs[0]);

    // 2. إنشاء مصروف بسيط
    const testExpense = {
      id: `test-${Date.now()}`,
      userId: 'test-user',
      categoryId: subs[0].categoryId,
      subcategoryId: subs[0].id,
      amount: 25,
      date: new Date().toISOString().split('T')[0],
      note: 'اختبار سريع'
    };

    console.log('\n💰 إنشاء مصروف:', testExpense);

    const { data, error } = await supabase
      .from('expenses')
      .insert([testExpense])
      .select('*')
      .single();

    if (error) {
      console.log('❌ فشل:', error);
      return;
    }

    console.log('✅ نجح الإنشاء:', data);

    // 3. جلب المصروف
    const { data: fetched } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', testExpense.id);

    console.log('\n📊 المصروف المجلب:', fetched);

    // 4. حذف المصروف التجريبي
    await supabase.from('expenses').delete().eq('id', testExpense.id);
    console.log('\n🗑️ تم حذف المصروف التجريبي');

    console.log('\n🎉 النموذج يعمل بنجاح!');

  } catch (error) {
    console.error('💥 خطأ:', error);
  }
}

quickTest();
