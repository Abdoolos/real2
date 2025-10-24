@echo off
echo ================================
echo   تثبيت MongoDB على Windows
echo ================================
echo.

REM التحقق من صلاحيات المدير
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ تم تشغيل السكريپت بصلاحيات المدير
) else (
    echo ❌ يرجى تشغيل السكريپت كمدير
    echo انقر بزر الماوس الأيمن واختر "Run as administrator"
    pause
    exit /b
)

echo.
echo 📥 بدء تحميل وتثبيت MongoDB...

REM إنشاء مجلد مؤقت
mkdir C:\temp 2>nul

REM تحميل MongoDB Community Server
echo 🔽 تحميل MongoDB Community Server...
echo هذا قد يستغرق بضع دقائق حسب سرعة الإنترنت...

REM استخدام PowerShell لتحميل MongoDB
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.14-signed.msi' -OutFile 'C:\temp\mongodb-installer.msi'}"

if exist "C:\temp\mongodb-installer.msi" (
    echo ✅ تم تحميل MongoDB بنجاح
) else (
    echo ❌ فشل تحميل MongoDB
    echo يرجى تحميله يدوياً من: https://www.mongodb.com/try/download/community
    pause
    exit /b
)

REM تثبيت MongoDB بصمت
echo 🔧 بدء تثبيت MongoDB...
msiexec /i "C:\temp\mongodb-installer.msi" /quiet /norestart INSTALLLOCATION="C:\Program Files\MongoDB\Server\7.0" ADDLOCAL="ServerService,Client,MongoDBCompass"

REM انتظار انتهاء التثبيت
timeout /t 30 /nobreak >nul

REM إضافة MongoDB إلى PATH
echo 🔧 إعداد متغيرات البيئة...
setx PATH "%PATH%;C:\Program Files\MongoDB\Server\7.0\bin" /M

REM إنشاء مجلد البيانات
echo 📁 إنشاء مجلد البيانات...
mkdir C:\data\db 2>nul

REM بدء خدمة MongoDB
echo 🚀 بدء خدمة MongoDB...
net start MongoDB

echo.
echo ✅ تم تثبيت MongoDB بنجاح!
echo.
echo 📋 معلومات مهمة:
echo    - MongoDB يعمل الآن على المنفذ 27017
echo    - مجلد البيانات: C:\data\db
echo    - MongoDB Compass متاح لإدارة قاعدة البيانات
echo.
echo 🧪 اختبار الاتصال...
timeout /t 5 /nobreak >nul

REM اختبار الاتصال
mongosh --eval "db.runCommand({connectionStatus : 1})" --quiet
if %errorLevel% == 0 (
    echo ✅ اختبار الاتصال نجح!
) else (
    echo ⚠️ قد تحتاج لإعادة تشغيل Command Prompt
)

echo.
echo 🎉 MongoDB جاهز للاستخدام!
echo يمكنك الآن تشغيل: node scripts/seed-mongodb.js
echo.

REM تنظيف الملفات المؤقتة
del "C:\temp\mongodb-installer.msi" 2>nul

pause
