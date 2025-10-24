# 🛠️ دليل تثبيت MongoDB محلياً

## 🎯 **نظرة عامة**
هذا الدليل لتثبيت MongoDB محلياً على Windows لتشغيل المشروع بالكامل دون الحاجة لخدمات خارجية.

## 🚀 **الطريقة السريعة (موصى بها)**

### **الخطوة 1: تشغيل سكريپت التثبيت**
```cmd
# انقر بزر الماوس الأيمن على Command Prompt
# واختر "Run as administrator"
install-mongodb-windows.bat
```

### **الخطوة 2: اختبار التثبيت**
```cmd
quick-mongodb-test.bat
```

## 📋 **الطريقة اليدوية**

### **1. تحميل MongoDB**
- اذهب إلى: https://www.mongodb.com/try/download/community
- اختر:
  - **Version:** MongoDB 7.x
  - **OS:** Windows
  - **Package:** MSI

### **2. التثبيت**
1. شغل الملف المحمل كـ Administrator
2. اختر "Complete" installation
3. **مهم:** فعّل "Install MongoDB as a Service"
4. **مهم:** فعّل "Install MongoDB Compass"

### **3. إعداد PATH**
أضف هذا المسار لمتغيرات البيئة:
```
C:\Program Files\MongoDB\Server\7.0\bin
```

### **4. إنشاء مجلد البيانات**
```cmd
mkdir C:\data\db
```

### **5. بدء MongoDB**
```cmd
net start MongoDB
```

## 🧪 **اختبار التثبيت**

### **اختبار أساسي:**
```cmd
mongosh --eval "db.runCommand({connectionStatus : 1})"
```

### **اختبار Node.js:**
```cmd
node test-mongodb-connection.js
```

## 🌱 **إضافة البيانات الأولية**

```cmd
node scripts/seed-mongodb.js
```

## 🎮 **تشغيل المشروع**

```cmd
npm run dev
```

## 🔧 **استكشاف الأخطاء**

### **خطأ: MongoDB لا يبدأ**
```cmd
# تحقق من الخدمة
sc query MongoDB

# أعد تشغيل الخدمة
net stop MongoDB
net start MongoDB
```

### **خطأ: Access denied**
```cmd
# تأكد من تشغيل Command Prompt كـ Administrator
```

### **خطأ: Path not found**
```cmd
# أعد تشغيل Command Prompt بعد التثبيت
```

## 📊 **معلومات النظام**

### **المنافذ:**
- MongoDB: `27017`
- Next.js Dev: `3000`

### **المجلدات المهمة:**
- التثبيت: `C:\Program Files\MongoDB\`
- البيانات: `C:\data\db`
- Logs: `C:\Program Files\MongoDB\Server\7.0\log\`

### **الخدمات:**
- اسم الخدمة: `MongoDB`
- حالة: يجب أن تكون `RUNNING`

## 🛡️ **الأمان**

### **للتطوير المحلي:**
- MongoDB يعمل بدون authentication (آمن محلياً)
- متاح فقط على localhost

### **للإنتاج:**
- استخدم MongoDB Atlas
- فعّل Authentication
- استخدم SSL/TLS

## 🎉 **نصائح مفيدة**

### **MongoDB Compass:**
- واجهة رسومية لإدارة قاعدة البيانات
- اتصل بـ: `mongodb://localhost:27017`

### **أوامر مفيدة:**
```cmd
# عرض قواعد البيانات
mongosh --eval "show dbs"

# الدخول لقاعدة البيانات
mongosh base44_app

# عرض المجموعات
mongosh --eval "use base44_app; show collections"

# عدد الوثائق
mongosh --eval "use base44_app; db.categories.countDocuments()"
```

## 🆘 **الدعم**

إذا واجهت مشاكل:
1. تأكد من تشغيل Command Prompt كـ Administrator
2. أعد تشغيل الحاسوب بعد التثبيت
3. تحقق من Windows Firewall
4. استخدم MongoDB Atlas كبديل سحابي

## ✅ **التحقق من النجاح**

يجب أن ترى:
- ✅ MongoDB service running
- ✅ mongosh يتصل بنجاح
- ✅ Node.js يتصل بـ MongoDB
- ✅ البيانات الأولية تُضاف بنجاح
- ✅ المشروع يعمل على http://localhost:3000

**🎊 مبروك! نظامك جاهز للعمل محلياً!**
