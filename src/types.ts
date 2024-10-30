export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ColorwayTheme {
  name: string;
  code: string;
  description?: string;
}

export interface Settings {
  apiKey: string;
  selectedColorway: string;
  customColorwayCode: string;
}

export interface DebugLog {
  timestamp: string;
  type: 'info' | 'error' | 'warning';
  message: string;
  data?: any;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  contextLength: number;
  pricing: {
    prompt: number;
    completion: number;
  };
}