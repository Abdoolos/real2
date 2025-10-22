import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testSubcategories() {
    try {
        console.log('🔍 جاري فحص الفئات والبنود...\n');
        
        // فحص الفئات
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        console.log(`📦 عدد الفئات: ${categories.length}`);
        categories.forEach(cat => {
            console.log(`  - ${cat.name} (ID: ${cat.id})`);
        });
        
        console.log('\n📋 جاري فحص البنود الفرعية...\n');
        
        // فحص البنود الفرعية
        const subcategories = await prisma.subcategory.findMany({
            include: {
                category: true
            },
            orderBy: { categoryId: 'asc' }
        });
        
        console.log(`📊 عدد البنود الفرعية: ${subcategories.length}\n`);
        
        if (subcategories.length === 0) {
            console.log('❌ لا توجد بنود فرعية في قاعدة البيانات!');
        } else {
            // تجميع حسب الفئة
            const grouped = {};
            subcategories.forEach(sub => {
                const catName = sub.category?.name || 'غير محدد';
                if (!grouped[catName]) {
                    grouped[catName] = [];
                }
                grouped[catName].push(sub.name);
            });
            
            Object.entries(grouped).forEach(([catName, subs]) => {
                console.log(`\n📁 ${catName}:`);
                subs.forEach(subName => {
                    console.log(`   - ${subName}`);
                });
            });
        }
        
    } catch (error) {
        console.error('💥 خطأ:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testSubcategories();
