@echo off
echo ================================
echo     تثبيت MongoDB البديل
echo ================================
echo.

echo هناك طرق عديدة لتثبيت MongoDB:
echo.
echo 🔧 الطريقة 1: استخدام Chocolatey
echo --------------------------------
echo اذا كان لديك Chocolatey مثبت، استخدم:
echo    choco install mongodb
echo.

echo 🌐 الطريقة 2: التحميل اليدوي
echo --------------------------
echo 1. اذهب الى: https://www.mongodb.com/try/download/community
echo 2. اختر Windows و MSI
echo 3. شغل الملف كـ Administrator
echo 4. اختر Complete installation
echo 5. فعل Install MongoDB as a Service
echo.

echo 💻 الطريقة 3: استخدام winget
echo --------------------------
echo اذا كان Windows 11 او Windows 10 حديث:
echo    winget install MongoDB.Server
echo.

echo 📱 الطريقة 4: MongoDB Atlas (الأسهل)
echo ----------------------------------
echo استخدم قاعدة بيانات سحابية مجانية:
echo 1. اذهب الى: https://www.mongodb.com/cloud/atlas
echo 2. انشئ حساب مجاني
echo 3. انشئ cluster مجاني
echo 4. احصل على connection string
echo 5. ضعه في .env.local كـ MONGODB_URI
echo.

echo ⚡ اختبار سريع: هل MongoDB مثبت؟
echo ---------------------------------
where mongod >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ MongoDB موجود في النظام!
    mongod --version 2>nul
) else (
    echo ❌ MongoDB غير مثبت
)
echo.

echo 🧪 اختبار اتصال Node.js
echo ----------------------
echo سأجرب الاتصال من Node.js...
node test-mongodb-connection.js
echo.

echo 🎯 التوصية:
echo -----------
echo للتطوير السريع، استخدم MongoDB Atlas (الطريقة 4)
echo هو الأسرع والأسهل ولا يحتاج تثبيت أي شيء
echo.

pause
