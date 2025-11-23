import React from 'react';
import { PersonalizedPlan } from '../types';
import { BrainIcon, BookOpenIcon, LeafIcon, ChatBubbleIcon } from '../components/icons';

interface PersonalizedPlanViewProps {
  plan: PersonalizedPlan | null;
  onStartJourney: () => void; // A simple handler for now
}

const PersonalizedPlanView: React.FC<PersonalizedPlanViewProps> = ({ plan, onStartJourney }) => {
  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
         <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-500 rounded-full mb-4">
          <ChatBubbleIcon />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bạn chưa có lộ trình nào</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
          Hãy quay lại tab "Trò chuyện" và bắt đầu xây dựng một lộ trình được cá nhân hóa để nhận được các bài tập và hướng dẫn phù hợp nhất với bạn.
        </p>
      </div>
    );
  }

  const { journey, recommendedExercises, recommendedNutritionTip } = plan;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Core Journey Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Hành trình cốt lõi của bạn</h2>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center">
              <BookOpenIcon />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{journey.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{journey.description}</p>
            </div>
          </div>
           <div className="mt-4 flex flex-wrap gap-2">
            {journey.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs font-semibold text-pink-700 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">
                {tag}
              </span>
            ))}
          </div>
           <button onClick={onStartJourney} className="mt-5 w-full px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200">
            Bắt đầu hành trình
          </button>
        </div>
      </section>

      {/* Recommended Exercises Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Bài tập nhanh được đề xuất</h2>
        <div className="space-y-3">
          {recommendedExercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <div key={exercise.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center">
                  <Icon />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">{exercise.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{exercise.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Nutrition Tip Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Mẹo dinh dưỡng hữu ích</h2>
         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center">
              <LeafIcon />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white">{recommendedNutritionTip.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{recommendedNutritionTip.content}</p>
            </div>
          </div>
      </section>
    </div>
  );
};

export default PersonalizedPlanView;