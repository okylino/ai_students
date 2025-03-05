import { OPTION_TYPE, QUIZ_TYPE, SOURCE_TYPE } from '@/enums/quiz';

export interface QuizRecordsStudentResp {
  data: StudentQuizRecord;
}

export interface StudentQuizRecord {
  quizId: string;
  sourceType: SOURCE_TYPE;
  quizType: QUIZ_TYPE;
  optionType: OPTION_TYPE;
  imgUrl: string;
  content: string | null;
  /** student's answers */
  quizResults: (string | number)[];
  optionList: Option[] | null;
  aiShortAnswer: string | null;
}

interface Option {
  optionId: number;
  content: string | null;
  isAnswer: boolean;
  reason: string | null;
}
