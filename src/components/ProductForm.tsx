import React from 'react';
import { ProductInput } from '../types';
import { ImageUploader } from './ImageUploader';
import { SpecsEditor } from './SpecsEditor';

interface ProductFormProps {
  product: ProductInput;
  onProductChange: (product: ProductInput) => void;
  disabled?: boolean;
}

const CATEGORIES = [
  '服装鞋包',
  '数码电子',
  '家居家电',
  '美妆护肤',
  '食品饮料',
  '母婴玩具',
  '运动户外',
  '图书文具',
  '其他'
];

export const ProductForm: React.FC<ProductFormProps> = ({ product, onProductChange, disabled = false }) => {
  const handleChange = (field: keyof ProductInput, value: any) => {
    onProductChange({ ...product, [field]: value });
  };

  return (
    <div className={`space-y-6 relative ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      {disabled && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-lg z-10 flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-primary-200 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm font-medium text-primary-700">生成中，请稍候...</span>
          </div>
        </div>
      )}
      
      <ImageUploader
        image={product.mainImage}
        onImageChange={(img) => handleChange('mainImage', img)}
        disabled={disabled}
      />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            商品名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="请输入商品名称"
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            商品卖点 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={product.highlights}
            onChange={(e) => handleChange('highlights', e.target.value)}
            placeholder="请输入商品卖点/特色（最多200字）"
            maxLength={200}
            rows={3}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {product.highlights.length}/200
          </p>
        </div>

        <SpecsEditor
          specs={product.specs}
          onSpecsChange={(specs) => handleChange('specs', specs)}
          disabled={disabled}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">原价</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                value={product.originalPrice || ''}
                onChange={(e) => handleChange('originalPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={disabled}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">现价</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                value={product.currentPrice || ''}
                onChange={(e) => handleChange('currentPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={disabled}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">商品分类</label>
          <select
            value={product.category}
            onChange={(e) => handleChange('category', e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">请选择分类</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};