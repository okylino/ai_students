import { QuizData } from '../../quiz/quiz.type';

export interface AssignmentDetailResp {
  lessonInsightId: string;
  nextQuizId: string | null;
  previousQuizId: string | null;
  quiz: QuizData;
  studentAnswer: number[];
  totalQuizzes: number;
}

export interface AssignmentDataDetailResp {
  data: AssignmentDetailResp;
  }
