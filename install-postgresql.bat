@echo off
echo ============================================
echo تثبيت PostgreSQL المحلي
echo ============================================
echo.

echo سأقوم بتنزيل وتثبيت PostgreSQL...
echo.

REM تحميل PostgreSQL installer
echo جاري تحميل PostgreSQL 16...
curl -L -o postgresql-installer.exe https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe

echo.
echo ============================================
echo تم تحميل ملف التثبيت!
echo ============================================
echo.
echo الخطوات التالية:
echo.
echo 1. قم بتشغيل الملف: postgresql-installer.exe
echo.
echo 2. أثناء التثبيت:
echo    - اختر كلمة مرور قوية للمستخدم postgres
echo    - احفظ كلمة المرور (ستحتاجها!)
echo    - المنفذ الافتراضي: 5432 (اتركه كما هو)
echo    - اللغة: اختر English
echo.
echo 3. بعد اكتمال التثبيت، شغل الملف:
echo    configure-postgresql.bat
echo.
echo ============================================

pause
