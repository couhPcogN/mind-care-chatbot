import { PersonalizedPlan } from '../types';
import { journeys } from './journeys';
import { exercises } from './exercises';
import { nutritionTips } from './nutrition';

export const personalizationQuestion = {
  text: 'Để tôi có thể giúp tốt nhất, bạn muốn tập trung vào điều gì nhất lúc này?',
  options: [
    { label: 'Đối phó với lo âu và căng thẳng', value: 'anxiety' },
    { label: 'Xây dựng sự tự tin và lòng trắc ẩn', value: 'self-esteem' },
  ],
};

export const generatePlan = (focus: string): PersonalizedPlan => {
  let selectedJourney;
  let recommendedExercises;
  let recommendedNutritionTip;

  switch (focus) {
    case 'anxiety':
    case 'anxiety-dominant':
      selectedJourney = journeys.find(j => j.id === 'j1'); // Grounding & Mindfulness Journey
      recommendedExercises = exercises.filter(e => e.category === 'anxiety' || e.category === 'grounding');
      recommendedNutritionTip = nutritionTips.find(n => n.category === 'calming');
      break;
    case 'self-esteem':
    case 'depression-dominant':
      selectedJourney = journeys.find(j => j.id === 'j2'); // Self-Compassion Journey
      recommendedExercises = exercises.filter(e => e.category === 'self-esteem' || e.category === 'mindfulness');
      recommendedNutritionTip = nutritionTips.find(n => n.category === 'mood-boosting');
      break;
    default:
      // Fallback to a general plan
      selectedJourney = journeys[0];
      recommendedExercises = [exercises[0], exercises[1]];
      recommendedNutritionTip = nutritionTips[0];
      break;
  }
  
  if (!selectedJourney || !recommendedExercises || !recommendedNutritionTip) {
      // Basic fallback to prevent crashes if data is missing
      return {
          journey: journeys[0],
          recommendedExercises: exercises.slice(0, 2),
          recommendedNutritionTip: nutritionTips[0],
      }
  }

  return {
    journey: selectedJourney,
    recommendedExercises: recommendedExercises.slice(0, 2), // Pick first 2 matching exercises
    recommendedNutritionTip: recommendedNutritionTip,
  };
};