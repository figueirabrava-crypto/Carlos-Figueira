
export enum Subject {
  AIA = 'Avaliação de Impactos Ambientais',
  BIOETHICS = 'Bioética e Legislação'
}

export type Theme = 'light' | 'dark';

export interface AccessibilityConfig {
  simplifiedLanguage: boolean;
  highContrast: boolean;
  voiceGuidance: boolean;
}

export interface ConceptNode {
  id: string;
  label: string;
  description: string;
  connection?: string;
}

export interface Facilitator {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
  specialty: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
  level: 'Acadêmico' | 'Concurso Público' | 'Profissional';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  tutor?: string;
  grounding?: any[];
}

export interface SyllabusSection {
  title: string;
  content: string;
  keyPoints: string[];
  legalFramework?: string[];
  conceptMap?: ConceptNode[];
}

export interface SubjectData {
  title: Subject;
  description: string;
  facilitator: Facilitator;
  syllabus: SyllabusSection[];
  quiz: Question[];
  curiosities: any[];
}
