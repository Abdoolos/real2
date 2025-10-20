'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HelpCircle, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllFAQs, getFAQCategories, searchFAQs } from '@/src/agents/knowledgeBase';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const allFAQs = getAllFAQs();
  const categories = getFAQCategories();

  // الأسئلة المفلترة
  const filteredFAQs = React.useMemo(() => {
    let faqs = allFAQs;

    if (searchQuery.trim()) {
      faqs = searchFAQs(searchQuery);
    }

    if (selectedCategory !== 'الكل') {
      faqs = faqs.filter(faq => faq.category === selectedCategory);
    }

    return faqs;
  }, [searchQuery, selectedCategory, allFAQs]);

  const toggleQuestion = (id) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-emerald-800">الأسئلة الشائعة</h1>
        </div>
        <p className="text-emerald-600 max-w-2xl mx-auto">
          جميع الإجابات التي تحتاجها عن تطبيق ريال مايند
        </p>
      </motion.div>

      {/* Search and Filters */}
      <Card className="border-emerald-200">
        <CardContent className="p-6">
          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة الشائعة..."
              className="pr-10 pl-10 h-12 border-emerald-200 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 ml-2">الفئات:</span>
            <Button
              size="sm"
              variant={selectedCategory === 'الكل' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('الكل')}
              className={selectedCategory === 'الكل' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              الكل ({allFAQs.length})
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.name}
                size="sm"
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.name)}
                className={selectedCategory === cat.name ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {cat.icon} {cat.name} ({cat.count})
              </Button>
            ))}
          </div>

          {/* Expand/Collapse All */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-emerald-100">
            <Button size="sm" variant="ghost" onClick={expandAll} className="text-emerald-600">
              <ChevronDown className="w-4 h-4 ml-1" />
              فتح الكل
            </Button>
            <Button size="sm" variant="ghost" onClick={collapseAll} className="text-emerald-600">
              <ChevronUp className="w-4 h-4 ml-1" />
              إغلاق الكل
            </Button>
            <div className="mr-auto">
              <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                {filteredFAQs.length} سؤال
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card className="border-emerald-200">
            <CardContent className="p-12 text-center">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">لم يتم العثور على أسئلة مطابقة</p>
              <p className="text-gray-400 text-sm mt-2">جرب البحث بكلمات مختلفة</p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq, index) => {
            const isExpanded = expandedQuestions.has(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-emerald-200 hover:border-emerald-300 transition-all">
                  <CardHeader
                    className="cursor-pointer hover:bg-emerald-50/50 transition-colors p-4"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl flex-shrink-0 mt-1">{faq.categoryIcon}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-emerald-800 leading-relaxed">
                            {faq.question}
                          </h3>
                          <Badge variant="outline" className="mt-2 text-xs border-emerald-200 text-emerald-600">
                            {faq.category}
                          </Badge>
                        </div>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="px-4 pb-4 pt-0">
                        <div className="pr-11 bg-emerald-50/50 rounded-lg p-4 border-r-4 border-emerald-500">
                          <p className="text-emerald-900 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer Help */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardContent className="p-6 text-center">
          <HelpCircle className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-emerald-600 mb-4">
            تواصل معنا وسنكون سعداء بمساعدتك
          </p>
          <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
            تواصل معنا
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
