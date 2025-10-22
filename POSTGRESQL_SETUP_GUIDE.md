# دليل تثبيت وإعداد PostgreSQL المحلي

## 📋 نظرة عامة

هذا الدليل يساعدك على تثبيت PostgreSQL محليًا على Windows وإعداد قاعدة البيانات للمشروع.

---

## ⚠️ المشكلة الحالية

```
Error: P1000: Authentication failed against database server
```

**السبب:** بيانات الاتصال في ملف `.env` غير صحيحة أو PostgreSQL غير مثبت.

---

## 🚀 خطوات الحل

### الخطوة 1: تنزيل PostgreSQL

قم بتشغيل:

```bash
install-postgresql.bat
```

هذا الملف سيقوم بـ:
- تنزيل PostgreSQL 16 تلقائيًا
- حفظ الملف باسم `postgresql-installer.exe`

### الخطوة 2: تثبيت PostgreSQL

1. **شغّل الملف:** `postgresql-installer.exe`

2. **أثناء التثبيت:**
   - ✅ اختر كلمة مرور قوية للمستخدم `postgres`
   - ⚠️ **مهم جدًا:** احفظ كلمة المرور - ستحتاجها!
   - المنفذ الافتراضي: `5432` (اتركه كما هو)
   - المسار الافتراضي: `C:\Program Files\PostgreSQL\16`

3. **انتظر حتى يكتمل التثبيت** (قد يستغرق 5-10 دقائق)

### الخطوة 3: إعداد قاعدة البيانات

بعد اكتمال التثبيت، قم بتشغيل:

```bash
configure-postgresql.bat
```

هذا الملف سيقوم بـ:
1. ✅ إنشاء قاعدة بيانات جديدة: `family_finance`
2. ✅ تحديث ملف `.env` بالبيانات الصحيحة
3. ✅ تشغيل Prisma migrations
4. ✅ إنشاء الجداول المطلوبة

**ملاحظة:** سيطلب منك كلمة المرور التي اخترتها في الخطوة 2

### الخطوة 4: اختبار الاتصال

```bash
node test-database.js
```

إذا ظهرت رسالة "✓ تم الاتصال بقاعدة البيانات بنجاح" - كل شيء يعمل! 🎉

---

## 📝 ملف .env الجديد

بعد تشغيل `configure-postgresql.bat`، سيتم تحديث `.env` ليصبح:

```env
# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/family_finance"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# Google OAuth (أضف بياناتك هنا)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🔧 حل المشاكل الشائعة

### المشكلة 1: "psql.exe not found"

**الحل:**
```bash
# تأكد من مسار التثبيت
dir "C:\Program Files\PostgreSQL\16\bin\psql.exe"
```

إذا كان المسار مختلفًا، عدّل في `configure-postgresql.bat`

### المشكلة 2: "database already exists"

**الحل:**
```bash
# احذف القاعدة القديمة أولاً
psql -U postgres -c "DROP DATABASE IF EXISTS family_finance;"
# ثم شغّل configure-postgresql.bat مرة أخرى
```

### المشكلة 3: "password authentication failed"

**الحل:**
- تأكد من كتابة كلمة المرور الصحيحة
- لا تستخدم مسافات في كلمة المرور
- جرّب إعادة تشغيل `configure-postgresql.bat`

---

## ✅ التحقق من نجاح الإعداد

بعد اكتمال جميع الخطوات:

1. ✅ PostgreSQL مثبت ويعمل
2. ✅ قاعدة البيانات `family_finance` موجودة
3. ✅ ملف `.env` محدّث
4. ✅ Prisma schema منشور
5. ✅ الجداول تم إنشاؤها

---

## 🎯 الخطوة التالية

شغّل المشروع:

```bash
npm run dev
```

افتح المتصفح على: http://localhost:3000

---

## 📞 المساعدة

إذا واجهت أي مشاكل:

1. تأكد من تشغيل PostgreSQL Service:
   ```bash
   services.msc
   # ابحث عن: postgresql-x64-16
   ```

2. راجع ملف `.env` وتأكد من صحة البيانات

3. جرّب إعادة تشغيل الكمبيوتر

---

## 🔐 ملاحظات أمنية

⚠️ **مهم:**
- لا تشارك كلمة مرور `postgres` مع أحد
- غيّر `NEXTAUTH_SECRET` في الإنتاج
- لا تضف ملف `.env` إلى Git

---

تم إنشاء هذا الدليل بواسطة: Abdullah Alawiss
التاريخ: 2025-01-21
