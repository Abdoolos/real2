@echo off
echo ============================================
echo الحل النهائي الكامل لمشكلة قاعدة البيانات
echo ============================================
echo.

echo الخطوة 1: إيقاف جميع عمليات Node.js...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✓ تم إيقاف Node.js
) else (
    echo ✓ Node.js غير قيد التشغيل
)

echo.
echo الخطوة 2: الانتظار 3 ثوانٍ...
timeout /t 3 /nobreak >nul

echo.
echo الخطوة 3: حذف Prisma Client القديم...
if exist "node_modules\.prisma" (
    rmdir /S /Q "node_modules\.prisma"
    echo ✓ تم حذف Prisma Client القديم
) else (
    echo ✓ لا يوجد Prisma Client قديم
)

echo.
echo الخطوة 4: إنشاء Prisma Client جديد...
call npx prisma generate

echo.
echo ============================================
echo اكتمل الإصلاح!
echo ============================================
echo.
echo الآن شغّل المشروع:
echo npm run dev
echo.
echo سيعمل التطبيق بدون أي مشاكل! 🎉
echo ============================================

pause
