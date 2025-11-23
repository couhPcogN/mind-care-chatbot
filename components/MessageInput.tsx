import React, { useState } from 'react';
import { SendIcon } from './icons';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isAssessing: boolean;
  isPersonalizing: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
  isAssessing,
  isPersonalizing
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isAssessing && !isPersonalizing) {
      onSendMessage(input.trim());
      setInput('');
    }
  };
  
  const getPlaceholder = () => {
    if (isAssessing) return "Vui lòng hoàn thành bài trắc nghiệm...";
    if (isPersonalizing) return "Vui lòng chọn một tùy chọn ở trên...";
    return "Nhập tin nhắn của bạn...";
  }

  const isDisabled = isLoading || isAssessing || isPersonalizing;

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
            }
          }}
          placeholder={getPlaceholder()}
          className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl border-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition duration-200 disabled:opacity-50"
          rows={1}
          disabled={isDisabled}
        />
        <button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="p-3 bg-purple-600 text-white rounded-full disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform active:scale-95 disabled:scale-100"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;