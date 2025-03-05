import { Option } from '@fishing_cat/api/models/lesson/quiz';
import { CreateQuizOption } from '@fishing_cat/socket/models/quiz';

export interface QuizContextData {
  enableTranslation: boolean;
  sourceType: string;
  questionTitle: string | null;
  optionList: Option[] | CreateQuizOption[];
}

export type RecordAudioButtonProps = {
  $active: boolean;
};
