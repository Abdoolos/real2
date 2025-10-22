@echo off
echo ============================================
echo 🔧 بدء تنفيذ الإصلاحات المعلقة
echo ============================================
echo.

REM ===== الخطوة 1: حذف .next cache =====
echo 📦 الخطوة 1/3: تنظيف Next.js cache...
if exist .next (
    rmdir /s /q .next
    echo ✅ تم حذف مجلد .next بنجاح
) else (
    echo ℹ️  مجلد .next غير موجود
)
echo.

REM ===== الخطوة 2: إعادة توليد Prisma Client =====
echo 🗄️  الخطوة 2/3: إعادة توليد Prisma Client...
call npx prisma generate --force
if %errorlevel% neq 0 (
    echo ❌ فشل في توليد Prisma Client
    pause
    exit /b 1
)
echo ✅ تم توليد Prisma Client بنجاح
echo.

REM ===== الخطوة 3: تشغيل السيرفر =====
echo 🚀 الخطوة 3/3: تشغيل السيرفر...
echo.
echo ============================================
echo ✅ الإصلاحات اكتملت بنجاح!
echo ============================================
echo.
echo 📝 الآن يمكنك:
echo    1. تشغيل: npm run dev
echo    2. اختبار: http://localhost:3000/auth/signin
echo    3. اختبار: http://localhost:3000/expenses-list
echo.
echo ⚠️  إذا استمرت المشاكل، شغّل: npm install
echo.
pause
