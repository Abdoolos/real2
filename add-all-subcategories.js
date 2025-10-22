// Script لإضافة جميع البنود (29 بند) إلى قاعدة البيانات
// تشغيل: node add-all-subcategories.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// دالة لتطبيع النص العربي (إزالة التشكيل والهمزات)
function normalizeArabic(text) {
    if (!text) return '';
    return text
        .replace(/[ًٌٍَُِّْٰ]/g, '') // إزالة التشكيل
        .replace(/[أإآ]/g, 'ا')      // توحيد الألف
        .replace(/ة/g, 'ه')          // توحيد التاء المربوطة
        .replace(/ى/g, 'ي')          // توحيد الياء
        .trim()
        .toLowerCase();
}

async function addAllSubcategories() {
    console.log('🚀 بدء إضافة البنود...\n');

    try {
        // 1. جلب جميع الفئات الموجودة
        const allCategories = await prisma.category.findMany({
            where: { is_active: true }
        });

        console.log(`📋 عدد الفئات الموجودة: ${allCategories.length}`);

        // 2. إنشاء خريطة للفئات
        const categoryMap = new Map();
        allCategories.forEach(cat => {
            const normalized = normalizeArabic(cat.name);
            categoryMap.set(normalized, cat.id);
            console.log(`   - ${cat.name} (ID: ${cat.id})`);
        });

        console.log('\n');

        // 3. تعريف البنود الكاملة (29 بند في 10 فئات)
        const subcategoriesData = [
            // 🍽️ فئة الطعام (5 بنود)
            { categoryName: 'طعام', items: [
                { name: 'مطاعم', aliases: ['مطعم', 'مأكولات', 'وجبات', 'ريستورانت'] },
                { name: 'قهوة ومشروبات', aliases: ['قهوة', 'كافيه', 'مشروبات', 'عصائر', 'ستاربكس'] },
                { name: 'بقالة وسوبرماركت', aliases: ['بقالة', 'سوبرماركت', 'مواد غذائية', 'تموينات', 'هايبر'] },
                { name: 'حلويات ومعجنات', aliases: ['حلويات', 'كيك', 'معجنات', 'حلا', 'آيس كريم'] },
                { name: 'وجبات سريعة', aliases: ['برجر', 'بيتزا', 'وجبة سريعة', 'فاست فود', 'ماكدونالدز'] },
            ]},

            // 🚗 فئة المواصلات (4 بنود)
            { categoryName: 'مواصلات', items: [
                { name: 'وقود', aliases: ['بنزين', 'ديزل', 'وقود السيارة', 'محطة وقود'] },
                { name: 'تاكسي وأوبر', aliases: ['تاكسي', 'أوبر', 'كريم', 'نقل', 'مواصلات عامة'] },
                { name: 'صيانة السيارة', aliases: ['صيانة', 'إصلاح السيارة', 'قطع غيار', 'ورشة'] },
                { name: 'مواقف سيارات', aliases: ['موقف', 'باركنج', 'ركن السيارة'] },
            ]},

            // 🏠 فئة السكن (3 بنود)
            { categoryName: 'سكن', items: [
                { name: 'إيجار المنزل', aliases: ['إيجار', 'أجرة المنزل', 'إيجار الشقة'] },
                { name: 'أثاث ومفروشات', aliases: ['أثاث', 'مفروشات', 'ديكور', 'إيكيا'] },
                { name: 'صيانة منزل', aliases: ['صيانة البيت', 'إصلاحات منزلية', 'صيانة'] },
            ]},

            // 🧾 فئة الفواتير والخدمات (4 بنود)
            { categoryName: 'فواتير وخدمات', items: [
                { name: 'كهرباء', aliases: ['فاتورة كهرباء', 'الكهرباء', 'السعودية للكهرباء'] },
                { name: 'مياه', aliases: ['فاتورة مياه', 'المياه', 'ماء'] },
                { name: 'إنترنت واتصالات', aliases: ['إنترنت', 'جوال', 'اتصالات', 'موبايلي', 'زين'] },
                { name: 'اشتراكات رقمية', aliases: ['نتفليكس', 'شاهد', 'سبوتيفاي', 'اشتراك'] },
            ]},

            // 🏥 فئة الصحة (3 بنود)
            { categoryName: 'صحة', items: [
                { name: 'عيادة ومستشفى', aliases: ['دكتور', 'طبيب', 'عيادة', 'مستشفى'] },
                { name: 'دواء وصيدلية', aliases: ['دواء', 'صيدلية', 'أدوية', 'النهدي', 'الدواء'] },
                { name: 'تحاليل ومختبر', aliases: ['تحاليل', 'مختبر', 'فحوصات'] },
            ]},

            // 📚 فئة التعليم (2 بند)
            { categoryName: 'تعليم ودورات', items: [
                { name: 'رسوم دراسية', aliases: ['مدرسة', 'جامعة', 'رسوم', 'تعليم'] },
                { name: 'كتب ومستلزمات', aliases: ['كتب', 'قرطاسية', 'مستلزمات دراسية'] },
            ]},

            // 🎉 فئة الترفيه (3 بنود)
            { categoryName: 'ترفيه', items: [
                { name: 'سينما ومسرح', aliases: ['سينما', 'أفلام', 'تذاكر', 'مسارح'] },
                { name: 'ألعاب وهوايات', aliases: ['ألعاب', 'هوايات', 'ترفيه'] },
                { name: 'منتزهات وملاهي', aliases: ['ملاهي', 'منتزهات', 'حدائق'] },
            ]},

            // ✈️ فئة السفر (2 بند)
            { categoryName: 'سفر', items: [
                { name: 'تذاكر طيران', aliases: ['طيران', 'تذاكر', 'سفر', 'رحلات'] },
                { name: 'فنادق وإقامة', aliases: ['فندق', 'إقامة', 'حجز'] },
            ]},

            // 🛍️ فئة التسوق العام (2 بند)
            { categoryName: 'تسوق عام', items: [
                { name: 'ملابس وأزياء', aliases: ['ملابس', 'أزياء', 'أحذية'] },
                { name: 'إلكترونيات', aliases: ['جوال', 'لابتوب', 'إلكترونيات', 'أجهزة'] },
            ]},

            // ❓ فئة أخرى (1 بند)
            { categoryName: 'أخرى', items: [
                { name: 'متنوع', aliases: ['أخرى', 'متنوع', 'عام'] },
            ]},
        ];

        // 4. إضافة البنود
        let totalCreated = 0;
        let totalSkipped = 0;
        const errors = [];

        for (const categoryDef of subcategoriesData) {
            const categoryId = categoryMap.get(normalizeArabic(categoryDef.categoryName));

            if (!categoryId) {
                console.log(`⚠️  فئة غير موجودة: ${categoryDef.categoryName}`);
                continue;
            }

            console.log(`\n📂 ${categoryDef.categoryName} (ID: ${categoryId})`);

            for (const item of categoryDef.items) {
                try {
                    // التحقق من وجود البند
                    const existing = await prisma.subcategory.findFirst({
                        where: {
                            category_id: categoryId,
                            name: item.name
                        }
                    });

                    if (existing) {
                        console.log(`   ⏭️  موجود بالفعل: ${item.name}`);
                        totalSkipped++;
                        continue;
                    }

                    // إنشاء البند
                    await prisma.subcategory.create({
                        data: {
                            category_id: categoryId,
                            name: item.name,
                            name_normalized: normalizeArabic(item.name),
                            aliases: item.aliases,
                            aliases_normalized: item.aliases.map(a => normalizeArabic(a)),
                            is_active: true,
                            usage_count: 0,
                            created_by_user: false
                        }
                    });

                    console.log(`   ✅ تم إضافة: ${item.name}`);
                    totalCreated++;

                    // تأخير بسيط لتجنب الضغط على قاعدة البيانات
                    await new Promise(resolve => setTimeout(resolve, 50));

                } catch (error) {
                    console.log(`   ❌ خطأ في: ${item.name} - ${error.message}`);
                    errors.push({ category: categoryDef.categoryName, item: item.name, error: error.message });
                }
            }
        }

        // 5. النتيجة النهائية
        console.log('\n' + '='.repeat(60));
        console.log('📊 النتيجة النهائية:');
        console.log('='.repeat(60));
        console.log(`✅ تم إنشاء: ${totalCreated} بند`);
        console.log(`⏭️  تم تجاوز (موجود): ${totalSkipped} بند`);
        console.log(`❌ أخطاء: ${errors.length}`);
        console.log(`📦 الإجمالي المتوقع: 29 بند`);

        if (errors.length > 0) {
            console.log('\n⚠️  الأخطاء:');
            errors.forEach((err, i) => {
                console.log(`${i + 1}. ${err.category} > ${err.item}: ${err.error}`);
            });
        }

        // 6. التحقق النهائي
        const finalCount = await prisma.subcategory.count({
            where: { is_active: true }
        });
        console.log(`\n🎯 إجمالي البنود النشطة في قاعدة البيانات: ${finalCount}`);

        console.log('\n✨ اكتمل! يمكنك الآن استخدام البنود في التطبيق.\n');

    } catch (error) {
        console.error('\n💥 خطأ عام:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// تشغيل
addAllSubcategories()
    .then(() => {
        console.log('👍 Script completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Script failed:', error);
        process.exit(1);
    });
