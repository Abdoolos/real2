'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  Plus,
  Settings,
  Crown,
  UserPlus,
  Shield,
  BarChart3,
  Heart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// مكون الشاشة الترحيبية
function WelcomeScreen() {
  return (
    <div className="container mx-auto p-6">
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full"
        >
          {/* البطاقة الرئيسية */}
          <Card className="border-2 border-emerald-200 shadow-2xl bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/30">
            <CardContent className="p-8 md:p-12">
              {/* الأيقونة الرئيسية */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* العنوان والوصف */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
                  ابدأ رحلتك المالية العائلية
                </h1>
                <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
                  أنشئ عائلتك الآن وابدأ في إدارة المصاريف المشتركة بذكاء وسهولة
                </p>
              </motion.div>

              {/* الميزات */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
              >
                {/* ميزة 1 */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 mb-2">إدارة متعددة المستخدمين</h3>
                    <p className="text-sm text-emerald-600">
                      أضف أفراد عائلتك وتتبع مصاريف كل فرد بشكل منفصل
                    </p>
                  </div>
                </div>

                {/* ميزة 2 */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 mb-2">ميزانيات مخصصة</h3>
                    <p className="text-sm text-emerald-600">
                      حدد ميزانية لكل فرد واحصل على تنبيهات عند الاقتراب من الحد
                    </p>
                  </div>
                </div>

                {/* ميزة 3 */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 mb-2">تقارير شاملة</h3>
                    <p className="text-sm text-emerald-600">
                      احصل على تقارير تفصيلية عن إنفاق العائلة بأكملها
                    </p>
                  </div>
                </div>

                {/* ميزة 4 */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 mb-2">خصوصية وأمان</h3>
                    <p className="text-sm text-emerald-600">
                      بياناتك محمية بأعلى معايير الأمان والتشفير
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* الأزرار */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/my-family" className="w-full sm:w-auto">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white shadow-lg text-lg px-8 py-6"
                  >
                    <Sparkles className="w-5 h-5 ml-2" />
                    إنشاء عائلتك الآن
                  </Button>
                </Link>
                
                <Link href="/my-family" className="w-full sm:w-auto">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6"
                  >
                    <Heart className="w-5 h-5 ml-2" />
                    تعرف على المزيد
                  </Button>
                </Link>
              </motion.div>

              {/* معلومات إضافية */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-emerald-500">
                  💡 بعد إنشاء عائلتك، يمكنك دعوة أفراد عائلتك للانضمام ومشاركة إدارة المصاريف
                </p>
              </motion.div>
            </CardContent>
          </Card>

          {/* إحصائيات سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600 mb-1">100%</div>
              <div className="text-xs text-emerald-500">مجاني للعائلات</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600 mb-1">آمن</div>
              <div className="text-xs text-emerald-500">بيانات مشفرة</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600 mb-1">سهل</div>
              <div className="text-xs text-emerald-500">واجهة بسيطة</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// مكون لوحة التحكم مع البيانات الحقيقية
function FamilyDashboard({ familyData }) {
  const formatCurrency = (amount) => {
    return `${(amount || 0).toLocaleString()} ر.س`;
  };

  const budgetUsagePercentage = (familyData.family.currentSpending / familyData.family.monthlyBudget) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-emerald-800">{familyData.family.name}</h1>
          <p className="text-emerald-600 mt-2">لوحة تحكم العائلة - إدارة المصاريف المشتركة</p>
        </div>
        <div className="flex gap-3">
          <Link href="/my-family">
            <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              <Settings className="w-4 h-4 ml-2" />
              إدارة العائلة
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white">
            <UserPlus className="w-4 h-4 ml-2" />
            دعوة عضو جديد
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">أفراد العائلة</p>
                  <p className="text-2xl font-bold text-blue-700">{familyData.family.totalMembers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">الميزانية الشهرية</p>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(familyData.family.monthlyBudget)}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">الإنفاق الحالي</p>
                  <p className="text-2xl font-bold text-red-700">{formatCurrency(familyData.family.currentSpending)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">نسبة الاستخدام</p>
                  <p className="text-2xl font-bold text-purple-700">{budgetUsagePercentage.toFixed(1)}%</p>
                </div>
                <PieChart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Budget Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-emerald-800">تقدم الميزانية الشهرية</CardTitle>
            <CardDescription>مقارنة الإنفاق الحالي مع الميزانية المحددة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">الإنفاق الحالي</span>
                <span className="font-bold text-emerald-600">{formatCurrency(familyData.family.currentSpending)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${
                    budgetUsagePercentage > 90 ? 'bg-red-500' : 
                    budgetUsagePercentage > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(budgetUsagePercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">0 ر.س</span>
                <span className="text-gray-500">{formatCurrency(familyData.family.monthlyBudget)}</span>
              </div>
              <div className="text-center">
                <span className={`text-lg font-semibold ${
                  budgetUsagePercentage > 90 ? 'text-red-600' : 
                  budgetUsagePercentage > 70 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  متبقي: {formatCurrency(familyData.family.monthlyBudget - familyData.family.currentSpending)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Family Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-emerald-800">أفراد العائلة</CardTitle>
              <CardDescription>إنفاق كل فرد وميزانيته الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {familyData.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        {member.role === 'admin' && (
                          <Crown className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(member.monthlySpending)} من {formatCurrency(member.budget)}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (member.monthlySpending / member.budget) > 0.9 ? 'bg-red-500' : 
                          (member.monthlySpending / member.budget) > 0.7 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min((member.monthlySpending / member.budget) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {((member.monthlySpending / member.budget) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-emerald-800">أكثر فئات الإنفاق</CardTitle>
              <CardDescription>توزيع الإنفاق العائلي حسب الفئات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {familyData.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: `hsl(${160 + index * 40}, 70%, 50%)` }}
                    ></div>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {category.percentage}%
                    </Badge>
                    <span className="font-bold text-emerald-600">{formatCurrency(category.amount)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-800">إجراءات سريعة</CardTitle>
            <CardDescription>الأدوات الأساسية لإدارة عائلتك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/family-report">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 border-emerald-200 hover:bg-emerald-50">
                  <PieChart className="w-6 h-6 text-emerald-600" />
                  <span className="text-emerald-700">تقرير العائلة</span>
                </Button>
              </Link>
              
              <Link href="/family-income">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 border-emerald-200 hover:bg-emerald-50">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <span className="text-emerald-700">الدخل العائلي</span>
                </Button>
              </Link>
              
              <Link href="/manage-budgets">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 border-emerald-200 hover:bg-emerald-50">
                  <Target className="w-6 h-6 text-emerald-600" />
                  <span className="text-emerald-700">إدارة الميزانيات</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// المكون الرئيسي
export default function FamilyDashboardPage() {
  const [familyData, setFamilyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFamilyData();
  }, []);

  const loadFamilyData = async () => {
    try {
      const response = await fetch('/api/family/dashboard');
      if (response.ok) {
        const data = await response.json();
        setFamilyData(data);
      }
    } catch (error) {
      console.error('Error loading family data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // إذا لم توجد بيانات عائلة، عرض الشاشة الترحيبية
  if (!familyData || !familyData.members || familyData.members.length === 0) {
    return <WelcomeScreen />;
  }

  // إذا وجدت بيانات، عرض لوحة التحكم
  return <FamilyDashboard familyData={familyData} />;
}
