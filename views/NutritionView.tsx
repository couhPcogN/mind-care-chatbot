import React from 'react';
import { nutritionTips } from '../features/nutrition';

const NutritionView: React.FC = () => {
  return (
    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {nutritionTips.map((tip) => {
        const Icon = tip.icon;
        return (
          <div
            key={tip.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center">
              <Icon />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-4">
              {tip.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              {tip.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default NutritionView;
