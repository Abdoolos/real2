// اختبار سريع لتشخيص مشكلة ظهور المصاريف
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ متغيرات Supabase مفقودة');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'موجود' : 'مفقود');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'موجود' : 'مفقود');
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
    
    if (!expenses || expenses.length === 0) {
      console.log('⚠️  لا توجد مصاريف في قاعدة البيانات!');
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
      
    if (!usersError && users) {
      const uniqueUsers = [...new Set(users.map(u => u.user_id))];
      console.log(`\n👥 عدد المستخدمين المختلفين: ${uniqueUsers.length}`);
      console.log('🔑 معرفات المستخدمين:');
      uniqueUsers.slice(0, 5).forEach((userId, index) => {
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
        
        // فحص ما إذا كانت هناك مصاريف حديثة جداً (آخر 10 دقائق)
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
        const recentExpenses = userExpenses.filter(exp => exp.created_at > tenMinutesAgo);
        
        if (recentExpenses.length > 0) {
          console.log(`🕐 مصاريف حديثة (آخر 10 دقائق): ${recentExpenses.length}`);
          recentExpenses.forEach((exp, idx) => {
            console.log(`   ${idx + 1}. ${exp.amount} ${exp.currency} - ${exp.created_at}`);
          });
        } else {
          console.log('⏰ لا توجد مصاريف حديثة في آخر 10 دقائق');
        }
      }
    }
    
    // 5. فحص API endpoint الذي يستخدمه التطبيق
    console.log('\n🌐 اختبار API endpoint للتطبيق...');
    
    try {
      const apiUrl = `http://localhost:3000/api/expenses-supabase?userId=${expenses[0]?.user_id || 'test'}`;
      console.log(`🔗 محاولة الوصول إلى: ${apiUrl}`);
      
      // هذا سيفشل لأننا لسنا في بيئة النطبيق، لكن نريد أن نعرف
      console.log('ℹ️  لا يمكن اختبار API من هنا، لكن يمكن فحصه من المتصفح');
      
    } catch (error) {
      console.log('ℹ️  اختبار API endpoint يتطلب تشغيل الخادم');
    }
    
  } catch (error) {
    console.error('💥 خطأ:', error);
  }
}

diagnoseProblem();
