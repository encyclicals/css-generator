import React from 'react';
import useStore from '../store';

const MODELS = [
  { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B Instruct' },
  { id: 'meta-llama/llama-3.2-1b-instruct:free', name: 'Llama 3.2 1B Instruct' },
  { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B Instruct' },
  { id: 'meta-llama/llama-3.2-11b-vision-instruct', name: 'Llama 3.2 11B Vision' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B Instruct' },
  { id: 'meta-llama/llama-3.2-90b-vision-instruct', name: 'Llama 3.2 90B Vision' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B Instruct' },
  { id: 'openai/chatgpt-4o-latest', name: 'ChatGPT-4 Latest' },
  { id: 'openai/gpt-4o:extended', name: 'GPT-4 Extended' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4 Mini' },
  { id: 'openai/o1-preview', name: 'O1 Preview' },
  { id: 'openai/o1-mini', name: 'O1 Mini' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
  { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
  { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5' },
  { id: 'google/gemini-flash-1.5', name: 'Gemini Flash 1.5' },
  { id: 'google/gemini-flash-1.5-8b', name: 'Gemini Flash 1.5 8B' },
  { id: 'perplexity/llama-3.1-sonar-huge-128k-online', name: 'Sonar Huge 128K' },
  { id: 'perplexity/llama-3.1-sonar-small-128k-online', name: 'Sonar Small 128K' },
  { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B' },
  { id: 'mistralai/mistral-nemo', name: 'Mistral Nemo' },
  { id: 'mistralai/pixtral-12b:free', name: 'Pixtral 12B' },
  { id: 'nousresearch/hermes-3-llama-3.1-405b:free', name: 'Hermes 3 405B' },
  { id: 'mattshumer/reflection-70b:free', name: 'Reflection 70B' },
  { id: 'qwen/qwen-2-vl-7b-instruct:free', name: 'Qwen 2 VL 7B' },
  { id: 'openchat/openchat-7b:free', name: 'OpenChat 7B' },
  { id: 'microsoft/phi-3-mini-128k-instruct:free', name: 'Phi 3 Mini 128K' },
  { id: 'liquid/lfm-40b:free', name: 'LFM 40B' },
  { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B' },
];

const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useStore();

  return (
    <select
      value={selectedModel}
      onChange={(e) => setSelectedModel(e.target.value)}
      className="p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    >
      {MODELS.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  );
};

export default ModelSelector;