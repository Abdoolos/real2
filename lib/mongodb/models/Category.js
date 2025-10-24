import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  icon: { 
    type: String, 
    default: '📝' 
  },
  color: { 
    type: String, 
    default: '#3B82F6' 
  },
  isDefault: { 
    type: Boolean, 
    default: false 
  },
  familyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Family',
    default: null 
  }
}, {
  timestamps: true
});

// إضافة فهرس للبحث السريع
CategorySchema.index({ name: 1, familyId: 1 });
CategorySchema.index({ isDefault: -1 });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
