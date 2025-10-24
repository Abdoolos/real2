'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  PlusCircle, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  PieChart,
  BarChart3,
  Wallet,
  CreditCard,
  Receipt
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    categoryBreakdown: []
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/expenses');
      if (response.ok) {
        const data = await response.json();
        setExpenses(data.expenses?.slice(0, 5) || []);
        calculateStats(data.expenses || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const calculateStats = (expensesData) => {
    const total = expensesData.reduce((sum, expense) => sum + (expense.amount_in_sar || 0), 0);
    const currentMonth = new Date().getMonth();
    const monthlyTotal = expensesData
      .filter(expense => new Date(expense.date).getMonth() === currentMonth)
      .reduce((sum, expense) => sum + (expense.amount_in_sar || 0), 0);

    setStats({
      totalExpenses: total,
      monthlyExpenses: monthlyTotal,
      categoryBreakdown: []
    });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* الهيدر */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-600">
            مرحباً {session?.user?.name || 'بك'} - إليك ملخص أنشطتك المالية
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-lg p-3">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="mr-4">
                <p className="text-gray-600 text-sm">إجمالي المصاريف</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalExpenses.toLocaleString()} ر.س
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-lg p-3">
                <Calendar className="text-white" size={24} />
              </div>
              <div className="mr-4">
                <p className="text-gray-600 text-sm">مصاريف هذا الشهر</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.monthlyExpenses.toLocaleString()} ر.س
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-lg p-3">
                <Receipt className="text-white" size={24} />
              </div>
              <div className="mr-4">
                <p className="text-gray-600 text-sm">عدد المعاملات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {expenses.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 rounded-lg p-3">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="mr-4">
                <p className="text-gray-600 text-sm">متوسط يومي</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(stats.monthlyExpenses / new Date().getDate())} ر.س
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* الإجراءات السريعة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">الإجراءات السريعة</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/add-expense" 
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <PlusCircle className="text-blue-600 mb-2" size={32} />
                <span className="text-sm font-medium text-gray-900">إضافة مصروف</span>
              </Link>
              <Link 
                href="/expenses-list" 
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Receipt className="text-green-600 mb-2" size={32} />
                <span className="text-sm font-medium text-gray-900">عرض المصاريف</span>
              </Link>
              <Link 
                href="/camera-receipts" 
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Wallet className="text-purple-600 mb-2" size={32} />
                <span className="text-sm font-medium text-gray-900">رفع إيصال</span>
              </Link>
              <Link 
                href="/analytics" 
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <BarChart3 className="text-orange-600 mb-2" size={32} />
                <span className="text-sm font-medium text-gray-900">التحليلات</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">آخر المعاملات</h2>
            <div className="space-y-3">
              {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <div key={expense._id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-500 rounded-full p-2 ml-3">
                        <CreditCard className="text-white" size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {expense.note || 'مصروف عام'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {expense.date ? new Date(expense.date).toLocaleDateString('ar-SA') : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">
                        {expense.amount_in_sar?.toLocaleString()} ر.س
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Receipt size={48} className="mx-auto mb-2 text-gray-300" />
                  <p>لا توجد معاملات حتى الآن</p>
                  <Link 
                    href="/add-expense"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    أضف أول مصروف
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
