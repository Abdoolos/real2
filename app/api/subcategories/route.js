import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { fallbackSubcategories } from './fallback-data.js';

// استخدام singleton pattern لـ Prisma Client مع connection pooling محسّن
const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

const prisma = globalForPrisma.prisma;

// Helper للاتصال بـ Supabase REST API مباشرةً
async function fetchSubcategoriesFromSupabase() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🔗 [Supabase] URL:', SUPABASE_URL);
  console.log('🔑 [Supabase] Key exists:', !!SUPABASE_KEY);
  
  // جرب أسماء الجداول المختلفة (case-sensitive في PostgreSQL)
  const tableNames = ['Subcategory', 'subcategories', 'subcategory'];
  
  for (const tableName of tableNames) {
    try {
      console.log(`📡 [Supabase] محاولة جلب من جدول: ${tableName}`);
      
      const url = `${SUPABASE_URL}/rest/v1/${tableName}?select=*,category:Category(*)`;
      const response = await fetch(url, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ [Supabase] نجح من ${tableName}: ${data.length} بند`);
        return data;
      } else {
        console.warn(`⚠️ [Supabase] ${tableName} فشل: ${response.status}`);
      }
    } catch (err) {
      console.warn(`⚠️ [Supabase] ${tableName} خطأ:`, err.message);
    }
  }
  
  throw new Error('All Supabase table names failed');
}

// Helper function for retry logic
async function withRetry(fn, retries = 2, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`❌ محاولة ${i + 1} فشلت:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

export async function GET() {
  try {
    console.log('🔍 [API] جلب البنود من قاعدة البيانات...');
    
    let subcategories;
    let source = 'database';
    
    // المحاولة 1: Prisma (اتصال مباشر بـ PostgreSQL)
    try {
      subcategories = await withRetry(async () => {
        return await prisma.subcategory.findMany({
          include: {
            category: true
          },
          orderBy: {
            name: 'asc'
          }
        });
      });
      console.log(`✅ [Prisma] تم العثور على ${subcategories.length} بند`);
    } catch (prismaError) {
      console.warn('⚠️ [Prisma] فشل الاتصال:', prismaError.message);
      
      // المحاولة 2: Supabase REST API
      try {
        console.log('🔄 [API] محاولة استخدام Supabase REST API...');
        const supabaseData = await fetchSubcategoriesFromSupabase();
        
        // تحويل البيانات من Supabase إلى تنسيق Prisma
        subcategories = supabaseData.map(sub => ({
          id: sub.id,
          name: sub.name,
          categoryId: sub.category_id,
          category: sub.category
        }));
        
        source = 'supabase-rest';
        console.log(`✅ [Supabase REST] تم العثور على ${subcategories.length} بند`);
      } catch (supabaseError) {
        console.error('❌ [Supabase REST] فشل أيضاً:', supabaseError.message);
        throw prismaError; // استخدام الخطأ الأصلي
      }
    }

    // تحويل البيانات لتتوافق مع توقعات الواجهة الأمامية
    const formattedSubcategories = subcategories.map(sub => ({
      id: sub.id,
      name: sub.name,
      category_id: sub.categoryId, // ✅ الحقل من Prisma
      categoryId: sub.categoryId,
      is_active: true,
      usage_count: 0,
      category: {
        id: sub.category.id,
        name: sub.category.name
      }
    }));

    console.log('📝 [API] عينة من البيانات:', formattedSubcategories.slice(0, 3).map(s => 
      `${s.name} (category_id: ${s.category_id}, category: ${s.category.name})`
    ));

    return NextResponse.json({
      success: true,
      data: formattedSubcategories,
      count: formattedSubcategories.length,
      source: source
    });
  } catch (error) {
    console.error('❌ [API] فشل الاتصال بقاعدة البيانات:', error.message);
    console.log('🔄 [API] استخدام البيانات الاحتياطية...');
    
    // استخدام البيانات الاحتياطية عند فشل الاتصال
    // ⚠️ المشكلة: البيانات الاحتياطية لا تحتوي على category_id صحيح
    // الحل: إرجاع البيانات الاحتياطية مع علامة للواجهة الأمامية لمطابقة الفئات
    const formattedFallback = fallbackSubcategories.map(sub => ({
      id: sub.id,
      name: sub.name,
      category_id: null, // ✅ null بدلاً من ID خاطئ
      categoryId: null,
      is_active: true,
      usage_count: 0,
      category: {
        id: null,
        name: sub.category_name // الواجهة ستطابق هذا الاسم مع الفئات
      }
    }));

    console.log(`✅ [API] تم تحميل ${formattedFallback.length} بند من البيانات الاحتياطية`);
    console.log('⚠️ [API] تحذير: category_id = null - الواجهة ستطابق حسب category.name');
    console.log('📝 [API] عينة من البنود الاحتياطية:', formattedFallback.slice(0, 3).map(s => `${s.name} (${s.category.name})`));
    
    return NextResponse.json({
      success: true,
      data: formattedFallback,
      count: formattedFallback.length,
      source: 'fallback',
      warning: 'Using fallback data - categories will be matched by name on frontend'
    });
  }
}
