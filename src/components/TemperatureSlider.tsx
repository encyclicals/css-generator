import React from 'react';
import useStore from '../store';

const TemperatureSlider: React.FC = () => {
  const { temperature, setTemperature } = useStore();

  return (
    <div className="flex items-center gap-2 text-sm">
      <label className="whitespace-nowrap dark:text-white">Temp:</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
        className="w-24"
      />
      <span className="min-w-[2ch] dark:text-white">{temperature}</span>
    </div>
  );
};

export default TemperatureSlider;