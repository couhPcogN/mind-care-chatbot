import React, { useState, useEffect, useRef } from 'react';
import { Appointment, Expert } from '../types';
import { Chat } from '@google/genai';
import { initializeExpertChat } from '../services/geminiService';
import { SendIcon, UserIcon } from '../components/icons';

interface ChatMessage {
    author: 'user' | 'expert';
    text: string;
}

interface ExpertChatViewProps {
  appointment: Appointment;
  expert: Expert;
  onEndSession: () => void;
}

const TypingIndicator: React.FC<{ avatarUrl: string }> = ({ avatarUrl }) => (
    <div className="flex items-end mb-4 justify-start">
        <div className="flex items-start max-w-xs md:max-w-md lg:max-w-2xl">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 bg-purple-500">
                <img src={avatarUrl} alt="expert typing" className="w-10 h-10 rounded-full object-cover"/>
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


const ExpertChatView: React.FC<ExpertChatViewProps> = ({ appointment, expert, onEndSession }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (expert) {
            try {
                chatRef.current = initializeExpertChat(expert);
                setMessages([
                    { author: 'expert', text: `Chào bạn, tôi là ${expert.name}. Rất vui được trò chuyện cùng bạn hôm nay. Bạn muốn bắt đầu chia sẻ về điều gì?` }
                ]);
            } catch (e: any) {
                setError("Không thể khởi tạo cuộc trò chuyện với chuyên gia: " + e.message);
                console.error(e);
            }
        }
    }, [expert]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { author: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input.trim();
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatRef.current.sendMessage({ message: currentInput });
            const expertMessage: ChatMessage = { author: 'expert', text: response.text };
            setMessages(prev => [...prev, expertMessage]);
        } catch (e) {
            const errorMessage = "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";
            setError(errorMessage);
            setMessages(prev => [...prev, { author: 'expert', text: errorMessage }]);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

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
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            {error && (
                <div className="p-2 bg-red-100 text-red-700 text-center text-sm">
                    {error}
                </div>
            )}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((msg, index) => {
                    const isExpert = msg.author === 'expert';
                    return (
                        <div key={index} className={`flex items-end mb-4 ${isExpert ? 'justify-start' : 'justify-end'}`}>
                            <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-2xl ${!isExpert && 'flex-row-reverse'}`}>
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${isExpert ? 'mr-3' : 'ml-3 order-2'} ${isExpert ? 'bg-purple-500' : 'bg-purple-600'}`}>
                                    {isExpert ? <img src={expert.avatarUrl} alt="expert" className="w-10 h-10 rounded-full object-cover"/> : <UserIcon />}
                                </div>
                                <div className={`px-4 py-3 rounded-2xl shadow-md ${isExpert ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none' : 'bg-purple-600 text-white rounded-br-none'}`} style={{ whiteSpace: 'pre-wrap' }}>
                                    <p>{renderText(msg.text)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {isLoading && <TypingIndicator avatarUrl={expert.avatarUrl} />}
            </div>
            <div className="p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl border-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition duration-200 disabled:opacity-50"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="p-3 bg-purple-600 text-white rounded-full disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                    >
                        <SendIcon />
                    </button>
                    <button
                        onClick={onEndSession}
                        className="px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                        Kết thúc
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpertChatView;