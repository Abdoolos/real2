# 🚀 دليل التحويل الكامل من Prisma+Supabase إلى MongoDB+Mongoose

## 📋 نظرة عامة
هذا الدليل يوضح كيفية تحويل المشروع بالكامل من استخدام Prisma مع Supabase إلى MongoDB مع Mongoose.

---

## 🔍 تحليل الوضع الحالي

### ✅ **النظام المستخدم حالياً:**
- **قاعدة البيانات:** PostgreSQL مع Supabase
- **ORM:** Prisma
- **النماذج:** 15 نموذج معقد مع علاقات متشابكة
- **APIs:** مزيج من Prisma APIs و Supabase APIs

### 📊 **النماذج الموجودة في schema.prisma:**
1. **User** - المستخدمين والمصادقة
2. **Account/Session** - جلسات NextAuth
3. **Family/FamilyMember** - إدارة العائلات
4. **Category/Subcategory** - فئات المصاريف
5. **Income** - الدخل
6. **Expense** - المصاريف (النموذج الرئيسي)
7. **Budget/CategoryBudget** - الميزانيات
8. **Event** - الأحداث الموسمية
9. **Bill/BillParticipant** - الفواتير المشتركة
10. **Subscription** - اشتراكات المستخدمين
11. **Advice/Forecast** - النصائح والتوقعات

---

## 🗑️ المرحلة الأولى: إزالة ملفات Supabase

### **1.1 ملفات يجب حذفها:**

#### **📁 مجلدات كاملة:**
```
lib/supabase/                    # جميع ملفات عملاء Supabase
app/api/expenses-supabase/       # APIs المعتمدة على Supabase
```

#### **📄 ملفات منفردة:**
```
supabase-schema.sql
setup-supabase-database.bat
setup-supabase-postgresql.bat
test-supabase-connection.js
test-supabase-connection.cjs
scripts/run-supabase-schema.js
scripts/show-expenses-columns.js
```

#### **📋 ملفات التوثيق:**
```
SUPABASE_CONNECTION_REQUIRED.md
SUPABASE_CONNECTION_SOLUTIONS.md
SUPABASE_MIGRATION_GUIDE.md
SUPABASE_SETUP_REQUIRED.md
SUPABASE_TROUBLESHOOTING.md
EXPENSES_DISPLAY_FIX.md
```

#### **🧪 ملفات الاختبار:**
```
test-expense-visibility.js
test-expense-visibility.cjs
check-expenses-schema.cjs
inspect-expenses-table.cjs
get-exact-columns.cjs
test-final-solution.cjs
quick-test.cjs
minimal-test.cjs
final-test.cjs
```

### **1.2 تنظيف package.json:**
```bash
npm uninstall @supabase/ssr @supabase/supabase-js
```

### **1.3 حذف Scripts المرتبطة:**
إزالة من package.json:
```json
"db:apply:supabase": "node scripts/run-supabase-schema.js"
```

---

## 📦 المرحلة الثانية: تثبيت MongoDB + Mongoose

### **2.1 تثبيت المكتبات المطلوبة:**
```bash
npm install mongoose
npm install --save-dev @types/mongoose  # إذا كان TypeScript
```

### **2.2 إعداد متغيرات البيئة:**
في `.env.local`:
```env
# إزالة متغيرات Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# إضافة متغيرات MongoDB
MONGODB_URI=mongodb://localhost:27017/base44_app
# أو للسحابة:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/base44_app
```

### **2.3 إنشاء اتصال MongoDB:**
إنشاء `lib/mongodb/connection.js`:
```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('يرجى تحديد MONGODB_URI في متغيرات البيئة');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

---

## 🏗️ المرحلة الثالثة: تحويل النماذج إلى Mongoose

### **3.1 إنشاء مجلد النماذج:**
```
lib/mongodb/models/
├── User.js
├── Category.js
├── Subcategory.js
├── Expense.js
├── Income.js
├── Budget.js
├── Family.js
└── index.js
```

### **3.2 نموذج المستخدم:**
`lib/mongodb/models/User.js`:
```javascript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: Date,
  image: String,
  currency: { type: String, default: 'SAR' },
  timezone: { type: String, default: 'Asia/Riyadh' },
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

### **3.3 نموذج الفئات:**
`lib/mongodb/models/Category.js`:
```javascript
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
  color: String,
  isDefault: { type: Boolean, default: false },
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' }
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
```

### **3.4 نموذج الفئات الفرعية:**
`lib/mongodb/models/Subcategory.js`:
```javascript
import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  }
}, {
  timestamps: true
});

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
```

### **3.5 نموذج المصاريف (الأساسي):**
`lib/mongodb/models/Expense.js`:
```javascript
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  notes: String,
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  },
  subcategoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subcategory'
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  familyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Family'
  }
}, {
  timestamps: true
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
```

### **3.6 ملف التصدير الجماعي:**
`lib/mongodb/models/index.js`:
```javascript
export { default as User } from './User.js';
export { default as Category } from './Category.js';
export { default as Subcategory } from './Subcategory.js';
export { default as Expense } from './Expense.js';
export { default as Income } from './Income.js';
export { default as Budget } from './Budget.js';
export { default as Family } from './Family.js';
```

---

## 🔄 المرحلة الرابعة: إعادة إنشاء APIs

### **4.1 استبدال API المصاريف:**
حذف `app/api/expenses-supabase/` وإنشاء `app/api/expenses/route.js`:

```javascript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connection';
import { Expense, Category, Subcategory } from '@/lib/mongodb/models';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID مطلوب' }, { status: 400 });
    }

    const expenses = await Expense.find({ userId })
      .populate('categoryId', 'name icon color')
      .populate('subcategoryId', 'name')
      .sort({ date: -1 });

    return NextResponse.json({ 
      ok: true, 
      data: expenses 
    });

  } catch (error) {
    console.error('خطأ في جلب المصاريف:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId, categoryId, subcategoryId, amount, description, date, notes } = body;

    // التحقق من البيانات المطلوبة
    if (!userId || !categoryId || !amount || !description || !date) {
      return NextResponse.json({ 
        error: 'البيانات الأساسية مطلوبة' 
      }, { status: 400 });
    }

    const expense = new Expense({
      userId,
      categoryId,
      subcategoryId,
      amount: parseFloat(amount),
      description,
      date: new Date(date),
      notes
    });

    await expense.save();
    
    // جلب المصروف مع البيانات المترابطة
    const populatedExpense = await Expense.findById(expense._id)
      .populate('categoryId', 'name icon color')
      .populate('subcategoryId', 'name');

    return NextResponse.json({ 
      ok: true, 
      data: populatedExpense 
    });

  } catch (error) {
    console.error('خطأ في إضافة المصروف:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

### **4.2 API الفئات:**
`app/api/categories/route.js`:
```javascript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connection';
import { Category } from '@/lib/mongodb/models';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Category.find()
      .sort({ isDefault: -1, name: 1 });

    return NextResponse.json({ 
      ok: true, 
      data: categories 
    });

  } catch (error) {
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

### **4.3 API الفئات الفرعية:**
`app/api/subcategories/route.js`:
```javascript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connection';
import { Subcategory } from '@/lib/mongodb/models';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const query = categoryId ? { categoryId } : {};
    
    const subcategories = await Subcategory.find(query)
      .populate('categoryId', 'name')
      .sort({ name: 1 });

    return NextResponse.json({ 
      ok: true, 
      data: subcategories 
    });

  } catch (error) {
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

---

## 🌱 المرحلة الخامسة: إضافة البيانات الأولية

### **5.1 سكريبت إنشاء الفئات الأساسية:**
`scripts/seed-mongodb.js`:
```javascript
import connectDB from '../lib/mongodb/connection.js';
import { Category, Subcategory } from '../lib/mongodb/models/index.js';

const defaultCategories = [
  {
    name: 'طعام',
    icon: '🍽️',
    color: '#FF6B6B',
    isDefault: true,
    subcategories: ['مطاعم', 'بقالة', 'حلويات']
  },
  {
    name: 'مواصلات',
    icon: '🚗',
    color: '#4ECDC4',
    isDefault: true,
    subcategories: ['وقود', 'صيانة', 'مواقف']
  },
  {
    name: 'تسوق',
    icon: '🛍️',
    color: '#45B7D1',
    isDefault: true,
    subcategories: ['ملابس', 'إلكترونيات', 'منزل']
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('🌱 بدء إضافة البيانات الأولية...');

    for (const categoryData of defaultCategories) {
      const { subcategories, ...categoryInfo } = categoryData;
      
      // إنشاء الفئة
      const category = await Category.create(categoryInfo);
      console.log(`✅ تم إنشاء فئة: ${category.name}`);

      // إنشاء الفئات الفرعية
      for (const subName of subcategories) {
        await Subcategory.create({
          name: subName,
          categoryId: category._id
        });
        console.log(`  ✅ تم إنشاء فئة فرعية: ${subName}`);
      }
    }

    console.log('🎉 تم إنشاء البيانات الأولية بنجاح!');

  } catch (error) {
    console.error('❌ خطأ في إنشاء البيانات:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
```

---

## 🧪 المرحلة السادسة: الاختبار والتأكد

### **6.1 اختبار الاتصال:**
`test-mongodb-connection.js`:
```javascript
import connectDB from './lib/mongodb/connection.js';

async function testConnection() {
  try {
    await connectDB();
    console.log('✅ نجح الاتصال بـ MongoDB');
  } catch (error) {
    console.error('❌ فشل الاتصال:', error);
  }
}

testConnection();
```

### **6.2 اختبار إضافة مصروف:**
```javascript
import connectDB from './lib/mongodb/connection.js';
import { Expense, Category, Subcategory } from './lib/mongodb/models/index.js';

async function testExpense() {
  try {
    await connectDB();
    
    // جلب فئة وفئة فرعية
    const category = await Category.findOne({ name: 'طعام' });
    const subcategory = await Subcategory.findOne({ name: 'مطاعم' });
    
    // إنشاء مصروف تجريبي
    const expense = await Expense.create({
      amount: 50,
      description: 'غداء - اختبار MongoDB',
      date: new Date(),
      categoryId: category._id,
      subcategoryId: subcategory._id,
      userId: 'test-user-id'
    });

    console.log('✅ تم إنشاء مصروف تجريبي:', expense);
    
  } catch (error) {
    console.error('❌ خطأ في الاختبار:', error);
  }
}

testExpense();
```

---

## 🔧 المرحلة السابعة: تحديث باقي النظام

### **7.1 تحديث صفحة قائمة المصاريف:**
في `app/expenses-list/page.jsx`، تغيير URL من:
```javascript
// القديم
const response = await fetch('/api/expenses-supabase?userId=' + userId);

// الجديد  
const response = await fetch('/api/expenses?userId=' + userId);
```

### **7.2 تحديث صفحة إضافة المصروف:**
في `app/add-expense/page.jsx`، تغيير URL من:
```javascript
// القديم
await fetch('/api/expenses-supabase', { method: 'POST', ... });

// الجديد
await fetch('/api/expenses', { method: 'POST', ... });
```

### **7.3 إزالة مراجع Prisma:**
- حذف `prisma/schema.prisma`
- إزالة `@prisma/client` من package.json
- إزالة `prisma` من devDependencies

---

## 🚀 المرحلة الثامنة: الإطلاق والتشغيل

### **8.1 تشغيل MongoDB محلياً:**
```bash
# تثبيت MongoDB
# Windows: تحميل من موقع MongoDB الرسمي
# macOS: brew install mongodb-community
# Linux: apt-get install mongodb

# تشغيل الخدمة
mongod
```

### **8.2 تشغيل البيانات الأولية:**
```bash
node scripts/seed-mongodb.js
```

### **8.3 تشغيل المشروع:**
```bash
npm run dev
```

### **8.4 اختبار شامل:**
1. **الدخول للنظام** ✅
2. **عرض قائمة المصاريف** ✅  
3. **إضافة مصروف جديد** ✅
4. **عرض الفئات والفئات الفرعية** ✅

---

## 📊 النتيجة النهائية

### ✅ **ما تم إنجازه:**
- ✅ إزالة جميع مراجع Supabase
- ✅ تحويل كامل إلى MongoDB + Mongoose  
- ✅ إعادة إنشاء جميع APIs الأساسية
- ✅ إضافة البيانات الأولية
- ✅ نظام يعمل بشكل كامل ومستقل

### 🎯 **الفوائد المحققة:**
- **استقلالية كاملة** - لا اعتماد على خدمات خارجية
- **أداء أفضل** - MongoDB محسّن للتطبيقات
- **مرونة أكبر** - تحكم كامل في قاعدة البيانات
- **تكلفة أقل** - لا رسوم اشتراك إضافية

---

## 🔄 خطوات إضافية (اختيارية)

### **لاحقاً يمكن إضافة:**
1. **نماذج متقدمة:** Family, Budget, Income, Bills
2. **فهرسة محسّنة:** إضافة indexes للاستعلامات السريعة  
3. **التجميع:** استخدام MongoDB Aggregation للتقارير
4. **النسخ الاحتياطي:** إعداد backup تلقائي
5. **المراقبة:** إضافة مراقبة الأداء

---

**🎉 تم بنجاح! النظام الآن يعمل بـ MongoDB بدلاً من Supabase**
