import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { Message, MessageAuthor, PersonalizedPlan } from '../types';
import { initializeChat } from '../services/geminiService';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { questions as assessmentQuestions, getAssessmentResult } from '../features/assessment';
import { personalizationQuestion, generatePlan } from '../features/personalization';


interface ChatViewProps {
  onPlanCreated: (plan: PersonalizedPlan) => void;
}


const ChatView: React.FC<ChatViewProps> = ({ onPlanCreated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `msg-${Date.now()}`,
      author: MessageAuthor.MODEL,
      text: 'Xin chào! Tôi là Mind Care. Ngoài việc trò chuyện, tôi có thể giúp bạn xây dựng một lộ trình chăm sóc sức khỏe tinh thần dành riêng cho bạn. Hoặc nếu muốn, chúng ta có thể bắt đầu với một bài trắc nghiệm nhỏ để hiểu hơn về cảm xúc của bạn.',
      isAssessmentOffer: true,
      isPersonalizationOffer: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  // State Management
  const [isAssessing, setIsAssessing] = useState(false);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  
  // Assessment State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    try {
      chatRef.current = initializeChat();
    } catch (e: any) {
      setError("Failed to initialize AI Chat: " + e.message);
      console.error(e);
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatRef.current || isAssessing || isPersonalizing) {
        if(isAssessing) setError("Please complete the assessment first.");
        else if(isPersonalizing) setError("Please select an option to create your plan.");
        else setError("Chat is not initialized.");
        return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = { id: `msg-${Date.now()}`, author: MessageAuthor.USER, text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chatRef.current.sendMessage({ message: text });
      const modelMessage: Message = {
        id: `msg-${Date.now()}`,
        author: MessageAuthor.MODEL,
        text: response.text,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (e) {
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, author: MessageAuthor.MODEL, text: errorMessage },
      ]);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isAssessing, isPersonalizing]);

  const handleStartAssessment = useCallback((messageId: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {...msg, isAssessmentOffer: false, isPersonalizationOffer: false} : msg));
    setIsAssessing(true);

    const firstQuestion = assessmentQuestions[0];
    const questionMessage: Message = {
      id: `q-${Date.now()}`,
      author: MessageAuthor.MODEL,
      text: firstQuestion.text,
      assessmentOptions: firstQuestion.options,
    };
    setMessages(prev => [...prev, questionMessage]);
  }, []);

  const handleAssessmentAnswer = useCallback((messageId: string, score: number, label: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {...msg, assessmentOptions: undefined} : msg));
    const userAnswer: Message = { id: `ans-${Date.now()}`, author: MessageAuthor.USER, text: label };
    setMessages(prev => [...prev, userAnswer]);

    const newScores = [...scores, score];
    setScores(newScores);
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < assessmentQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      const nextQuestion = assessmentQuestions[nextQuestionIndex];
      const questionMessage: Message = {
        id: `q-${Date.now()}`,
        author: MessageAuthor.MODEL,
        text: nextQuestion.text,
        assessmentOptions: nextQuestion.options,
      };
      setTimeout(() => setMessages(prev => [...prev, questionMessage]), 500);
    } else {
      const totalScore = newScores.reduce((acc, curr) => acc + curr, 0);
      const resultText = getAssessmentResult(totalScore);
      const resultMessage: Message = { id: `res-${Date.now()}`, author: MessageAuthor.MODEL, text: resultText };
       setTimeout(() => {
        setMessages(prev => [...prev, resultMessage]);
        setIsAssessing(false);
        setCurrentQuestionIndex(0);
        setScores([]);
      }, 500);
    }
  }, [currentQuestionIndex, scores]);

  const handleStartPersonalization = useCallback((messageId: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {...msg, isAssessmentOffer: false, isPersonalizationOffer: false} : msg));
    setIsPersonalizing(true);
    const questionMessage: Message = {
      id: `pers-q-${Date.now()}`,
      author: MessageAuthor.MODEL,
      text: personalizationQuestion.text,
      personalizationOptions: personalizationQuestion.options,
    };
    setMessages(prev => [...prev, questionMessage]);
  }, []);

  const handlePersonalizationAnswer = useCallback((messageId: string, value: string, label: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? {...msg, personalizationOptions: undefined} : msg));
    const userAnswer: Message = { id: `pers-ans-${Date.now()}`, author: MessageAuthor.USER, text: label };
    setMessages(prev => [...prev, userAnswer]);
    
    setIsLoading(true);
    setTimeout(() => {
        const plan = generatePlan(value);
        onPlanCreated(plan);

        const confirmationMessage: Message = {
            id: `pers-res-${Date.now()}`,
            author: MessageAuthor.MODEL,
            text: `Tuyệt vời! Dựa trên chia sẻ của bạn, tôi đã tạo một lộ trình riêng. Bạn có thể xem nó trong tab 'Lộ trình của tôi' nhé.`
        };
        setMessages(prev => [...prev, confirmationMessage]);
        setIsLoading(false);
        setIsPersonalizing(false);
    }, 1000);
  }, [onPlanCreated]);

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 text-center">
            {error}
        </div>
      )}

      <ChatWindow 
        messages={messages} 
        isLoading={isLoading}
        onStartAssessment={handleStartAssessment}
        onAssessmentAnswer={handleAssessmentAnswer}
        onStartPersonalization={handleStartPersonalization}
        onPersonalizationAnswer={handlePersonalizationAnswer}
       />
      <MessageInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        isAssessing={isAssessing}
        isPersonalizing={isPersonalizing}
      />
    </div>
  );
};

export default ChatView;