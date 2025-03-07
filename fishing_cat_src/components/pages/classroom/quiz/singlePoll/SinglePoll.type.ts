import { Dispatch, SetStateAction } from 'react';

import { Option } from '@fishing_cat/api/models/lesson/quiz';
import { OPTION_TYPE } from '@fishing_cat/enums/option';
import { QUIZ_STATUS, QUIZ_TYPE } from '@fishing_cat/enums/quiz';

export interface SinglePollProps {
  questionImg: string;
  quizStatus: QUIZ_STATUS;
  answerQuiz: any;
  optionList: Option[];
  quizAnswer: number[];
  quizStudentAnswer: string | number[] | undefined;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  isSubmit: boolean;
  isLoading: boolean;
  answer: Answer[];
  setAnswer: Dispatch<SetStateAction<Answer[]>>;
  questionType: QUIZ_TYPE;
  optionType: OPTION_TYPE;
  questionTitle: string;
}
export interface Answer {
  option_id: number;
}
