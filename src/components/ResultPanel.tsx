import React, { useState } from 'react';
import { GenerationResult, GeneratedCopy } from '../types';
import { ImageGrid } from './ImageGrid';
import { CopyList } from './CopyList';

interface ResultPanelProps {
  result: GenerationResult | null;
  isLoading: boolean;
  loadingStep?: string;
  onSelectImage: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onDeleteCopy: (id: string) => void;
  onCopyText: (text: string) => void;
}

type TabType = 'images' | 'copies';

export const ResultPanel: React.FC<ResultPanelProps> = ({
  result,
  isLoading,
  loadingStep,
  onSelectImage,
  onDeleteImage,
  onDeleteCopy,
  onCopyText
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('images');

  const handleCopy = (copy: GeneratedCopy) => {
    const fullText = `${copy.title}\n${copy.subtitle ? copy.subtitle + '\n' : ''}${copy.promoText ? copy.promoText + '\n' : ''}${copy.description}`;
    onCopyText(fullText);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-3 border-4 border-primary-300 rounded-full border-b-transparent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        
        <div className="text-center space-y-3 max-w-md">
          <h3 className="text-xl font-semibold text-gray-800">AI 正在创作中</h3>
          
          {loadingStep && (
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-6 py-3 rounded-lg border border-primary-200">
              <p className="text-primary-700 font-medium text-base">{loadingStep}</p>
            </div>
          )}
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${loadingStep?.includes('📷') ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className={loadingStep?.includes('📷') ? 'text-green-700 font-medium' : ''}>分析商品图片</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${loadingStep?.includes('🎨') ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className={loadingStep?.includes('🎨') ? 'text-blue-700 font-medium' : ''}>生成电商主图</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${loadingStep?.includes('✍️') ? 'bg-purple-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className={loadingStep?.includes('✍️') ? 'text-purple-700 font-medium' : ''}>生成营销文案</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 pt-2">预计需要 30-90 秒，请耐心等待...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p className="text-lg font-medium">等待生成内容</p>
        <p className="text-sm mt-1">请在左侧填写商品信息并点击生成按钮</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('images')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'images'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          主图设计 ({result.images.length})
        </button>
        <button
          onClick={() => setActiveTab('copies')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'copies'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          文案内容 ({result.copies.length})
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'images' ? (
          <ImageGrid
            images={result.images}
            onSelect={onSelectImage}
            onDelete={onDeleteImage}
          />
        ) : (
          <CopyList
            copies={result.copies}
            onCopy={handleCopy}
            onDelete={onDeleteCopy}
          />
        )}
      </div>
    </div>
  );
};