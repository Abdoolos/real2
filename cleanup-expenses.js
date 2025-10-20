import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupExpenses() {
  console.log('🧹 بدء تنظيف المصاريف القديمة...');
  
  try {
    // حذف جميع المصاريف
    const result = await prisma.expense.deleteMany({});
    
    console.log(`✅ تم حذف ${result.count} مصروف قديم بنجاح!`);
    console.log('🎉 قاعدة البيانات نظيفة الآن!');
    console.log('');
    console.log('📝 الخطوة التالية:');
    console.log('   1. اذهب إلى /add-expense');
    console.log('   2. أضف مصروف جديد');
    console.log('   3. اذهب إلى /expenses-list');
    console.log('   4. يجب أن يظهر المصروف الجديد! 🚀');
    
  } catch (error) {
    console.error('❌ خطأ في التنظيف:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupExpenses();
