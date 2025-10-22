@echo off
chcp 65001 >nul
echo ============================================
echo 🗄️ إعداد قاعدة البيانات Supabase PostgreSQL
echo ============================================
echo.

echo 📝 الخطوة 1: حذف Prisma Client القديم...
if exist "node_modules\.prisma" (
    rmdir /s /q "node_modules\.prisma"
    echo ✅ تم حذف Prisma Client القديم
) else (
    echo ℹ️ لا يوجد Prisma Client قديم للحذف
)
echo.

echo 📝 الخطوة 2: حذف migrations القديمة (SQLite)...
if exist "prisma\migrations" (
    rmdir /s /q "prisma\migrations"
    echo ✅ تم حذف migrations القديمة
) else (
    echo ℹ️ لا توجد migrations قديمة للحذف
)
echo.

echo 📝 الخطوة 3: إنشاء migration جديد للـ PostgreSQL...
echo.
call npx prisma migrate dev --name init_postgresql
if %errorlevel% neq 0 (
    echo.
    echo ❌ فشل إنشاء migration!
    echo.
    echo 💡 حلول مقترحة:
    echo 1. تأكد من صحة CONNECTION STRING في ملف .env
    echo 2. تأكد من اتصالك بالإنترنت
    echo 3. تأكد من أن Supabase يعمل بشكل صحيح
    echo.
    pause
    exit /b 1
)
echo.

echo 📝 الخطوة 4: تحديث Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ فشل تحديث Prisma Client!
    pause
    exit /b 1
)
echo.

echo ============================================
echo ✅ تم إعداد قاعدة البيانات بنجاح!
echo ============================================
echo.
echo 📊 يمكنك الآن:
echo 1. تشغيل المشروع: npm run dev
echo 2. فتح Prisma Studio: npx prisma studio
echo 3. اختبار الاتصال: node test-supabase-connection.js
echo.
pause
