import React from 'react';
import { View } from '../types';
import { BrainIcon, BookOpenIcon, LeafIcon, ChatBubbleIcon, ClipboardListIcon, ClipboardCheckIcon, CalendarIcon, UserGroupIcon } from './icons';

interface NavigationBarProps {
  activeView: View;
  setView: (view: View) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeView, setView }) => {
  const navItems = [
    { view: View.CHAT, icon: ChatBubbleIcon, label: 'Trò chuyện' },
    { view: View.ASSESSMENT, icon: ClipboardCheckIcon, label: 'Đánh giá' },
    { view: View.EXPERTS, icon: UserGroupIcon, label: 'Chuyên gia' },
    { view: View.PERSONALIZED_PLAN, icon: ClipboardListIcon, label: 'Lộ trình' },
    { view: View.JOURNAL, icon: CalendarIcon, label: 'Nhật ký' },
    { view: View.JOURNEYS, icon: BookOpenIcon, label: 'Hành trình' },
    { view: View.EXERCISES, icon: BrainIcon, label: 'Bài tập' },
    { view: View.NUTRITION, icon: LeafIcon, label: 'Dinh dưỡng' },
  ].filter(item => {
      const hideAssessment = import.meta.env.VITE_HIDE_ASSESSMENT === 'true';
      return !(item.view === View.ASSESSMENT && hideAssessment);
  });

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          const Icon = item.icon;
          const classes = isActive
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400';

          return (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors duration-200 ${classes}`}
              aria-label={item.label}
            >
              <Icon />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;