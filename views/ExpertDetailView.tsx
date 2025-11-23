import React, { useState } from 'react';
import { Expert, Appointment } from '../types';
import SchedulingCalendar from '../components/SchedulingCalendar';

interface ExpertDetailViewProps {
  expert: Expert;
  onGoBack: () => void;
  onBookAppointment: (appointment: Appointment) => void;
}

const ExpertDetailView: React.FC<ExpertDetailViewProps> = ({ expert, onGoBack, onBookAppointment }) => {
  const [selection, setSelection] = useState<{ date: Date; time: string } | null>(null);

  const handleTimeSelect = (date: Date, time: string) => {
    setSelection({ date, time });
  };

  const handleConfirmBooking = () => {
    if (!selection) return;
    onBookAppointment({
      expertId: expert.id,
      expertName: expert.name,
      expertAvatar: expert.avatarUrl,
      date: selection.date,
      time: selection.time,
    });
  };

  return (
    <div className="p-4 md:p-6">
       <button onClick={onGoBack} className="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-4">
          &larr; Quay lại danh sách chuyên gia
        </button>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0 text-center">
             <img
                src={expert.avatarUrl}
                alt={expert.name}
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white dark:border-gray-700 shadow-md"
            />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-4">{expert.name}</h2>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
                {expert.specializations.map((spec) => (
                    <span key={spec} className="px-2 py-1 text-xs font-semibold text-pink-700 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">
                    {spec}
                    </span>
                ))}
            </div>
        </div>
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2 mb-2">Tiểu sử</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{expert.bio}</p>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Chọn lịch hẹn</h3>
        <SchedulingCalendar onTimeSelect={handleTimeSelect} selection={selection} />

        {selection && selection.time && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Bạn đã chọn: <strong className="text-purple-600 dark:text-purple-400">{selection.time}</strong> ngày <strong className="text-purple-600 dark:text-purple-400">{selection.date.toLocaleDateString('vi-VN')}</strong>
            </p>
            <button
              onClick={handleConfirmBooking}
              className="mt-4 px-6 py-3 font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
            >
              Xác nhận lịch hẹn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDetailView;