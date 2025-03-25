export interface Option {
  optionId: number;
  content: string;
  isAiAnswer: boolean;
  reason: string;
}

export interface QuizData {
  quizId: string;
  chirpId: string;
  quizType: string;
  content: string;
  optionType: string;
  seq: number;
  optionList: Option[];
}

export interface QuizProps {
  quiz: QuizData;
  studentAnswer?: number[];
  totalQuizzes: number;
  currentQuiz: number;
  onAnswerSelect: (optionId: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}