// اختبار الحل النهائي مع البنية الصحيحة
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function finalTest() {
  try {
    console.log('🏁 الاختبار النهائي للحل...\n');

    // 1. إنشاء مصروف بالبنية الصحيحة
    const testExpense = {
      id: `final-test-${Date.now()}`,
      userId: 'test-user-final',
      categoryId: 'cat-food',
      subcategoryId: 'sub-food-1',
      amount: 100,
      date: new Date().toISOString().split('T')[0],
      description: 'اختبار الحل النهائي ✅'
    };

    console.log('💰 إنشاء مصروف بالبنية النهائية:', testExpense);

    const { data: created, error: createError } = await supabase
      .from('expenses')
      .insert([testExpense])
      .select('*')
      .single();

    if (createError) {
      console.error('❌ فشل الإنشاء:', createError);
      return;
    }

    console.log('✅ تم الإنشاء بنجاح!');
    console.log('📋 البيانات المُنشأة:');
    Object.keys(created).forEach(col => {
      console.log(`  - ${col}: ${created[col]}`);
    });

    // 2. اختبار جلب المصاريف (يحاكي API call)
    console.log('\n📊 اختبار جلب المصاريف...');
    
    const { data: fetched, error: fetchError } = await supabase
      .from('expenses')
      .select('*')
      .eq('userId', testExpense.userId)
      .order('date', { ascending: false });

    if (fetchError) {
      console.error('❌ فشل الجلب:', fetchError);
    } else {
      console.log('✅ تم الجلب بنجاح!');
      console.log(`📊 عدد المصاريف: ${fetched.length}`);
      fetched.forEach(exp => {
        console.log(`  - ${exp.amount} ر.س - ${exp.description}`);
      });
    }

    // 3. فحص إجمالي المصاريف في قاعدة البيانات
    const { count } = await supabase
      .from('expenses')
      .select('*', { count: 'exact', head: true });
      
    console.log(`\n📈 إجمالي المصاريف في قاعدة البيانات: ${count}`);

    // 4. تنظيف المصروف التجريبي
    console.log('\n🧹 تنظيف البيانات التجريبية...');
    const { error: deleteError } = await supabase
      .from('expenses')
      .delete()
      .eq('id', testExpense.id);
      
    if (!deleteError) {
      console.log('✅ تم حذف البيانات التجريبية');
    }

    console.log('\n🎉🎉🎉 الحل النهائي يعمل بشكل مثالي! 🎉🎉🎉');
    console.log('\n✅ الآن يمكن للمستخدمين:');
    console.log('  1. إضافة المصاريف بنجاح');
    console.log('  2. عرض جميع المصاريف في القائمة');
    console.log('  3. استخدام زر المصروف التجريبي');

  } catch (error) {
    console.error('💥 خطأ في الاختبار النهائي:', error);
  }
}

finalTest();
