import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '../../../lib/mongodb/connection';
import { Expense, Category, Subcategory } from '../../../lib/mongodb/models';

// Validation schemas
const CreateExpenseSchema = z.object({
  amount: z.number().positive('المبلغ يجب أن يكون أكبر من صفر'),
  description: z.string().min(1, 'الوصف مطلوب').max(255, 'الوصف طويل جداً'),
  categoryId: z.string().min(1, 'الفئة مطلوبة'),
  subcategoryId: z.string().optional(),
  date: z.string().datetime('تاريخ غير صحيح'),
  notes: z.string().max(500, 'الملاحظات طويلة جداً').optional(),
  userId: z.string().min(1, 'معرف المستخدم مطلوب'),
  familyId: z.string().optional(),
});

const GetExpensesSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  maxAmount: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  orderBy: z.enum(['date', 'amount', 'createdAt']).optional().default('date'),
  orderDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  userId: z.string().optional(),
  familyId: z.string().optional(),
});

// Helper function for error responses
function errorResponse(message: string, code: string = 'VALIDATION_ERROR', status: number = 400) {
  return NextResponse.json({
    ok: false,
    code,
    message,
  }, { status });
}

// Helper function for success responses
function successResponse(data: any, status: number = 200) {
  return NextResponse.json({
    ok: true,
    data,
  }, { status });
}

// GET /api/expenses - Get expenses with filters and pagination
export async function GET(request: NextRequest) {
  let queryParams: any = {};
  
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validationResult = GetExpensesSchema.safeParse(queryParams);
    if (!validationResult.success) {
      return errorResponse(
        'معاملات البحث غير صحيحة: ' + validationResult.error.errors.map(e => e.message).join(', ')
      );
    }

    const {
      page,
      limit,
      categoryId,
      subcategoryId,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      orderBy,
      orderDirection,
      userId,
      familyId,
    } = validationResult.data;

    // Build MongoDB filters
    const mongoFilters: any = {};
    
    if (userId) mongoFilters.userId = userId;
    if (familyId) mongoFilters.familyId = familyId;
    if (categoryId) mongoFilters.categoryId = categoryId;
    if (subcategoryId) mongoFilters.subcategoryId = subcategoryId;
    
    if (startDate || endDate) {
      mongoFilters.date = {};
      if (startDate) mongoFilters.date.$gte = new Date(startDate);
      if (endDate) mongoFilters.date.$lte = new Date(endDate);
    }
    
    if (minAmount || maxAmount) {
      mongoFilters.amount = {};
      if (minAmount) mongoFilters.amount.$gte = minAmount;
      if (maxAmount) mongoFilters.amount.$lte = maxAmount;
    }

    // Build sort options
    const sortOptions: any = {};
    sortOptions[orderBy] = orderDirection === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    const actualLimit = Math.min(limit, 100); // Max 100 items per page

    // Get expenses with populated fields
    const expenses = await Expense.find(mongoFilters)
      .populate('categoryId', 'name icon color')
      .populate('subcategoryId', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(actualLimit);

    // Get total count for pagination
    const totalCount = await Expense.countDocuments(mongoFilters);
    const totalPages = Math.ceil(totalCount / actualLimit);

    const result = {
      expenses,
      pagination: {
        page,
        limit: actualLimit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };

    return successResponse(result);

  } catch (error) {
    console.error('❌ Error fetching expenses:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      queryParams
    });
    return errorResponse(
      `خطأ في جلب المصاريف: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      'FETCH_ERROR',
      500
    );
  }
}

// POST /api/expenses - Create new expense
export async function POST(request: NextRequest) {
  let body: any = {};
  
  try {
    await connectDB();
    
    body = await request.json();

    // Validate request body
    const validationResult = CreateExpenseSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(
        'بيانات غير صحيحة: ' + validationResult.error.errors.map(e => e.message).join(', ')
      );
    }

    const { amount, description, categoryId, subcategoryId, date, notes, userId, familyId } = validationResult.data;

    // Create expense
    const expense = await Expense.create({
      amount,
      description,
      categoryId,
      subcategoryId: subcategoryId || null,
      date: new Date(date),
      notes: notes || null,
      userId,
      familyId: familyId || null,
    });

    // Get expense with populated fields for response
    const expenseWithDetails = await Expense.findById(expense._id)
      .populate('categoryId', 'name icon color')
      .populate('subcategoryId', 'name');

    return successResponse(expenseWithDetails, 201);

  } catch (error) {
    console.error('❌ Error creating expense:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      body: body
    });
    return errorResponse(
      `خطأ في إنشاء المصروف: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      'CREATE_ERROR',
      500
    );
  }
}
