import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  category_id: { 
    type: String, 
    required: true 
  },
  usage_count: { 
    type: Number, 
    default: 0,
    min: 0 
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

// إضافة فهرس للبحث السريع
SubcategorySchema.index({ category_id: 1 });
SubcategorySchema.index({ name: 1, category_id: 1 });
SubcategorySchema.index({ usage_count: -1 }); // للبحث حسب الأكثر استخداماً

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
