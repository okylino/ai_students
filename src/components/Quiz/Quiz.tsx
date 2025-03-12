import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  QuizWrapper,
  QuizProgress,
  QuizQuestion,
  OptionsGrid,
  OptionButton,
  QuizContainer,
  OptionLabel,
  NavigationButtons,
  NavButton,
  OptionContainer,
  QuizContent,
} from './Quiz.styles';
import { QuizProps } from '../../api/models/quiz/quiz.type';

export const Quiz: FC<QuizProps> = ({
  quiz,
  totalQuizzes,
  currentQuiz,
  studentAnswer,
  onAnswerSelect,
  onPrevious,
  onNext,
}) => {
  const { t } = useTranslation('quiz');

  if (!quiz) {
    return <QuizContainer>{t('loading')}</QuizContainer>;
  }

  console.log('Quiz props:', {
    quiz,
    totalQuizzes,
    currentQuiz,
    studentAnswer,
    onAnswerSelect,
    onPrevious,
    onNext
  });

  console.log('quiz:', quiz);
  console.log('totalQuizzes:', totalQuizzes);
  console.log('currentQuiz:', currentQuiz);
  console.log('studentAnswer:', studentAnswer);
  console.log('optionList:', quiz.optionList);

  const optionLabels = ['A', 'B', 'C', 'D'];

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      onNext();
    } else {
      onPrevious();
    }
  };

  return (
    <QuizContainer>
      <QuizWrapper>
        <QuizContent>
          <QuizProgress>
            {t('quiz')} {currentQuiz} {t('of')} {totalQuizzes}
          </QuizProgress>
          <QuizQuestion>{quiz.content}</QuizQuestion>
        </QuizContent>
        <NavigationButtons>
          <NavButton 
            onClick={() => handleNavigation('prev')} 
            disabled={currentQuiz === 1}
            $prev
          />
          <NavButton 
            onClick={() => handleNavigation('next')}
            disabled={currentQuiz === totalQuizzes || currentQuiz === 0}
          />
        </NavigationButtons>
      </QuizWrapper>
      <OptionsGrid>
        {Array.isArray(quiz.optionList) && quiz.optionList.map((option, index) => (
          <div key={option.optionId || index}>
            <OptionContainer>
              <OptionLabel>{optionLabels[index]}</OptionLabel>
              <OptionButton
                onClick={() => onAnswerSelect(option.optionId)}
                selected={studentAnswer?.includes(option.optionId)}
              >
                {option.content || ''}
              </OptionButton>
            </OptionContainer>
          </div>
        ))}
      </OptionsGrid>
    </QuizContainer>
  );
};