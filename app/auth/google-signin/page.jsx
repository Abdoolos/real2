'use client'

import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function GoogleSignInPage() {
  const router = useRouter()

  useEffect(() => {
    const signInWithGoogle = async () => {
      try {
        // استخدام NextAuth بدلاً من Supabase للمصادقة بـ Google
        const result = await signIn('google', {
          callbackUrl: '/dashboard',
          redirect: false
        })

        if (result?.error) {
          console.error('خطأ في تسجيل الدخول بـ Google:', result.error)
          router.push('/auth/signin?error=AuthenticationFailed')
        } else if (result?.url) {
          // إذا نجح تسجيل الدخول، انتقل للصفحة المطلوبة
          router.push(result.url)
        }
      } catch (error) {
        console.error('خطأ غير متوقع:', error)
        router.push('/auth/signin?error=UnexpectedError')
      }
    }

    signInWithGoogle()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-emerald-700 text-lg">جاري تسجيل الدخول بـ Google...</p>
        <p className="text-emerald-600 text-sm mt-2">يرجى الانتظار</p>
      </div>
    </div>
  )
}
