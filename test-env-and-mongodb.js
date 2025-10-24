import 'dotenv/config';
import mongoose from 'mongoose';

console.log('🔍 فحص متغيرات البيئة...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'موجود ✅' : 'غير موجود ❌');

if (process.env.MONGODB_URI) {
  console.log('📝 Connection String:', process.env.MONGODB_URI.substring(0, 50) + '...');
} else {
  console.log('❌ لم يتم العثور على MONGODB_URI في متغيرات البيئة');
  process.exit(1);
}

async function testAtlasConnection() {
  try {
    console.log('🧪 محاولة الاتصال بـ MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    
    console.log('✅ نجح الاتصال بـ MongoDB Atlas!');
    console.log('🎉 قاعدة البيانات جاهزة للاستخدام');
    
    // اختبار إنشاء collection بسيط
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    const testDoc = new TestModel({ name: 'اختبار الاتصال' });
    await testDoc.save();
    
    console.log('✅ تم إنشاء وثيقة اختبار بنجاح');
    
    // حذف الوثيقة الاختبارية
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('🧹 تم حذف الوثيقة الاختبارية');
    
  } catch (error) {
    console.error('❌ فشل الاتصال بـ MongoDB Atlas:');
    console.error('📋 رسالة الخطأ:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('🔐 مشكلة في المصادقة - تحقق من username وpassword');
    } else if (error.message.includes('network')) {
      console.log('🌐 مشكلة في الشبكة - تحقق من الاتصال بالإنترنت');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('🔍 لم يتم العثور على الخادم - تحقق من connection string');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال');
  }
}

testAtlasConnection();
