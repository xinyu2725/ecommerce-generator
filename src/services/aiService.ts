const API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY || 'sk-55cc2af36e0141da804dc3afcfba350d';
const API_URL = import.meta.env.VITE_DASHSCOPE_API_URL || '/api/dashscope/compatible-mode/v1/chat/completions';

export interface CopyStyle {
  name: string;
  systemPrompt: string;
}

export const COPY_STYLES: CopyStyle[] = [
  {
    name: '抖音爆款风',
    systemPrompt: `你是一位资深的抖音电商文案专家，擅长撰写高转化率的带货文案。
要求：
- 标题要吸睛，使用emoji表情，控制在20字以内
- 副标题突出核心卖点，有紧迫感
- 促销语要有"限时""限量""手慢无"等催促词汇
- 描述要用短句、分段清晰，多用emoji
- 结尾要有明确的行动号召（CTA）
- 整体风格：热情、接地气、有感染力`
  },
  {
    name: '小红书种草风',
    systemPrompt: `你是一位小红书种草博主，擅长写真实感强的产品推荐文案。
要求：
- 标题用【】包裹，包含数字和关键词（如"3个理由"、"必入"）
- 副标题简洁有力，点明产品定位
- 促销语强调"性价比""学生党""闭眼入"
- 描述像朋友聊天一样自然，多用"真的绝了""谁懂啊"
- 使用大量emoji，分段清晰
- 加上相关话题标签`
  },
  {
    name: '专业品质风',
    systemPrompt: `你是一位高端电商品牌文案策划师，擅长撰写专业、可信的产品文案。
要求：
- 标题正式大气，体现品牌调性
- 副标题点明核心技术或独特优势
- 促销语强调"正品保障""官方授权""品质保证"
- 描述结构化：痛点→解决方案→效果→背书
- 用词精准，避免夸张，突出专业性
- 适合天猫/京东等正规电商平台`
  },
  {
    name: '直播话术风',
    systemPrompt: `你是一位经验丰富的电商直播主播，擅长即兴发挥的口语化文案。
要求：
- 标题像直播间标题一样抓眼球
- 副标题用"家人们""宝宝们"等称呼
- 促销语要有"只有今天""最后50单"等紧迫感
- 描述口语化、互动性强，多用问句
- 包含价格对比、限时福利等信息
- 适合直播场景快速念出`
  }
];

interface TextMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ImageMessage {
  role: 'user';
  content: Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: { url: string };
  }>;
}

interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function imageToBase64(file: File | string): Promise<string> {
  if (typeof file === 'string' && file.startsWith('data:')) {
    return file;
  }
  
  if (typeof file === 'string') {
    const response = await fetch(file);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function analyzeImage(imageInput: File | string | null): Promise<string> {
  if (!imageInput) {
    return '';
  }

  try {
    const base64Image = await imageToBase64(imageInput);
    
    const messages: ImageMessage[] = [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: base64Image }
          },
          {
            type: 'text',
            text: `请仔细分析这张商品图片，提取以下信息并以JSON格式输出（只输出JSON，不要其他内容）：
{
  "productType": "商品类型",
  "brand": "品牌名称（如果能识别）",
  "color": "颜色",
  "material": "材质",
  "features": ["特征1", "特征2", "特征3"],
  "scene": "使用场景",
  "style": "风格描述",
  "visualHighlights": ["视觉亮点1", "视觉亮点2"],
  "suitableFor": "适用人群"
}`
          }
        ]
      }
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-vl-max',
        messages: messages,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`图像分析API请求失败: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysisResult = JSON.parse(jsonMatch[0]);
        return formatImageAnalysis(analysisResult);
      }
      return content;
    } catch {
      return content;
    }
  } catch (error) {
    console.error('图像分析失败:', error);
    return '';
  }
}

function formatImageAnalysis(analysis: any): string {
  const parts = [];
  
  if (analysis.productType) parts.push(`【图片识别-商品类型】${analysis.productType}`);
  if (analysis.brand) parts.push(`【图片识别-品牌】${analysis.brand}`);
  if (analysis.color) parts.push(`【图片识别-颜色】${analysis.color}`);
  if (analysis.material) parts.push(`【图片识别-材质】${analysis.material}`);
  if (analysis.features?.length) parts.push(`【图片识别-产品特征】${analysis.features.join('、')}`);
  if (analysis.scene) parts.push(`【图片识别-使用场景】${analysis.scene}`);
  if (analysis.style) parts.push(`【图片识别-风格】${analysis.style}`);
  if (analysis.visualHighlights?.length) parts.push(`【图片识别-视觉亮点】${analysis.visualHighlights.join('、')}`);
  if (analysis.suitableFor) parts.push(`【图片识别-适用人群】${analysis.suitableFor}`);
  
  return parts.length > 0 ? parts.join('\n') : '';
}

function buildUserPrompt(product: any, imageAnalysis: string = ''): string {
  const specsText = Object.entries(product.specs || {})
    .map(([key, value]) => `${key}：${value}`)
    .join('\n');
  
  const priceInfo = product.currentPrice > 0 
    ? `\n现价：¥${product.currentPrice}${product.originalPrice > product.currentPrice ? `（原价¥${product.originalPrice}，优惠${Math.round((1 - product.currentPrice / product.originalPrice) * 100)}%）` : ''}`
    : '';

  let prompt = `请根据以下商品信息生成文案：

【商品名称】${product.name}
【商品类目】${product.category || '未分类'}
【商品卖点】${product.highlights}
【规格参数】
${specsText || '暂无'}
${priceInfo}`;

  if (imageAnalysis) {
    prompt += `\n\n=== 商品图片分析结果 ===\n${imageAnalysis}\n=== 请结合以上图片信息生成更贴合商品的文案 ===`;
  }

  prompt += `\n\n请严格按照你的风格要求，输出以下格式的JSON（不要输出其他内容）：
{
  "title": "主标题",
  "subtitle": "副标题", 
  "promoText": "促销语",
  "description": "详细描述"
}`;

  return prompt;
}

export async function generateCopy(
  product: any,
  styleIndex: number = 0,
  imageAnalysis: string = ''
): Promise<{ title: string; subtitle: string; promoText: string; description: string }> {
  const style = COPY_STYLES[styleIndex] || COPY_STYLES[0];
  
  const messages: TextMessage[] = [
    { role: 'system', content: style.systemPrompt },
    { role: 'user', content: buildUserPrompt(product, imageAnalysis) }
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-5',
        messages: messages,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('无法解析JSON');
    } catch {
      return parseTextResponse(content, style.name);
    }
  } catch (error) {
    console.error('AI文案生成失败:', error);
    throw error;
  }
}

export async function generateMultipleCopies(
  product: any,
  count: number = 4,
  imageAnalysis: string = ''
): Promise<Array<{ id: string; title: string; subtitle: string; promoText: string; description: string; style: string }>> {
  const promises = COPY_STYLES.slice(0, count).map((style, index) =>
    generateCopy(product, index, imageAnalysis).then(result => ({
      ...result,
      style: style.name
    })).catch(error => {
      console.error(`生成${style.name}文案失败:`, error);
      return null;
    })
  );

  const results = await Promise.all(promises);
  
  return results
    .filter(result => result !== null)
    .map((result, index) => ({
      id: `copy-${Date.now()}-${index}`,
      ...result!
    }));
}

function parseTextResponse(content: string, styleName: string): { title: string; subtitle: string; promoText: string; description: string } {
  const lines = content.split('\n').filter(line => line.trim());
  
  let title = lines[0] || `${styleName}文案`;
  let subtitle = lines[1] || '';
  let promoText = lines.find(line => line.includes('限') || line.includes('促') || line.includes('特')) || '限时特惠';
  let description = lines.slice(2).join('\n') || content;

  return { title, subtitle, promoText, description };
}