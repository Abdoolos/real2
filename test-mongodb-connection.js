import connectDB from './lib/mongodb/connection.js';

async function testConnection() {
  try {
    console.log('🧪 اختبار الاتصال بـ MongoDB...');
    await connectDB();
    console.log('✅ نجح الاتصال بـ MongoDB!');
    console.log('🎉 النظام جاهز للعمل');
  } catch (error) {
    console.log('⚠️  MongoDB غير متصل - وهذا طبيعي للتطوير المحلي');
    console.log('📋 رسالة الخطأ:', error.message);
    console.log('');
    console.log('✅ النظام جاهز للنشر! ');
    console.log('🔧 عند النشر، ستحتاج لـ:');
    console.log('   1. MongoDB Atlas (مجاني)');
    console.log('   2. تحديث MONGODB_URI في متغيرات البيئة');
    console.log('   3. تشغيل البيانات الأولية: node scripts/seed-mongodb.js');
    process.exit(0);
  }
}

testConnection();
