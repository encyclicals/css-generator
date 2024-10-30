import React from 'react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`message max-w-[80%] relative ${
              message.role === 'user' ? 'user-message' : 'assistant-message'
            }`}
          >
            <div className="font-semibold mb-2 dark:text-white text-sm px-1">
              {message.role === 'user' ? 'You' : 'Assistant'}
            </div>
            <div className="bubble-content">
              <ReactMarkdown className="prose dark:prose-invert max-w-none">
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;