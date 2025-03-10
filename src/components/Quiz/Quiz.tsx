import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  QuizWrapper,
  QuizProgress,
  QuizQuestion,
  OptionsGrid,
  OptionButton
} from './Quiz.styles';
import { QuizProps } from './Quiz.type';

export const Quiz: FC<QuizProps> = ({
  quiz,
  totalQuizzes,
  currentQuiz,
  studentAnswer,
  onAnswerSelect
}) => {
  const { t } = useTranslation('quiz');

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <QuizWrapper>
      <QuizProgress>
        {t('quiz')} {currentQuiz} {t('of')} {totalQuizzes}
      </QuizProgress>

      <QuizQuestion>{quiz.content}</QuizQuestion>

      <OptionsGrid>
        {quiz.optionList.map((option, index) => (
          <OptionButton
            key={option.optionId}
            onClick={() => onAnswerSelect(option.optionId)}
            selected={studentAnswer?.includes(option.optionId)}
          >
            <span className="option-label">{optionLabels[index]}</span>
            {option.content}
          </OptionButton>
        ))}
      </OptionsGrid>
    </QuizWrapper>
  );
};