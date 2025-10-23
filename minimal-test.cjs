// اختبار بأقل البيانات الممكنة لاكتشاف البنية الحقيقية
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function minimalTest() {
  try {
    console.log('🔬 اختبار بأقل البيانات الممكنة...\n');

    // اختبار التدرجي: نبدأ بالحد الأدنى ونضيف عمود واحد في كل مرة
    const attempts = [
      {
        name: 'أساسي جداً',
        data: { id: `test-${Date.now()}`, userId: 'test', amount: 10 }
      },
      {
        name: 'مع التاريخ',
        data: { id: `test-${Date.now()}`, userId: 'test', amount: 10, date: '2025-10-23' }
      },
      {
        name: 'مع الفئة',
        data: { 
          id: `test-${Date.now()}`, 
          userId: 'test', 
          amount: 10, 
          date: '2025-10-23',
          categoryId: 'cat-food'
        }
      },
      {
        name: 'مع الفئة الفرعية',
        data: { 
          id: `test-${Date.now()}`, 
          userId: 'test', 
          amount: 10, 
          date: '2025-10-23',
          categoryId: 'cat-food',
          subcategoryId: 'sub-food-1'
        }
      }
    ];

    for (const attempt of attempts) {
      try {
        console.log(`🧪 محاولة: ${attempt.name}`);
        console.log('البيانات:', attempt.data);

        const { data, error } = await supabase
          .from('expenses')
          .insert([attempt.data])
          .select('*')
          .single();

        if (error) {
          console.log(`❌ فشل: ${error.message}\n`);
        } else {
          console.log('✅ نجح!');
          console.log('📋 البنية الحقيقية:');
          Object.keys(data).forEach(col => {
            console.log(`  - ${col}: ${typeof data[col]} = ${data[col]}`);
          });
          
          // حذف السجل التجريبي
          await supabase.from('expenses').delete().eq('id', attempt.data.id);
          console.log('🗑️ تم حذف السجل التجريبي\n');
          
          console.log('🎉 وجدنا البنية الصحيحة!');
          return data;
        }
      } catch (err) {
        console.log(`💥 خطأ في ${attempt.name}: ${err.message}\n`);
      }
    }

    console.log('😞 لم نتمكن من العثور على بنية تعمل');

  } catch (error) {
    console.error('💥 خطأ عام:', error);
  }
}

minimalTest();
