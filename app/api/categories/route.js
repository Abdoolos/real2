import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb/connection';
import { Category } from '../../../lib/mongodb/models';

// Helper function for error responses
function errorResponse(message, status = 400) {
  return NextResponse.json({
    ok: false,
    error: message,
  }, { status });
}

// Helper function for success responses
function successResponse(data, status = 200) {
  return NextResponse.json({
    ok: true,
    data,
  }, { status });
}

// GET /api/categories - Get all categories
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const familyId = searchParams.get('familyId');
    
    // Build filter - get default categories and family-specific ones
    const filter = {
      $or: [
        { isDefault: true },
        ...(familyId ? [{ familyId, isDefault: false }] : [])
      ]
    };
    
    const categories = await Category.find(filter)
      .sort({ isDefault: -1, name: 1 });

    return successResponse(categories);

  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return errorResponse(
      `خطأ في جلب الفئات: ${error.message}`,
      500
    );
  }
}

// POST /api/categories - Create new category
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, icon, color, familyId } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return errorResponse('اسم الفئة مطلوب');
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({
      name: name.trim(),
      $or: [
        { familyId: familyId || null },
        { isDefault: true }
      ]
    });

    if (existingCategory) {
      return errorResponse('فئة بهذا الاسم موجودة بالفعل');
    }

    // Create category
    const category = await Category.create({
      name: name.trim(),
      icon: icon || '📝',
      color: color || '#3B82F6',
      isDefault: false,
      familyId: familyId || null,
    });

    return successResponse(category, 201);

  } catch (error) {
    console.error('❌ Error creating category:', error);
    return errorResponse(
      `خطأ في إنشاء الفئة: ${error.message}`,
      500
    );
  }
}
