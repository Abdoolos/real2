import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedData() {
    try {
        console.log('🌱 بدء إضافة الفئات والبنود...\n');
        
        // حذف البيانات القديمة
        console.log('🗑️ حذف البنود القديمة...');
        await prisma.subcategory.deleteMany({});
        console.log('🗑️ حذف الفئات القديمة...');
        await prisma.category.deleteMany({});
        
        // إنشاء الفئات
        console.log('\n📦 إنشاء الفئات...');
        const categories = await Promise.all([
            prisma.category.create({ data: { name: 'طعام', icon: '🍽️', color: '#F59E0B', isDefault: true } }),
            prisma.category.create({ data: { name: 'مواصلات', icon: '🚗', color: '#10B981', isDefault: true } }),
            prisma.category.create({ data: { name: 'سكن', icon: '🏠', color: '#3B82F6', isDefault: true } }),
            prisma.category.create({ data: { name: 'فواتير وخدمات', icon: '🧾', color: '#84CC16', isDefault: true } }),
            prisma.category.create({ data: { name: 'صحة', icon: '🏥', color: '#EF4444', isDefault: true } }),
            prisma.category.create({ data: { name: 'تعليم ودورات', icon: '📚', color: '#F97316', isDefault: true } }),
            prisma.category.create({ data: { name: 'ترفيه', icon: '🎉', color: '#8B5CF6', isDefault: true } }),
            prisma.category.create({ data: { name: 'سفر', icon: '✈️', color: '#06B6D4', isDefault: true } }),
            prisma.category.create({ data: { name: 'تسوق عام', icon: '🛍️', color: '#EC4899', isDefault: true } }),
            prisma.category.create({ data: { name: 'أخرى', icon: '❓', color: '#6B7280', isDefault: true } }),
        ]);
        
        console.log(`✅ تم إنشاء ${categories.length} فئة`);
        
        // إنشاء البنود الفرعية
        console.log('\n📋 إنشاء البنود الفرعية...');
        
        const subcategoriesData = [
            // طعام
            { categoryName: 'طعام', name: 'مطاعم' },
            { categoryName: 'طعام', name: 'قهوة ومشروبات' },
            { categoryName: 'طعام', name: 'بقالة وسوبرماركت' },
            { categoryName: 'طعام', name: 'حلويات ومعجنات' },
            { categoryName: 'طعام', name: 'وجبات سريعة' },
            
            // مواصلات
            { categoryName: 'مواصلات', name: 'وقود' },
            { categoryName: 'مواصلات', name: 'تاكسي وأوبر' },
            { categoryName: 'مواصلات', name: 'صيانة السيارة' },
            { categoryName: 'مواصلات', name: 'مواقف سيارات' },
            
            // سكن
            { categoryName: 'سكن', name: 'إيجار المنزل' },
            { categoryName: 'سكن', name: 'أثاث ومفروشات' },
            { categoryName: 'سكن', name: 'صيانة منزل' },
            
            // فواتير وخدمات
            { categoryName: 'فواتير وخدمات', name: 'كهرباء' },
            { categoryName: 'فواتير وخدمات', name: 'مياه' },
            { categoryName: 'فواتير وخدمات', name: 'إنترنت واتصالات' },
            { categoryName: 'فواتير وخدمات', name: 'اشتراكات رقمية' },
            
            // صحة
            { categoryName: 'صحة', name: 'عيادة ومستشفى' },
            { categoryName: 'صحة', name: 'دواء وصيدلية' },
            { categoryName: 'صحة', name: 'تحاليل ومختبر' },
            
            // تعليم ودورات
            { categoryName: 'تعليم ودورات', name: 'رسوم دراسية' },
            { categoryName: 'تعليم ودورات', name: 'كتب ومستلزمات' },
            
            // ترفيه
            { categoryName: 'ترفيه', name: 'سينما ومسرح' },
            { categoryName: 'ترفيه', name: 'ألعاب وهوايات' },
            { categoryName: 'ترفيه', name: 'منتزهات وملاهي' },
            
            // سفر
            { categoryName: 'سفر', name: 'تذاكر طيران' },
            { categoryName: 'سفر', name: 'فنادق وإقامة' },
            
            // تسوق عام
            { categoryName: 'تسوق عام', name: 'ملابس وأزياء' },
            { categoryName: 'تسوق عام', name: 'إلكترونيات' },
            
            // أخرى
            { categoryName: 'أخرى', name: 'متنوع' },
        ];
        
        const categoryMap = new Map(categories.map(cat => [cat.name, cat.id]));
        
        let createdCount = 0;
        for (const subData of subcategoriesData) {
            const categoryId = categoryMap.get(subData.categoryName);
            if (categoryId) {
                await prisma.subcategory.create({
                    data: {
                        name: subData.name,
                        categoryId: categoryId
                    }
                });
                createdCount++;
            }
        }
        
        console.log(`✅ تم إنشاء ${createdCount} بند فرعي`);
        
        console.log('\n🎉 اكتمل! تم إضافة جميع الفئات والبنود بنجاح.');
        
    } catch (error) {
        console.error('💥 خطأ:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
