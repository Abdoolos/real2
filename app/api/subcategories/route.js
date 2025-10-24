import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb/connection';
import { Subcategory } from '../../../lib/mongodb/models';

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

// GET /api/subcategories - Get subcategories with optional category filter
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    // Build filter
    const filter = categoryId ? { categoryId } : {};
    
    const subcategories = await Subcategory.find(filter)
      .populate('categoryId', 'name icon color')
      .sort({ name: 1 });

    // Format data to match frontend expectations
    const formattedSubcategories = subcategories.map(sub => ({
      id: sub._id,
      name: sub.name,
      category_id: sub.categoryId._id,
      categoryId: sub.categoryId._id,
      is_active: true,
      usage_count: 0,
      category: {
        id: sub.categoryId._id,
        name: sub.categoryId.name,
        icon: sub.categoryId.icon,
        color: sub.categoryId.color
      }
    }));

    return NextResponse.json({
      success: true,
      data: formattedSubcategories,
      count: formattedSubcategories.length,
      source: 'mongodb'
    });

  } catch (error) {
    console.error('❌ Error fetching subcategories:', error);
    return errorResponse(
      `خطأ في جلب الفئات الفرعية: ${error.message}`,
      500
    );
  }
}

// POST /api/subcategories - Create new subcategory
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, categoryId } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return errorResponse('اسم الفئة الفرعية مطلوب');
    }

    if (!categoryId) {
      return errorResponse('معرف الفئة مطلوب');
    }

    // Check if subcategory already exists in this category
    const existingSubcategory = await Subcategory.findOne({
      name: name.trim(),
      categoryId
    });

    if (existingSubcategory) {
      return errorResponse('فئة فرعية بهذا الاسم موجودة بالفعل في هذه الفئة');
    }

    // Create subcategory
    const subcategory = await Subcategory.create({
      name: name.trim(),
      categoryId,
    });

    // Get subcategory with populated category for response
    const subcategoryWithDetails = await Subcategory.findById(subcategory._id)
      .populate('categoryId', 'name icon color');

    return successResponse(subcategoryWithDetails, 201);

  } catch (error) {
    console.error('❌ Error creating subcategory:', error);
    return errorResponse(
      `خطأ في إنشاء الفئة الفرعية: ${error.message}`,
      500
    );
  }
}
