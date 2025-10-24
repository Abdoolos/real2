'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Users, 
  Calculator,
  PieChart,
  Star,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
      
      // إذا كان مسجل الدخول، توجيه للوحة التحكم
      if (session?.user) {
        router.push('/dashboard');
      }
    }
  }, [session, status, router]);

  // عرض شاشة تحميل أثناء التحقق
  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4 animate-pulse">
            <span className="text-2xl">💰</span>
          </div>
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">ريال مايند</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // إذا كان مسجل الدخول، سيتم التوجيه تلقائياً
  if (session?.user) {
    return null;
  }

  // الصفحة الرئيسية للمستخدمين غير مسجلي الدخول
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {/* الهيدر */}
      <header className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">💰</span>
              </div>
              <h1 className="mr-3 text-2xl font-bold text-gray-900">ريال مايند</h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link 
                href="/auth/signin" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                تسجيل الدخول
              </Link>
              <Link 
                href="/auth/signin" 
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium"
              >
                ابدأ الآن
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* القسم الرئيسي */}
      <main>
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              إدارة مالية{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                ذكية
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              تتبع مصاريفك، خطط ميزانيتك، وحقق أهدافك المالية مع منصة ريال مايند المتطورة
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/auth/signin"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 font-medium flex items-center"
              >
                ابدأ مجاناً
                <ArrowRight className="mr-2" size={20} />
              </Link>
              <Link 
                href="/about"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium"
              >
                تعرف أكثر
              </Link>
            </div>
          </div>
        </section>

        {/* الميزات */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                لماذا ريال مايند؟
              </h2>
              <p className="text-lg text-gray-600">
                منصة شاملة لإدارة أموالك بذكاء وبساطة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-emerald-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">تتبع ذكي</h3>
                <p className="text-gray-600">
                  تتبع مصاريفك بسهولة مع تصنيفات تلقائية وتقارير مفصلة
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">تحليلات متقدمة</h3>
                <p className="text-gray-600">
                  رؤى مالية عميقة مع رسوم بيانية وتوقعات مستقبلية
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">إدارة عائلية</h3>
                <p className="text-gray-600">
                  شارك الميزانية مع أفراد العائلة وتتبعوا الأهداف معاً
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">حاسبات مالية</h3>
                <p className="text-gray-600">
                  أدوات حساب متقدمة للقروض والاستثمارات والتخطيط المالي
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">أمان متقدم</h3>
                <p className="text-gray-600">
                  حماية متعددة الطبقات لبياناتك المالية الحساسة
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-red-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">تجربة متميزة</h3>
                <p className="text-gray-600">
                  واجهة سهلة الاستخدام مع دعم كامل للغة العربية
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* الخطط */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                خطط تناسب احتياجاتك
              </h2>
              <p className="text-lg text-gray-600">
                ابدأ مجاناً وترقى حسب حاجتك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* الخطة المجانية */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">مجانية</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  0 <span className="text-lg text-gray-600">ر.س/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 ml-2" size={20} />
                    <span>تتبع المصاريف الأساسي</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 ml-2" size={20} />
                    <span>تقارير شهرية</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 ml-2" size={20} />
                    <span>3 فئات مخصصة</span>
                  </li>
                </ul>
                <Link 
                  href="/auth/signin"
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 font-medium text-center block"
                >
                  ابدأ مجاناً
                </Link>
              </div>

              {/* الخطة المميزة */}
              <div className="bg-gradient-to-br from-emerald-500 to-amber-500 text-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute top-4 left-4 bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                  الأكثر شعبية
                </div>
                <h3 className="text-2xl font-bold mb-4">مميزة</h3>
                <div className="text-4xl font-bold mb-6">
                  29 <span className="text-lg">ر.س/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="ml-2" size={20} />
                    <span>كل ميزات المجانية</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="ml-2" size={20} />
                    <span>إدارة عائلية (حتى 6 أعضاء)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="ml-2" size={20} />
                    <span>تحليلات متقدمة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="ml-2" size={20} />
                    <span>فئات غير محدودة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="ml-2" size={20} />
                    <span>دعم أولوية</span>
                  </li>
                </ul>
                <Link 
                  href="/auth/signin"
                  className="w-full bg-white text-emerald-600 py-3 px-6 rounded-lg hover:bg-gray-50 font-medium text-center block"
                >
                  جرب 30 يوم مجاناً
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* الفوتر */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
                <h3 className="mr-2 text-xl font-bold">ريال مايند</h3>
              </div>
              <p className="text-gray-400">
                منصتك الذكية لإدارة الأموال وتحقيق الأهداف المالية
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">المنتج</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">الميزات</Link></li>
                <li><Link href="/pricing" className="hover:text-white">الأسعار</Link></li>
                <li><Link href="/about" className="hover:text-white">حولنا</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/support" className="hover:text-white">مركز المساعدة</Link></li>
                <li><Link href="/contact" className="hover:text-white">اتصل بنا</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">قانوني</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-white">سياسة الخصوصية</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-white">شروط الاستخدام</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 ريال مايند. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
