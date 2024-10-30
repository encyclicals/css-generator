import React, { useState } from 'react';
import { Send, Trash2, Settings, Bug } from 'lucide-react';
import useStore from '../store';
import ModelSelector from './ModelSelector';
import TemperatureSlider from './TemperatureSlider';
import SettingsModal from './SettingsModal';
import DebugLogModal from './DebugLogModal';
import MessageList from './MessageList';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const {
    messages,
    addMessage,
    clearMessages,
    toggleSettings,
    toggleDebugLog,
    addDebugLog,
    settings,
  } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    addMessage(userMessage);
    addDebugLog({
      timestamp: new Date().toISOString(),
      type: 'info',
      message: 'User message sent',
      data: userMessage,
    });

    setInput('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Advanced LLM Chat',
        },
        body: JSON.stringify({
          model: useStore.getState().selectedModel,
          messages: [...messages, userMessage],
          temperature: useStore.getState().temperature,
        }),
      });

      const data = await response.json();
      addDebugLog({
        timestamp: new Date().toISOString(),
        type: 'info',
        message: 'Assistant response received',
        data,
      });

      if (data.choices?.[0]?.message) {
        addMessage(data.choices[0].message);
      }
    } catch (error) {
      addDebugLog({
        timestamp: new Date().toISOString(),
        type: 'error',
        message: 'Error in API call',
        data: error,
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex items-center gap-4 flex-1">
          <ModelSelector />
          <div className="w-48">
            <TemperatureSlider />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => clearMessages()}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={toggleDebugLog}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Bug className="w-5 h-5" />
          </button>
          <button
            onClick={toggleSettings}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 chat-container">
        <MessageList messages={messages} />
      </div>

      <div className="p-4 controls">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <SettingsModal />
      <DebugLogModal />
    </div>
  );
};

export default ChatInterface;