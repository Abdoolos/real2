'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages = {
    Configuration: 'حدث خطأ في إعدادات المصادقة',
    AccessDenied: 'تم رفض الوصول. يرجى المحاولة مرة أخرى',
    Verification: 'فشل التحقق من البريد الإلكتروني',
    Default: 'حدث خطأ أثناء تسجيل الدخول'
  }

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            خطأ في المصادقة
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error === 'AccessDenied' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <p className="font-semibold mb-2">الأسباب المحتملة:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>لم تمنح التطبيق الصلاحيات المطلوبة</li>
                <li>تم إلغاء عملية تسجيل الدخول</li>
                <li>حسابك غير مصرح له بالدخول</li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                <span>المحاولة مرة أخرى</span>
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                العودة للصفحة الرئيسية
              </Link>
            </Button>
          </div>

          {error === 'Configuration' && (
            <div className="text-xs text-gray-500 text-center mt-4">
              إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
