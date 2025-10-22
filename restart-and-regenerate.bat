@echo off
echo ============================================
echo 🔄 إعادة تشغيل المشروع مع Supabase الجديد
echo ============================================
echo.

echo 📝 الخطوة 1: إيقاف جميع عمليات Node.js...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul
echo ✅ تم إيقاف Node.js
echo.

echo 📝 الخطوة 2: إعادة إنشاء Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ❌ فشل إنشاء Prisma Client!
    pause
    exit /b 1
)
echo ✅ تم إنشاء Prisma Client بنجاح
echo.

echo 📝 الخطوة 3: تشغيل السيرفر...
echo.
echo 🚀 السيرفر يعمل الآن على http://localhost:3000
echo.
call npm run dev

pause
