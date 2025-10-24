# 📋 قائمة مراجعة الملفات الشاملة
**تاريخ الإنشاء:** 24 أكتوبر 2025  
**الهدف:** فحص ومراجعة جميع ملفات المشروع بشكل منظم
ابحث وافحص المشروع للعثور على جميع الاستيرادات المتبقية من Supabase وحدد المشاكل:

المهمة الأساسية: أحتاج إلى إزالة كل استيرادات ومراجع Supabase من المشروع بعد الانتقال إلى MongoDB Atlas. الـ deployment على Vercel يفشل بخطأ "Module not found: Can't resolve '@supabase/supabase-js'" في ملف expense-actions.ts.

الملفات المطلوب فحصها:

    ملف package.json - تحقق من وجود أي dependency أو devDependency لـ @supabase/supabase-js أو أي حزمة مرتبطة بـ Supabase

    ملف app/actions/expense-actions.ts - هذا الملف المذكور في الخطأ، ابحث عن أي import statements لـ Supabase

    جميع الملفات في مجلد app/actions/ - افحص كل ملفات الـ actions للعثور على استيرادات Supabase

    مجلد lib/ - ابحث عن ملفات مثل supabase.ts أو auth.ts أو database.ts أو db.ts التي قد تحتوي على إعدادات Supabase القديمة

    مجلد utils/ - ابحث عن أي utility functions تستورد أو تستخدم Supabase client

    جميع ملفات index.ts في المشروع - هذه الملفات (barrel files) قد تُعيد تصدير modules تستخدم Supabase

    ملف next.config.js - تحقق من أي إعدادات webpack أو aliases قد تكون مرتبطة بـ Supabase

    ملف tsconfig.json أو jsconfig.json - افحص path aliases التي قد تُشير لملفات Supabase

    ملف .env و .env.local - ابحث عن متغيرات بيئة مثل SUPABASE_URL أو SUPABASE_ANON_KEY أو NEXT_PUBLIC_SUPABASE

    مجلد app/api/ - افحص جميع API routes للعثور على استيرادات Supabase

ما أحتاج منك:

    اعرض لي قائمة بكل الملفات التي تحتوي على استيراد أو مرجع لـ Supabase

    أظهر لي السطور المحددة في كل ملف تحتوي على هذه الاستيرادات

    إذا وجدت أي dependencies في package.json تتعلق بـ Supabase، أخبرني بها

    اقترح الطريقة الصحيحة لاستبدال هذه الاستيرادات بـ MongoDB connections

    تحقق إذا كان هناك أي indirect imports (استيرادات غير مباشرة) عبر ملفات أخرى

ملاحظة مهمة: المشروع الآن يستخدم MongoDB Atlas، لذا أي كود يستخدم Supabase client يجب استبداله بـ MongoDB connection الموجود في المشروع.
