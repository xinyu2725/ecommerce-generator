import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  type: 'image' | 'copy';
  category: string;
  preview: string;
  content: string;
  createdAt: string;
  favorited: boolean;
}

const initialTemplates: Template[] = [
  {
    id: '1',
    name: '简约风格主图',
    type: 'image',
    category: '主图模板',
    preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    content: '简约风格主图模板，适合各类商品',
    createdAt: '2024-01-15',
    favorited: true
  },
  {
    id: '2',
    name: '促销文案模板',
    type: 'copy',
    category: '文案模板',
    preview: '',
    content: '🔥限时特惠🔥\n{{product_name}}\n原价：¥{{original_price}}\n现价：¥{{current_price}}\n立即抢购，错过不再有！',
    createdAt: '2024-01-14',
    favorited: true
  },
  {
    id: '3',
    name: '轻奢风格主图',
    type: 'image',
    category: '主图模板',
    preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    content: '轻奢风格主图模板，适合高端商品',
    createdAt: '2024-01-13',
    favorited: false
  },
  {
    id: '4',
    name: '新品上市文案',
    type: 'copy',
    category: '文案模板',
    preview: '',
    content: '🎉新品上市🎉\n{{product_name}}\n{{highlights}}\n新品体验价：¥{{current_price}}',
    createdAt: '2024-01-12',
    favorited: true
  },
  {
    id: '5',
    name: '活力清新风格',
    type: 'image',
    category: '主图模板',
    preview: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
    content: '活力清新风格主图模板，适合年轻群体',
    createdAt: '2024-01-11',
    favorited: false
  },
  {
    id: '6',
    name: '品质保障文案',
    type: 'copy',
    category: '文案模板',
    preview: '',
    content: '✅品质保障 ✅\n{{product_name}}\n{{highlights}}\n让您购物无忧！',
    createdAt: '2024-01-10',
    favorited: false
  }
];

export const TemplateLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [filter, setFilter] = useState<'all' | 'image' | 'copy'>('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(t => {
    if (showFavorites && !t.favorited) return false;
    if (filter !== 'all' && t.type !== filter) return false;
    return true;
  });

  const toggleFavorite = (id: string) => {
    setTemplates(prev => prev.map(t =>
      t.id === id ? { ...t, favorited: !t.favorited } : t
    ));
  };

  const handleUseTemplate = (template: Template) => {
    navigate('/tasks', { state: { template } });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">模板库</h2>
          <p className="text-gray-600">收藏和管理您的图文模板，快速复用</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          创建模板
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'all' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'image' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            主图模板
          </button>
          <button
            onClick={() => setFilter('copy')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'copy' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            文案模板
          </button>
        </div>

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showFavorites
              ? 'bg-red-100 text-red-600 border border-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill={showFavorites ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          我的收藏
        </button>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p>暂无模板</p>
          <p className="text-sm mt-1">创建或收藏模板后将在此处显示</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {template.type === 'image' ? (
                <div className="aspect-square bg-gray-100">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded mt-1 inline-block">
                      {template.category}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <svg
                      className={`w-5 h-5 ${template.favorited ? 'text-red-500' : 'text-gray-400'}`}
                      fill={template.favorited ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{template.content}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 px-3 py-2 text-sm text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    预览
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    使用
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTemplate.name}</h3>
                  <span className="text-sm text-primary-600">{selectedTemplate.category}</span>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedTemplate.type === 'image' ? (
                <img
                  src={selectedTemplate.preview.replace('w=200&h=200', 'w=600&h=600')}
                  alt={selectedTemplate.name}
                  className="w-full rounded-lg mb-4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{selectedTemplate.content}</pre>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedTemplate.content);
                  }}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  复制内容
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  编辑模板
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};