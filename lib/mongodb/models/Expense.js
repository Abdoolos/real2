import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  family_id: { 
    type: String,
    default: null 
  },
  user_id: { 
    type: String, 
    required: true 
  },
  category_id: { 
    type: String, 
    required: true 
  },
  subcategory_id: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0 
  },
  currency: { 
    type: String, 
    required: true,
    default: 'SAR' 
  },
  amount_in_sar: { 
    type: Number, 
    required: true,
    min: 0 
  },
  exchange_rate: { 
    type: Number, 
    required: true,
    min: 0,
    default: 1 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  note: { 
    type: String,
    default: null 
  },
  receipt_url: { 
    type: String,
    default: null 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: false // نستخدم created_at و updated_at بدلاً من timestamps
});

// إضافة فهارس للبحث السريع والأداء المحسن
ExpenseSchema.index({ user_id: 1, date: -1 }); // الأهم للاستعلامات
ExpenseSchema.index({ category_id: 1 });
ExpenseSchema.index({ date: -1 });
ExpenseSchema.index({ family_id: 1, date: -1 });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
