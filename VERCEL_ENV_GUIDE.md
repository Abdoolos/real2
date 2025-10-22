# 🚀 دليل إعداد Environment Variables في Vercel

## 📋 المتغيرات المطلوبة:

### 1️⃣ **قاعدة البيانات - Supabase PostgreSQL**

```bash
DATABASE_URL=postgresql://postgres.mmvqjrmkukrmjzakhfrw:bbRSfB6LHcFkgswO@aws-0-us-east-2.pooler.supabase.com:6543/postgres

DIRECT_URL=postgresql://postgres.mmvqjrmkukrmjzakhfrw:bbRSfB6LHcFkgswO@aws-0-us-east-2.pooler.supabase.com:5432/postgres
```

### 2️⃣ **Supabase API Keys**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mmvqjrmkukrmjzakhfrw.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFqcm1rdWtybWp6YWtoZnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzkxNjksImV4cCI6MjA3NjY1NTE2OX0.N8QShS_v2NC58998Ijo856H-iJSYlSbczAuFyABbh-I

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFqcm1rdWtybWp6YWtoZnJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTA3OTE2OSwiZXhwIjoyMDc2NjU1MTY5fQ.PMN44CnUAJ68pdTaBHOuT5OauYPG1QQpzG5oq8wdpfU
```

### 3️⃣ **NextAuth Configuration**

```bash
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=generate-a-random-secret-key-here
```

💡 **لتوليد NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4️⃣ **Google OAuth** (من Google Cloud Console)

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 5️⃣ **إعدادات إضافية**

```bash
NODE_ENV=production
APP_BASE_URL=https://your-project.vercel.app
```

---

## 📝 **خطوات الإعداد في Vercel:**

1. **افتح مشروعك في Vercel Dashboard**
2. **اذهب إلى:** Settings → Environment Variables
3. **أضف كل متغير** باستخدام القيم أعلاه
4. **اختر Environment:** Production
5. **اضغط Save**
6. **Redeploy المشروع**

---

## ✅ **ملاحظات مهمة:**

- ✅ جميع الجداول منشأة في Supabase (19 جدول)
- ✅ Schema محدّث لـ PostgreSQL
- ✅ Connection strings جاهزة
- ⚠️ تذكر تحديث `NEXTAUTH_URL` بعد Deploy
- ⚠️ تذكر تحديث Google OAuth redirect URIs

---

## 🎯 **النتيجة المتوقعة:**

بعد إضافة جميع المتغيرات، المشروع سيعمل 100% على Vercel! 🎉
