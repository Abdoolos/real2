import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  }
}, {
  timestamps: true
});

// إضافة فهرس للبحث السريع
SubcategorySchema.index({ categoryId: 1 });
SubcategorySchema.index({ name: 1, categoryId: 1 });

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
