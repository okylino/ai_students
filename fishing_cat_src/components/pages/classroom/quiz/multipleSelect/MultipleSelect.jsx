import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TranslationTool from '@fishing_cat/components/pages/classroom/TranslationTool';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { QUIZ_STATUS } from '@fishing_cat/enums/quiz';

import { AnswerText, ButtonWithOptions, SendButton } from '../ButtonOptionsAndAnswer';
import Image from '../Image';
import style from '../quiz.module.css';
import * as $ from './MultipleSelect.style';

const MultipleSelect = ({ answerQuiz, quizAnswer, isSubmit, setIsSubmit, isLoading, answer, setAnswer, quiz }) => {
  const { t } = useTranslation();

  const { enableTranslation } = useContext(QuizContext);
  const { type, imgUrl, status: quizStatus, optionList, studentAnswer, optionType, id: questionId } = quiz;

  const addAnswer = (ans) => {
    const exists = answer.find((item) => item.option_id === ans.option_id);
    if (!exists) {
      setAnswer((arr) => [...arr, ans]);
    } else {
      setAnswer(answer.filter((item) => item.option_id !== ans.option_id));
    }
  };

  const sendAnswer = () => {
    answerQuiz(answer.sort((a, b) => a.option_id - b.option_id));
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
      <Image questionImg={imgUrl} />

      {enableTranslation && <TranslationTool questionId={questionId} />}

      {quizAnswer?.length > 0 && (
        <AnswerText optionType={optionType} quizAnswer={quizAnswer} optionList={optionList} answer={answer} />
      )}
      {!isSubmit && <$.MultipleHintStyle>{t('SelectAll')}</$.MultipleHintStyle>}
      <div
        className={`${style.option_container}
					${optionList.length > 3 && style.option_container_left}
					${optionList[0]?.content && style.column}`}
      >
        <ButtonWithOptions
          optionList={optionList}
          answer={answer}
          quizAnswer={quizAnswer}
          isSubmit={isSubmit}
          addAnswer={addAnswer}
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

export default MultipleSelect;
