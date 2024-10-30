import React, { useState } from 'react';
import useStore from '../store';
import { X } from 'lucide-react';

const SettingsModal: React.FC = () => {
  const {
    settings,
    updateSettings,
    showSettings,
    toggleSettings,
    colorways,
    addColorway,
    updateColorway,
  } = useStore();

  const [colorwayDesignerPrompt, setColorwayDesignerPrompt] = useState('');
  const [currentColorwayName, setCurrentColorwayName] = useState('');
  const [editedColorwayCode, setEditedColorwayCode] = useState('');

  // Update local state when selected colorway changes
  React.useEffect(() => {
    const currentColorway = colorways.find((c) => c.name === settings.selectedColorway);
    if (currentColorway) {
      setCurrentColorwayName(currentColorway.name);
      setEditedColorwayCode(currentColorway.code);
    }
  }, [settings.selectedColorway, colorways]);

  const handleSaveColorwayName = () => {
    const updatedColorways = colorways.map((c) =>
      c.name === settings.selectedColorway ? { ...c, name: currentColorwayName } : c
    );
    useStore.setState({ colorways: updatedColorways });
    updateSettings({ selectedColorway: currentColorwayName });
  };

  const handleApplyColorwayCode = () => {
    updateColorway(settings.selectedColorway, editedColorwayCode);
  };

  const handleColorwayDesign = async () => {
    if (!colorwayDesignerPrompt.trim()) return;

    const prompt = `Create a new colorway theme for a chat interface. The theme should be based on this prompt: "${colorwayDesignerPrompt}".

Examples of existing colorways:
${colorways.map((c) => `${c.name}: ${c.code}`).join('\n')}

Please provide a creative and cohesive theme that includes styling for:
- chat container background
- user and assistant message backgrounds
- controls area
- text colors
- borders and spacing

Respond with two sections:
<brainstorming>
[500 words exploring the creative direction and technical implementation]
</brainstorming>
<colorway>
[the actual CSS code]
</colorway>`;

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
          model: 'openai/gpt-4o',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;

      const colorwayMatch = content.match(/<colorway>([\s\S]*?)<\/colorway>/);
      if (colorwayMatch) {
        const newColorway = {
          name: `custom-${colorways.length + 1}`,
          code: colorwayMatch[1].trim(),
          description: colorwayDesignerPrompt,
        };
        addColorway(newColorway);
        updateSettings({ selectedColorway: newColorway.name });
        setCurrentColorwayName(newColorway.name);
        setEditedColorwayCode(newColorway.code);
      }
    } catch (error) {
      console.error('Error generating colorway:', error);
    }
  };

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Settings</h2>
          <button
            onClick={toggleSettings}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              OpenRouter API Key
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value })}
              className="mt-1 block w-full rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Colorway
            </label>
            <select
              value={settings.selectedColorway}
              onChange={(e) => updateSettings({ selectedColorway: e.target.value })}
              className="mt-1 block w-full rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2"
            >
              {colorways.map((colorway) => (
                <option key={colorway.name} value={colorway.name}>
                  {colorway.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Colorway Name
              </label>
              <input
                type="text"
                value={currentColorwayName}
                onChange={(e) => setCurrentColorwayName(e.target.value)}
                className="mt-1 block w-full rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2"
              />
            </div>
            <button
              onClick={handleSaveColorwayName}
              className="mt-7 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Name
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Colorway Code
            </label>
            <textarea
              value={editedColorwayCode}
              onChange={(e) => setEditedColorwayCode(e.target.value)}
              className="mt-1 block w-full rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 h-40 font-mono"
            />
            <button
              onClick={handleApplyColorwayCode}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Apply Changes
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Colorway Designer
            </label>
            <textarea
              value={colorwayDesignerPrompt}
              onChange={(e) => setColorwayDesignerPrompt(e.target.value)}
              placeholder="Describe your desired colorway theme..."
              className="mt-1 block w-full rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 h-20"
            />
            <button
              onClick={handleColorwayDesign}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Generate New Colorway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;