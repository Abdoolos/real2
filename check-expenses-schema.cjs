// فحص schema جدول expenses الحقيقي
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSchema() {
  try {
    console.log('🔍 فحص schema جدول expenses...');
    
    // محاولة جلب بيانات بدون created_at
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .limit(1);
      
    if (error) {
      console.error('❌ خطأ في جلب البيانات:', error);
      
      // محاولة فحص الأعمدة الأساسية فقط
      console.log('\n🔧 محاولة فحص الأعمدة الأساسية...');
      const { data: basicData, error: basicError } = await supabase
        .from('expenses')
        .select('id, amount, date, user_id, subcategory_id')
        .limit(1);
        
      if (basicError) {
        console.error('❌ خطأ في الأعمدة الأساسية:', basicError);
        return;
      }
      
      console.log('✅ الأعمدة الأساسية تعمل');
      if (basicData && basicData.length > 0) {
        console.log('📝 الأعمدة المتاحة:');
        Object.keys(basicData[0]).forEach(col => {
          console.log('  -', col);
        });
      }
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ أعمدة جدول expenses:');
      Object.keys(data[0]).forEach(col => {
        console.log('  -', col);
      });
      
      console.log('\n📝 مثال على البيانات:');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('⚠️ جدول expenses فارغ');
      
      // فحص إجمالي عدد المصاريف
      const { count } = await supabase
        .from('expenses')
        .select('*', { count: 'exact', head: true });
        
      console.log('📊 إجمالي المصاريف:', count);
      
      if (count === 0) {
        console.log('💡 الجدول فارغ - هذا يفسر لماذا لا تظهر المصاريف!');
      }
    }
    
  } catch (error) {
    console.error('💥 خطأ:', error);
  }
}

checkSchema();
