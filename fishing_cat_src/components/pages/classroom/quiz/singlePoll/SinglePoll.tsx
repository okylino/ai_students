import { useContext, useEffect } from 'react';

import { ButtonWithOptions, SendButton } from '@fishing_cat/components/pages/classroom/quiz/ButtonOptionsAndAnswer';
import Image from '@fishing_cat/components/pages/classroom/quiz/Image';
import style from '@fishing_cat/components/pages/classroom/quiz/quiz.module.css';
import TranslationTool from '@fishing_cat/components/pages/classroom/TranslationTool';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { QUIZ_STATUS } from '@fishing_cat/enums/quiz';

import QuestionTitle from '../QuestionTitle';
import { SinglePollProps } from './SinglePoll.type';

const SinglePoll: React.FC<SinglePollProps> = ({
  quizAnswer,
  answerQuiz,
  isSubmit,
  setIsSubmit,
  isLoading,
  answer,
  setAnswer,
  quiz,
}) => {
  const { enableTranslation } = useContext(QuizContext);

  const { type, imgUrl, status: quizStatus, optionList, studentAnswer, title, optionType, id: questionId } = quiz;

  const sendAnswer = () => {
    answerQuiz(answer);
  };

  useEffect(() => {
    if (isLoading) return;
    if (quizStatus === QUIZ_STATUS.FINISH || quizStatus === QUIZ_STATUS.DISCLOSED) {
      if (!isSubmit && studentAnswer?.length === 0) {
        setAnswer([]);
      }
      setIsSubmit(true);
    }
    // eslint-disable-next-line
  }, [quizStatus, imgUrl]);

  return (
    <>
      {title ? <QuestionTitle questionTitle={title} /> : <Image questionImg={imgUrl} />}

      {enableTranslation && <TranslationTool questionId={questionId} />}

      <div className={`${style.option_container} ${optionList.length > 3 && style.option_container_left}`}>
        <ButtonWithOptions
          optionList={optionList}
          quizAnswer={quizAnswer}
          answer={answer}
          isSubmit={isSubmit}
          addAnswer={(ans) => {
            setAnswer([ans]);
          }}
          quizStudentAnswer={studentAnswer}
          setIsSubmit={setIsSubmit}
          questionType={type}
          optionType={optionType} // new api change
          isLoading={isLoading}
        />
      </div>

      <SendButton
        quizAnswer={quizAnswer}
        isLoading={isLoading}
        isSubmit={isSubmit}
        answer={answer}
        sendAnswer={sendAnswer}
        text='submittedSuccessfully'
      />
    </>
  );
};

export default SinglePoll;
