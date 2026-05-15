import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductInput, GenerationResult, ToastMessage, ConversationHistory } from '../types';
import { ProductForm } from '../components/ProductForm';
import { ResultPanel } from '../components/ResultPanel';
import { Toast } from '../components/Toast';
import { generateMultipleCopies, COPY_STYLES, analyzeImage } from '../services/aiService';
import { generateMultipleImages, IMAGE_STYLES as AI_IMAGE_STYLES } from '../services/imageService';
import { getTasks, addProductTask, deleteProductTask, ProductTask, initializeData } from '../services/dataService';

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

const TEST_PRODUCTS: Array<{
  id: string;
  name: string;
  category: string;
  highlights: string;
  specs: Record<string, string>;
  originalPrice: number;
  currentPrice: number;
  image: null;
}> = [
  {
    id: '1',
    name: '小米手环8 NFC版',
    category: '数码电子',
    highlights: '全新升级1.62英寸AMOLED跑道屏，150+运动模式，心率血氧睡眠监测，NFC门禁公交卡，14天超长续航，5ATM防水，支持微信支付宝离线支付，轻巧舒适佩戴体验',
    specs: { '品牌': '小米', '材质': 'TPU+金属', '尺寸': '47.2×21.6×10.9mm', '颜色': '曜石黑/星光粉/晴蓝', '适用人群': '运动爱好者' },
    originalPrice: 299,
    currentPrice: 249,
    image: null
  },
  {
    id: '2',
    name: '纯棉休闲T恤 男款基础款',
    category: '服装鞋包',
    highlights: '100%精梳棉面料，亲肤透气不闷热，220g重磅质感，宽松版型遮肉显瘦，多色可选，机洗不变形不起球，日常通勤百搭单品',
    specs: { '品牌': '优衣库同款', '材质': '100%棉', '尺码': 'S/M/L/XL/XXL', '颜色': '白色/黑色/灰色/藏青', '适用季节': '春夏秋' },
    originalPrice: 99,
    currentPrice: 59,
    image: null
  },
  {
    id: '3',
    name: '北欧风实木餐桌椅组合',
    category: '家居家电',
    highlights: '进口白橡木实木材质，环保水性漆工艺，简约北欧设计风格，1.4m长桌配4把椅子，稳固承重200kg，适合3-6人家庭使用，安装简单送工具包',
    specs: { '品牌': '原木生活', '材质': '白橡木+白蜡木', '尺寸': '140×80×75cm', '颜色': '原木色/胡桃色', '承重': '200kg' },
    originalPrice: 2599,
    currentPrice: 1899,
    image: null
  },
  {
    id: '4',
    name: '兰蔻小黑瓶精华液 50ml',
    category: '美妆护肤',
    highlights: '二裂酵母发酵产物溶胞物核心成分，修护肌肤屏障，改善细纹暗沉，质地清爽易吸收，7天可见肌肤透亮，敏感肌可用，专柜正品保障',
    specs: { '品牌': '兰蔻(LANCOME)', '容量': '50ml/100ml', '肤质': '所有肤质', '保质期': '3年', '产地': '法国' },
    originalPrice: 1080,
    currentPrice: 850,
    image: null
  }
];

export const TaskListPage: React.FC = () => {
  const location = useLocation();
  const [product, setProduct] = useState<ProductInput>({
    name: '',
    highlights: '',
    specs: {},
    originalPrice: 0,
    currentPrice: 0,
    category: '',
    mainImage: null
  });

  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [tasks, setTasks] = useState<ProductTask[]>([]);
  const [appliedTemplate, setAppliedTemplate] = useState<Template | null>(null);
  const templateAppliedRef = useRef(false);
  const [conversationHistories, setConversationHistories] = useState<ConversationHistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<ConversationHistory | null>(null);

  useEffect(() => {
    initializeData();
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  }, []);

  const addToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    if (location.state?.template && !templateAppliedRef.current) {
      templateAppliedRef.current = true;
      const template = location.state.template as Template;
      setAppliedTemplate(template);
      if (template.type === 'image') {
        addToast('info', `已应用主图模板：${template.name}`);
      } else {
        setProduct(prev => ({
          ...prev,
          highlights: template.content
        }));
        addToast('info', `已应用文案模板：${template.name}，文案已填充到卖点`);
      }
      window.history.replaceState({}, '');
    }
  }, [location.state, addToast]);

  useEffect(() => {
    const savedHistories = localStorage.getItem('conversationHistories');
    if (savedHistories) {
      try {
        const parsed = JSON.parse(savedHistories);
        setConversationHistories(parsed);
      } catch (error) {
        console.error('加载历史记录失败:', error);
      }
    }
  }, []);

  const saveConversationHistory = (productInput: ProductInput, generationResult: GenerationResult, imageAnalysis?: string) => {
    const newHistory: ConversationHistory = {
      id: `history-${Date.now()}`,
      productName: productInput.name,
      productInput: productInput,
      result: generationResult,
      timestamp: new Date().toLocaleString(),
      imageAnalysis
    };

    const updatedHistories = [newHistory, ...conversationHistories];
    setConversationHistories(updatedHistories);
    localStorage.setItem('conversationHistories', JSON.stringify(updatedHistories));
  };

  const deleteConversationHistory = (id: string) => {
    const updatedHistories = conversationHistories.filter(h => h.id !== id);
    setConversationHistories(updatedHistories);
    localStorage.setItem('conversationHistories', JSON.stringify(updatedHistories));
    
    if (selectedHistory?.id === id) {
      setSelectedHistory(null);
    }
    
    addToast('info', '已删除该条历史记录');
  };

  const loadConversationHistory = (history: ConversationHistory) => {
    setProduct(history.productInput);
    setResult(history.result);
    setSelectedHistory(history);
    addToast('success', `已加载历史记录：${history.productName}`);
  };

  const handleDeleteTask = (taskId: string) => {
    const success = deleteProductTask(taskId);
    if (success) {
      setTasks(getTasks());
      addToast('success', '已删除该任务');
    } else {
      addToast('error', '删除失败');
    }
  };

  const validateForm = (): boolean => {
    if (!product.name.trim()) {
      addToast('error', '请输入商品名称');
      return false;
    }
    if (!product.highlights.trim()) {
      addToast('error', '请输入商品卖点');
      return false;
    }
    return true;
  };

  const generateResults = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setLoadingStep('准备生成内容...');
    addToast('info', '正在调用 AI 生成内容，请稍候...');

    try {
      let imageAnalysis = '';
      
      if (product.mainImage) {
        setLoadingStep('📷 正在分析商品图片...');
        addToast('info', '📷 正在分析商品图片...');
        try {
          imageAnalysis = await analyzeImage(product.mainImage);
          if (imageAnalysis) {
            addToast('success', `✅ 图片分析完成！已识别商品特征`);
          }
        } catch (imageError) {
          console.error('图片分析失败，将使用文字信息生成:', imageError);
          addToast('warning', '⚠️ 图片分析失败，将使用文字信息生成');
        }
      } else {
        addToast('info', 'ℹ️ 未检测到商品图片，将使用文字信息生成');
      }

      setLoadingStep(`🎨 正在通过 Seedream 模型生成 ${AI_IMAGE_STYLES.length} 张电商风格主图...`);
      addToast('info', `🎨 正在通过 Seedream 模型生成 ${AI_IMAGE_STYLES.length} 张电商风格主图...`);
      
      const images = await generateMultipleImages(product, AI_IMAGE_STYLES.length, imageAnalysis);

      setLoadingStep(`✍️ 正在生成 ${COPY_STYLES.length} 种风格的 AI 文案...`);
      addToast('info', `✍️ 正在生成 ${COPY_STYLES.length} 种风格的 AI 文案...`);
      
      const copies = await generateMultipleCopies(product, COPY_STYLES.length, imageAnalysis);

      if (copies.length === 0) {
        throw new Error('AI 文案生成失败');
      }

      const newResult = { images, copies };
      setResult(newResult);
      setIsLoading(false);
      setLoadingStep('');
      
      saveConversationHistory(product, newResult, imageAnalysis);
      
      const aiGeneratedCount = images.filter(img => !img.style.includes('(模拟)')).length;
      addToast('success', 
        `🎉 生成成功！` +
        `\n📸 主图：${images.length} 张（AI生成: ${aiGeneratedCount}张）` +
        `\n✍️ 文案：${copies.length} 种风格` +
        `${imageAnalysis ? '\n🔍 已结合图片分析结果' : ''}`
      );

      const newTask = addProductTask({
        productName: product.name,
        category: product.category,
        brand: '',
        inputData: {
          mainImage: product.mainImage,
          highlights: product.highlights,
          specs: product.specs,
          originalPrice: product.originalPrice,
          currentPrice: product.currentPrice
        },
        aiGeneratedResult: {
          title: copies[0]?.subtitle || product.name,
          copywriting: {
            shortCopy: copies[0]?.promoText || '',
            detailCopy: copies.map(c => c.description).join('\n\n'),
            hashtags: '#商品推荐 #好物分享 #购物攻略'
          },
          generatedImages: images.map(img => ({
            style: img.style,
            url: img.imageUrl,
            prompt: '',
            generatedAt: new Date().toISOString()
          })),
          imageAnalysis: imageAnalysis
        }
      });
      
      setTasks(prev => [newTask, ...prev]);
    } catch (error) {
      console.error('生成失败:', error);
      setIsLoading(false);
      setLoadingStep('');
      addToast('error', '❌ AI 生成失败，请检查网络或 API 配置后重试');
    }
  };

  const handleSelectImage = (id: string) => {
    if (!result) return;
    setResult({
      ...result,
      images: result.images.map(img => ({
        ...img,
        selected: img.id === id ? !img.selected : img.selected
      }))
    });
  };

  const handleDeleteImage = (id: string) => {
    if (!result) return;
    setResult({
      ...result,
      images: result.images.filter(img => img.id !== id)
    });
    addToast('info', '已删除该主图');
  };

  const handleDeleteCopy = (id: string) => {
    if (!result) return;
    setResult({
      ...result,
      copies: result.copies.filter(copy => copy.id !== id)
    });
    addToast('info', '已删除该文案');
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast('success', '文案已复制到剪贴板');
    }).catch(() => {
      addToast('error', '复制失败，请手动复制');
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {appliedTemplate && (
        <div className="mb-4 bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm text-primary-800">
              当前使用模板：<strong>{appliedTemplate.name}</strong>
              <span className="text-primary-600 ml-2">({appliedTemplate.category})</span>
            </span>
          </div>
          <button
            onClick={() => setAppliedTemplate(null)}
            className="text-primary-500 hover:text-primary-700 text-sm font-medium"
          >
            清除模板
          </button>
        </div>
      )}
      <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-amber-800">快速测试 - 点击下方商品一键填充数据</span>
          </div>
          <button
            onClick={() => setProduct({ name: '', highlights: '', specs: {}, originalPrice: 0, currentPrice: 0, category: '', mainImage: null })}
            className="text-xs text-amber-600 hover:text-amber-700 font-medium"
          >
            清空
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TEST_PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setProduct({
                name: p.name,
                highlights: p.highlights,
                specs: { ...p.specs },
                originalPrice: p.originalPrice,
                currentPrice: p.currentPrice,
                category: p.category,
                mainImage: null
              })}
              className={`text-left px-3 py-2 rounded-lg border transition-all ${
                product.name === p.name
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-amber-200 bg-white hover:bg-amber-100 text-gray-700'
              }`}
            >
              <p className="font-medium text-sm truncate">{p.name}</p>
              <p className="text-xs opacity-70">{p.category}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-6 h-[calc(100vh-280px)]">
        <div className="w-2/5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">商品信息</h2>
            <ProductForm product={product} onProductChange={setProduct} />
            <div className="mt-6">
              <button
                onClick={generateResults}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    生成中...
                  </span>
                ) : (
                  '生成主图和文案'
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-3/5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">生成结果</h2>
            <ResultPanel
              result={result}
              isLoading={isLoading}
              loadingStep={loadingStep}
              onSelectImage={handleSelectImage}
              onDeleteImage={handleDeleteImage}
              onDeleteCopy={handleDeleteCopy}
              onCopyText={handleCopyText}
            />
          </div>
        </div>
      </div>

      {tasks.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 任务历史
            <span className="ml-2 text-sm font-normal text-gray-500">({tasks.length} 个任务)</span>
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.aiGeneratedResult.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">{task.productName}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded flex-shrink-0">{task.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                      <span>📸 {task.aiGeneratedResult.generatedImages?.length || 0} 张主图</span>
                      <span>✍️ {task.aiGeneratedResult.copywriting ? '已生成' : '未生成'}</span>
                      <span>🕐 {new Date(task.inputData.createdAt).toLocaleString()}</span>
                      {task.aiGeneratedResult.usageStats && (
                        <>
                          <span>👁️ {task.aiGeneratedResult.usageStats.views.toLocaleString()} 浏览</span>
                          <span>💰 ¥{task.aiGeneratedResult.usageStats.revenue.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      setProduct({
                        name: task.productName,
                        highlights: task.inputData.highlights,
                        specs: task.inputData.specs,
                        originalPrice: task.inputData.originalPrice,
                        currentPrice: task.inputData.currentPrice,
                        category: task.category,
                        mainImage: task.inputData.mainImage
                      });
                      setResult({
                        images: task.aiGeneratedResult.generatedImages?.map((img, idx) => ({
                          id: `img-${idx}`,
                          imageUrl: img.url,
                          style: img.style,
                          selected: false
                        })) || [],
                        copies: []
                      });
                      addToast('success', `已加载任务：${task.productName}`);
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded transition-colors"
                  >
                    重新编辑
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {conversationHistories.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              📝 对话历史
              <span className="ml-2 text-sm font-normal text-gray-500">({conversationHistories.length} 条记录)</span>
            </h3>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {conversationHistories.map((history) => (
              <div 
                key={history.id} 
                className={`p-4 rounded-lg border transition-all ${
                  selectedHistory?.id === history.id 
                    ? 'border-primary-300 bg-primary-50' 
                    : 'border-gray-200 bg-white hover:border-primary-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{history.productName}</h4>
                      {selectedHistory?.id === history.id && (
                        <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded">当前查看</span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>📸 {history.result.images.length} 张主图</span>
                      <span>✍️ {history.result.copies.length} 种文案</span>
                      <span>🕐 {history.timestamp}</span>
                    </div>

                    {selectedHistory?.id === history.id && history.imageAnalysis && (
                      <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-xs font-medium text-blue-800 mb-1">🔍 图片分析结果：</p>
                        <pre className="text-xs text-blue-700 whitespace-pre-wrap">{history.imageAnalysis}</pre>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => loadConversationHistory(history)}
                      className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded transition-colors"
                    >
                      查看详情
                    </button>
                    <button
                      onClick={() => deleteConversationHistory(history.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};