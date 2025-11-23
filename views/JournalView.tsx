import React, { useState, useMemo } from 'react';
import { MoodLog, MoodEntry, Mood } from '../types';
import { moods } from '../features/moods';
import { generateCalendarDays } from '../features/calendarUtils';

interface JournalViewProps {
  moodLog: MoodLog;
  onSaveEntry: (dateKey: string, entry: MoodEntry) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ moodLog, onSaveEntry }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [selectedMood, setSelectedMood] = useState<Mood['id'] | null>(null);
  const [notes, setNotes] = useState('');

  const days = useMemo(() => generateCalendarDays(currentDate), [currentDate]);
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };
  
  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const entry = moodLog[formatDateKey(date)];
    setSelectedMood(entry?.moodId || null);
    setNotes(entry?.notes || '');
  };

  const handleSave = () => {
    if (!selectedMood) return;
    const dateKey = formatDateKey(selectedDate);
    onSaveEntry(dateKey, { moodId: selectedMood, notes });
  };
  
  const selectedDateKey = formatDateKey(selectedDate);
  const todaysEntry = moodLog[selectedDateKey];
  const todayMood = todaysEntry ? moods.find(m => m.id === todaysEntry.moodId) : null;
  
  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 h-full">
      {/* Calendar View */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => changeMonth(-1)} className="px-2 py-1 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md">&lt;</button>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={() => changeMonth(1)} className="px-2 py-1 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md">&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 dark:text-gray-400">
          {weekdays.map(day => <div key={day} className="font-semibold">{day}</div>)}
          {days.map(({ date, isCurrentMonth, isToday }, index) => {
            const dateKey = formatDateKey(date);
            const moodEntry = moodLog[dateKey];
            const mood = moodEntry ? moods.find(m => m.id === moodEntry.moodId) : null;
            const isSelected = dateKey === selectedDateKey;

            return (
              <button
                key={index}
                onClick={() => handleDayClick(date)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isCurrentMonth ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'
                } ${isSelected ? 'bg-purple-200 dark:bg-purple-800' : ''} ${isToday ? 'font-bold border-2 border-purple-500' : ''}`}
              >
                {date.getDate()}
                {mood && <span className={`absolute bottom-1 w-2 h-2 rounded-full ${mood.colorClass}`}></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Entry View */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">Hôm nay bạn cảm thấy thế nào?</p>
        <div className="flex justify-around items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
          {moods.map(mood => (
            <button 
              key={mood.id} 
              onClick={() => setSelectedMood(mood.id)}
              className={`text-3xl p-2 rounded-full transition-transform transform hover:scale-125 ${selectedMood === mood.id ? 'bg-white dark:bg-gray-600 shadow-md' : ''}`}
              aria-label={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-400 mt-6 mb-2">Ghi chú thêm (tùy chọn):</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-transparent focus:ring-2 focus:ring-purple-500 transition duration-200"
          placeholder="Điều gì đã xảy ra hôm nay?"
        />
        
        <button
          onClick={handleSave}
          disabled={!selectedMood}
          className="mt-6 w-full px-4 py-3 font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Lưu tâm trạng
        </button>

         {todayMood && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border-l-4" style={{ borderColor: todayMood ? todayMood.colorValue : 'transparent' }}>
                 <h4 className="font-bold text-gray-800 dark:text-white">Ghi nhận của ngày</h4>
                 <div className="flex items-center mt-2">
                    <span className="text-2xl mr-2">{todayMood.emoji}</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{todayMood.label}</span>
                 </div>
                 {todaysEntry.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{todaysEntry.notes}"</p>}
             </div>
         )}
      </div>
    </div>
  );
};

export default JournalView;