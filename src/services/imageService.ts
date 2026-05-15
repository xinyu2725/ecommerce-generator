const VOLC_API_KEY = import.meta.env.VITE_VOLC_API_KEY || 'ark-789741ec-82cb-4ec6-99d6-970cb896a116-76934';
const VOLC_API_URL = import.meta.env.VITE_VOLC_API_URL || 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const MODEL_ID = import.meta.env.VITE_VOLC_MODEL_ID || 'doubao-seedream-4-5-251128';

export interface ImageStyle {
  name: string;
  promptTemplate: (product: any, imageAnalysis?: string) => string;
}

export const IMAGE_STYLES: ImageStyle[] = [
  {
    name: '抖音电商首图',
    promptTemplate: (product, imageAnalysis) => {
      const base = `${product.name || '商品'}专业电商产品摄影图`;
      const category = product.category ? `，${product.category}类目` : '';
      const features = product.highlights ? `，${product.highlights}` : '';
      const visualInfo = imageAnalysis ? `，图片分析显示：${imageAnalysis.substring(0, 100)}` : '';
      
      return `${base}${category}${features}${visualInfo}。
要求：高质量商业摄影风格，白色或渐变背景，专业打光，产品居中构图，清晰锐利焦点，
适合抖音/快手电商主图使用，色彩鲜艳吸引眼球，高级质感，8K超清分辨率，照片级真实感`;
    }
  },
  {
    name: '小红书种草图',
    promptTemplate: (product, imageAnalysis) => {
      const base = `${product.name || '产品'}生活方式产品图`;
      const feature = product.highlights ? `，突出特点：${product.highlights.split('，')[0] || product.highlights.split('。')[0]}` : '';
      const scene = imageAnalysis?.includes('使用场景') ? `，场景：${imageAnalysis.match(/使用场景[：:](.+)/)?.[1] || '自然生活场景'}` : '，自然生活方式场景';
      
      return `${base}${feature}${scene}。
要求：Instagram/小红书美学风格，柔和自然光线，温暖色调，极简构图，
平铺或生活方式拍摄，温馨氛围，时尚潮流感，高端杂志品质，干净背景，
吸引年轻消费者，4K高清质量`;
    }
  },
  {
    name: '天猫旗舰店海报',
    promptTemplate: (product, _imageAnalysis) => {
      const base = `${product.name || '奢华产品'}高端广告海报`;
      const brand = Object.entries(product.specs || {}).find(([k]) => k === '品牌')?.[1];
      const brandText = brand ? `，${brand}品牌` : '';
      const highlights = product.highlights ? `，重点展示：${product.highlights}` : '';
      
      return `${base}${brandText}${highlights}。
要求：奢华广告摄影风格，戏剧性专业灯光效果，优雅构图，高级质感，
精致色彩搭配，白色或深色渐变背景配合微妙特效，高端零售海报设计，
适合天猫/京东旗舰店使用，电影级画质，超精细细节，8K分辨率`;
    }
  },
  {
    name: '直播带货场景图',
    promptTemplate: (product, imageAnalysis) => {
      const base = `${product.name || '产品'}直播展示图`;
      const usageScene = imageAnalysis?.match(/使用场景[：:](.+)/)?.[1] || '日常使用场景';
      const priceTag = product.currentPrice > 0 ? `，价格¥${product.currentPrice}醒目展示` : '';
      
      return `${base}，${usageScene}场景${priceTag}。
要求：直播电商广播风格，明亮均匀光照，产品清晰可见度强，
引人入胜的展示角度，专业直播设置，温馨有吸引力的氛围，
强烈的行动召唤感觉，适合淘宝直播/抖音直播使用，细节清晰锐利，色彩鲜艳生动`;
    }
  }
];

interface GenerateImageRequest {
  model: string;
  prompt: string;
  size?: string;
  response_format?: string;
  sequential_image_generation?: string;
  stream?: boolean;
  watermark?: boolean;
}

interface GenerateImageResponse {
  created: number;
  data: Array<{
    url?: string;
    b64_json?: string;
    size?: string;
  }>;
}

export async function generateImage(
  prompt: string,
  _styleIndex: number = 0
): Promise<string> {
  try {
    const requestBody: GenerateImageRequest = {
      model: MODEL_ID,
      prompt: prompt,
      size: '2K',
      response_format: 'url',
      sequential_image_generation: 'disabled',
      stream: false,
      watermark: false
    };

    console.log('调用火山引擎Seedream API...');
    console.log('API URL:', VOLC_API_URL);
    console.log('Model:', MODEL_ID);

    const response = await fetch(VOLC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOLC_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('API响应状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API错误响应:', errorText);
      throw new Error(`图片生成API请求失败 (${response.status}): ${errorText}`);
    }

    const data: GenerateImageResponse = await response.json();
    console.log('API响应数据:', data);

    if (data.data && data.data.length > 0) {
      const imageData = data.data[0];
      if (imageData.url) {
        return imageData.url;
      } else if (imageData.b64_json) {
        return `data:image/png;base64,${imageData.b64_json}`;
      }
    }

    throw new Error('未返回有效的图片数据');
  } catch (error) {
    console.error('Seedream生图失败:', error);
    throw error;
  }
}

export async function generateMultipleImages(
  product: any,
  count: number = 4,
  imageAnalysis: string = ''
): Promise<Array<{ id: string; imageUrl: string; style: string; selected: boolean }>> {
  const promises = IMAGE_STYLES.slice(0, count).map(async (style, index) => {
    try {
      const prompt = style.promptTemplate(product, imageAnalysis);
      console.log(`正在生成第${index + 1}张图 - 风格: ${style.name}`);
      console.log(`Prompt长度: ${prompt.length}字符`);
      
      const imageUrl = await generateImage(prompt, index);
      
      return {
        id: `img-${Date.now()}-${index}`,
        imageUrl: imageUrl,
        style: style.name,
        selected: index === 0
      };
    } catch (error) {
      console.error(`生成${style.name}图片失败:`, error);
      
      return {
        id: `img-${Date.now()}-${index}-fallback`,
        imageUrl: getFallbackImage(index),
        style: style.name + '(模拟)',
        selected: index === 0
      };
    }
  });

  return Promise.all(promises);
}

function getFallbackImage(index: number): string {
  const fallbackImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop'
  ];
  
  return fallbackImages[index % fallbackImages.length];
}

export function buildImagePrompt(product: any, imageAnalysis: string = '', styleName: string = ''): string {
  const style = IMAGE_STYLES.find(s => s.name === styleName) || IMAGE_STYLES[0];
  return style.promptTemplate(product, imageAnalysis);
}