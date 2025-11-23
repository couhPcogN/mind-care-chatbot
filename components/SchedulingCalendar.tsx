import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface SchedulingCalendarProps {
  onTimeSelect: (date: Date, time: string) => void;
  selection: { date: Date; time: string } | null;
}

// Hardcoded available time slots for demonstration
const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

const SchedulingCalendar: React.FC<SchedulingCalendarProps> = ({ onTimeSelect, selection }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    // Pad start
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // Add days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentDate]);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
    setSelectedDate(null); // Reset day selection when changing month
  };
  
  const handleDayClick = (day: Date) => {
      setSelectedDate(day);
      // Reset time selection if day changes
      if (!selection || !isSameDay(day, selection.date)) {
        onTimeSelect(day, ''); // A way to reset in parent if needed, or parent can handle this logic
      }
  }

  const isSameDay = (d1: Date, d2: Date | null) => {
    if (!d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const today = new Date();
  today.setHours(0,0,0,0);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Calendar */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => changeMonth(-1)} className="p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full">
            <ChevronLeftIcon />
          </button>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full">
            <ChevronRightIcon />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 dark:text-gray-400">
          {weekdays.map(day => <div key={day} className="font-semibold p-2">{day}</div>)}
          {daysInMonth.map((day, index) => {
            if (!day) return <div key={`empty-${index}`}></div>;
            const isSelected = isSameDay(day, selectedDate);
            const isPast = day < today;
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;

            return (
              <button
                key={day.toISOString()}
                disabled={isPast || isWeekend}
                onClick={() => handleDayClick(day)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 font-medium
                  ${isPast || isWeekend ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-purple-100 dark:hover:bg-purple-900'}
                  ${isSelected ? 'bg-purple-500 text-white' : 'text-gray-700 dark:text-gray-200'}
                  ${isSameDay(day, today) ? 'border-2 border-purple-500' : ''}
                `}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
      {/* Time Slots */}
      <div className="md:w-1/3">
        <h4 className="font-semibold text-center md:text-left text-gray-700 dark:text-gray-300 mb-3">
          Khung giờ trống {selectedDate ? `ngày ${selectedDate.toLocaleDateString('vi-VN')}` : ''}
        </h4>
        {selectedDate && !isSameDay(selectedDate, today) && selectedDate < today ? (
             <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                Không thể đặt lịch cho quá khứ.
            </p>
        ) : selectedDate && (selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6) ? (
            <div className="grid grid-cols-2 gap-2">
                {availableTimes.map(time => {
                    const isSelected = selectedDate && selection && isSameDay(selectedDate, selection.date) && time === selection.time;
                    return (
                        <button 
                            key={time}
                            onClick={() => onTimeSelect(selectedDate, time)}
                             className={`px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                                isSelected 
                                ? 'bg-purple-500 text-white shadow-md' 
                                : 'text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600'
                            }`}
                        >
                        {time}
                        </button>
                    )
                })}
            </div>
        ) : (
             <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                Vui lòng chọn một ngày trong tuần để xem các khung giờ trống.
            </p>
        )}
      </div>
    </div>
  );
};

export default SchedulingCalendar;