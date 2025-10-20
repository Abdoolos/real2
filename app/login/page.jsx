"use client";

import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("signin");

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });
      
      if (result?.error) {
        setError("حدث خطأ في تسجيل الدخول");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setError("حدث خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("حدث خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center p-4" 
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* العنوان */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ريال مايند
          </h1>
          <p className="text-gray-600">
            إدارة مصاريفك بذكاء وسهولة
          </p>
        </div>

        {/* البطاقة */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border-0 p-8">
          {/* العنوان */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              مرحباً بك
            </h2>
            <p className="text-gray-600">
              سجل دخولك للوصول إلى حسابك
            </p>
          </div>

          {/* زر جوجل */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-12 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-base transition-all duration-200 shadow-sm hover:shadow-md rounded-lg flex items-center justify-center gap-3 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول بواسطة Google"}
          </button>

          {/* الفاصل */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="font-medium">أو</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveTab("signin")}
                className={`py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === "signin"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === "signup"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                إنشاء حساب
              </button>
            </div>
          </div>

          {/* نموذج تسجيل الدخول */}
          {activeTab === "signin" && (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-medium text-base shadow-md hover:shadow-lg transition-all rounded-lg"
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </form>
          )}

          {/* نموذج إنشاء حساب */}
          {activeTab === "signup" && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                ميزة إنشاء الحساب قيد التطوير
              </p>
              <p className="text-sm text-gray-500">
                يمكنك حالياً تسجيل الدخول عبر Google
              </p>
            </div>
          )}

          {/* رسالة الخطأ */}
          {error && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* الشروط */}
          <p className="text-xs text-center text-gray-600 mt-6">
            بالمتابعة، أنت توافق على{" "}
            <a href="/terms-of-service" className="text-emerald-600 hover:underline font-medium">
              شروط الخدمة
            </a>{" "}
            و{" "}
            <a href="/privacy-policy" className="text-emerald-600 hover:underline font-medium">
              سياسة الخصوصية
            </a>
          </p>
        </div>

        {/* حقوق النشر */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 ريال مايند - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </div>
  );
}
