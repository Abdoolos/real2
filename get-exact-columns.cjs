// فحص جميع الأعمدة المتاحة فعلياً في جدول expenses
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getExactColumns() {
  try {
    console.log('🔍 فحص جميع الأعمدة المتاحة فعلياً...\n');

    // محاولة إدراج سجل فارغ لمعرفة الأعمدة المطلوبة
    try {
      await supabase.from('expenses').insert([{}]);
    } catch (error) {
      console.log('📋 الأعمدة المطلوبة من رسالة الخطأ:');
      console.log(error.message);
    }

    // محاولة جلب سجل موجود لمعرفة البنية
    const { data: sample, error } = await supabase
      .from('expenses')
      .select('*')
      .limit(1);

    if (!error && sample && sample.length > 0) {
      console.log('\n✅ البنية الحقيقية للجدول:');
      Object.keys(sample[0]).forEach(col => {
        console.log(`  - ${col}: ${typeof sample[0][col]} (${sample[0][col]})`);
      });
    } else if (!error) {
      console.log('\n📋 الجدول فارغ، سنحاول إضافة سجل بأقل البيانات الممكنة...');
      
      // محاولة إضافة سجل بالأعمدة الأساسية فقط
      const basicExpense = {
        userId: 'test-basic',
        amount: 10,
        date: '2025-10-23'
      };

      const { data: inserted, error: insertError } = await supabase
        .from('expenses')
        .insert([basicExpense])
        .select('*')
        .single();

      if (insertError) {
        console.log('\n❌ خطأ في الإدراج الأساسي:', insertError.message);
        
        // محاولة بدون تاريخ
        const { data: inserted2, error: insertError2 } = await supabase
          .from('expenses')
          .insert([{ userId: 'test-minimal', amount: 5 }])
          .select('*')
          .single();

        if (insertError2) {
          console.log('❌ خطأ في الإدراج المبسط:', insertError2.message);
        } else {
          console.log('✅ تم الإدراج المبسط:', inserted2);
          
          // حذف السجل التجريبي
          await supabase.from('expenses').delete().eq('userId', 'test-minimal');
        }
      } else {
        console.log('✅ تم الإدراج الأساسي:', inserted);
        console.log('\n📋 الأعمدة المتاحة:');
        Object.keys(inserted).forEach(col => {
          console.log(`  - ${col}: ${typeof inserted[col]}`);
        });
        
        // حذف السجل التجريبي
        await supabase.from('expenses').delete().eq('userId', 'test-basic');
      }
    }

  } catch (error) {
    console.error('💥 خطأ عام:', error);
  }
}

getExactColumns();
