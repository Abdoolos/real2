'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function GoogleSignInPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const signInWithGoogle = async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('خطأ في تسجيل الدخول بـ Google:', error.message)
        router.push('/auth/signin')
      }
    }

    signInWithGoogle()
  }, [router, supabase])

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
