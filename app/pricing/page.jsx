'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PricingPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">خطط الأسعار</h1>
        <p className="text-xl text-emerald-600">اختر الخطة المناسبة لعائلتك</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full shadow-lg">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold">عرض خاص - خصم 25% لفترة محدودة!</span>
        </div>
      </div>
      
      {/* الخطط الشهرية */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">الخطط الشهرية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* فردي شهري */}
          <Card className="relative hover:shadow-xl transition-shadow">
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
                وفّر 25%
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-emerald-600" />
                خطة فردية - شهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl text-gray-400 line-through">20 ر.س</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-emerald-600">15</span>
                  <span className="text-xl text-emerald-600">ر.س/شهر</span>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>إدارة المصاريف الشخصية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>تقارير شهرية مفصلة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>تحليلات ذكية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>دعم فني</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                اشترك الآن
              </Button>
            </CardContent>
          </Card>
          
          {/* عائلي شهري */}
          <Card className="relative border-2 border-emerald-500 hover:shadow-xl transition-shadow">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                الأكثر شعبية
              </span>
            </div>
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
                وفّر 25%
              </Badge>
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-emerald-600" />
                خطة عائلية - شهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl text-gray-400 line-through">40 ر.س</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-emerald-600">30</span>
                  <span className="text-xl text-emerald-600">ر.س/شهر</span>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>جميع ميزات الخطة الفردية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>حتى 5 مستخدمين</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>إدارة عائلية متقدمة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>تقارير عائلية موحدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>أولوية في الدعم</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                اشترك الآن
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* الخطط السنوية */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">الخطط السنوية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* فردي سنوي */}
          <Card className="relative hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-white">
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
                وفّر 25%
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-emerald-600" />
                خطة فردية - سنوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl text-gray-400 line-through">200 ر.س</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-emerald-600">150</span>
                  <span className="text-xl text-emerald-600">ر.س/سنة</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">توفير 30 ريال سنوياً</p>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>جميع ميزات الخطة الشهرية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>خصم على الدفع السنوي</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>لا توجد رسوم خفية</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold">
                وفّر أكثر – اشترك سنوياً
              </Button>
            </CardContent>
          </Card>
          
          {/* عائلي سنوي */}
          <Card className="relative border-2 border-emerald-500 hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-white">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                الأفضل قيمة
              </span>
            </div>
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
                وفّر 25%
              </Badge>
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-emerald-600" />
                خطة عائلية - سنوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl text-gray-400 line-through">330 ر.س</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-emerald-600">250</span>
                  <span className="text-xl text-emerald-600">ر.س/سنة</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">توفير 110 ريال سنوياً</p>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>جميع ميزات الخطة العائلية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>خصم كبير على الدفع السنوي</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>أفضل قيمة للعائلات</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold">
                وفّر أكثر – اشترك سنوياً
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* الملاحظات */}
      <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">ملاحظات مهمة:</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-lg">📌</span>
            <p>الأسعار تشمل ضريبة القيمة المضافة.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">✅</span>
            <p>يمكن الترقية أو الإلغاء في أي وقت.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">👨‍👩‍👧‍👦</span>
            <p>الخطة العائلية تشمل حتى 5 مستخدمين.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">⏰</span>
            <p>العرض متاح لفترة محدودة بخصم 25%.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
