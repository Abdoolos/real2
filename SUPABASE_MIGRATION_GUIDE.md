# 🚀 دليل الانتقال إلى Supabase PostgreSQL

## 📋 نظرة عامة

تم تحديث المشروع للعمل مع **Supabase PostgreSQL** بدلاً من SQLite المحلية. هذا الدليل يشرح كل شيء تحتاج معرفته.

---

## ✅ ما تم تنفيذه

### 1. تحديث ملف `.env`
- ✅ إضافة `DATABASE_URL` لـ Connection Pooling
- ✅ إضافة `DIRECT_URL` للـ Migrations
- ✅ تفعيل متغيرات Supabase API
- ✅ تعطيل SQLite المحلية

### 2. تحديث `prisma/schema.prisma`
- ✅ تغيير Provider من `sqlite` إلى `postgresql`
- ✅ إضافة `directUrl` للـ datasource
- ✅ جميع Models متوافقة مع PostgreSQL

### 3. ملفات الإعداد
- ✅ `setup-supabase-postgresql.bat` - سكريبت الإعداد الآلي
- ✅ `test-supabase-connection.js` - سكريبت اختبار الاتصال

---

## 🎯 خطوات التشغيل (مطلوبة!)

### الخطوة 1: تشغيل سكريبت الإعداد

قم بتشغيل الأمر التالي:

```bash
setup-supabase-postgresql.bat
```

**ماذا يفعل هذا السكريبت؟**
1. حذف Prisma Client القديم (SQLite)
2. حذف migrations القديمة
3. إنشاء migration جديد للـ PostgreSQL
4. تحديث Prisma Client
5. إنشاء جميع الجداول في Supabase

### الخطوة 2: اختبار الاتصال

بعد نجاح الإعداد، قم باختبار الاتصال:

```bash
node test-supabase-connection.js
```

**ماذا يختبر؟**
- ✅ الاتصال بقاعدة البيانات
- ✅ تنفيذ استعلامات
- ✅ فحص الجداول المُنشأة
- ✅ عد السجلات

### الخطوة 3: تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: `http://localhost:3000`

---

## 🗄️ معلومات قاعدة البيانات

### Connection Strings

**للاستخدام العادي (Connection Pooling):**
```
postgresql://postgres.mmvqjrmkukrmjzakhfrw:bbRSfB6LHcFkgswO@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**للـ Migrations (Direct Connection):**
```
postgresql://postgres.mmvqjrmkukrmjzakhfrw:bbRSfB6LHcFkgswO@db.mmvqjrmkukrmjzakhfrw.supabase.co:5432/postgres
```

### Supabase Dashboard

يمكنك الوصول إلى لوحة التحكم:
- URL: https://gsbdlsehmmdjfvkaphdy.supabase.co
- Project: mmvqjrmkukrmjzakhfrw

---

## 📊 الجداول المُنشأة

سيتم إنشاء الجداول التالية في Supabase:

1. **users** - المستخدمين
2. **accounts** - حسابات OAuth
3. **sessions** - جلسات NextAuth
4. **verification_tokens** - رموز التحقق
5. **families** - العائلات
6. **family_members** - أعضاء العائلات
7. **categories** - التصنيفات
8. **subcategories** - التصنيفات الفرعية
9. **incomes** - الدخل
10. **expenses** - المصروفات
11. **budgets** - الميزانيات
12. **category_budgets** - ميزانيات التصنيفات
13. **events** - المناسبات
14. **bills** - الفواتير
15. **bill_participants** - المشاركين في الفواتير
16. **subscriptions** - الاشتراكات
17. **stripe_event_logs** - سجلات Stripe
18. **advices** - النصائح
19. **forecasts** - التوقعات

---

## 🔧 أوامر مفيدة

### Prisma Studio
لفتح واجهة رسومية لإدارة قاعدة البيانات:
```bash
npx prisma studio
```

### إنشاء Migration جديد
إذا قمت بتعديل Schema:
```bash
npx prisma migrate dev --name description_of_changes
```

### تحديث Prisma Client
بعد تعديل Schema:
```bash
npx prisma generate
```

### Push Schema (للتطوير السريع)
بدون إنشاء migration:
```bash
npx prisma db push
```

### إعادة تعيين قاعدة البيانات (خطر!)
حذف جميع البيانات:
```bash
npx prisma migrate reset
```

---

## 🌱 إضافة بيانات تجريبية

لإضافة تصنيفات وبيانات أولية:

```bash
node prisma/seed.js
```

---

## 🐛 حل المشاكل الشائعة

### خطأ: "Authentication failed"
**الحل:**
1. تأكد من صحة كلمة المرور في `.env`
2. تحقق من Connection String
3. تأكد من أن IP الخاص بك مسموح في Supabase

### خطأ: "Can't reach database server"
**الحل:**
1. تحقق من اتصالك بالإنترنت
2. تأكد من أن Supabase يعمل
3. جرب استخدام DIRECT_URL بدلاً من DATABASE_URL

### خطأ: "Table does not exist"
**الحل:**
```bash
# أعد تشغيل سكريبت الإعداد
setup-supabase-postgresql.bat
```

### خطأ: "Prisma Client is not configured"
**الحل:**
```bash
# أعد إنشاء Prisma Client
npx prisma generate
```

---

## 🔐 الأمان

### لا تشارك أبداً:
- ❌ `DIRECT_URL` أو `DATABASE_URL`
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ كلمات المرور

### يمكن مشاركة:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📈 الخطوات التالية

بعد إتمام الإعداد:

1. ✅ اختبر تسجيل الدخول
2. ✅ أضف مصروف تجريبي
3. ✅ تأكد من حفظ البيانات
4. ✅ افتح Prisma Studio وتحقق من البيانات
5. ✅ اختبر جميع الصفحات

---

## 🎉 النتيجة

الآن لديك:
- ✅ قاعدة بيانات سحابية (Supabase)
- ✅ نسخ احتياطي تلقائي
- ✅ قابلية للتوسع
- ✅ أداء أفضل
- ✅ جاهز للإنتاج (Production)

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع قسم "حل المشاكل الشائعة" أعلاه
2. شغل `test-supabase-connection.js` للتشخيص
3. تحقق من logs في Supabase Dashboard

---

**تم بواسطة:** Abdullah Alawiss (Cline AI Assistant)
**التاريخ:** 2025-10-22
