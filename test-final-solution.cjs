// اختبار الحل النهائي للمصاريف
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testFinalSolution() {
  try {
    console.log('🧪 اختبار الحل النهائي...\n');

    // 1. التحقق من وجود فئة فرعية
    console.log('🔍 فحص الفئات الفرعية...');
    const { data: subcategories, error: subError } = await supabase
      .from('subcategories')
      .select('id, categoryId')
      .limit(1);

    if (subError || !subcategories || subcategories.length === 0) {
      console.log('❌ لا توجد فئات فرعية. إنشاء فئة تجريبية...');
      
      // إنشاء فئة أساسية إذا لم تكن موجودة
      const { data: category } = await supabase
        .from('categories')
        .insert([{ name: 'طعام', icon: '🍽️' }])
        .select('*')
        .single();
        
      if (category) {
        console.log('✅ تم إنشاء فئة:', category.name);
        
        // إنشاء فئة فرعية
        const { data: subcategory } = await supabase
          .from('subcategories')
          .insert([{ name: 'مطاعم', categoryId: category.id }])
          .select('*')
          .single();
          
        console.log('✅ تم إنشاء فئة فرعية:', subcategory.name);
      }
    } else {
      console.log('✅ توجد فئات فرعية');
    }

    // 2. إنشاء مصروف تجريبي
    console.log('\n💰 إنشاء مصروف تجريبي...');
    
    // جلب أول فئة فرعية مرة أخرى
    const { data: subs } = await supabase
      .from('subcategories')
      .select('id, categoryId')
      .limit(1);
      
    const testUserId = 'test-user-' + Date.now();
    const demoExpense = {
      userId: testUserId,
      categoryId: subs[0].categoryId,
      subcategoryId: subs[0].id,
      amount: 75,
      currency: 'SAR',
      date: new Date().toISOString().split('T')[0],
      note: 'اختبار الحل النهائي ✅',
      description: 'غداء - مطعم البيك'
    };

    const { data: expense, error: expenseError } = await supabase
      .from('expenses')
      .insert([demoExpense])
      .select('*')
      .single();

    if (expenseError) {
      console.error('❌ فشل إنشاء المصروف:', expenseError);
      return;
    }

    console.log('✅ تم إنشاء المصروف بنجاح:', expense);

    // 3. اختبار جلب المصاريف
    console.log('\n📊 اختبار جلب المصاريف...');
    
    const { data: fetchedExpenses, error: fetchError } = await supabase
      .from('expenses')
      .select('*')
      .eq('userId', testUserId);

    if (fetchError) {
      console.error('❌ فشل جلب المصاريف:', fetchError);
      return;
    }

    console.log('✅ تم جلب المصاريف بنجاح:');
    fetchedExpenses.forEach(exp => {
      console.log(`  - ${exp.amount} ر.س - ${exp.note}`);
    });

    // 4. فحص إجمالي المصاريف في قاعدة البيانات
    console.log('\n📈 إجمالي المصاريف في قاعدة البيانات...');
    const { count } = await supabase
      .from('expenses')
      .select('*', { count: 'exact', head: true });
      
    console.log(`📊 إجمالي المصاريف: ${count}`);

    // 5. تنظيف البيانات التجريبية
    console.log('\n🧹 تنظيف البيانات التجريبية...');
    const { error: deleteError } = await supabase
      .from('expenses')
      .delete()
      .eq('userId', testUserId);
      
    if (!deleteError) {
      console.log('✅ تم حذف البيانات التجريبية');
    }

    console.log('\n🎉 الاختبار مكتمل! النظام يعمل بشكل صحيح.');

  } catch (error) {
    console.error('💥 خطأ في الاختبار:', error);
  }
}

testFinalSolution();
