import React from 'react';

export enum MessageAuthor {
  USER = 'user',
  MODEL = 'model',
}

export interface AssessmentOption {
  label: string;
  score: number;
}

export interface Message {
  id: string;
  author: MessageAuthor;
  text: string;
  isAssessmentOffer?: boolean;
  isPersonalizationOffer?: boolean;
  assessmentOptions?: AssessmentOption[];
  personalizationOptions?: { label: string; value: string }[];
}


export enum View {
  CHAT,
  JOURNEYS,
  EXERCISES,
  NUTRITION,
  PERSONALIZED_PLAN,
  ASSESSMENT,
  JOURNAL,
  EXPERTS,
  EXPERT_DETAIL,
  EXPERT_SESSION,
  EXPERT_BOOKING_SUCCESS,
  EXPERT_CHAT,
  EXPERT_VIDEO_CALL,
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  category: 'anxiety' | 'grounding' | 'self-esteem' | 'mindfulness';
}

export interface JourneyStep {
  day: number;
  title: string;
  content: string;
  exerciseId: string | null;
  reflectionPrompt: string;
}

export interface Journey {
  id:string;
  title: string;
  description: string;
  tags: string[];
  steps: JourneyStep[];
}

export interface UserProgress {
  [journeyId: string]: {
    completedSteps: number[]; // Array of completed day numbers
  };
}


export interface NutritionTip {
  id: string;
  title: string;
  content: string;
  icon: React.ComponentType;
  category: 'mood-boosting' | 'energy' | 'calming';
}

export interface PersonalizedPlan {
  journey: Journey;
  recommendedExercises: Exercise[];
  recommendedNutritionTip: NutritionTip;
}

// Types for Mood Journal Feature
export interface Mood {
  id: 'great' | 'good' | 'ok' | 'sad' | 'bad';
  label: string;
  emoji: string;
  colorClass: string;
  colorValue: string;
}

export interface MoodEntry {
  moodId: Mood['id'];
  notes?: string;
}

// Using a string key in 'YYYY-MM-DD' format
export interface MoodLog {
  [date: string]: MoodEntry;
}

// Types for Experts Feature
export interface Expert {
  id: string;
  name: string;
  avatarUrl: string;
  specializations: string[];
  bio: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
  isPopular?: boolean;
}

export interface Appointment {
  expertId: string;
  expertName: string;
  expertAvatar: string;
  date: Date;
  time: string;
}