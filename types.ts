
export interface WasteBank {
  id: string;
  name: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  contact?: string;
}

export interface WasteStat {
  year: number;
  month: string;
  tonnage: number;
  plasticPercentage: number;
}

export interface PlasticType {
  code: number;
  name: string;
  description: string;
  recyclability: string;
  examples: string[];
  color: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export enum Tab {
  EDUCATION = 'education',
  DATA = 'data',
  MAPS = 'maps',
  FUNFACT = 'funfact',
  GAME = 'game'
}

export type Language = 'id' | 'en' | 'su' | 'jv';

export const LANGUAGES = [
  { id: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { id: 'en', label: 'English', flag: '🇺🇸' },
  { id: 'su', label: 'Sunda', flag: '🌿' },
  { id: 'jv', label: 'Jawa', flag: '🍵' },
] as const;
