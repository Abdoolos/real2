// بيانات احتياطية للبنود في حالة فشل الاتصال بقاعدة البيانات
export const fallbackSubcategories = [
  // طعام
  { id: 'fallback-1', name: 'مطاعم', category_name: 'طعام' },
  { id: 'fallback-2', name: 'قهوة ومشروبات', category_name: 'طعام' },
  { id: 'fallback-3', name: 'بقالة وسوبرماركت', category_name: 'طعام' },
  { id: 'fallback-4', name: 'حلويات ومعجنات', category_name: 'طعام' },
  { id: 'fallback-5', name: 'وجبات سريعة', category_name: 'طعام' },
  
  // مواصلات
  { id: 'fallback-6', name: 'وقود', category_name: 'مواصلات' },
  { id: 'fallback-7', name: 'تاكسي وأوبر', category_name: 'مواصلات' },
  { id: 'fallback-8', name: 'صيانة السيارة', category_name: 'مواصلات' },
  { id: 'fallback-9', name: 'مواقف سيارات', category_name: 'مواصلات' },
  
  // سكن
  { id: 'fallback-10', name: 'إيجار المنزل', category_name: 'سكن' },
  { id: 'fallback-11', name: 'أثاث ومفروشات', category_name: 'سكن' },
  { id: 'fallback-12', name: 'صيانة منزل', category_name: 'سكن' },
  
  // فواتير وخدمات
  { id: 'fallback-13', name: 'كهرباء', category_name: 'فواتير وخدمات' },
  { id: 'fallback-14', name: 'مياه', category_name: 'فواتير وخدمات' },
  { id: 'fallback-15', name: 'إنترنت واتصالات', category_name: 'فواتير وخدمات' },
  { id: 'fallback-16', name: 'اشتراكات رقمية', category_name: 'فواتير وخدمات' },
  
  // صحة
  { id: 'fallback-17', name: 'عيادة ومستشفى', category_name: 'صحة' },
  { id: 'fallback-18', name: 'دواء وصيدلية', category_name: 'صحة' },
  { id: 'fallback-19', name: 'تحاليل ومختبر', category_name: 'صحة' },
  
  // تعليم ودورات
  { id: 'fallback-20', name: 'رسوم دراسية', category_name: 'تعليم ودورات' },
  { id: 'fallback-21', name: 'كتب ومستلزمات', category_name: 'تعليم ودورات' },
  
  // ترفيه
  { id: 'fallback-22', name: 'سينما ومسرح', category_name: 'ترفيه' },
  { id: 'fallback-23', name: 'ألعاب وهوايات', category_name: 'ترفيه' },
  { id: 'fallback-24', name: 'منتزهات وملاهي', category_name: 'ترفيه' },
  
  // سفر
  { id: 'fallback-25', name: 'تذاكر طيران', category_name: 'سفر' },
  { id: 'fallback-26', name: 'فنادق وإقامة', category_name: 'سفر' },
  
  // تسوق عام
  { id: 'fallback-27', name: 'ملابس وأزياء', category_name: 'تسوق عام' },
  { id: 'fallback-28', name: 'إلكترونيات', category_name: 'تسوق عام' },
  
  // أخرى
  { id: 'fallback-29', name: 'متنوع', category_name: 'أخرى' },
];
