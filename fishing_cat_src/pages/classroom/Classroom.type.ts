import { Option } from '@fishing_cat/api/models/lesson/quiz';
import { OPTION_TYPE } from '@fishing_cat/enums/option';
import { QUIZ_SOURCE_TYPE, QUIZ_STATUS, QUIZ_TYPE } from '@fishing_cat/enums/quiz';
import { CreateQuizOption } from '@fishing_cat/socket/models/quiz';

export interface QuizData {
  isOpen: boolean;
  imgUrl: string;
  type: QUIZ_TYPE;
  id: string;
  title: string;
  studentAnswer: string | number[] | null;
  status: QUIZ_STATUS;
  optionList: (CreateQuizOption | Option)[];
  optionType: OPTION_TYPE | '';
  sourceType: QUIZ_SOURCE_TYPE | '';
}

export function isApiResponseOption(option: CreateQuizOption | Option): option is Option {
  return 'is_answer' in option;
}
