import React from 'react';
import { exercises } from '../features/exercises';

const ExercisesView: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-4">
      {exercises.map((exercise) => {
        const Icon = exercise.icon;
        return (
          <div
            key={exercise.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex items-start space-x-4 transition-transform transform hover:scale-105"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center">
              <Icon />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {exercise.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {exercise.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExercisesView;
