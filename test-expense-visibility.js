// اختبار سريع لتشخيص مشكلة ظهور المصاريف
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ متغيرات Supabase مفقودة');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseProblem() {
  try {
    console.log('🔍 تشخيص مشكلة المصاريف...');
    
    // 1. فحص آخر 5 مصاريف مع التفاصيل الكاملة
    console.log('\n📊 آخر 5 مصاريف في قاعدة البيانات:');
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select(`
        *,
        subcategory:subcategories(name, category:categories(name))
      `)
      .order('created_at', { ascending: false })
      .limit(5);
      
    if (error) {
      console.error('❌ خطأ في جلب المصاريف:', error);
      return;
    }
    
    expenses.forEach((expense, index) => {
      console.log(`${index + 1}. ID: ${expense.id}`);
      console.log(`   المبلغ: ${expense.amount} ${expense.currency}`);
      console.log(`   التاريخ: ${expense.date}`);
      console.log(`   المستخدم: ${expense.user_id}`);
      console.log(`   البند: ${expense.subcategory?.name || 'غير محدد'}`);
      console.log(`   الفئة: ${expense.subcategory?.category?.name || 'غير محدد'}`);
      console.log(`   تاريخ الإنشاء: ${expense.created_at}`);
      console.log('   ---');
    });
    
    // 2. احصائيات عامة
    const { count } = await supabase
      .from('expenses')
      .select('*', { count: 'exact', head: true });
      
    console.log(`\n📈 إجمالي المصاريف في قاعدة البيانات: ${count}`);
    
    // 3. فحص المستخدمين المختلفين
    const { data: users, error: usersError } = await supabase
      .from('expenses')
      .select('user_id')
      .limit(1000);
      
    if (!usersError) {
      const uniqueUsers = [...new Set(users.map(u => u.user_id))];
      console.log(`\n👥 عدد المستخدمين المختلفين: ${uniqueUsers.length}`);
      console.log('🔑 معرفات المستخدمين:');
      uniqueUsers.forEach((userId, index) => {
        console.log(`   ${index + 1}. ${userId}`);
      });
    }
    
    // 4. اختبار استعلام مشابه لما يستخدمه التطبيق
    console.log('\n🔍 اختبار استعلام مشابه للتطبيق...');
    
    // محاكاة استعلام بـ user_id أول مستخدم
    if (expenses.length > 0) {
      const testUserId = expenses[0].user_id;
      console.log(`\n🧪 اختبار بـ user_id: ${testUserId}`);
      
      const { data: userExpenses, error: testError } = await supabase
        .from('expenses')
        .select(`
          *,
          subcategory:subcategories(
            name,
            category:categories(name)
          )
        `)
        .eq('user_id', testUserId)
        .order('created_at', { ascending: false });
        
      if (testError) {
        console.error('❌ خطأ في الاختبار:', testError);
      } else {
        console.log(`✅ نتائج الاختبار: ${userExpenses.length} مصروف لهذا المستخدم`);
      }
    }
    
  } catch (error) {
    console.error('💥 خطأ:', error);
  }
}

diagnoseProblem();
