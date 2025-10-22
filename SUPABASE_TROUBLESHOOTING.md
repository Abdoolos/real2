# 🔴 حل مشكلة: Can't reach database server

## المشكلة
```
Error: P1001: Can't reach database server at `db.mmvqjrmkukrmjzakhfrw.supabase.co:5432`
```

---

## ✅ الحلول المقترحة (بالترتيب)

### 1️⃣ تحقق من حالة المشروع في Supabase

#### الخطوات:
1. اذهب إلى: https://supabase.com/dashboard
2. ابحث عن مشروعك (mmvqjrmkukrmjzakhfrw)
3. **تحقق من حالة المشروع**:
   - ✅ يجب أن يكون **Active** (أخضر)
   - ❌ إذا كان **Paused** (موقوف) → اضغط على **Resume** لتفعيله
   - ❌ إذا كان **Inactive** → قد تحتاج لترقية الخطة

#### إذا كان المشروع موقوفاً:
```
المشاريع المجانية تتوقف تلقائياً بعد فترة من عدم الاستخدام.
المشاريع المدفوعة يجب أن تبقى نشطة دائماً.
```

---

### 2️⃣ تحقق من إعدادات الأمان (IP Whitelist)

#### الخطوات:
1. في Supabase Dashboard → اختر مشروعك
2. Settings → Database
3. **Connection pooling** → انزل للأسفل
4. ابحث عن **Restrict connections by IP**

#### الحل:
- **الخيار الأفضل**: اختر **Allow all IP addresses** (مؤقتاً للاختبار)
- **أو**: أضف IP الخاص بك يدوياً

#### كيف تعرف IP الخاص بك؟
- اذهب إلى: https://whatismyipaddress.com/
- انسخ الـ IPv4 Address
- أضفه في Supabase

---

### 3️⃣ تحقق من كلمة المرور

#### المشكلة المحتملة:
كلمة المرور قد تكون:
- ❌ خاطئة
- ❌ تحتوي على مسافات زائدة
- ❌ تحتوي على حروف خاصة غير مُشفَّرة

#### الحل:
1. اذهب إلى: Settings → Database
2. اضغط على **Reset Database Password**
3. انسخ كلمة المرور الجديدة **بدقة**
4. حدّث ملف `.env`

---

### 4️⃣ تحقق من نوع المشروع (Region)

#### الخطوات:
1. Settings → General
2. ابحث عن **Region**
3. تأكد أن المنطقة صحيحة في Connection String

#### مثال:
```
إذا كانت المنطقة: eu-central-1
يجب أن يكون Connection String:
postgresql://postgres:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

---

### 5️⃣ اختبر الاتصال من Supabase نفسه

#### الخطوات:
1. اذهب إلى: SQL Editor في Supabase Dashboard
2. جرب تشغيل:
```sql
SELECT 1;
```

#### إذا نجح:
- ✅ قاعدة البيانات تعمل
- المشكلة في Connection String أو الشبكة

#### إذا فشل:
- ❌ المشروع قد يكون معطل أو محذوف

---

### 6️⃣ جرب Connection String بديل

بدلاً من الاتصال المباشر، جرب Transaction Mode:

#### حدّث `.env`:
```env
DATABASE_URL="postgresql://postgres:bbRSfB6LHcFkgswO@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"

DIRECT_URL="postgresql://postgres:bbRSfB6LHcFkgswO@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

---

### 7️⃣ تحقق من Firewall/Antivirus

#### المشكلة:
Firewall قد يمنع الاتصال بـ Port 5432 أو 6543

#### الحل:
1. أوقف Firewall/Antivirus مؤقتاً
2. جرب الاتصال مرة أخرى
3. إذا نجح → أضف exception للبورتات

---

## 🔍 معلومات تشخيصية

### Connection Strings الحالية:
```
DATABASE_URL (Pooling):
postgres://postgres:bbRSfB6LHcFkgswO@db.mmvqjrmkukrmjzakhfrw.supabase.co:6543/postgres

DIRECT_URL (Migrations):
postgresql://postgres:bbRSfB6LHcFkgswO@db.mmvqjrmkukrmjzakhfrw.supabase.co:5432/postgres
```

### معلومات المشروع:
- **Project Ref**: mmvqjrmkukrmjzakhfrw
- **Host**: db.mmvqjrmkukrmjzakhfrw.supabase.co
- **Ports**: 5432 (Direct), 6543 (Pooling)

---

## 📋 Checklist للتحقق

قبل التواصل مع الدعم، تأكد من:

- [ ] المشروع **نشط** (Active) في Supabase Dashboard
- [ ] **Allow all IP addresses** مُفعّل
- [ ] كلمة المرور **صحيحة 100%**
- [ ] الاشتراك المدفوع **نشط**
- [ ] لا يوجد Firewall يمنع الاتصال
- [ ] جربت الاتصال من SQL Editor في Supabase (نجح)

---

## 🎯 الخطوة التالية الموصى بها

### الحل الأكثر احتمالاً:

**المشروع موقوف (Paused)** - وهذا أشهر سبب للخطأ P1001

#### الحل:
1. اذهب إلى Supabase Dashboard
2. ابحث عن مشروعك
3. إذا وجدت زر **Resume** أو **Restore** → اضغط عليه
4. انتظر حتى يصبح المشروع Active (قد يستغرق دقيقة)
5. جرب الاتصال مرة أخرى

---

## 📞 إذا لم تنجح جميع الحلول

أعطني المعلومات التالية:

1. **حالة المشروع** في Dashboard (Active/Paused/Inactive)
2. **هل IP مسموح؟** (Allow all IPs enabled?)
3. **هل SQL Editor يعمل؟** (Can you run SELECT 1?)
4. **هل الاشتراك المدفوع نشط؟**
5. **Screenshot** من صفحة Settings → Database

---

**تم التحديث:** 2025-10-22
