import { Mood } from '../types';

export const moods: Mood[] = [
  {
    id: 'great',
    label: 'Tuyệt vời',
    emoji: '😄',
    colorClass: 'bg-green-400',
    colorValue: '#4ade80',
  },
  {
    id: 'good',
    label: 'Tốt',
    emoji: '🙂',
    colorClass: 'bg-teal-400',
    colorValue: '#2dd4bf',
  },
  {
    id: 'ok',
    label: 'Bình thường',
    emoji: '😐',
    colorClass: 'bg-yellow-400',
    colorValue: '#facc15',
  },
  {
    id: 'sad',
    label: 'Buồn',
    emoji: '😢',
    colorClass: 'bg-blue-400',
    colorValue: '#60a5fa',
  },
  {
    id: 'bad',
    label: 'Tệ',
    emoji: '😠',
    colorClass: 'bg-red-400',
    colorValue: '#f87171',
  },
];