@echo off
echo ================================
echo    اختبار MongoDB السريع
echo ================================
echo.

echo 🔍 فحص حالة MongoDB...

REM التحقق من وجود mongod
where mongod >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ MongoDB مثبت في النظام
) else (
    echo ❌ MongoDB غير مثبت
    echo يرجى تشغيل: install-mongodb-windows.bat
    pause
    exit /b
)

REM التحقق من حالة الخدمة
sc query "MongoDB" | find "RUNNING" >nul
if %errorLevel% == 0 (
    echo ✅ خدمة MongoDB تعمل
) else (
    echo ⚠️ خدمة MongoDB متوقفة - محاولة تشغيلها...
    net start MongoDB
    if %errorLevel% == 0 (
        echo ✅ تم تشغيل MongoDB بنجاح
    ) else (
        echo ❌ فشل في تشغيل MongoDB
        pause
        exit /b
    )
)

echo.
echo 🧪 اختبار اتصال Node.js مع MongoDB...
node test-mongodb-connection.js

echo.
echo 🌱 هل تريد تشغيل البيانات الأولية؟ (y/n)
set /p answer=
if /i "%answer%"=="y" (
    echo.
    echo 🌱 تشغيل البيانات الأولية...
    node scripts/seed-mongodb.js
    echo.
    echo ✅ تمت إضافة البيانات الأولية!
)

echo.
echo 🎉 النظام جاهز! يمكنك الآن تشغيل:
echo    npm run dev
echo.
pause
