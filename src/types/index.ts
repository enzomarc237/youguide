export interface MediaAssets {
  images: string[];
  video?: string;
  audio?: string;
}

export interface Quiz {
  question: string;
  options: string[];
  answer: number;
}

export interface GuideStep {
  id: number;
  title: string;
  description: string;
  videoTimestamp: string;
  content: string;
  mediaAssets: MediaAssets;
  notes: string[];
  quiz?: Quiz;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  videoSource: string;
  duration: string;
  steps: GuideStep[];
  createdAt: string;
  options: CustomOptions;
}

export interface CustomOptions {
  includeTimestamps: boolean;
  generateImages: boolean;
  generateAudio: boolean;
  addQuizzes: boolean;
  colorScheme: string;
}
