import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔄 جاري اختبار الاتصال بقاعدة البيانات...\n');
  
  try {
    // محاولة الاتصال بقاعدة البيانات
    await prisma.$connect();
    console.log('✅ نجح الاتصال بقاعدة البيانات!');
    console.log('📊 معلومات الاتصال:');
    console.log('   - Provider: PostgreSQL');
    console.log('   - Host: Supabase');
    console.log('   - Status: متصل\n');
    
    // محاولة استعلام بسيط
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ تم تنفيذ استعلام تجريبي بنجاح');
    console.log('   - PostgreSQL Version:', result[0].version.split(' ')[1]);
    
    await prisma.$disconnect();
    console.log('\n✅ تم فصل الاتصال بنجاح');
    console.log('\n🎉 قاعدة البيانات جاهزة! يمكنك الآن تشغيل setup-supabase-database.bat');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ فشل الاتصال بقاعدة البيانات!\n');
    console.error('تفاصيل الخطأ:');
    console.error('   - الرسالة:', error.message);
    
    if (error.code === 'P1000') {
      console.error('\n💡 الحل المقترح:');
      console.error('   1. تحقق من DATABASE_URL في ملف .env');
      console.error('   2. تأكد من أن كلمة المرور صحيحة');
      console.error('   3. تحقق من أن قاعدة البيانات على Supabase في حالة Active');
      console.error('   4. تحقق من إعدادات IP Restrictions في Supabase');
    }
    
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();
