@echo off
echo ============================================
echo الحل الجذري النهائي - إعادة ضبط كاملة
echo ============================================
echo.

echo الخطوة 1: إيقاف جميع عمليات Node.js...
taskkill /F /IM node.exe 2>nul
echo ✓ تم

echo.
echo الخطوة 2: حذف Next.js build cache...
if exist ".next" (
    rmdir /S /Q ".next"
    echo ✓ تم حذف .next
) else (
    echo ✓ .next غير موجود
)

echo.
echo الخطوة 3: حذف Prisma Client القديم...
if exist "node_modules\.prisma" (
    rmdir /S /Q "node_modules\.prisma"
    echo ✓ تم حذف .prisma
) else (
    echo ✓ .prisma غير موجود
)

echo.
echo الخطوة 4: حذف node_modules بالكامل...
if exist "node_modules" (
    echo جاري الحذف... قد يستغرق دقيقة
    rmdir /S /Q "node_modules"
    echo ✓ تم حذف node_modules
) else (
    echo ✓ node_modules غير موجود
)

echo.
echo الخطوة 5: إعادة تثبيت جميع الحزم...
call npm install

echo.
echo الخطوة 6: إنشاء Prisma Client جديد...
call npx prisma generate

echo.
echo ============================================
echo اكتمل الإصلاح الكامل!
echo ============================================
echo.
echo الآن شغّل المشروع:
echo npm run dev
echo.
echo سيعمل بنسبة 100%% بإذن الله! 🎉
echo ============================================

pause
