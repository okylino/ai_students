import { OPTION_TYPE } from '@fishing_cat/enums/option';
import {
  QUIZ_ANSWER_TYPE,
  QUIZ_RESPONSE_TYPE,
  QUIZ_SOURCE_TYPE,
  QUIZ_STATUS,
  QUIZ_TYPE,
} from '@fishing_cat/enums/quiz';
import { CreateQuizMessage } from '@fishing_cat/socket/models/quiz';

export interface QuizResp {
  data: QuizResponseData;
}

export interface QuizResponseData {
  quiz_id: string;
  quiz_type: QUIZ_TYPE;
  img_url: string;
  response_type: QUIZ_RESPONSE_TYPE; // new
  answer_type: QUIZ_ANSWER_TYPE; // new
  option_type: OPTION_TYPE; // new
  content: string;
  option_list: Option[];
  student_answer: string | number[] | null;
  quiz_status: QUIZ_STATUS;
  source_type: QUIZ_SOURCE_TYPE;
}

export function isQuizResponseData(data: CreateQuizMessage | QuizResponseData): data is QuizResponseData {
  return 'quiz_status' in data && 'student_answer' in data;
}

export interface Option {
  option_id: number;
  content: string;
  is_answer: boolean;
  is_ai_answer: boolean;
  reason: string;
}
