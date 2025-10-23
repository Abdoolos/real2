// فحص بنية جدول expenses الحقيقية في Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function inspectExpensesTable() {
  try {
    console.log('🔍 فحص بنية جدول expenses في Supabase...\n');

    // 1. محاولة جلب بيانات بأسماء أعمدة مختلفة
    const possibleColumns = [
      ['id', 'amount', 'date', 'userId', 'categoryId', 'subcategoryId'], // camelCase
      ['id', 'amount', 'date', 'user_id', 'category_id', 'subcategory_id'], // snake_case
      ['id', 'amount', 'date', 'user', 'category', 'subcategory'], // مختصر
      ['id', 'amount', 'date', 'description', 'note'], // أساسي
    ];

    let workingColumns = null;
    let sampleData = null;

    for (const columns of possibleColumns) {
      try {
        console.log(`🧪 اختبار أعمدة: ${columns.join(', ')}`);
        
        const { data, error } = await supabase
          .from('expenses')
          .select(columns.join(', '))
          .limit(1);

        if (!error && data) {
          console.log('✅ نجح الاستعلام!');
          workingColumns = columns;
          sampleData = data;
          break;
        } else {
          console.log(`❌ فشل: ${error?.message || 'خطأ غير معروف'}`);
        }
      } catch (err) {
        console.log(`❌ خطأ: ${err.message}`);
      }
      console.log('---');
    }

    if (workingColumns) {
      console.log(`\n🎉 تم العثور على الأعمدة العاملة: ${workingColumns.join(', ')}`);
      
      if (sampleData && sampleData.length > 0) {
        console.log('\n📋 مثال على البيانات:');
        console.log(JSON.stringify(sampleData[0], null, 2));
      } else {
        console.log('\n📋 الجدول فارغ، لكن البنية صحيحة');
      }

      // فحص عدد السجلات
      const { count } = await supabase
        .from('expenses')
        .select('*', { count: 'exact', head: true });
      
      console.log(`\n📊 إجمالي السجلات في الجدول: ${count}`);

    } else {
      console.log('\n💥 لم يتم العثور على أي بنية أعمدة تعمل!');
      
      // محاولة أخيرة - جلب كل شيء
      try {
        console.log('\n🔬 محاولة جلب جميع البيانات المتاحة...');
        const { data, error } = await supabase
          .from('expenses')
          .select('*')
          .limit(1);

        if (error) {
          console.log(`❌ خطأ نهائي: ${error.message}`);
        } else if (data && data.length > 0) {
          console.log('✅ تم جلب البيانات بنجاح!');
          console.log('📋 الأعمدة المتاحة:');
          Object.keys(data[0]).forEach(col => {
            console.log(`  - ${col}`);
          });
          console.log('\n📄 البيانات:');
          console.log(JSON.stringify(data[0], null, 2));
        } else {
          console.log('📋 الجدول فارغ');
        }
      } catch (finalError) {
        console.log(`💥 خطأ نهائي: ${finalError.message}`);
      }
    }

  } catch (error) {
    console.error('💥 خطأ عام:', error);
  }
}

inspectExpensesTable();
