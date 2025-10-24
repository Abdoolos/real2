import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// المسارات العامة (لا تحتاج تسجيل دخول)
const publicPaths = [
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/support',
  '/privacy-policy',
  '/terms-of-service',
  '/login',
  '/auth/signin',
  '/auth/signup',
  '/auth/google-signin',
  '/auth/callback',
  '/auth/error',
  '/api/auth',
  '/api/webhooks',
]

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(path => pathname === path || pathname.startsWith(path))
}

export default withAuth(
  function middleware(req) {
    // إذا كان المسار عام، السماح بالمرور
    if (isPublicPath(req.nextUrl.pathname)) {
      return NextResponse.next()
    }

    // إذا لم يكن هناك token ولم يكن المسار عام، إعادة التوجيه لتسجيل الدخول
    if (!req.nextauth.token) {
      const redirectUrl = new URL('/auth/signin', req.url)
      redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // السماح للمسارات العامة
        if (isPublicPath(req.nextUrl.pathname)) {
          return true
        }
        
        // للمسارات المحمية، التحقق من وجود token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
