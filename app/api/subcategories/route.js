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
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/subcategories?select=*,category:categories(*)`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Supabase REST API failed: ${response.status}`);
  }
  
  return response.json();
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
    const formattedFallback = fallbackSubcategories.map(sub => ({
      id: sub.id,
      name: sub.name,
      category_id: sub.id, // استخدام نفس الـ ID مؤقتاً
      categoryId: sub.id,
      is_active: true,
      usage_count: 0,
      category: {
        id: sub.id,
        name: sub.category_name
      }
    }));

    console.log(`✅ [API] تم تحميل ${formattedFallback.length} بند من البيانات الاحتياطية`);
    console.log('📝 [API] عينة من البنود الاحتياطية:', formattedFallback.slice(0, 3).map(s => `${s.name} (${s.category.name})`));
    
    return NextResponse.json({
      success: true,
      data: formattedFallback,
      count: formattedFallback.length,
      source: 'fallback',
      warning: 'Using fallback data due to database connection issue'
    });
  }
}
