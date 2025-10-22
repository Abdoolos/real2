import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // إذا كان URL يبدأ بـ "/"، استخدم baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // إذا كان نفس origin، اسمح به
      else if (new URL(url).origin === baseUrl) return url;
      // خلاف ذلك، توجيه إلى dashboard
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user, account }) {
      // عند تسجيل الدخول الأول، أضف معلومات المستخدم إلى الـ token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // أضف الـ user id من الـ token إلى الـ session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
