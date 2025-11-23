import React, { useState } from 'react';
import { PersonalizedPlan } from '../types';
import { allQuestions, AssessmentOption, interpretPHQ9, interpretGAD7 } from '../features/deepAssessment';
import { generatePlan } from '../features/personalization';
import { ClipboardCheckIcon } from '../components/icons';

interface AssessmentViewProps {
  onPlanCreated: (plan: PersonalizedPlan) => void;
}

type AssessmentStage = 'start' | 'assessing' | 'results';

const AssessmentView: React.FC<AssessmentViewProps> = ({ onPlanCreated }) => {
  const [stage, setStage] = useState<AssessmentStage>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const handleAnswer = (option: AssessmentOption) => {
    const newAnswers = [...answers, option.score];
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage('results');
    }
  };

  const handleCreatePlan = () => {
    const phq9Score = answers.slice(0, 9).reduce((a, b) => a + b, 0);
    const gad7Score = answers.slice(9).reduce((a, b) => a + b, 0);
    
    // Determine focus based on higher score
    const focus = phq9Score > gad7Score ? 'depression-dominant' : 'anxiety-dominant';
    
    const plan = generatePlan(focus);
    onPlanCreated(plan);
  };
  
  const resetAssessment = () => {
    setStage('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }

  const renderContent = () => {
    switch (stage) {
      case 'start':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-500 rounded-full mb-4">
                <ClipboardCheckIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bài đánh giá chuyên sâu</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
              Bài đánh giá này bao gồm 16 câu hỏi dựa trên thang đo PHQ-9 và GAD-7, giúp bạn hiểu rõ hơn về các dấu hiệu cảm xúc liên quan đến lo âu và trầm cảm trong 2 tuần qua.
            </p>
             <p className="text-sm text-gray-500 dark:text-gray-500 mt-4 max-w-md">
                <strong>Lưu ý:</strong> Kết quả chỉ mang tính chất sàng lọc và tham khảo, không thay thế cho chẩn đoán y tế chuyên nghiệp.
            </p>
            <button
              onClick={() => setStage('assessing')}
              className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
            >
              Bắt đầu
            </button>
          </div>
        );

      case 'assessing':
        return (
          <div className="p-4 md:p-8 flex flex-col h-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div className="bg-fuchsia-400 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">Câu {currentQuestionIndex + 1} / {totalQuestions}</p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex-1 flex flex-col justify-center">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white text-center">
                {currentQuestion.text}
              </h3>
              <div className="mt-6 flex flex-col items-center space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.score}
                    onClick={() => handleAnswer(option)}
                    className="w-full max-w-sm px-4 py-3 text-md font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
        
       case 'results':
            const phq9Score = answers.slice(0, 9).reduce((a, b) => a + b, 0);
            const gad7Score = answers.slice(9).reduce((a, b) => a + b, 0);
            const phq9Result = interpretPHQ9(phq9Score);
            const gad7Result = interpretGAD7(gad7Score);

            return (
                 <div className="p-4 md:p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Kết quả đánh giá của bạn</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* PHQ-9 Results */}
                        <div className={`p-5 rounded-xl shadow-lg border-l-4 ${phq9Result.colorClass}`}>
                             <h3 className="text-lg font-bold text-gray-800 dark:text-white">Trầm cảm (PHQ-9)</h3>
                             <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{phq9Score} / 27</p>
                             <p className="font-semibold text-gray-700 dark:text-gray-300">{phq9Result.level}</p>
                             <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">{phq9Result.interpretation}</p>
                        </div>

                        {/* GAD-7 Results */}
                         <div className={`p-5 rounded-xl shadow-lg border-l-4 ${gad7Result.colorClass}`}>
                             <h3 className="text-lg font-bold text-gray-800 dark:text-white">Lo âu (GAD-7)</h3>
                             <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{gad7Score} / 21</p>
                             <p className="font-semibold text-gray-700 dark:text-gray-300">{gad7Result.level}</p>
                             <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">{gad7Result.interpretation}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Bước tiếp theo</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Dựa trên kết quả này, chúng tôi có thể đề xuất một lộ trình chăm sóc được cá nhân hóa để hỗ trợ bạn tốt hơn.</p>
                         <button
                            onClick={handleCreatePlan}
                            className="mt-4 w-full px-4 py-2 font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
                        >
                            Xây dựng lộ trình chăm sóc cho tôi
                        </button>
                    </div>

                    <div className="text-center">
                        <button onClick={resetAssessment} className="text-sm text-gray-500 hover:underline dark:text-gray-400">Làm lại bài đánh giá</button>
                    </div>
                </div>
            );
    }
  };

  return <div className="h-full bg-gray-100 dark:bg-gray-900">{renderContent()}</div>;
};

export default AssessmentView;