import React from 'react';
import { Appointment } from '../types';
import { VideoCameraIcon, ChatBubbleLeftRightIcon } from '../components/icons';

interface ExpertSessionViewProps {
  appointment: Appointment;
  onGoBack: () => void;
  onStartChat: () => void;
  onStartVideo: () => void;
}

const ExpertSessionView: React.FC<ExpertSessionViewProps> = ({ appointment, onGoBack, onStartChat, onStartVideo }) => {

  return (
    <div className="p-4 md:p-6 flex flex-col items-center justify-center h-full text-center">
        <img
            src={appointment.expertAvatar}
            alt={appointment.expertName}
            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
            Cuộc hẹn với {appointment.expertName}
        </h2>
        <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mt-1">
            {appointment.time} - {appointment.date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Sẵn sàng bắt đầu?</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                Khi đến giờ hẹn, bạn có thể bắt đầu phiên tham vấn bằng cách trò chuyện hoặc gọi video trực tiếp.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={onStartChat}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-200"
                >
                    <ChatBubbleLeftRightIcon />
                    Bắt đầu Chat
                </button>
                <button 
                    onClick={onStartVideo}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-200"
                >
                    <VideoCameraIcon />
                    Bắt đầu Video Call
                </button>
            </div>
        </div>
        
        <button onClick={onGoBack} className="mt-8 text-sm text-gray-500 hover:underline dark:text-gray-400">
          Quay lại danh sách chuyên gia
        </button>
    </div>
  );
};

export default ExpertSessionView;