import React, { useState } from 'react';
import { BotIcon } from './components/icons';
import NavigationBar from './components/NavigationBar';
import { PersonalizedPlan, UserProgress, View, MoodLog, MoodEntry, Expert, Appointment } from './types';
import { experts } from './features/experts';

// Dynamically import views for better code splitting in a real app
import ChatView from './views/ChatView';
import JourneysView from './views/JourneysView';
import ExercisesView from './views/ExercisesView';
import NutritionView from './views/NutritionView';
import PersonalizedPlanView from './views/PersonalizedPlanView';
import AssessmentView from './views/AssessmentView';
import JournalView from './views/JournalView';
import ExpertsView from './views/ExpertsView';
import ExpertDetailView from './views/ExpertDetailView';
import ExpertSessionView from './views/ExpertSessionView';
import BookingSuccessView from './views/BookingSuccessView';
import ExpertChatView from './views/ExpertChatView';
import ExpertVideoCallView from './views/ExpertVideoCallView';


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.CHAT);
  const [personalizedPlan, setPersonalizedPlan] = useState<PersonalizedPlan | null>(null);

  // State for detailed journeys
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);
  
  // State for Mood Journal
  const [moodLog, setMoodLog] = useState<MoodLog>({});

  // State for Experts flow
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);


  const handlePlanCreated = (plan: PersonalizedPlan) => {
    setPersonalizedPlan(plan);
    setActiveView(View.PERSONALIZED_PLAN); // Switch to the plan view after creation
  };

  const handleStartOrContinueJourney = (journeyId: string) => {
    setActiveJourneyId(journeyId);
    setActiveView(View.JOURNEYS);
  };

  const handleCompleteStep = (journeyId: string, day: number) => {
    setUserProgress(prev => {
      const currentJourneyProgress = prev[journeyId]?.completedSteps || [];
      if (!currentJourneyProgress.includes(day)) {
        return {
          ...prev,
          [journeyId]: {
            completedSteps: [...currentJourneyProgress, day].sort((a, b) => a - b),
          },
        };
      }
      return prev;
    });
  };

  const handleExitJourney = () => {
    setActiveJourneyId(null);
  };

  const handleSaveMoodEntry = (dateKey: string, entry: MoodEntry) => {
    setMoodLog(prev => ({
      ...prev,
      [dateKey]: entry,
    }));
  };

  const handleSelectExpert = (expertId: string) => {
    setSelectedExpertId(expertId);
    setActiveView(View.EXPERT_DETAIL);
  };
  
  const handleExitExpertFlow = () => {
    setSelectedExpertId(null);
    setAppointment(null);
    setActiveView(View.EXPERTS);
  };

  const handleBookAppointment = (appointmentData: Appointment) => {
    setAppointment(appointmentData);
    setActiveView(View.EXPERT_BOOKING_SUCCESS);
  };

  const handleNavigateToSession = () => {
    setActiveView(View.EXPERT_SESSION);
  };

  const handleStartChat = () => {
    setActiveView(View.EXPERT_CHAT);
  };

  const handleStartVideo = () => {
    setActiveView(View.EXPERT_VIDEO_CALL);
  };
  
  const renderContent = () => {
    switch (activeView) {
      case View.JOURNEYS:
        return <JourneysView 
          activeJourneyId={activeJourneyId}
          userProgress={userProgress}
          onStartOrContinue={handleStartOrContinueJourney}
          onExitJourney={handleExitJourney}
          onCompleteStep={handleCompleteStep}
        />;
      case View.EXERCISES:
        return <ExercisesView />;
      case View.NUTRITION:
        return <NutritionView />;
      case View.PERSONALIZED_PLAN:
        return <PersonalizedPlanView 
                  plan={personalizedPlan} 
                  onStartJourney={() => {
                    if (personalizedPlan) {
                      handleStartOrContinueJourney(personalizedPlan.journey.id);
                    }
                  }} 
                />;
      case View.ASSESSMENT:
        return <AssessmentView onPlanCreated={handlePlanCreated} />;
      case View.JOURNAL:
        return <JournalView moodLog={moodLog} onSaveEntry={handleSaveMoodEntry} />;
      case View.EXPERTS:
        return <ExpertsView onSelectExpert={handleSelectExpert} />;
      case View.EXPERT_DETAIL: {
        const expert = experts.find(e => e.id === selectedExpertId);
        if (!expert) {
            setActiveView(View.EXPERTS); // Go back if expert not found
            return null;
        }
        return <ExpertDetailView expert={expert} onGoBack={handleExitExpertFlow} onBookAppointment={handleBookAppointment} />;
      }
      case View.EXPERT_BOOKING_SUCCESS: {
        if(!appointment) {
            setActiveView(View.EXPERTS);
            return null;
        }
        return <BookingSuccessView appointment={appointment} onGoToSession={handleNavigateToSession} onGoBackToExperts={handleExitExpertFlow} />;
      }
      case View.EXPERT_SESSION: {
        if(!appointment) {
            setActiveView(View.EXPERTS);
            return null;
        }
        return <ExpertSessionView appointment={appointment} onStartChat={handleStartChat} onStartVideo={handleStartVideo} onGoBack={handleExitExpertFlow} />
      }
      case View.EXPERT_CHAT: {
         if(!appointment) {
            setActiveView(View.EXPERTS);
            return null;
        }
        const expert = experts.find(e => e.id === appointment.expertId);
        if (!expert) {
            setActiveView(View.EXPERTS);
            return null;
        }
        return <ExpertChatView expert={expert} appointment={appointment} onEndSession={handleExitExpertFlow} />;
      }
       case View.EXPERT_VIDEO_CALL: {
         if(!appointment) {
            setActiveView(View.EXPERTS);
            return null;
        }
        return <ExpertVideoCallView appointment={appointment} onEndSession={handleExitExpertFlow} />;
      }
      case View.CHAT:
      default:
        return <ChatView onPlanCreated={handlePlanCreated} />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeView) {
      case View.JOURNEYS: return 'Hành trình cho bạn';
      case View.EXERCISES: return 'Bài tập tinh thần';
      case View.NUTRITION: return 'Dinh dưỡng & Tâm trạng';
      case View.PERSONALIZED_PLAN: return 'Lộ trình của bạn';
      case View.ASSESSMENT: return 'Đánh giá chuyên sâu';
      case View.JOURNAL: return 'Nhật ký Tâm trạng';
      case View.EXPERTS: return 'Kết nối Chuyên gia';
      case View.EXPERT_DETAIL: return 'Hồ sơ Chuyên gia';
      case View.EXPERT_BOOKING_SUCCESS: return 'Đặt lịch Thành công';
      case View.EXPERT_SESSION: return 'Phòng Tham vấn';
      case View.EXPERT_CHAT: return `Trò chuyện với ${appointment?.expertName || 'Chuyên gia'}`;
      case View.EXPERT_VIDEO_CALL: return `Cuộc gọi với ${appointment?.expertName || 'Chuyên gia'}`;
      case View.CHAT:
      default:
        return 'Mind Care - Trò chuyện';
    }
  };
  
  const getHeaderSubtitle = () => {
     switch (activeView) {
      case View.JOURNEYS: return 'Các liệu trình có hướng dẫn';
      case View.EXERCISES: return 'Các kỹ thuật nhanh để bình tâm';
      case View.NUTRITION: return 'Lời khuyên cho sức khỏe tinh thần';
      case View.PERSONALIZED_PLAN: return 'Một kế hoạch dành riêng cho bạn';
      case View.ASSESSMENT: return 'Hiểu rõ hơn về lo âu & trầm cảm';
      case View.JOURNAL: return 'Theo dõi cảm xúc mỗi ngày';
      case View.EXPERTS: return 'Tham vấn 1-1 với chuyên gia tâm lý';
      case View.EXPERT_DETAIL: return 'Đặt lịch hẹn với chuyên gia';
      case View.EXPERT_BOOKING_SUCCESS: return 'Cuộc hẹn của bạn đã được xác nhận!';
      case View.EXPERT_SESSION: return 'Sẵn sàng để bắt đầu phiên của bạn';
      case View.EXPERT_CHAT: return 'Phiên tham vấn đang diễn ra';
      case View.EXPERT_VIDEO_CALL: return 'Phiên tham vấn đang diễn ra';
      case View.CHAT:
      default:
        return 'Người bạn đồng hành AI';
    }
  }


  return (
    <div className="flex flex-col h-screen font-sans bg-purple-50 dark:bg-gray-900">
      <header className="flex-shrink-0 flex items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full mr-3 shadow-sm">
          <BotIcon />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {getHeaderTitle()}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{getHeaderSubtitle()}</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <footer className="flex-shrink-0">
        <NavigationBar activeView={activeView} setView={setActiveView} />
      </footer>
    </div>
  );
};

export default App;