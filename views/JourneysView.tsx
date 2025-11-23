import React from 'react';
import { UserProgress } from '../types';
import { journeys } from '../features/journeys';
import JourneyDetailView from './JourneyDetailView';

interface JourneysViewProps {
  activeJourneyId: string | null;
  userProgress: UserProgress;
  onStartOrContinue: (journeyId: string) => void;
  onExitJourney: () => void;
  onCompleteStep: (journeyId: string, day: number) => void;
}

const JourneyCard: React.FC<{
  journey: typeof journeys[0];
  progress: { completedSteps: number[] };
  onSelect: () => void;
}> = ({ journey, progress, onSelect }) => {
  const totalSteps = journey.steps.length;
  const completedSteps = progress?.completedSteps.length || 0;
  const isCompleted = completedSteps === totalSteps;
  const isInProgress = completedSteps > 0 && !isCompleted;

  let statusBadge = null;
  if (isCompleted) {
    statusBadge = <span className="text-xs font-bold text-white bg-green-500 px-2 py-1 rounded-full">Đã hoàn thành</span>;
  } else if (isInProgress) {
    statusBadge = <span className="text-xs font-bold text-white bg-purple-500 px-2 py-1 rounded-full">Đang thực hiện</span>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{journey.title}</h3>
        {statusBadge}
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{journey.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {journey.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs font-semibold text-pink-700 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">
            {tag}
          </span>
        ))}
      </div>
      {isInProgress && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(completedSteps / totalSteps) * 100}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{completedSteps}/{totalSteps} ngày</p>
        </div>
      )}
      <button 
        onClick={onSelect} 
        className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200">
        {isInProgress ? 'Tiếp tục' : (isCompleted ? 'Xem lại' : 'Bắt đầu')}
      </button>
    </div>
  );
};


const JourneysView: React.FC<JourneysViewProps> = ({ activeJourneyId, userProgress, onStartOrContinue, onExitJourney, onCompleteStep }) => {
  const activeJourney = activeJourneyId ? journeys.find(j => j.id === activeJourneyId) : null;

  if (activeJourney) {
    return (
      <JourneyDetailView
        journey={activeJourney}
        progress={userProgress[activeJourney.id] || { completedSteps: [] }}
        onCompleteStep={onCompleteStep}
        onGoBack={onExitJourney}
      />
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      {journeys.map((journey) => (
        <JourneyCard
          key={journey.id}
          journey={journey}
          progress={userProgress[journey.id] || { completedSteps: [] }}
          onSelect={() => onStartOrContinue(journey.id)}
        />
      ))}
    </div>
  );
};

export default JourneysView;