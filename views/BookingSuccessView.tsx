import React from 'react';
import { Appointment } from '../types';
import { CheckCircleIcon } from '../components/icons';

interface BookingSuccessViewProps {
  appointment: Appointment;
  onGoToSession: () => void;
  onGoBackToExperts: () => void;
}

const BookingSuccessView: React.FC<BookingSuccessViewProps> = ({ appointment, onGoToSession, onGoBackToExperts }) => {
  return (
    <div className="p-4 md:p-6 flex flex-col items-center justify-center h-full text-center">
      <div className="text-green-500">
        <CheckCircleIcon />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
        Đặt lịch thành công!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Cuộc hẹn của bạn đã được xác nhận.
      </p>

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full max-w-md border-t-4 border-purple-500">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Chi tiết cuộc hẹn</h3>
        <div className="mt-4 text-left space-y-3">
            <div className="flex items-center">
                <img src={appointment.expertAvatar} alt={appointment.expertName} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Chuyên gia</p>
                    <p className="text-gray-900 dark:text-white">{appointment.expertName}</p>
                </div>
            </div>
             <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Thời gian</p>
                <p className="text-gray-900 dark:text-white">{appointment.time}</p>
            </div>
             <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Ngày</p>
                <p className="text-gray-900 dark:text-white">{appointment.date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button 
            onClick={onGoToSession}
            className="flex-1 px-4 py-3 font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
        >
            Vào phòng tham vấn
        </button>
         <button 
            onClick={onGoBackToExperts}
            className="flex-1 px-4 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
        >
            Quay lại
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessView;