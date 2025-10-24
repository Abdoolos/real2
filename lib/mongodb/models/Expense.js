import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true,
    min: 0 
  },
  description: { 
    type: String, 
    required: true,
    trim: true 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  notes: { 
    type: String,
    trim: true 
  },
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
    type: String, // نستخدم String للتوافق مع NextAuth
    required: true 
  },
  familyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Family'
  }
}, {
  timestamps: true
});

// إضافة فهارس للبحث السريع والأداء المحسن
ExpenseSchema.index({ userId: 1, date: -1 }); // الأهم للاستعلامات
ExpenseSchema.index({ categoryId: 1 });
ExpenseSchema.index({ date: -1 });
ExpenseSchema.index({ familyId: 1, date: -1 });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
