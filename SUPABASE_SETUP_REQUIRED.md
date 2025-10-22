# 🚨 المشكلة: الجداول غير موجودة في Supabase

## التشخيص

```
Could not find the table 'public.expenses' in the schema cache
```

**السبب:** قاعدة البيانات Supabase **فارغة تماماً** - لا توجد جداول!

---

## ✅ الحل السريع: تطبيق Prisma Migrations

### الخطوة 1: تشغيل Migration Script

```bash
# في PowerShell
.\setup-supabase-database.bat
```

أو يدوياً:

```bash
npx prisma db push --accept-data-loss
```

### الخطوة 2: إعادة تشغيل السيرفر

```bash
npm run dev
```

---

## 🔧 إذا فشل Migration (Port 5432 مغلق)

### الحل البديل: SQL Script يدوي

1. افتح Supabase Dashboard:
   ```
   https://supabase.com/dashboard/project/gsbdlsehmmdjfvkaphdy/editor
   ```

2. اذهب إلى **SQL Editor**

3. الصق هذا الكود وشغّله:

```sql
-- إنشاء جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
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

-- إنشاء جدول الفئات
CREATE TABLE IF NOT EXISTS categories (
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

-- إنشاء جدول الفئات الفرعية
CREATE TABLE IF NOT EXISTS subcategories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

-- إنشاء جدول المصاريف
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  amount DECIMAL NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  subcategory_id TEXT REFERENCES subcategories(id) ON DELETE SET NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  family_id TEXT,
  bill_id TEXT,
  currency TEXT DEFAULT 'SAR',
  amount_in_sar DECIMAL,
  exchange_rate DECIMAL,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- إضافة indexes
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category_id ON expenses(category_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON subcategories(category_id);

-- Enable Row Level Security
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- إنشاء policies للوصول
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can read all categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Users can read all subcategories" ON subcategories
  FOR SELECT USING (true);

CREATE POLICY "Users can read their own expenses" ON expenses
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own expenses" ON expenses
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own expenses" ON expenses
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own expenses" ON expenses
  FOR DELETE USING (auth.uid()::text = user_id);
```

---

## 🌱 الخطوة التالية: إضافة البيانات الأساسية

بعد إنشاء الجداول، شغّل:

```bash
node seed-categories-subcategories.js
```

---

## ✅ التحقق من النجاح

```bash
# في PowerShell
$headers = @{
  "apikey" = "your-anon-key"
  "Authorization" = "Bearer your-anon-key"
}

Invoke-WebRequest -Uri "https://gsbdlsehmmdjfvkaphdy.supabase.co/rest/v1/categories?limit=1" -Headers $headers
```

يجب أن ترى: `Status Code: 200 OK`

---

## 📊 الخلاصة

**المشكلة:** Supabase فارغ تماماً (لا جداول)

**الحل:**
1. ✅ تطبيق migrations (إذا Port 5432 مفتوح)
2. ✅ SQL Script يدوي (إذا Port 5432 مغلق) ← **موصى به**

**الوقت:** 5-10 دقائق
