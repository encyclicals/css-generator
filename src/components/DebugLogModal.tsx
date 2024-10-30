import React from 'react';
import useStore from '../store';
import { X, Copy } from 'lucide-react';

const DebugLogModal: React.FC = () => {
  const { debugLogs, showDebugLog, toggleDebugLog, clearDebugLog } = useStore();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyEntireLog = () => {
    const fullLog = debugLogs
      .map(
        (log) =>
          `[${new Date(log.timestamp).toLocaleString()}] [${log.type.toUpperCase()}] ${
            log.message
          }\n${log.data ? JSON.stringify(log.data, null, 2) : ''}`
      )
      .join('\n\n');
    copyToClipboard(fullLog);
  };

  if (!showDebugLog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full h-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Debug Log</h2>
          <div className="flex gap-2">
            <button
              onClick={copyEntireLog}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </button>
            <button
              onClick={clearDebugLog}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear
            </button>
            <button
              onClick={toggleDebugLog}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-auto h-[calc(100%-4rem)] font-mono text-sm">
          {debugLogs.map((log, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded ${
                log.type === 'error'
                  ? 'bg-red-100 dark:bg-red-900'
                  : log.type === 'warning'
                  ? 'bg-yellow-100 dark:bg-yellow-900'
                  : 'bg-gray-100 dark:bg-gray-900'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                  <span>[{log.type.toUpperCase()}]</span>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `[${new Date(log.timestamp).toLocaleString()}] [${log.type.toUpperCase()}] ${
                        log.message
                      }\n${log.data ? JSON.stringify(log.data, null, 2) : ''}`
                    )
                  }
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1 dark:text-white">{log.message}</div>
              {log.data && (
                <pre className="mt-2 p-2 bg-black text-green-400 rounded overflow-auto">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebugLogModal;