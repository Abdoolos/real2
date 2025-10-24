import 'dotenv/config';
import connectDB from '../lib/mongodb/connection.js';
import { Category, Subcategory } from '../lib/mongodb/models/index.js';

const defaultCategories = [
  {
    name: 'طعام',
    icon: '🍽️',
    color: '#FF6B6B',
    isDefault: true,
    subcategories: ['مطاعم', 'بقالة', 'حلويات', 'مشروبات', 'وجبات سريعة']
  },
  {
    name: 'مواصلات',
    icon: '🚗',
    color: '#4ECDC4',
    isDefault: true,
    subcategories: ['وقود', 'صيانة', 'مواقف', 'تأمين', 'رخصة']
  },
  {
    name: 'تسوق',
    icon: '🛍️',
    color: '#45B7D1',
    isDefault: true,
    subcategories: ['ملابس', 'إلكترونيات', 'منزل', 'أحذية', 'اكسسوارات']
  },
  {
    name: 'صحة',
    icon: '🏥',
    color: '#96CEB4',
    isDefault: true,
    subcategories: ['طبيب', 'دواء', 'مستشفى', 'تحاليل', 'أسنان']
  },
  {
    name: 'تعليم',
    icon: '📚',
    color: '#FFEAA7',
    isDefault: true,
    subcategories: ['كتب', 'دورات', 'رسوم دراسية', 'قرطاسية', 'برامج']
  },
  {
    name: 'ترفيه',
    icon: '🎮',
    color: '#DDA0DD',
    isDefault: true,
    subcategories: ['سينما', 'ألعاب', 'رياضة', 'سفر', 'هوايات']
  },
  {
    name: 'منزل',
    icon: '🏠',
    color: '#F39C12',
    isDefault: true,
    subcategories: ['إيجار', 'كهرباء', 'ماء', 'غاز', 'إنترنت']
  },
  {
    name: 'أخرى',
    icon: '📝',
    color: '#95A5A6',
    isDefault: true,
    subcategories: ['متنوع', 'طوارئ', 'هدايا', 'تبرعات']
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('🌱 بدء إضافة البيانات الأولية لـ MongoDB...');

    // حذف البيانات الموجودة (اختياري)
    await Category.deleteMany({ isDefault: true });
    await Subcategory.deleteMany({});
    console.log('🧹 تم حذف البيانات القديمة');

    for (const categoryData of defaultCategories) {
      const { subcategories, ...categoryInfo } = categoryData;
      
      // إنشاء الفئة
      const category = await Category.create(categoryInfo);
      console.log(`✅ تم إنشاء فئة: ${category.name}`);

      // إنشاء الفئات الفرعية
      for (const subName of subcategories) {
        await Subcategory.create({
          name: subName,
          categoryId: category._id
        });
        console.log(`  ✅ تم إنشاء فئة فرعية: ${subName}`);
      }
    }

    // إحصائيات النتيجة
    const totalCategories = await Category.countDocuments({ isDefault: true });
    const totalSubcategories = await Subcategory.countDocuments({});
    
    console.log('🎉 تم إنشاء البيانات الأولية بنجاح!');
    console.log(`📊 الإحصائيات:`);
    console.log(`   - الفئات: ${totalCategories}`);
    console.log(`   - الفئات الفرعية: ${totalSubcategories}`);

  } catch (error) {
    console.error('❌ خطأ في إنشاء البيانات:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
