import { QUIZ_ANSWER_RESULT, QUIZ_TYPE } from '@/enums/quiz';

export interface LessonStudentQuizzesResp {
  data: Quiz[];
}

export interface Quiz {
  quizId: string;
  quizType: QUIZ_TYPE;
  chirpId: string | null;
  seq: number;
  imgUrl: string | null;
  content: string | null;
  ansResult: QUIZ_ANSWER_RESULT;
  pinned: boolean;
}
