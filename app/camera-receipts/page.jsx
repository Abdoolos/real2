'use client'

import { Camera, Upload, CheckCircle, XCircle, Loader2, Save, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CameraReceiptsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // محاكاة المعالجة
    setTimeout(() => {
      setIsProcessing(false);
      alert('تم رفع الإيصال بنجاح!');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Camera className="mx-auto mb-4 text-blue-600" size={48} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            رفع صور الإيصالات
          </h1>
          <p className="text-gray-600">
            قم برفع صور الإيصالات لاستخراج البيانات تلقائياً
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {!selectedFile ? (
              <div>
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500 font-medium">
                    اختر صورة الإيصال
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="mt-2 text-gray-500">أو اسحب الصورة هنا</p>
              </div>
            ) : (
              <div>
                {isProcessing ? (
                  <div className="text-center">
                    <Loader2 className="mx-auto mb-4 text-blue-600 animate-spin" size={48} />
                    <p className="text-blue-600 font-medium">جاري معالجة الإيصال...</p>
                  </div>
                ) : (
                  <div>
                    <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
                    <p className="text-gray-700 mb-4">
                      الملف: {selectedFile.name}
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleUpload}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        <Save size={16} />
                        رفع ومعالجة
                      </button>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        <Trash2 size={16} />
                        إلغاء
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Camera className="mx-auto mb-2 text-blue-600" size={24} />
              <h3 className="font-medium text-gray-900">التقط صورة</h3>
              <p className="text-sm text-gray-600">استخدم كاميرا الهاتف</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Eye className="mx-auto mb-2 text-green-600" size={24} />
              <h3 className="font-medium text-gray-900">معالجة ذكية</h3>
              <p className="text-sm text-gray-600">استخراج البيانات تلقائياً</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Save className="mx-auto mb-2 text-purple-600" size={24} />
              <h3 className="font-medium text-gray-900">حفظ تلقائي</h3>
              <p className="text-sm text-gray-600">إضافة للمصاريف مباشرة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
