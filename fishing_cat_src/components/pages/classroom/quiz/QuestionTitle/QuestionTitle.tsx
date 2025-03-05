import { Skeleton } from '@mui/material';
import { useContext } from 'react';

import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { useAppSelector } from '@fishing_cat/redux/hook';

import * as $ from './QuestionTitle.style';

interface QuestionTitleProps {
  questionTitle: string;
}

const QuestionTitle = ({ questionTitle }: QuestionTitleProps) => {
  const { enableTranslation } = useContext(QuizContext);
  const { translatedQuestionTitle, isTextTranslationFetching, showTranslate } = useAppSelector(
    (state) => state.translationStore,
  );

  return (
    <$.Wrapper $canTranslate={enableTranslation}>
      <$.Title>{questionTitle}</$.Title>

      {isTextTranslationFetching && (
        <>
          <Skeleton variant='rounded' width='100%' height={28} />
          <Skeleton variant='rounded' width='50%' height={28} />
        </>
      )}

      {!isTextTranslationFetching && showTranslate && translatedQuestionTitle && (
        <$.TranslatedTitle>{translatedQuestionTitle}</$.TranslatedTitle>
      )}
    </$.Wrapper>
  );
};

export default QuestionTitle;
