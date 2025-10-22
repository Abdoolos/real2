@echo off
echo ============================================
echo حل سريع لمشكلة قاعدة البيانات
echo ============================================
echo.

echo إيقاف السيرفر إن كان يعمل...
taskkill /F /IM node.exe 2>nul

echo.
echo انتظر 3 ثوانٍ...
timeout /t 3 /nobreak >nul

echo.
echo تشغيل Prisma Generate...
call npx prisma generate

echo.
echo ============================================
echo اكتمل الإعداد!
echo ============================================
echo.
echo الآن شغّل المشروع:
echo npm run dev
echo.
echo ============================================

pause
