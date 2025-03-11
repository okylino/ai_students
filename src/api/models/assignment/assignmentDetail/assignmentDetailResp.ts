import { QuizData, Option as QuizOption } from '../../quiz/quiz.type';

export interface AssignmentDetailResp {
  lessonInsightId: string;
  nextQuizId: string | null;
  previousQuizId: string | null;
  quiz: QuizData;
  studentAnswer: number[];
  totalQuizzes: number;
}