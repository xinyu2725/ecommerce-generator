export interface ProductInput {
  name: string;
  highlights: string;
  specs: Record<string, string>;
  originalPrice: number;
  currentPrice: number;
  category: string;
  mainImage: string | null;
}

export interface GeneratedImage {
  id: string;
  imageUrl: string;
  style: string;
  selected: boolean;
}

export interface GeneratedCopy {
  id: string;
  title: string;
  subtitle: string;
  promoText: string;
  description: string;
  style?: string;
}

export interface GenerationResult {
  images: GeneratedImage[];
  copies: GeneratedCopy[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface ConversationHistory {
  id: string;
  productName: string;
  productInput: ProductInput;
  result: GenerationResult;
  timestamp: string;
  imageAnalysis?: string;
}