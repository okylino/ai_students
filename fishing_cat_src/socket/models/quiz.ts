import { OPTION_TYPE } from '@fishing_cat/enums/option';
import {
  QUIZ_ANSWER_TYPE,
  QUIZ_RESPONSE_TYPE,
  QUIZ_SOURCE_TYPE,
  QUIZ_STATUS,
  QUIZ_TYPE,
} from '@fishing_cat/enums/quiz';

export interface RevealQuizAnswerMessage {
  quiz_id: string;
  answer: number[];
}

export interface QuizCallback {
  student_id: string;
  sid: string;
}

export interface FinishQuizMessage {
  quiz_id: string;
  quiz_status: QUIZ_STATUS.FINISH | QUIZ_STATUS.CANCEL;
}

export interface CreateQuizOption {
  option_id: number;
  content: string;
  is_ai_answer: boolean;
  reason: string;
}

export interface CreateQuizMessage {
  lesson_id: string;
  quiz_id: string;
  content: string;
  img_url: string;
  option_type: OPTION_TYPE; // new
  answer_type: QUIZ_ANSWER_TYPE; // new
  response_type: QUIZ_RESPONSE_TYPE; // new
  quiz_type: QUIZ_TYPE;
  option_list: CreateQuizOption[];
  source_type: QUIZ_SOURCE_TYPE;
}

export interface CloseQuizMessage {
  quiz_id: string;
  quiz_status: QUIZ_STATUS.CLOSE;
}
