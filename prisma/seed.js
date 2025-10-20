const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إدخال البيانات الأساسية...');

  // إنشاء الفئات الافتراضية فقط (بدون ربطها بعائلة محددة)
  const categories = [
    { name: 'طعام وشراب', icon: 'utensils', color: '#EF4444' },
    { name: 'مواصلات', icon: 'car', color: '#3B82F6' },
    { name: 'ترفيه', icon: 'gamepad-2', color: '#8B5CF6' },
    { name: 'تسوق', icon: 'shopping-bag', color: '#10B981' },
    { name: 'فواتير', icon: 'file-text', color: '#F59E0B' },
    { name: 'صحة', icon: 'heart', color: '#EF4444' },
    { name: 'تعليم', icon: 'book', color: '#6366F1' },
    { name: 'أخرى', icon: 'more-horizontal', color: '#6B7280' },
  ];

  console.log('✅ جاري إنشاء الفئات الافتراضية...');
  
  const createdCategories = [];
  for (const categoryData of categories) {
    try {
      const category = await prisma.category.upsert({
        where: {
          id: `cat_${categoryData.name.replace(/\s+/g, '_').toLowerCase()}`,
        },
        update: {
          name: categoryData.name,
          icon: categoryData.icon,
          color: categoryData.color,
          isDefault: true,
        },
        create: {
          id: `cat_${categoryData.name.replace(/\s+/g, '_').toLowerCase()}`,
          name: categoryData.name,
          icon: categoryData.icon,
          color: categoryData.color,
          isDefault: true,
          // لن نربطها بعائلة محددة - ستكون متاحة للجميع
        },
      });
      createdCategories.push(category);
      console.log(`  ✓ ${category.name}`);
    } catch (error) {
      console.log(`  ⚠️ تخطي ${categoryData.name} (موجودة مسبقاً)`);
    }
  }

  console.log('✅ تم إنشاء الفئات الافتراضية بنجاح!');

  // إنشاء فئات فرعية للطعام
  const foodCategory = createdCategories.find(c => c.name === 'طعام وشراب');
  if (foodCategory) {
    const foodSubcategories = [
      { name: 'مطاعم', categoryId: foodCategory.id },
      { name: 'بقالة', categoryId: foodCategory.id },
      { name: 'مخبز', categoryId: foodCategory.id },
      { name: 'قهوة', categoryId: foodCategory.id },
    ];

    for (const subcat of foodSubcategories) {
      try {
        await prisma.subcategory.upsert({
          where: {
            id: `subcat_${subcat.name.replace(/\s+/g, '_').toLowerCase()}`,
          },
          update: {
            name: subcat.name,
          },
          create: {
            id: `subcat_${subcat.name.replace(/\s+/g, '_').toLowerCase()}`,
            name: subcat.name,
            categoryId: subcat.categoryId,
          },
        });
      } catch (error) {
        console.log(`  ⚠️ تخطي فئة فرعية: ${subcat.name}`);
      }
    }
    console.log('✅ تم إنشاء الفئات الفرعية للطعام');
  }

  // إنشاء فئات فرعية للمواصلات
  const transportCategory = createdCategories.find(c => c.name === 'مواصلات');
  if (transportCategory) {
    const transportSubcategories = [
      { name: 'وقود', categoryId: transportCategory.id },
      { name: 'صيانة', categoryId: transportCategory.id },
      { name: 'أوبر/كريم', categoryId: transportCategory.id },
      { name: 'مواقف', categoryId: transportCategory.id },
    ];

    for (const subcat of transportSubcategories) {
      try {
        await prisma.subcategory.upsert({
          where: {
            id: `subcat_${subcat.name.replace(/\s+/g, '_').toLowerCase()}`,
          },
          update: {
            name: subcat.name,
          },
          create: {
            id: `subcat_${subcat.name.replace(/\s+/g, '_').toLowerCase()}`,
            name: subcat.name,
            categoryId: subcat.categoryId,
          },
        });
      } catch (error) {
        console.log(`  ⚠️ تخطي فئة فرعية: ${subcat.name}`);
      }
    }
    console.log('✅ تم إنشاء الفئات الفرعية للمواصلات');
  }

  console.log('');
  console.log('🎉 تم الانتهاء من إعداد البيانات الأساسية بنجاح!');
  console.log('📊 البيانات المُنشأة:');
  console.log('   - 8 فئات رئيسية');
  console.log('   - 8 فئات فرعية (4 للطعام + 4 للمواصلات)');
  console.log('');
  console.log('ℹ️  ملاحظة: لم يتم إنشاء أي بيانات تجريبية (مستخدمين، عائلات، مصاريف)');
  console.log('   سيقوم المستخدمون بإنشاء بياناتهم الخاصة عند التسجيل.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ خطأ في إدخال البيانات:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
