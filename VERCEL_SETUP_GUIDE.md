# 🚀 دليل إعداد Vercel للمصادقة بـ Google

## ✅ الوضع الحالي
- ✅ NextAuth مُعد بالطريقة الصحيحة
- ✅ جميع الملفات محدثة ومرفوعة على GitHub
- ⚠️ **المتبقي:** تحديث المتغيرات البيئية على Vercel فقط

---

## 📋 الخطوات المطلوبة (5 دقائق)

### 1️⃣ **الدخول إلى Vercel Dashboard**

اذهب إلى: https://vercel.com/dashboard

### 2️⃣ **اختيار المشروع**

- انقر على مشروع `real2` أو المشروع المرتبط بـ GitHub repo: `Abdoolos/real2`

### 3️⃣ **الذهاب إلى الإعدادات**

- انقر على **Settings** (الترس في الأعلى)
- من القائمة الجانبية، انقر على **Environment Variables**

---

## 🔧 المتغيرات المطلوبة

### ❌ **احذف أو عدّل المتغيرات القديمة:**

إذا وجدت هذه المتغيرات، **احذفها** أو **عدّلها**:
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` ❌ (اسم خاطئ - احذفه)

---

### ✅ **أضف أو تأكد من المتغيرات الصحيحة:**

#### **1. GOOGLE_CLIENT_ID**
```
[انسخ من ملف .env المحلي]
```
- **Environment:** Production, Preview, Development (اختر الكل)
- 📝 **القيمة موجودة في:** ملف `.env` المحلي لديك

#### **2. GOOGLE_CLIENT_SECRET**
```
[انسخ من ملف .env المحلي]
```
- **Environment:** Production, Preview, Development (اختر الكل)

#### **3. NEXTAUTH_URL**
```
https://real2-5rom.vercel.app
```
- **Environment:** Production فقط

للـ Preview و Development، استخدم:
```
http://localhost:3000
```

#### **4. NEXTAUTH_SECRET**
```
[انسخ من ملف .env المحلي]
```
- **Environment:** Production, Preview, Development (اختر الكل)

#### **5. DATABASE_URL** (تأكد من وجوده)
```
[انسخ من ملف .env المحلي]
```
- **Environment:** Production, Preview, Development (اختر الكل)

#### **6. NEXT_PUBLIC_SUPABASE_URL** (تأكد من وجوده)
```
https://bbyiysbsznalhortlaki.supabase.co
```
- **Environment:** Production, Preview, Development (اختر الكل)

#### **7. NEXT_PUBLIC_SUPABASE_ANON_KEY** (تأكد من وجوده)
```
[انسخ من ملف .env المحلي]
```
- **Environment:** Production, Preview, Development (اختر الكل)

---

## 🎬 **4️⃣ إعادة النشر (Redeploy)**

بعد تحديث المتغيرات:

1. اذهب إلى **Deployments**
2. انقر على **...** (النقاط الثلاث) بجانب آخر deployment
3. اختر **Redeploy**
4. ✅ انتظر حتى ينتهي (2-3 دقائق)

---

## 🧪 **5️⃣ الاختبار**

### **اختبار محلياً أولاً:**

```bash
npm run dev
```

ثم افتح: http://localhost:3000/auth/signin

**اختبر:**
- ✅ تسجيل دخول بـ Google
- ✅ إنشاء حساب جديد
- ✅ تسجيل خروج

### **اختبار على Production:**

افتح: https://real2-5rom.vercel.app/auth/signin

**اختبر:**
- ✅ تسجيل دخول بـ Google
- ✅ التأكد من حفظ بيانات المستخدم
- ✅ التنقل بين الصفحات

---

## 🔍 **استكشاف الأخطاء**

### **مشكلة: "Configuration Error"**

**الحل:**
1. تأكد من أن `GOOGLE_CLIENT_ID` (بدون `NEXT_PUBLIC_`)
2. تأكد من أن `NEXTAUTH_SECRET` موجود
3. Redeploy مرة أخرى

### **مشكلة: "Access Denied"**

**الحل:**
1. اذهب إلى Google Cloud Console: https://console.cloud.google.com
2. اختر المشروع الصحيح
3. اذهب إلى **APIs & Services** > **Credentials**
4. تأكد من أن Redirect URIs يحتوي على:
   ```
   https://real2-5rom.vercel.app/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```

### **مشكلة: "Invalid Client ID"**

**الحل:**
1. تأكد من نسخ Client ID كاملاً (بدون مسافات في البداية/النهاية)
2. تأكد من استخدام `GOOGLE_CLIENT_ID` وليس `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

---

## ✅ **قائمة التحقق النهائية**

- [ ] حذفت `NEXT_PUBLIC_GOOGLE_CLIENT_ID` من Vercel
- [ ] أضفت `GOOGLE_CLIENT_ID` الجديد
- [ ] أضفت `GOOGLE_CLIENT_SECRET`
- [ ] أضفت `NEXTAUTH_URL` (للـ Production)
- [ ] أضفت `NEXTAUTH_SECRET`
- [ ] تأكدت من `DATABASE_URL`
- [ ] تأكدت من `NEXT_PUBLIC_SUPABASE_URL`
- [ ] تأكدت من `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] عملت Redeploy
- [ ] اختبرت على localhost
- [ ] اختبرت على Production

---

## 🎉 **انتهيت؟**

**مبروك! المصادقة جاهزة الآن! 🚀**

---

## 📞 **الدعم**

إذا واجهت أي مشكلة:
1. تحقق من Vercel Logs: **Deployments** > اختر آخر deployment > **View Logs**
2. تحقق من Browser Console (F12)
3. تأكد من Google Cloud Console settings

---

## 📚 **ملفات ذات صلة:**

- `app/api/auth/[...nextauth]/route.ts` - إعدادات NextAuth
- `app/auth/signin/page.jsx` - صفحة تسجيل الدخول
- `.env` - للتطوير المحلي (لا يُرفع على GitHub)
- `.env.production` - للإنتاج (لا يُرفع على GitHub - محمي)

---

**آخر تحديث:** 15 أكتوبر 2025  
**الإصدار:** 2.0 (بعد إعادة الهيكلة لـ GoogleProvider)
