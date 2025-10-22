const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkData() {
  try {
    const count = await prisma.subcategory.count();
    console.log(`📊 عدد البنود في قاعدة البيانات: ${count}`);
    
    if (count > 0) {
      const sample = await prisma.subcategory.findMany({
        take: 5,
        include: { category: true }
      });
      
      console.log('\n📝 عينة من البيانات:');
      sample.forEach(s => {
        console.log(`  - ${s.name} (category: ${s.category.name}, categoryId: ${s.categoryId})`);
      });
    } else {
      console.log('⚠️ لا توجد بنود في قاعدة البيانات!');
      console.log('💡 يجب تشغيل: node add-all-subcategories.cjs');
    }
  } catch (error) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
