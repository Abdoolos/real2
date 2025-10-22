// lib/supabase/client.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions للعمليات الشائعة
export const supabaseHelpers = {
  // جلب المصاريف
  async getExpenses(userId, filters = {}) {
    let query = supabase
      .from('expenses')
      .select(`
        *,
        category:categories(*),
        subcategory:subcategories(*),
        user:users(*)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId)
    }
    
    if (filters.subcategoryId) {
      query = query.eq('subcategory_id', filters.subcategoryId)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  // إضافة مصروف
  async createExpense(expenseData) {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expenseData])
      .select()
      
    if (error) throw error
    return data[0]
  },

  // جلب الفئات الفرعية
  async getSubcategories() {
    const { data, error } = await supabase
      .from('subcategories')
      .select(`
        *,
        category:categories(*)
      `)
      .order('name')
      
    if (error) throw error
    return data
  },

  // جلب الفئات
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
      
    if (error) throw error
    return data
  }
}
