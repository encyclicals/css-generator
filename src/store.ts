import { create } from 'zustand';
import { Message, Settings, DebugLog, ColorwayTheme } from './types';
import { persist } from 'zustand/middleware';

interface AppState {
  messages: Message[];
  settings: Settings;
  debugLogs: DebugLog[];
  colorways: ColorwayTheme[];
  selectedModel: string;
  temperature: number;
  showSettings: boolean;
  showDebugLog: boolean;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
  addDebugLog: (log: DebugLog) => void;
  clearDebugLog: () => void;
  setSelectedModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  toggleSettings: () => void;
  toggleDebugLog: () => void;
  addColorway: (colorway: ColorwayTheme) => void;
  updateColorway: (name: string, code: string) => void;
}

const DEFAULT_API_KEY = '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';

const useStore = create<AppState>()(
  persist(
    (set) => ({
      messages: [],
      settings: {
        apiKey: DEFAULT_API_KEY,
        selectedColorway: 'modern',
        customColorwayCode: '',
      },
      debugLogs: [],
      colorways: [
        {
          name: 'modern',
          code: `
            .chat-container { @apply bg-gray-50 dark:bg-gray-900; }
            .message { @apply mb-4; }
            .bubble-content { @apply p-4 rounded-2xl shadow-sm; }
            .user-message .bubble-content { 
              @apply bg-blue-500 text-white rounded-bl-none;
              position: relative;
            }
            .assistant-message .bubble-content { 
              @apply bg-white dark:bg-gray-800 dark:text-white rounded-br-none;
              position: relative;
            }
            .controls { @apply bg-white dark:bg-gray-800 border-t dark:border-gray-700; }
          `,
        },
        {
          name: 'retro',
          code: `
            .chat-container { @apply bg-amber-50; }
            .message { @apply mb-4; }
            .bubble-content { @apply p-4 rounded-2xl shadow-md border-2 border-amber-900; }
            .user-message .bubble-content { 
              @apply bg-amber-200 rounded-bl-none;
              position: relative;
            }
            .assistant-message .bubble-content { 
              @apply bg-white rounded-br-none;
              position: relative;
            }
            .controls { @apply bg-amber-100 border-t-2 border-amber-900; }
          `,
        },
        {
          name: 'neon',
          code: `
            .chat-container { @apply bg-gray-900; }
            .message { @apply mb-4; }
            .bubble-content { @apply p-4 rounded-2xl shadow-lg; }
            .user-message .bubble-content { 
              @apply bg-purple-600 text-white rounded-bl-none border border-purple-400;
              position: relative;
              box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
            }
            .assistant-message .bubble-content { 
              @apply bg-gray-800 text-green-400 rounded-br-none border border-green-400;
              position: relative;
              box-shadow: 0 0 20px rgba(74, 222, 128, 0.2);
            }
            .controls { @apply bg-gray-800 border-t border-purple-500; }
          `,
        },
      ],
      selectedModel: 'openai/gpt-4o',
      temperature: 0.7,
      showSettings: false,
      showDebugLog: false,
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: [] }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addDebugLog: (log) =>
        set((state) => ({ debugLogs: [...state.debugLogs, log] })),
      clearDebugLog: () => set({ debugLogs: [] }),
      setSelectedModel: (model) => set({ selectedModel: model }),
      setTemperature: (temp) => set({ temperature: temp }),
      toggleSettings: () =>
        set((state) => ({ showSettings: !state.showSettings })),
      toggleDebugLog: () =>
        set((state) => ({ showDebugLog: !state.showDebugLog })),
      addColorway: (colorway) =>
        set((state) => ({
          colorways: [...state.colorways, colorway],
        })),
      updateColorway: (name, code) =>
        set((state) => ({
          colorways: state.colorways.map((c) =>
            c.name === name ? { ...c, code } : c
          ),
        })),
    }),
    {
      name: 'llm-chat-storage',
    }
  )
);

export default useStore;