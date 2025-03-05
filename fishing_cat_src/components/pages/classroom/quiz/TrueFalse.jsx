import { useContext, useEffect } from 'react';

import TranslationTool from '@fishing_cat/components/pages/classroom/TranslationTool';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { QUIZ_STATUS } from '@fishing_cat/enums/quiz';

import { AnswerText, ButtonWithOptions, SendButton } from './ButtonOptionsAndAnswer';
import Image from './Image';
import QuestionTitle from './QuestionTitle';
import style from './quiz.module.css';

const TrueFalse = ({ answerQuiz, quizAnswer, isSubmit, setIsSubmit, isLoading, answer, setAnswer, quiz }) => {
  const { enableTranslation } = useContext(QuizContext);
  const { type, imgUrl, status: quizStatus, optionList, studentAnswer, title, optionType, id: questionId } = quiz;

  const sendAnswer = () => {
    answerQuiz(answer);
  };

  useEffect(() => {
    if (isLoading) return;
    if (quizStatus === QUIZ_STATUS.FINISH || quizStatus === QUIZ_STATUS.DISCLOSED) {
      if (!isSubmit && studentAnswer && studentAnswer.length === 0) {
        setAnswer([]);
      }
      setIsSubmit(true);
    }
    // eslint-disable-next-line
  }, [quizStatus, imgUrl]);

  useEffect(() => {
    if (quizAnswer && quizAnswer.length > 0 && !isSubmit) {
      setAnswer([]);
    }
  }, [quizAnswer]);
  return (
    <>
      {title ? <QuestionTitle questionTitle={title} /> : <Image questionImg={imgUrl} />}
      {quizAnswer?.length > 0 && (
        <AnswerText optionType={optionType} quizAnswer={quizAnswer} optionList={optionList} answer={answer} />
      )}

      {enableTranslation && <TranslationTool questionId={questionId} />}

      <div className={`${style.option_container} ${optionList.length > 3 && style.option_container_left}`}>
        <ButtonWithOptions
          optionList={optionList}
          answer={answer}
          quizAnswer={quizAnswer}
          isSubmit={isSubmit}
          addAnswer={(ans) => setAnswer([ans])}
          quizStudentAnswer={studentAnswer}
          setIsSubmit={setIsSubmit}
          questionType={type}
          optionType={optionType}
          isLoading={isLoading}
        />
      </div>

      <SendButton
        isLoading={isLoading}
        isSubmit={isSubmit}
        answer={answer}
        sendAnswer={sendAnswer}
        quizAnswer={quizAnswer}
      />
    </>
  );
};

export default TrueFalse;
