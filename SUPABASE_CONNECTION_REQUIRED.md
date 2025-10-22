# ⚠️ معلومات اتصال Supabase المطلوبة

## 🔴 المشكلة الحالية

لم نتمكن من الاتصال بقاعدة البيانات Supabase. هذا يعني أن معلومات الاتصال قد تكون غير صحيحة أو أن المشروع غير مُفعّل بشكل صحيح.

---

## ✅ الحل: الحصول على معلومات الاتصال الصحيحة

### الخطوة 1: الدخول إلى Supabase Dashboard

1. اذهب إلى: https://supabase.com/dashboard
2. سجل الدخول بحسابك
3. اختر المشروع الذي تريد استخدامه (mmvqjrmkukrmjzakhfrw)

### الخطوة 2: الحصول على Connection String

من Dashboard، اتبع هذه الخطوات:

1. من القائمة الجانبية، اضغط على **Settings** (الإعدادات)
2. اضغط على **Database**
3. ابحث عن قسم **Connection String**

### الخطوة 3: نسخ Connection Strings

ستجد نوعين من Connection Strings:

#### أ) Connection Pooling (للاستخدام العادي)

انسخ النص الذي يبدأ بـ:
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

#### ب) Direct Connection (للـ Migrations)

انسخ النص الذي يبدأ بـ:
```
postgresql://postgres.[project-ref]:[password]@db.[project-ref].supabase.co:5432/postgres
```

---

## 🔍 معلومات إضافية قد تحتاجها

### Project Reference ID
يمكنك إيجاده في:
- URL المشروع: `https://supabase.com/dashboard/project/[project-ref]`
- Settings → General → Reference ID

### Database Password
إذا نسيت كلمة المرور:
1. اذهب إلى Settings → Database
2. اضغط على **Reset Database Password**
3. انسخ كلمة المرور الجديدة (احفظها في مكان آمن!)

### Region
المنطقة التي تم إنشاء المشروع فيها (مثل: eu-central-1, us-east-1, إلخ)

---

## 📋 المعلومات المطلوبة حالياً

أرجو تزويدي بالمعلومات التالية من Supabase Dashboard:

### 1. Connection Pooling String
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### 2. Direct Connection String
```
postgresql://postgres.[project-ref]:[password]@db.[project-ref].supabase.co:5432/postgres
```

### 3. Project Details
- **Project Reference ID**: ؟
- **Region**: ؟
- **Database Password**: ؟

---

## 🔧 خطوات بديلة

إذا لم تتمكن من الحصول على Connection Strings:

### الطريقة البديلة: استخدام المعلومات يدوياً

من Settings → Database، احصل على:

1. **Host**: `db.[project-ref].supabase.co`
2. **Port**: `5432` (Direct) أو `6543` (Pooling)
3. **Database name**: `postgres`
4. **Username**: `postgres.[project-ref]`
5. **Password**: كلمة مرور قاعدة البيانات

ثم قم بتركيب Connection String بهذا الشكل:
```
postgresql://[username]:[password]@[host]:[port]/[database]
```

---

## ⚠️ ملاحظات مهمة

### تأكد من:
1. ✅ أن المشروع مُفعّل ويعمل
2. ✅ أن الاشتراك المدفوع نشط
3. ✅ أن IP الخاص بك مسموح (أو السماح لكل IPs)
4. ✅ أن كلمة المرور صحيحة (بدون مسافات زائدة)

### إعدادات الأمان:
في Settings → Database → Connection pooling:
- تأكد أن **Allow connections from all IP addresses** مُفعّل
- أو أضف IP الخاص بك يدوياً

---

## 🎯 الخطوات التالية

بمجرد حصولك على المعلومات الصحيحة:

1. قم بتحديث ملف `.env` بالمعلومات الجديدة
2. شغل: `.\setup-supabase-postgresql.bat`
3. اختبر الاتصال: `node test-supabase-connection.js`
4. شغل المشروع: `npm run dev`

---

## 📞 إذا احتجت مساعدة

- راجع Supabase Documentation: https://supabase.com/docs
- تأكد من أن جميع الخطوات أعلاه مُنفّذة بشكل صحيح
- تحقق من logs في Supabase Dashboard

---

**آخر تحديث:** 2025-10-22
