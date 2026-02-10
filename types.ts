
export enum Subject {
  AIA = 'Avaliação de Impactos Ambientais',
  BIOETHICS = 'Bioética e Legislação'
}

export type Theme = 'light' | 'dark';

export interface Facilitator {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
}

export interface SyllabusSection {
  title: string;
  content: string;
  keyPoints: string[];
  scientificRef: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  outcome: string;
  subject: Subject | 'Integrado';
  source: string;
}

export interface Curiosity {
  title: string;
  content: string;
  icon: string;
}

export interface SubjectData {
  title: Subject;
  description: string;
  facilitator: Facilitator;
  syllabus: SyllabusSection[];
  quiz: Question[];
  cases: CaseStudy[];
  curiosities: Curiosity[];
}
