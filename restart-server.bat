@echo off
echo.
echo ================================================
echo   إعادة تشغيل خادم التطوير
echo ================================================
echo.
echo 🔄 جاري إيقاف الخادم الحالي...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo ✅ تم إيقاف الخادم
echo.
echo 🚀 جاري تشغيل الخادم...
echo.
start cmd /k "npm run dev"

echo.
echo ================================================
echo   ✅ تم تشغيل الخادم في نافذة جديدة
echo ================================================
echo.
echo   انتظر 10 ثواني ثم افتح:
echo   👉 http://localhost:3000/add-expense
echo.
pause
