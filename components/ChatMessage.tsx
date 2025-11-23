import React from 'react';
import { Message, MessageAuthor, AssessmentOption } from '../types';
import { BotIcon, UserIcon } from './icons';

interface ChatMessageProps {
  message: Message;
  onStartAssessment: (messageId: string) => void;
  onAssessmentAnswer: (messageId: string, score: number, label: string) => void;
  onStartPersonalization: (messageId: string) => void;
  onPersonalizationAnswer: (messageId: string, value: string, label: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onStartAssessment,
  onAssessmentAnswer,
  onStartPersonalization,
  onPersonalizationAnswer,
}) => {
  const isUserModel = message.author === MessageAuthor.MODEL;

  const wrapperClasses = isUserModel ? 'justify-start' : 'justify-end';
  const bubbleClasses = isUserModel
    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
    : 'bg-purple-600 text-white rounded-br-none';
  const icon = isUserModel ? <BotIcon /> : <UserIcon />;
  const iconContainerClasses = isUserModel ? 'mr-3' : 'ml-3 order-2';
  const iconBgClasses = isUserModel ? 'bg-pink-100 text-pink-500' : 'bg-purple-600 text-white';

  // Helper to render bold text
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex items-end mb-4 ${wrapperClasses}`}>
      <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-2xl ${isUserModel ? '' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconContainerClasses} ${iconBgClasses}`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl shadow-md ${bubbleClasses}`}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <p>{renderText(message.text)}</p>
          </div>
          {message.isAssessmentOffer && (
            <div className="mt-2">
              <button
                onClick={() => onStartAssessment(message.id)}
                className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
              >
                Làm bài trắc nghiệm nhỏ
              </button>
            </div>
          )}
           {message.isPersonalizationOffer && (
            <div className="mt-2">
              <button
                onClick={() => onStartPersonalization(message.id)}
                className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
              >
                Tạo lộ trình cho tôi
              </button>
            </div>
          )}
          {message.assessmentOptions && (
             <div className="mt-2 flex flex-col items-start space-y-2">
              {message.assessmentOptions.map((option) => (
                <button
                  key={option.score}
                  onClick={() => onAssessmentAnswer(message.id, option.score, option.label)}
                  className="px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
           {message.personalizationOptions && (
             <div className="mt-2 flex flex-col items-start space-y-2">
              {message.personalizationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onPersonalizationAnswer(message.id, option.value, option.label)}
                  className="px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;