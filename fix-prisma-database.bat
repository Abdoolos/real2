@echo off
echo ========================================
echo  اصلاح قاعدة البيانات Prisma
echo ========================================
echo.

echo الخطوة 1: ايقاف جميع عمليات Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo الخطوة 2: حذف مجلد .next...
if exist .next (
    rmdir /s /q .next
    echo ✓ تم حذف .next
) else (
    echo - .next غير موجود
)

echo الخطوة 3: حذف Prisma Client القديم...
if exist node_modules\.prisma (
    rmdir /s /q node_modules\.prisma
    echo ✓ تم حذف .prisma
) else (
    echo - .prisma غير موجود
)

echo الخطوة 4: اعادة توليد Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ خطأ في توليد Prisma Client
    pause
    exit /b 1
)
echo ✓ تم توليد Prisma Client بنجاح

echo الخطوة 5: تطبيق Schema على قاعدة البيانات...
call npx prisma db push --accept-data-loss
if %errorlevel% neq 0 (
    echo ❌ خطأ في تطبيق Schema
    pause
    exit /b 1
)
echo ✓ تم تطبيق Schema بنجاح

echo.
echo ========================================
echo  ✓ تم الاصلاح بنجاح!
echo ========================================
echo.
echo الان يمكنك تشغيل السيرفر بـ: npm run dev
echo.
pause
