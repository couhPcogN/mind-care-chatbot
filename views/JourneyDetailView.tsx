import React, { useState, useEffect, useMemo } from 'react';
import { Journey, UserProgress } from '../types';
import { exercises } from '../features/exercises';

interface JourneyDetailViewProps {
  journey: Journey;
  progress: { completedSteps: number[] };
  onCompleteStep: (journeyId:string, day: number) => void;
  onGoBack: () => void;
}

const JourneyDetailView: React.FC<JourneyDetailViewProps> = ({ journey, progress, onCompleteStep, onGoBack }) => {
  const findNextStep = () => {
     // Find the first step (day) that is not in the completed list
     const nextStep = journey.steps.find(step => !progress.completedSteps.includes(step.day));
     // If all steps are completed, default to the last step; otherwise, default to the first step.
     return nextStep ? nextStep.day : (journey.steps[journey.steps.length - 1]?.day || 1);
  };
  
  const [currentDay, setCurrentDay] = useState<number>(findNextStep());

  useEffect(() => {
    // When progress changes (e.g., a step is completed), find the next logical step to show.
    setCurrentDay(findNextStep());
  }, [progress, journey]);


  const currentStep = useMemo(() => journey.steps.find(s => s.day === currentDay), [journey, currentDay]);
  const linkedExercise = useMemo(() => currentStep?.exerciseId ? exercises.find(ex => ex.id === currentStep.exerciseId) : null, [currentStep]);
  const isStepCompleted = progress.completedSteps.includes(currentDay);

  const handleCompleteAndContinue = () => {
    if (!currentStep) return;

    // Mark current step as complete
    onCompleteStep(journey.id, currentStep.day);

    // Find the next step in the journey sequence
    const nextStepIndex = journey.steps.findIndex(s => s.day === currentDay) + 1;
    if (nextStepIndex < journey.steps.length) {
      setCurrentDay(journey.steps[nextStepIndex].day);
    } 
    // If it's the last step, it will be marked complete, and the view will remain on it.
  };

  if (!currentStep) {
    return <div>Lỗi: Không tìm thấy bước hành trình.</div>
  }
  
  return (
    <div className="p-4 md:p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <button onClick={onGoBack} className="text-sm text-purple-600 dark:text-purple-400 hover:underline mb-2">
          &larr; Quay lại danh sách
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{journey.title}</h1>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row md:space-x-6 overflow-y-auto">
        
        {/* Step Navigator */}
        <aside className="w-full md:w-1/4 flex-shrink-0 mb-4 md:mb-0">
            <h2 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Các bước</h2>
            <nav className="space-y-1">
                {journey.steps.map(step => {
                    const isCompleted = progress.completedSteps.includes(step.day);
                    const isCurrent = step.day === currentDay;
                    const baseClasses = "w-full text-left p-3 rounded-lg text-sm transition-colors duration-200 flex items-center";
                    const stateClasses = isCurrent 
                        ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 font-bold"
                        : isCompleted 
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700";

                    return (
                        <button key={step.day} onClick={() => setCurrentDay(step.day)} className={`${baseClasses} ${stateClasses}`}>
                           {isCompleted && <span className="mr-2 text-green-500">✓</span>}
                           <span>Ngày {step.day}: {step.title}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
        
        {/* Step Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{currentStep.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-4 whitespace-pre-wrap">{currentStep.content}</p>

            {linkedExercise && (
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-bold text-purple-800 dark:text-purple-200">Bài tập thực hành</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1"><strong>{linkedExercise.title}:</strong> {linkedExercise.description}</p>
                </div>
            )}
            
             <div className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/50 rounded-lg border-l-4 border-pink-400">
                <h4 className="font-bold text-pink-800 dark:text-pink-200">Suy ngẫm</h4>
                <p className="text-sm text-pink-700 dark:text-pink-300 mt-1 italic">"{currentStep.reflectionPrompt}"</p>
            </div>

            <div className="mt-8 text-center">
                 <button 
                    onClick={handleCompleteAndContinue}
                    disabled={isStepCompleted}
                    className="px-6 py-3 font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isStepCompleted ? 'Đã hoàn thành' : 'Hoàn thành & Tiếp tục'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailView;