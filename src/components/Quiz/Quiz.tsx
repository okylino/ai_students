import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  QuizWrapper,
  QuizProgress,
  QuizQuestion,
  OptionsGrid,
  OptionButton,
  QuizContainer,
} from './Quiz.styles';
import { QuizProps } from '../../api/models/quiz/quiz.type';

export const Quiz: FC<QuizProps> = ({
  quiz,
  totalQuizzes,
  currentQuiz,
  studentAnswer,
  onAnswerSelect,
  onPrevious,
  onNext
}) => {
  console.log('Quiz component rendering...');

  const { t } = useTranslation('quiz');

  if (!quiz || !quiz.content) {
    return <div>Loading...</div>;
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

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <QuizContainer>
      <QuizWrapper>
        <QuizProgress>
          {t('quiz')} {currentQuiz} {t('of')} {totalQuizzes}
        </QuizProgress>

        <QuizQuestion>{quiz.content}</QuizQuestion>


      </QuizWrapper>
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
    </QuizContainer>

  );
};