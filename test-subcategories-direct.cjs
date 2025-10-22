// اختبار مباشر لجلب البنود من قاعدة البيانات
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSubcategories() {
    try {
        console.log('🔍 جلب البنود من قاعدة البيانات...\n');

        const subcategories = await prisma.subcategory.findMany({
            include: {
                category: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        console.log(`✅ تم العثور على ${subcategories.length} بند\n`);

        if (subcategories.length > 0) {
            console.log('📝 أول 5 بنود:');
            subcategories.slice(0, 5).forEach((sub, i) => {
                console.log(`${i + 1}. ${sub.name} (الفئة: ${sub.category.name}, category_id: ${sub.categoryId})`);
            });

            console.log('\n📋 توزيع البنود حسب الفئات:');
            const grouped = {};
            subcategories.forEach(sub => {
                const catName = sub.category.name;
                if (!grouped[catName]) grouped[catName] = 0;
                grouped[catName]++;
            });
            Object.entries(grouped).forEach(([cat, count]) => {
                console.log(`   ${cat}: ${count} بند`);
            });
        } else {
            console.log('⚠️  لا توجد بنود في قاعدة البيانات!');
        }

    } catch (error) {
        console.error('❌ خطأ:', error.message);
        console.error('التفاصيل:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testSubcategories();
