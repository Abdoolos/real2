@echo off
echo ============================================
echo إعداد قاعدة بيانات PostgreSQL
echo ============================================
echo.

REM طلب كلمة المرور من المستخدم
set /p PGPASSWORD="أدخل كلمة مرور postgres التي اخترتها أثناء التثبيت: "

echo.
echo جاري إنشاء قاعدة البيانات...
echo.

REM إنشاء قاعدة البيانات
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -c "CREATE DATABASE family_finance;"

if %errorlevel% equ 0 (
    echo ✓ تم إنشاء قاعدة البيانات بنجاح!
) else (
    echo ✗ فشل إنشاء قاعدة البيانات - تأكد من كلمة المرور
    pause
    exit /b 1
)

echo.
echo جاري تحديث ملف .env...
echo.

REM إنشاء ملف .env جديد
(
echo # Database
echo DATABASE_URL="postgresql://postgres:%PGPASSWORD%@localhost:5432/family_finance"
echo.
echo # NextAuth
echo NEXTAUTH_URL=http://localhost:3000
echo NEXTAUTH_SECRET=your-secret-key-change-this-in-production
echo.
echo # Google OAuth
echo GOOGLE_CLIENT_ID=your-google-client-id
echo GOOGLE_CLIENT_SECRET=your-google-client-secret
echo.
echo # Clerk ^(Optional^)
echo NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
echo CLERK_SECRET_KEY=
echo.
echo # Supabase ^(Optional^)
echo NEXT_PUBLIC_SUPABASE_URL=
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=
echo SUPABASE_SERVICE_ROLE_KEY=
) > .env

echo ✓ تم تحديث ملف .env

echo.
echo جاري تشغيل Prisma migrations...
echo.

call npx prisma generate
call npx prisma db push

echo.
echo ============================================
echo اكتمل الإعداد!
echo ============================================
echo.
echo يمكنك الآن تشغيل المشروع:
echo npm run dev
echo.
echo ============================================

pause
