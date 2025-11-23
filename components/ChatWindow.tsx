import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onStartAssessment: (messageId: string) => void;
  onAssessmentAnswer: (messageId: string, score: number, label: string) => void;
  onStartPersonalization: (messageId: string) => void;
  onPersonalizationAnswer: (messageId: string, value: string, label: string) => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-end mb-4 justify-start">
        <div className="flex items-start max-w-xs">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-pink-500 mr-3 bg-pink-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.879 6.845a.75.75 0 0 0-1.06 1.06l1.238 1.238a.75.75 0 0 0 1.06-1.06L9.88 6.845Zm4.242 0a.75.75 0 1 0-1.06 1.06l1.238 1.238a.75.75 0 0 0 1.06-1.06L14.12 6.845Zm2.02 5.953a.75.75 0 1 0-1.06-1.06l-2.02 2.02a.75.75 0 0 0 1.06 1.06l2.02-2.02ZM8.818 12.8a.75.75 0 1 0-1.06-1.06l-2.02 2.02a.75.75 0 0 0 1.06 1.06l2.02-2.02ZM12 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Z" clipRule="evenodd"/>
                </svg>
            </div>
            <div className="px-4 py-3 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none">
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    </div>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onStartAssessment, onAssessmentAnswer, onStartPersonalization, onPersonalizationAnswer }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
    >
      {messages.map((msg) => (
        <ChatMessage 
            key={msg.id} 
            message={msg} 
            onStartAssessment={onStartAssessment}
            onAssessmentAnswer={onAssessmentAnswer}
            onStartPersonalization={onStartPersonalization}
            onPersonalizationAnswer={onPersonalizationAnswer}
        />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatWindow;