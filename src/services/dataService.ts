export interface ProductTask {
  id: string;
  productName: string;
  category: string;
  brand: string;
  inputData: {
    mainImage: string | null;
    highlights: string;
    specs: Record<string, string>;
    originalPrice: number;
    currentPrice: number;
    createdAt: string;
  };
  aiGeneratedResult: {
    title: string;
    copywriting: {
      shortCopy: string;
      detailCopy: string;
      hashtags: string;
    };
    generatedImages: Array<{
      style: string;
      url: string;
      prompt: string;
      generatedAt: string;
    }>;
    imageAnalysis: string;
    status: 'pending' | 'generating' | 'completed' | 'failed';
    generatedAt: string;
    usageStats?: {
      views: number;
      clicks: number;
      conversionRate: string;
      revenue: number;
    };
  };
}

export interface DemoData {
  tasks: ProductTask[];
  statistics: {
    totalTasks: number;
    completedTasks: number;
    totalViews: number;
    totalClicks: number;
    averageConversionRate: string;
    totalRevenue: number;
    topCategory: string;
    dateRange: string;
  };
}

const STORAGE_KEY = 'productTasks';
const STATS_KEY = 'taskStatistics';

export const mockData: DemoData = {
  tasks: [
    {
      id: 'task-20260115-001',
      productName: 'LULUALWAYS 法式复古碎花连衣裙',
      category: '女装',
      brand: 'LULUALWAYS',
      inputData: {
        mainImage: 'https://picsum.photos/seed/lulu001/300/400',
        highlights: '• 法式复古碎花设计，温柔又高级\n• 雪纺面料，轻盈飘逸\n• V领设计，修饰颈线\n• 多色可选，S-XXL全尺码',
        specs: { '面料': '雪纺', '尺码': 'S/M/L/XL/XXL', '颜色': '白底碎花/黑底碎花/蓝底碎花', '裙长': '中长款' },
        originalPrice: 399,
        currentPrice: 299,
        createdAt: '2026-01-15T10:30:00Z'
      },
      aiGeneratedResult: {
        title: '🔥法式碎花连衣裙女2026春季新款V领雪纺长裙显瘦气质穿搭',
        copywriting: {
          shortCopy: '绝绝子！这条裙子也太温柔了吧！穿上去秒变氛围感美女！',
          detailCopy: '✨ 姐妹们！今天必须给你们安利这条神仙裙子！\n\n👗 第一次穿就被同事追问链接！\n\n🌸 法式碎花yyds！\n穿上就是温柔本身好吗？！\n白色底+小碎花，清新又不失高级感\n黑色底+大碎花，优雅又气质\n\n📐 剪裁设计超心机：\n• V领设计，视觉拉长脖子线条\n• 高腰线设计，秒变大长腿\n• A字裙摆，藏肉又显瘦\n• 雪纺面料，轻盈不闷热\n\n💃 搭配建议：\n→ 搭配小白鞋，甜美清新\n→ 搭配高跟鞋，气质优雅\n→ 搭配针织开衫，温柔韩风\n\n👭 尺码选择：\nS-XL五个尺码，90-145斤都能穿\n微胖姐妹也完全OK！\n\n⏰ 限时特惠299元！\n原价399元，立省100元！\n\n💕 姐妹们快冲！真的绝！',
          hashtags: '#法式碎花裙 #连衣裙推荐 #春季穿搭 #温柔风 #显瘦穿搭 #小个子穿搭 #气质美女 #ootd每日穿搭'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/luluimg001/800/800', prompt: '法式碎花连衣裙平铺展示，浅色背景，右侧价格标签299元，左上角品牌logo', generatedAt: '2026-01-15T10:31:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/luluimg002/800/800', prompt: '直播间场景，主播展示连衣裙细节，面料特写，背景有优惠信息', generatedAt: '2026-01-15T10:32:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/luluimg003/800/1200', prompt: '多色展示+尺码表+面料说明+搭配案例，四宫格拼接详情页', generatedAt: '2026-01-15T10:33:00Z' }
        ],
        imageAnalysis: '法式复古风格碎花连衣裙，白底小碎花设计，V领雪纺面料，整体风格温柔甜美。适合25-35岁女性日常通勤和约会穿着。',
        status: 'completed',
        generatedAt: '2026-01-15T10:35:00Z',
        usageStats: { views: 15678, clicks: 3892, conversionRate: '24.8%', revenue: 116376 }
      }
    },
    {
      id: 'task-20260115-002',
      productName: 'iPhone 16 Pro Max 256GB',
      category: '数码',
      brand: 'Apple 苹果',
      inputData: {
        mainImage: 'https://picsum.photos/seed/iphone001/300/400',
        highlights: '• A18 Pro芯片，性能怪兽\n• 6.9英寸超视网膜XDR屏\n• 4800万Pro相机系统\n• 钛金属设计，更轻更耐用',
        specs: { '存储': '256GB', '屏幕': '6.9英寸', '芯片': 'A18 Pro', '摄像头': '4800万主摄' },
        originalPrice: 9999,
        currentPrice: 8999,
        createdAt: '2026-01-15T09:15:00Z'
      },
      aiGeneratedResult: {
        title: '🔥iPhone 16 Pro Max 256GB 苹果手机 钛金属边框 A18Pro芯片',
        copywriting: {
          shortCopy: '家人们！iPhone 16 Pro Max来了！8999元秒回家！',
          detailCopy: '📱 苹果最新旗舰机皇驾到！\n\n🚀 性能炸裂：\nA18 Pro芯片 — 目前最强手机芯片\nCPU提升20%，GPU提升30%\n玩游戏丝滑到飞起！\n\n📸 相机史诗级升级：\n4800万主摄+1200万超广角+1200万长焦\n支持5倍光学变焦\n夜景模式逆天，晚上拍照也清晰！\n\n🖥️ 屏幕巅峰：\n6.9英寸超视网膜XDR屏\n120Hz ProMotion刷新率\n峰值亮度3000nit，太阳底下也看得清！\n\n💎 质感拉满：\n钛金属边框 — 更轻更坚固\n手术级不锈钢工艺\n握持手感绝绝子！\n\n🔋 续航怪兽：\n视频播放最长33小时\n一天一充完全OK！\n\n💰 限时特惠：\n官网价9999元 → 活动价8999元\n立省1000元！\n\n🎁 赠品：\n价值299元手机壳+钢化膜套装\n\n⚠️ 库存仅50台！手慢无！',
          hashtags: '#iPhone16ProMax #苹果手机 #数码好物 #手机推荐 #苹果新品 #数码测评 #科技潮品 #购物分享'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/iphoneimg001/800/800', prompt: 'iPhone 16 Pro Max展示，钛金属边框特写，深色科技背景，价格标签8999元', generatedAt: '2026-01-15T09:16:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/iphoneimg002/800/800', prompt: '直播间展示iPhone各角度，相机功能演示，对比苹果15代升级点', generatedAt: '2026-01-15T09:17:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/iphoneimg003/800/1200', prompt: '参数对比表+相机样张+芯片性能图+颜色选择，四宫格详情页', generatedAt: '2026-01-15T09:18:00Z' }
        ],
        imageAnalysis: '苹果iPhone 16 Pro Max全新未拆封，钛金属原色边框，6.9英寸大屏，包装完整。适合高端数码消费者和苹果生态用户。',
        status: 'completed',
        generatedAt: '2026-01-15T09:20:00Z',
        usageStats: { views: 45632, clicks: 9234, conversionRate: '20.2%', revenue: 83076 }
      }
    },
    {
      id: 'task-20260114-003',
      productName: '雅诗兰黛小棕瓶精华液30ml',
      category: '美妆',
      brand: 'Estée Lauder 雅诗兰黛',
      inputData: {
        mainImage: 'https://picsum.photos/seed/esteelauder001/300/400',
        highlights: '• 第七代小棕瓶，修护抗老双效\n• 夜间修护力提升+25%\n• 质地轻盈，不油腻\n• 30ml正装，支持验货',
        specs: { '规格': '30ml', '保质期': '3年', '适用肤质': '全肤质', '功效': '修护 抗老 保湿' },
        originalPrice: 900,
        currentPrice: 699,
        createdAt: '2026-01-14T16:20:00Z'
      },
      aiGeneratedResult: {
        title: '🔥雅诗兰黛小棕瓶精华液30ml 第七代 夜间修护 抗老紧致 明星同款',
        copywriting: {
          shortCopy: '亲测好用！小棕瓶真的绝！用完皮肤嫩到发光！',
          detailCopy: '💫 雅诗兰黛小棕瓶 — 精华界yyds！\n\n用了5年的老粉来分享！\n第七代真的比之前更牛了！\n\n🌙 夜间修护力+25%：\n晚上睡前滴3-4滴\n第二天起来皮肤那个嫩！\n毛孔都细腻了很多！\n\n🔬 科技成分：\n• 时钟肌因信源科技\n• 调节肌肤昼夜节律\n• 修护DNA损伤\n• 促进胶原蛋白生成\n\n💧 使用感受：\n质地轻盈，不粘不腻\n滴管设计卫生又方便\n滴在脸上很快就被吸收\n\n✅ 功效看得见：\n• 细纹淡化 — 用了一个月，法令纹浅了！\n• 肤色提亮 — 熬夜后也不暗沉！\n• 毛孔细腻 — 皮肤质感整体提升！\n\n👭 适用人群：\n20+初抗老 — 预防细纹\n30+修护 — 维持年轻\n40+抗老 — 淡化已有纹路\n\n💰 价格炸裂：\n官网900元 → 直播间699元\n立省201元！还送同款小样！\n\n⚠️ 支持专柜验货，假一赔十！',
          hashtags: '#雅诗兰黛 #小棕瓶 #精华液推荐 #抗老精华 #护肤分享 #护肤品推荐 #明星同款 #熬夜党必备'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/esteelauderimg001/800/800', prompt: '雅诗兰黛小棕瓶精华液产品图，黑色背景，金色瓶身，右侧价格标签699元', generatedAt: '2026-01-14T16:21:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/esteelauderimg002/800/800', prompt: '主播手持产品展示，使用前后对比图，成分说明卡', generatedAt: '2026-01-14T16:22:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/esteelauderimg003/800/1200', prompt: '产品成分解析+使用手法+用户好评截图+真假鉴别教程', generatedAt: '2026-01-14T16:23:00Z' }
        ],
        imageAnalysis: '雅诗兰黛第七代小棕瓶精华液30ml，经典棕色滴管瓶包装，质地清澈。适合需要修护抗老的成熟肌肤，主打夜间修护功效。',
        status: 'completed',
        generatedAt: '2026-01-14T16:25:00Z',
        usageStats: { views: 28765, clicks: 6789, conversionRate: '23.6%', revenue: 47463 }
      }
    },
    {
      id: 'task-20260114-004',
      productName: '优衣库联名款宽松T恤',
      category: '女装',
      brand: 'UNIQLO 优衣库',
      inputData: {
        mainImage: 'https://picsum.photos/seed/uniqlo001/300/400',
        highlights: '• 设计师联名款，限量发售\n• 纯棉面料，透气舒适\n• 宽松版型，不挑身材\n• 多色可选，男女同款',
        specs: { '面料': '100%纯棉', '尺码': 'XS/S/M/L/XL', '颜色': '白/黑/灰/藏青/卡其', '款式': '宽松版' },
        originalPrice: 149,
        currentPrice: 99,
        createdAt: '2026-01-14T14:00:00Z'
      },
      aiGeneratedResult: {
        title: '🔥优衣库联名款T恤男女同款宽松纯棉百搭学生ins潮牌上衣',
        copywriting: {
          shortCopy: '99元2件！优衣库联名T恤也太划算了吧！质量绝绝子！',
          detailCopy: '👕 优衣库联名款来啦！\n\n真的！这是我见过最良心的联名！\n99元两件！质量好到哭！\n\n🌿 面料绝绝子：\n100%纯棉！\n摸起来那个柔软~ \n透气性也超好，夏天穿完全不闷！\n\n📐 版型超绝：\n宽松OVERSIZE版型\n• 藏肉神器！微胖姐妹福音！\n• 落肩设计，慵懒又时尚\n• 下摆开叉设计，显瘦又百搭\n\n👫 男女同款：\n和男朋友穿情侣装超甜！\n也可以当睡衣、外套内搭\n一件顶三件！\n\n🎨 颜色选择：\n白色 — 永远的神！百搭\n黑色 — 显瘦终极武器\n灰色 — 高级感满满\n藏青 — 复古又气质\n卡其 — 春夏必备\n\n💰 价格炸裂：\n原价149元 × 2件 = 298元\n直播间99元任选2件！\n相当于5折！\n\nS-XL五个尺码\n体重80-180斤都能穿！\n\n⏰ 库存2000件！抢完恢复原价！',
          hashtags: '#优衣库 #联名T恤 #纯棉T恤 #宽松百搭 #学生党 #情侣装 #ootd #春夏穿搭'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/uniqloimg001/800/800', prompt: '优衣库联名T恤平铺展示，多色可选，价格标签99元2件', generatedAt: '2026-01-14T14:01:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/uniqloimg002/800/800', prompt: '模特展示上身效果，情侣穿搭演示，直播间福利公告', generatedAt: '2026-01-14T14:02:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/uniqloimg003/800/1200', prompt: '尺码表+面料说明+颜色展示+搭配案例，四宫格详情页', generatedAt: '2026-01-14T14:03:00Z' }
        ],
        imageAnalysis: '优衣库设计师联名款纯棉T恤，宽松版型设计，基础百搭款。适合日常休闲穿着，目标用户为学生党和年轻上班族。',
        status: 'completed',
        generatedAt: '2026-01-14T14:05:00Z',
        usageStats: { views: 32456, clicks: 8123, conversionRate: '25.0%', revenue: 80388 }
      }
    },
    {
      id: 'task-20260113-005',
      productName: 'AirPods Pro 2代无线耳机',
      category: '数码',
      brand: 'Apple 苹果',
      inputData: {
        mainImage: 'https://picsum.photos/seed/airpods001/300/400',
        highlights: '• H2芯片，主动降噪升级\n• 空间音频，沉浸体验\n• 6小时续航，配合充电盒30小时\n• MagSafe充电盒',
        specs: { '芯片': 'H2', '续航': '6小时/30小时(带充电盒)', '降噪': '主动降噪+通透模式', '防水': 'IPX4' },
        originalPrice: 1899,
        currentPrice: 1499,
        createdAt: '2026-01-13T11:30:00Z'
      },
      aiGeneratedResult: {
        title: '🔥AirPods Pro 2代 苹果无线耳机 H2芯片 主动降噪 空间音频',
        copywriting: {
          shortCopy: '降噪yyds！AirPods Pro 2代真的香！1499元秒没！',
          detailCopy: '🎧 用了就不想摘下来的耳机！\n\n姐妹们！AirPods Pro 2代真的绝了！\n这是我用过降噪最强的耳机！\n\n🔇 降噪牛到哭：\nH2芯片加持\n主动降噪效果提升2倍！\n地铁、飞机、咖啡厅\n戴上瞬间世界安静！\n\n🎵 音质天花板：\n空间音频 — 声音从四面八方传来\n仿佛置身演唱会现场！\n低音浑厚，高音清晰\n\n🔋 续航超给力：\n单次6小时续航\n配合充电盒30小时\n一周充一次电完全OK！\n\n💡 贴心功能：\n• 通透模式 — 跑步也能安全听歌\n• 查找功能 — 丢三落四也不怕\n• 音频共享 — 两人一起听\n• 无线充电 — 放上去就充电\n\n📱 体验感：\n开盖即连，弹窗秒弹\n佩戴舒适，戴久不疼\n触控操作，方便快捷\n\n💰 直播间价格：\n官网1899元 → 直播间1499元\n立省400元！\n\n🎁 送价值129元硅胶保护套！\n\n⏰ 仅剩30台！手慢无！',
          hashtags: '#AirPodsPro #苹果耳机 #降噪耳机 #无线耳机 #数码好物 #蓝牙耳机 #苹果配件 #生活数码'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/airpodsimg001/800/800', prompt: 'AirPods Pro 2代产品展示，充电盒打开状态，白色极简背景，价格标签1499元', generatedAt: '2026-01-13T11:31:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/airpodsimg002/800/800', prompt: '主播展示佩戴效果，降噪功能演示，地铁/飞机场景模拟', generatedAt: '2026-01-13T11:32:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/airpodsimg003/800/1200', prompt: '功能对比表+使用场景+用户好评+适配设备列表', generatedAt: '2026-01-13T11:33:00Z' }
        ],
        imageAnalysis: '苹果AirPods Pro 2代无线耳机，白色充电盒配无线耳机本体，H2芯片。适合苹果生态用户，追求降噪和音质的消费者。',
        status: 'completed',
        generatedAt: '2026-01-13T11:35:00Z',
        usageStats: { views: 38912, clicks: 7456, conversionRate: '19.2%', revenue: 111784 }
      }
    },
    {
      id: 'task-20260113-006',
      productName: 'YSL圣罗兰反转巴黎香水50ml',
      category: '美妆',
      brand: 'YSL 圣罗兰',
      inputData: {
        mainImage: 'https://picsum.photos/seed/ysl001/300/400',
        highlights: '• 致命温柔花果香调\n• 斩男神器，约会必备\n• 50ml正装，支持验货\n• 限定包装，仪式感拉满',
        specs: { '规格': '50ml', '香调': '花果香调', '前调': '佛手柑、草莓、树莓', '中调': '曼陀罗、橙花、茉莉', '后调': '白麝香、广藿香' },
        originalPrice: 1580,
        currentPrice: 1199,
        createdAt: '2026-01-13T09:45:00Z'
      },
      aiGeneratedResult: {
        title: '🔥YSL反转巴黎香水50ml 斩男香 限定包装 生日礼物女友送女朋友',
        copywriting: {
          shortCopy: '妈呀！反转巴黎也太好闻了吧！喷完被问了800次！',
          detailCopy: '💕 YSL反转巴黎 — 传说中的斩男香！\n\n姐妹们！这瓶香水我真的爱惨了！\n喷完男朋友说：你今天好香！\n\n🌸 味道描述：\n前调：佛手柑+草莓+树莓\n→ 清甜少女感\n\n中调：曼陀罗+橙花+茉莉\n→ 温柔又性感\n\n后调：白麝香+广藿香\n→ 勾人的木质香\n\n整体就是：甜而不腻，温柔到爆！\n\n👃 留香时间：\n6-8小时没问题！\n第二天还能闻到淡淡香味\n\n🎀 使用场景：\n• 约会 — 男朋友离不开身\n• 面试 — 给人好印象\n• 日常 — 提升气质\n• 送人 — 倍有面子\n\n🎁 限定包装：\n超美粉色礼盒+丝带\n送礼仪式感拉满！\n生日、情人节、纪念日首选！\n\n💰 价格炸裂：\n官网1580元 → 直播间1199元\n立省381元！\n\n⚠️ 支持专柜验货，假一赔十！\n\n💝 送自己送闺蜜送女朋友\n这香味，谁闻谁沦陷！',
          hashtags: '#YSL #反转巴黎 #香水推荐 #斩男香 #生日礼物 #女友礼物 #花香调 #约会必备'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/yslimg001/800/800', prompt: 'YSL反转巴黎香水产品图，粉色瓶身+黑色蝴蝶结，精致礼盒包装，价格标签1199元', generatedAt: '2026-01-13T09:46:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/yslimg002/800/800', prompt: '主播展示香水喷洒效果，香调介绍卡，限定礼盒展示', generatedAt: '2026-01-13T09:47:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/yslimg003/800/1200', prompt: '香调金字塔+使用场景+真假鉴别+用户评价截图', generatedAt: '2026-01-13T09:48:00Z' }
        ],
        imageAnalysis: 'YSL圣罗兰反转巴黎女士香水，标志性的黑色蝴蝶结+粉色椭圆形瓶身设计，甜美浪漫风格。适合25-35岁女性，主打约会香定位。',
        status: 'completed',
        generatedAt: '2026-01-13T09:50:00Z',
        usageStats: { views: 21345, clicks: 5234, conversionRate: '24.5%', revenue: 62787 }
      }
    },
    {
      id: 'task-20260112-007',
      productName: 'ZARA春季新款针织开衫',
      category: '女装',
      brand: 'ZARA',
      inputData: {
        mainImage: 'https://picsum.photos/seed/zara001/300/400',
        highlights: '• 100%山羊绒，软糯舒适\n• V领设计，百搭显瘦\n• 春季新款，时尚百搭\n• 多色可选',
        specs: { '面料': '100%山羊绒', '尺码': 'XS/S/M/L', '颜色': '米白/浅灰/驼色/黑色', '厚度': '中等厚度' },
        originalPrice: 599,
        currentPrice: 399,
        createdAt: '2026-01-12T15:30:00Z'
      },
      aiGeneratedResult: {
        title: '🔥ZARA针织开衫女2026春季新款V领山羊绒毛衣外套百搭显瘦',
        copywriting: {
          shortCopy: '399元秒！ZARA山羊绒开衫也太柔软了吧！穿完不想脱下来！',
          detailCopy: '🧶 ZARA山羊绒开衫也太绝了吧！\n\n这件真的！摸到的那一刻我就爱上了！\n软糯糯的，舒服到不想脱下来！\n\n🐐 面料顶级：\n100%山羊绒！\n贴身穿完全不扎！\n比普通羊毛暖3倍！\n\n📐 设计心机：\nV领设计 — 显瘦又显脸小\n落肩款式 — 慵懒又时髦\n纽扣设计 — 方便穿脱\n下摆微开叉 — 拉长比例\n\n👗 搭配神器：\n• 内搭吊带 + 牛仔裤 = 休闲风\n• 内搭衬衫 + 半裙 = 气质OL\n• 连衣裙 + 开衫 = 温柔仙女\n• T恤 + 阔腿裤 = 简约时尚\n\n🎨 颜色选择：\n米白 — 温柔气质首选\n浅灰 — 高级感满满\n驼色 — 经典永不过时\n黑色 — 显瘦百搭\n\n💰 直播间专属：\n官网599元 → 直播间399元\n立省200元！\n\nS-XL四个尺码\n体重80-130斤都能穿！\n\n⏰ 库存仅100件！\n喜欢的姐妹快冲！',
          hashtags: '#ZARA #针织开衫 #山羊绒 #春季穿搭 #百搭单品 #温柔风 #显瘦穿搭 #毛衣外套'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/zaraimg001/800/800', prompt: 'ZARA针织开衫平铺展示，浅色背景，产品细节特写，价格标签399元', generatedAt: '2026-01-12T15:31:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/zaraimg002/800/800', prompt: '模特展示多种穿搭方式，面料质感展示，直播间优惠说明', generatedAt: '2026-01-12T15:32:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/zaraimg003/800/1200', prompt: '面料说明+尺码表+颜色展示+搭配参考，四宫格详情页', generatedAt: '2026-01-12T15:33:00Z' }
        ],
        imageAnalysis: 'ZARA春季新款V领针织开衫，100%山羊绒面料，米白色设计，简约高级风格。适合25-40岁女性，春秋季节外穿或内搭均可。',
        status: 'completed',
        generatedAt: '2026-01-12T15:35:00Z',
        usageStats: { views: 18765, clicks: 4567, conversionRate: '24.3%', revenue: 18228 }
      }
    },
    {
      id: 'task-20260112-008',
      productName: 'Switch OLED 动森限定版主机',
      category: '数码',
      brand: 'Nintendo 任天堂',
      inputData: {
        mainImage: 'https://picsum.photos/seed/switch001/300/400',
        highlights: '• 7英寸OLED屏幕，色彩更鲜艳\n• 动森限定主题，收藏价值高\n• 主机+手柄+游戏卡带套装\n• 全新未拆封',
        specs: { '屏幕': '7英寸OLED', '存储': '64GB', '续航': '4.5-9小时', '套装': '主机+2个手柄+游戏卡带' },
        originalPrice: 2899,
        currentPrice: 2499,
        createdAt: '2026-01-12T10:00:00Z'
      },
      aiGeneratedResult: {
        title: '🔥Switch OLED动森限定版 任天堂游戏机 主机+手柄+卡带套装',
        copywriting: {
          shortCopy: '动森限定版！2499元秒没！Switch玩家必入！',
          detailCopy: '🎮 任天堂Switch OLED动森限定版！\n\nswitch玩家在哪里！\n这套真的太太太香了！\n\n🖥️ 屏幕升级：\n7英寸OLED屏幕\n→ 色彩更鲜艳\n→ 对比度更高\n→ 黑色更纯粹\n→ 阳光下也能看清\n\n🎨 动森限定：\n超可爱的主题设计！\n• 主机背面板 — 动森图案\n• Joy-Con — 限定配色\n• 系统主题 — 动森UI\n• 包装 — 收藏级设计\n\n🎁 套装包含：\n✅ Switch OLED主机 ×1\n✅ Joy-Con手柄 ×2（限定色）\n✅ 动森游戏卡带 ×1\n✅ 收纳包 ×1\n✅ 贴膜 ×1\n\n🎮 游戏体验：\n动森真的太好玩了！\n建岛、钓鱼、捉虫、装修岛\n几百小时都玩不腻！\n\n💰 极致性价比：\n官网2899元 → 直播间2499元\n立省400元！\n\n⏰ 库存仅20台！\n动森粉丝冲！\n\n⚠️ 全新未拆封，支持官方验货！',
          hashtags: '#Switch #任天堂 #动森限定 #switch游戏机 #OLED #动物森友会 #游戏推荐 #switch配件'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/switchimg001/800/800', prompt: 'Switch OLED动森限定版主机展示，限定配色手柄，动物森友会元素装饰，价格标签2499元', generatedAt: '2026-01-12T10:01:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/switchimg002/800/800', prompt: '直播间展示限定主机和手柄，游戏画面演示，开箱展示', generatedAt: '2026-01-12T10:02:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/switchimg003/800/1200', prompt: '套装内容物展示+游戏特色介绍+配置参数+用户好评', generatedAt: '2026-01-12T10:03:00Z' }
        ],
        imageAnalysis: '任天堂Switch OLED动森限定版游戏机套装，包含主机和限定配色Joy-Con手柄。适合游戏玩家和动森粉丝，具有较高收藏价值。',
        status: 'completed',
        generatedAt: '2026-01-12T10:05:00Z',
        usageStats: { views: 29876, clicks: 5678, conversionRate: '19.0%', revenue: 14189 }
      }
    },
    {
      id: 'task-20260111-009',
      productName: 'SK-II神仙水精华液230ml',
      category: '美妆',
      brand: 'SK-II',
      inputData: {
        mainImage: 'https://picsum.photos/seed/sk2001/300/400',
        highlights: '• 经典PITERA™成分\n• 调节肌肤水油平衡\n• 收缩毛孔，提亮肤色\n• 230ml大容量，超值装',
        specs: { '规格': '230ml', '主要成分': 'PITERA™', '功效': '调节水油 收缩毛孔 提亮肤色', '适用肤质': '全肤质' },
        originalPrice: 1690,
        currentPrice: 1299,
        createdAt: '2026-01-11T13:20:00Z'
      },
      aiGeneratedResult: {
        title: '🔥SK-II神仙水精华液230ml 护肤水 调节水油 收缩毛孔 提亮',
        copywriting: {
          shortCopy: '油皮亲妈！SK-II神仙水真的绝！用完皮肤状态好到爆！',
          detailCopy: '💧 SK-II神仙水 — 护肤界传奇！\n\n讲真！这是我用过最有效的精华水！\n用了5年真的离不开！\n\n🧬 核心成分PITERA™：\n• 调节肌肤水油平衡\n• 收敛毛孔\n• 提亮肤色\n• 维稳修护\n\n👩 使用效果：\n• 油皮 — 告别大油田！\n• 干皮 — 补水保湿！\n• 敏感肌 — 修护屏障！\n• 毛孔粗大 — 收敛毛孔！\n\n📝 使用方法：\n① 洁面后倒3-5滴在掌心\n② 轻拍至吸收\n③ 早晚各一次\n\n💎 使用感受：\n水质地，清爽不粘\n吸收超快，不会有负担\n用一段时间皮肤会变透亮！\n\n👭 适用人群：\n✅ 油皮/混油皮 — 控油必入\n✅ 毛孔粗大 — 收敛毛孔\n✅ 暗沉肤色 — 提亮肤色\n✅ 敏感肌 — 温和修护\n\n💰 直播间价格：\n官网1690元 → 直播间1299元\n立省391元！\n\n🎁 赠品：\n价值299元SK-II前男友面膜2片！\n\n⚠️ 支持专柜验货，假一赔十！\n\n💕 护肤是长期投资！\n早用早受益！',
          hashtags: '#SKII #神仙水 #精华水 #护肤推荐 #油皮救星 #收缩毛孔 #提亮肤色 #贵妇护肤品'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/sk2img001/800/800', prompt: 'SK-II神仙水产品图，经典透明瓶身，右侧价格标签1299元，左上角品牌logo', generatedAt: '2026-01-11T13:21:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/sk2img002/800/800', prompt: '主播展示神仙水使用手法，前后对比图，成分介绍卡', generatedAt: '2026-01-11T13:22:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/sk2img003/800/1200', prompt: 'PITERA成分说明+使用手法+用户真实评价+真假鉴别', generatedAt: '2026-01-11T13:23:00Z' }
        ],
        imageAnalysis: 'SK-II经典神仙水精华液230ml，标志性透明塑料瓶设计，核心成分为PITERA™。适合各类肤质，主打调节水油平衡和提亮肤色功效。',
        status: 'completed',
        generatedAt: '2026-01-11T13:25:00Z',
        usageStats: { views: 24567, clicks: 5890, conversionRate: '24.0%', revenue: 76503 }
      }
    },
    {
      id: 'task-20260111-010',
      productName: 'URBAN REVIVO设计师联名连衣裙',
      category: '女装',
      brand: 'URBAN REVIVO',
      inputData: {
        mainImage: 'https://picsum.photos/seed/ur001/300/400',
        highlights: '• 设计师联名款，独一无二\n• 斜裁设计，修饰身材\n• 醋酯面料，光泽感强\n• 限量发售',
        specs: { '面料': '醋酯纤维', '尺码': 'XS/S/M/L', '颜色': '波尔多红/深海蓝/墨玉黑', '款式': '斜裁连衣裙' },
        originalPrice: 799,
        currentPrice: 559,
        createdAt: '2026-01-11T08:00:00Z'
      },
      aiGeneratedResult: {
        title: '🔥UR设计师联名连衣裙女2026春季新款斜裁设计高端气质礼服裙',
        copywriting: {
          shortCopy: 'UR联名款也太美了吧！这条裙子穿上去气质直接拉满！',
          detailCopy: '👗 UR设计师联名款连衣裙！\n\n这条裙子真的！高级感拉满！\n穿上去就是都市丽人本丽！\n\n✂️ 斜裁设计超绝：\n设计师独家斜裁技术\n• 视觉显瘦10斤！\n• 优化身材比例\n• 走动间裙摆飘逸\n\n✨ 面料顶级：\n醋酯纤维面料\n→ 丝绸般光泽\n→ 垂坠感极佳\n→ 不易皱好打理\n\n📐 版型心机：\n• V领设计 — 拉长颈线\n• 收腰剪裁 — 凸显腰线\n• 及膝长度 — 显高显瘦\n• 后背拉链 — 穿脱方便\n\n💃 场合百搭：\n• 通勤 — 气场全开\n• 约会 — 气质满分\n• 聚会 — 惊艳全场\n• 正式场合 — 高端大气\n\n🎨 颜色选择：\n波尔多红 — 复古高级\n深海蓝 — 神秘优雅\n墨玉黑 — 经典百搭\n\n💰 价格炸裂：\n官网799元 → 直播间559元\n立省240元！\n\n⚠️ 限量100件！\nUR粉丝快冲！\n\n💕 穿这条裙子\n你，就是焦点！',
          hashtags: '#UR #设计师联名 #连衣裙 #气质穿搭 #高端女装 #斜裁设计 #通勤穿搭 #聚会战袍'
        },
        generatedImages: [
          { style: '抖音电商首图', url: 'https://picsum.photos/seed/urimg001/800/800', prompt: 'UR联名款连衣裙展示，精致剪裁，波尔多红/深海蓝/墨玉黑三色，价格标签559元', generatedAt: '2026-01-11T08:01:00Z' },
          { style: '直播带货场景图', url: 'https://picsum.photos/seed/urimg002/800/800', prompt: '模特展示多种穿法和场合，面料光泽特写，直播间专属优惠', generatedAt: '2026-01-11T08:02:00Z' },
          { style: '详情页海报', url: 'https://picsum.photos/seed/urimg003/800/1200', prompt: '设计师介绍+面料说明+尺码表+三种颜色展示+搭配建议', generatedAt: '2026-01-11T08:03:00Z' }
        ],
        imageAnalysis: 'URBAN REVIVO设计师联名款斜裁连衣裙，波尔多红配色，醋酯纤维面料，光泽感强。适合25-40岁都市女性，定位高端通勤和社交场合。',
        status: 'completed',
        generatedAt: '2026-01-11T08:05:00Z',
        usageStats: { views: 16543, clicks: 3987, conversionRate: '24.1%', revenue: 22285 }
      }
    }
  ],
  statistics: {
    totalTasks: 10,
    completedTasks: 10,
    totalViews: 271539,
    totalClicks: 59850,
    averageConversionRate: '22.1%',
    totalRevenue: 591083,
    topCategory: '女装',
    dateRange: '2026-01-11 至 2026-01-15'
  }
};

export function getTasks(): ProductTask[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockData.tasks;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData.tasks));
  return mockData.tasks;
}

export function saveTasks(tasks: ProductTask[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getStatistics() {
  const stored = localStorage.getItem(STATS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockData.statistics;
    }
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(mockData.statistics));
  return mockData.statistics;
}

export function saveStatistics(stats: typeof mockData.statistics): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function addProductTask(task: Omit<ProductTask, 'id' | 'inputData' | 'aiGeneratedResult'> & {
  inputData: Omit<ProductTask['inputData'], 'createdAt'>;
  aiGeneratedResult: Omit<ProductTask['aiGeneratedResult'], 'status' | 'generatedAt' | 'usageStats'>;
}): ProductTask {
  const tasks = getTasks();
  const now = new Date().toISOString();
  
  const newTask: ProductTask = {
    id: `task-${Date.now()}`,
    ...task,
    inputData: {
      ...task.inputData,
      createdAt: now
    },
    aiGeneratedResult: {
      ...task.aiGeneratedResult,
      status: 'completed',
      generatedAt: now,
      usageStats: {
        views: 0,
        clicks: 0,
        conversionRate: '0%',
        revenue: 0
      }
    }
  };

  const updatedTasks = [newTask, ...tasks];
  saveTasks(updatedTasks);
  
  updateStatistics(updatedTasks);
  
  return newTask;
}

export function deleteProductTask(taskId: string): boolean {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  
  if (filteredTasks.length === tasks.length) {
    return false;
  }
  
  saveTasks(filteredTasks);
  updateStatistics(filteredTasks);
  
  return true;
}

export function updateProductTask(taskId: string, updates: Partial<ProductTask>): ProductTask | null {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return null;
  }
  
  const updatedTask = { ...tasks[taskIndex], ...updates };
  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  
  return updatedTask;
}

function updateStatistics(tasks: ProductTask[]): void {
  const completedTasks = tasks.filter(t => t.aiGeneratedResult.status === 'completed');
  const totalViews = completedTasks.reduce((sum, t) => sum + (t.aiGeneratedResult.usageStats?.views || 0), 0);
  const totalClicks = completedTasks.reduce((sum, t) => sum + (t.aiGeneratedResult.usageStats?.clicks || 0), 0);
  const totalRevenue = completedTasks.reduce((sum, t) => sum + (t.aiGeneratedResult.usageStats?.revenue || 0), 0);
  
  const categoryCount: Record<string, number> = {};
  completedTasks.forEach(t => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '无';
  
  const avgConversionRate = totalClicks > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) + '%' : '0%';
  
  const stats = {
    totalTasks: tasks.length,
    completedTasks: completedTasks.length,
    totalViews,
    totalClicks,
    averageConversionRate: avgConversionRate,
    totalRevenue,
    topCategory,
    dateRange: '2026-01-11 至 2026-01-15'
  };
  
  saveStatistics(stats);
}

export function initializeData(): void {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData.tasks));
    localStorage.setItem(STATS_KEY, JSON.stringify(mockData.statistics));
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STATS_KEY);
}