import React, { useState } from 'react';
import { GeneratedImage } from '../types';

interface ImageGridProps {
  images: GeneratedImage[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onSelect, onDelete }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>暂无生成的主图</p>
        <p className="text-sm mt-1">请填写商品信息并点击生成按钮</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative group rounded-xl overflow-hidden border-2 transition-all ${
              image.selected ? 'border-primary-500 shadow-lg' : 'border-gray-200'
            }`}
          >
            <div
              onClick={() => setPreviewImage(image.imageUrl)}
              className="cursor-pointer"
            >
              <img
                src={image.imageUrl}
                alt={image.style}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-sm">{image.style}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onSelect(image.id)}
                className={`p-2 rounded-full transition-colors ${
                  image.selected
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/90 text-gray-700 hover:bg-primary-500 hover:text-white'
                }`}
                title={image.selected ? '取消选择' : '选择'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(image.id)}
                className="p-2 bg-white/90 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                title="删除"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            {image.selected && (
              <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                已选择
              </div>
            )}
          </div>
        ))}
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};