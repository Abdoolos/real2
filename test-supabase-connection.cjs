const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('============================================');
  console.log('🔍 اختبار الاتصال مع Supabase PostgreSQL');
  console.log('============================================\n');

  try {
    // Test 1: Database Connection
    console.log('📝 الاختبار 1: الاتصال بقاعدة البيانات...');
    await prisma.$connect();
    console.log('✅ تم الاتصال بنجاح!\n');

    // Test 2: Query Test
    console.log('📝 الاختبار 2: اختبار الاستعلام...');
    const result = await prisma.$queryRaw`SELECT current_database(), version()`;
    console.log('✅ الاستعلام نجح!');
    console.log('📊 قاعدة البيانات:', result[0].current_database);
    console.log('📊 إصدار PostgreSQL:', result[0].version.split(' ')[0], result[0].version.split(' ')[1]);
    console.log('');

    // Test 3: Check Tables
    console.log('📝 الاختبار 3: فحص الجداول...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log(`✅ عدد الجداول: ${tables.length}`);
    console.log('📋 الجداول الموجودة:');
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });
    console.log('');

    // Test 4: Count Records
    console.log('📝 الاختبار 4: عد السجلات في الجداول الرئيسية...');
    const userCount = await prisma.user.count();
    const categoryCount = await prisma.category.count();
    const expenseCount = await prisma.expense.count();
    console.log(`✅ عدد المستخدمين: ${userCount}`);
    console.log(`✅ عدد التصنيفات: ${categoryCount}`);
    console.log(`✅ عدد المصروفات: ${expenseCount}`);
    console.log('');

    console.log('============================================');
    console.log('✅ جميع الاختبارات نجحت!');
    console.log('============================================');
    console.log('');
    console.log('🎉 قاعدة البيانات Supabase جاهزة للاستخدام!');
    console.log('');

  } catch (error) {
    console.error('\n❌ فشل الاختبار!');
    console.error('تفاصيل الخطأ:', error.message);
    console.error('');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .catch((error) => {
    console.error('خطأ غير متوقع:', error);
    process.exit(1);
  });
