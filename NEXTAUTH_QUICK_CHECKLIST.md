# ✅ Checklist: إكمال إعداد NextAuth (7 دقائق)

## 📋 المتغيرات المطلوبة

افتح ملف `.env` وأضف هذه السطور:

```env
# 1️⃣ إضافة NEXTAUTH_URL
NEXTAUTH_URL=http://localhost:3000

# 2️⃣ إضافة NEXTAUTH_SECRET (المفتاح الذي تم توليده)
NEXTAUTH_SECRET=5VnvOxQpuBWrNGJNOAjsNJV22USjq1GKZVUwjrcXeus=

# 3️⃣ إضافة GOOGLE_CLIENT_SECRET (احصل عليه من Google Console)
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
```

---

## 🔑 كيفية الحصول على GOOGLE_CLIENT_SECRET

### الخطوات:

1. **افتح** [Google Cloud Console](https://console.cloud.google.com/)

2. **اختر** المشروع الحالي (أو أنشئ واحد جديد)

3. **اذهب إلى:**
   ```
   القائمة الجانبية > APIs & Services > Credentials
   ```

4. **ابحث عن** OAuth 2.0 Client ID الموجود

5. **انقر عليه** لفتح التفاصيل

6. **انسخ** Client Secret (سيكون بهذا الشكل: `GOCSPX-xxxxxxxxxxxx`)

7. **الصقه** في `.env`

---

## 🧪 الاختبار

### 1. أوقف السيرفر

```powershell
taskkill /F /IM node.exe
```

### 2. شغّل السيرفر

```powershell
npm run dev
```

### 3. افتح المتصفح

```
http://localhost:3000/auth/signin
```

### 4. انقر "تسجيل الدخول بواسطة Google"

**المتوقع:**
- ✅ فتح نافذة Google
- ✅ اختيار الحساب
- ✅ الموافقة على الصلاحيات
- ✅ التوجيه إلى `/dashboard`

---

## ⚠️ إذا واجهت مشكلة

### المشكلة: "Configuration Error"

**الحل:**
1. تأكد أن جميع المتغيرات موجودة في `.env`
2. تأكد من عدم وجود مسافات إضافية
3. أعد تشغيل السيرفر

### المشكلة: "Invalid Client Secret"

**الحل:**
1. تأكد أن `GOOGLE_CLIENT_SECRET` صحيح
2. تأكد أنه يبدأ بـ `GOCSPX-`
3. انسخه مباشرة من Google Console

### المشكلة: "Redirect URI Mismatch"

**الحل:**
في Google Console، أضف هذا الـ URI:
```
http://localhost:3000/api/auth/callback/google
```

---

## ✅ علامات النجاح

- [ ] السيرفر يعمل بدون أخطاء
- [ ] صفحة `/auth/signin` تفتح
- [ ] زر Google OAuth يعمل
- [ ] التوجيه إلى Dashboard ينجح
- [ ] Session تظهر في DevTools

---

## 📚 الملفات المرجعية

- 📄 **التقرير الكامل:** `NEXTAUTH_AUDIT_REPORT.md`
- 📄 **الملخص النهائي:** `NEXTAUTH_FINAL_SUMMARY.md`
- 📄 **ملف المثال:** `.env.example`

---

**🎯 بعد إتمام هذه الخطوات، NextAuth سيكون جاهز 100% للإنتاج!**
