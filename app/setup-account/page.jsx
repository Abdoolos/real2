"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupAccountRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/login");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">جاري التحويل...</p>
      </div>
    </div>
  );
}
