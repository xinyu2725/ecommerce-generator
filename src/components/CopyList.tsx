import React from 'react';
import { GeneratedCopy } from '../types';

interface CopyListProps {
  copies: GeneratedCopy[];
  onCopy: (copy: GeneratedCopy) => void;
  onDelete: (id: string) => void;
}

export const CopyList: React.FC<CopyListProps> = ({ copies, onCopy, onDelete }) => {
  if (copies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>暂无生成的文案</p>
        <p className="text-sm mt-1">请填写商品信息并点击生成按钮</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {copies.map((copy) => (
        <div
          key={copy.id}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              {copy.style && (
                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full mb-1">
                  🤖 {copy.style}
                </span>
              )}
              <h4 className="text-lg font-semibold text-gray-900">{copy.title}</h4>
              {copy.subtitle && (
                <p className="text-primary-600 text-sm mt-1">{copy.subtitle}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onCopy(copy)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="复制文案"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(copy.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="删除"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {copy.promoText && (
            <div className="mb-3">
              <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                {copy.promoText}
              </span>
            </div>
          )}

          <p className="text-gray-600 text-sm leading-relaxed">{copy.description}</p>
        </div>
      ))}
    </div>
  );
};