# 📊 معلومات الاتصال بقاعدة البيانات Supabase

## 🔍 البيانات المستخدمة حالياً في `.env`:

### 1️⃣ **Project Reference ID**
```
mmvqjrmkukrmjzakhfrw
```

### 2️⃣ **Database Host**
```
db.mmvqjrmkukrmjzakhfrw.supabase.co
```

### 3️⃣ **Database Password**
```
bbRSfB6LHcFkgswO
```

### 4️⃣ **Ports المستخدمة**
- **Port 6543** → Connection Pooler (للعمليات العادية)
- **Port 5432** → Direct Connection (للـ Migrations)

### 5️⃣ **Database Name**
```
postgres
```

### 6️⃣ **Username**
```
postgres
```

---

## 📝 الـ Connection Strings الكاملة:

### DATABASE_URL (Connection Pooling):
```
postgresql://postgres:bbRSfB6LHcFkgswO@db.mmvqjrmkukrmjzakhfrw.supabase.co:6543/postgres?pgbouncer=true
```

**تفصيل:**
- Protocol: `postgresql://`
- Username: `postgres`
- Password: `bbRSfB6LHcFkgswO`
- Host: `db.mmvqjrmkukrmjzakhfrw.supabase.co`
- Port: `6543`
- Database: `postgres`
- Options: `?pgbouncer=true`

---

### DIRECT_URL (Direct Connection):
```
postgresql://postgres:bbRSfB6LHcFkgswO@db.mmvqjrmkukrmjzakhfrw.supabase.co:5432/postgres
```

**تفصيل:**
- Protocol: `postgresql://`
- Username: `postgres`
- Password: `bbRSfB6LHcFkgswO`
- Host: `db.mmvqjrmkukrmjzakhfrw.supabase.co`
- Port: `5432`
- Database: `postgres`

---

## 🌐 Supabase API URLs:

### Project URL:
```
https://mmvqjrmkukrmjzakhfrw.supabase.co
```

### ANON Key (Public):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFqcm1rdWtybWp6YWtoZnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzkxNjksImV4cCI6MjA3NjY1NTE2OX0.N8QShS_v2NC58998Ijo856H-iJSYlSbczAuFyABbh-I
```

### SERVICE_ROLE Key (Secret):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFqcm1rdWtybWp6YWtoZnJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTA3OTE2OSwiZXhwIjoyMDc2NjU1MTY5fQ.PMN44CnUAJ68pdTaBHOuT5OauYPG1QQpzG5oq8wdpfU
```

---

## ✅ كيف تتحقق من صحة المعلومات:

### 1. افتح Supabase Dashboard:
```
https://supabase.com/dashboard/project/mmvqjrmkukrmjzakhfrw
```

### 2. اذهب إلى: Settings → Database

### 3. تحقق من:

#### Connection String:
يجب أن يكون مشابهاً لـ:
```
postgresql://postgres:[YOUR-PASSWORD]@db.mmvqjrmkukrmjzakhfrw.supabase.co:5432/postgres
```

#### Connection Pooling:
يجب أن يكون مشابهاً لـ:
```
postgresql://postgres:[YOUR-PASSWORD]@db.mmvqjrmkukrmjzakhfrw.supabase.co:6543/postgres
```

---

## 🔐 الـ API Keys:

### في: Settings → API

**Project URL:**
```
https://mmvqjrmkukrmjzakhfrw.supabase.co
```

**anon/public key:**
يبدأ بـ: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFq...`

**service_role key:**
يبدأ بـ: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFq...`

---

## ⚠️ إذا كانت المعلومات مختلفة:

### إذا كان Password مختلف:
1. اذهب إلى: Settings → Database
2. انسخ الـ Password الصحيح
3. حدّث ملف `.env`

### إذا كان Project Reference مختلف:
1. تحقق من URL في المتصفح عند فتح Dashboard
2. يجب أن يكون: `supabase.com/dashboard/project/[YOUR-REF]`
3. حدّث جميع الروابط

---

## 🧪 اختبار سريع:

### Test 1: Ping the Host
```bash
ping db.mmvqjrmkukrmjzakhfrw.supabase.co
```
**يجب أن يرد** إذا كان Host صحيح

### Test 2: Check Port
```bash
telnet db.mmvqjrmkukrmjzakhfrw.supabase.co 5432
```
**يجب أن يتصل** إذا كان Port مفتوح

### Test 3: Test Connection with psql
```bash
psql "postgresql://postgres:bbRSfB6LHcFkgswO@db.mmvqjrmkukrmjzakhfrw.supabase.co:5432/postgres"
```
**يجب أن يدخل** إلى PostgreSQL console

---

## 📞 للتواصل مع الدعم:

إذا كانت جميع المعلومات صحيحة ولا زال الاتصال يفشل:
- تواصل مع Supabase Support
- تحقق من حالة المشروع (Active/Paused)
- تحقق من Firewall Settings في Supabase

**Dashboard Link:**
https://supabase.com/dashboard/project/mmvqjrmkukrmjzakhfrw/settings/database
