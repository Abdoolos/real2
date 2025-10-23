-- ============================================
-- RialMind - Supabase Schema Setup
-- ============================================
-- هذا الملف يحتوي على جميع الجداول والـ policies المطلوبة
-- الصقه في Supabase SQL Editor وشغّله

-- ============================================
-- 1. إنشاء جدول المستخدمين
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMPTZ,
  image TEXT,
  currency TEXT DEFAULT 'SAR',
  timezone TEXT DEFAULT 'Asia/Riyadh',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. إنشاء جدول الفئات
-- ============================================
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  family_id TEXT,
  sort_order INTEGER,
  type TEXT,
  is_active BOOLEAN DEFAULT true,
  name_normalized TEXT
);

-- ============================================
-- 3. إنشاء جدول الفئات الفرعية
-- ============================================
CREATE TABLE IF NOT EXISTS public.subcategories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE
);

-- ============================================
-- 4. إنشاء جدول المصاريف
-- ============================================
CREATE TABLE IF NOT EXISTS public.expenses (
  id TEXT PRIMARY KEY,
  amount DECIMAL NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  subcategory_id TEXT REFERENCES public.subcategories(id) ON DELETE SET NULL,
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  family_id TEXT,
  bill_id TEXT,
  currency TEXT DEFAULT 'SAR',
  amount_in_sar DECIMAL,
  exchange_rate DECIMAL,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- توحيد المخطط إذا كان الجدول موجوداً مسبقاً بدون عمود user_id
-- لا تضف أعمدة جديدة إن كانت البنية مختلفة (camelCase موجودة)

-- ============================================
-- 5. إضافة Indexes للأداء
-- ============================================
CREATE INDEX IF NOT EXISTS idx_expenses_userId ON public.expenses("userId");
CREATE INDEX IF NOT EXISTS idx_expenses_categoryId ON public.expenses("categoryId");
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_subcategories_categoryId ON public.subcategories("categoryId");
-- (تم تجاهل فهرس sortOrder لأن العمود غير موجود في المخطط الحالي)

-- ============================================
-- 6. تفعيل Row Level Security
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. إنشاء Policies للأمان
-- ============================================

-- Users policies
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
CREATE POLICY "Users can read their own data" ON public.users
  FOR SELECT USING (auth.uid()::text = id);

DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = id);

-- Categories policies (عامة للجميع)
DROP POLICY IF EXISTS "Anyone can read categories" ON public.categories;
CREATE POLICY "Anyone can read categories" ON public.categories
  FOR SELECT USING (true);

-- Subcategories policies (عامة للجميع)
DROP POLICY IF EXISTS "Anyone can read subcategories" ON public.subcategories;
CREATE POLICY "Anyone can read subcategories" ON public.subcategories
  FOR SELECT USING (true);

-- Expenses policies (خاصة لكل مستخدم)
DROP POLICY IF EXISTS "Users can read their own expenses" ON public.expenses;
CREATE POLICY "Users can read their own expenses" ON public.expenses
  FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can insert their own expenses" ON public.expenses;
CREATE POLICY "Users can insert their own expenses" ON public.expenses
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can update their own expenses" ON public.expenses;
CREATE POLICY "Users can update their own expenses" ON public.expenses
  FOR UPDATE USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can delete their own expenses" ON public.expenses;
CREATE POLICY "Users can delete their own expenses" ON public.expenses
  FOR DELETE USING (auth.uid()::text = "userId");

-- ============================================
-- 8. إضافة بيانات أولية (الفئات)
-- ============================================
INSERT INTO public.categories (id, name, icon, color, "isDefault")
VALUES
  ('cat-food', 'طعام', '🍽️', '#F59E0B', true),
  ('cat-transport', 'مواصلات', '🚗', '#10B981', true),
  ('cat-housing', 'سكن', '🏠', '#3B82F6', true),
  ('cat-bills', 'فواتير وخدمات', '🧾', '#84CC16', true),
  ('cat-health', 'صحة', '🏥', '#EF4444', true),
  ('cat-education', 'تعليم ودورات', '📚', '#F97316', true),
  ('cat-entertainment', 'ترفيه', '🎉', '#8B5CF6', true),
  ('cat-travel', 'سفر', '✈️', '#06B6D4', true),
  ('cat-shopping', 'تسوق عام', '🛍️', '#EC4899', true),
  ('cat-other', 'أخرى', '❓', '#6B7280', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 9. إضافة الفئات الفرعية
-- ============================================
INSERT INTO public.subcategories (id, name, "categoryId")
VALUES
  -- طعام
  ('sub-food-1', 'مطاعم', 'cat-food'),
  ('sub-food-2', 'قهوة ومشروبات', 'cat-food'),
  ('sub-food-3', 'بقالة وسوبرماركت', 'cat-food'),
  ('sub-food-4', 'حلويات ومعجنات', 'cat-food'),
  ('sub-food-5', 'وجبات سريعة', 'cat-food'),
  
  -- مواصلات
  ('sub-transport-1', 'وقود', 'cat-transport'),
  ('sub-transport-2', 'تاكسي وأوبر', 'cat-transport'),
  ('sub-transport-3', 'صيانة السيارة', 'cat-transport'),
  ('sub-transport-4', 'مواقف سيارات', 'cat-transport'),
  
  -- سكن
  ('sub-housing-1', 'إيجار المنزل', 'cat-housing'),
  ('sub-housing-2', 'أثاث ومفروشات', 'cat-housing'),
  ('sub-housing-3', 'صيانة منزل', 'cat-housing'),
  
  -- فواتير
  ('sub-bills-1', 'كهرباء', 'cat-bills'),
  ('sub-bills-2', 'مياه', 'cat-bills'),
  ('sub-bills-3', 'إنترنت واتصالات', 'cat-bills'),
  ('sub-bills-4', 'اشتراكات رقمية', 'cat-bills'),
  
  -- صحة
  ('sub-health-1', 'عيادة ومستشفى', 'cat-health'),
  ('sub-health-2', 'دواء وصيدلية', 'cat-health'),
  ('sub-health-3', 'تحاليل ومختبر', 'cat-health'),
  
  -- تعليم
  ('sub-education-1', 'رسوم دراسية', 'cat-education'),
  ('sub-education-2', 'كتب ومستلزمات', 'cat-education'),
  
  -- ترفيه
  ('sub-entertainment-1', 'سينما ومسرح', 'cat-entertainment'),
  ('sub-entertainment-2', 'ألعاب وهوايات', 'cat-entertainment'),
  ('sub-entertainment-3', 'منتزهات وملاهي', 'cat-entertainment'),
  
  -- سفر
  ('sub-travel-1', 'تذاكر طيران', 'cat-travel'),
  ('sub-travel-2', 'فنادق وإقامة', 'cat-travel'),
  
  -- تسوق
  ('sub-shopping-1', 'ملابس وأزياء', 'cat-shopping'),
  ('sub-shopping-2', 'إلكترونيات', 'cat-shopping'),
  
  -- أخرى
  ('sub-other-1', 'متنوع', 'cat-other')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ✅ اكتمل! الآن جرّب التطبيق
-- ============================================
