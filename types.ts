
export interface Option {
  id: string;
  text: string;
  image: string;
  analysis: string;
}

export interface Question {
  id: number;
  category: string;
  guide: string;
  title: string;
  options: Option[];
}

export type AppPhase = 'HOME' | 'QUIZ' | 'RESULT';
