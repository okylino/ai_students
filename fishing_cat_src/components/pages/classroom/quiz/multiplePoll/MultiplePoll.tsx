import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonWithOptions, SendButton } from '@fishing_cat/components/pages/classroom/quiz/ButtonOptionsAndAnswer';
import Image from '@fishing_cat/components/pages/classroom/quiz/Image';
import style from '@fishing_cat/components/pages/classroom/quiz/quiz.module.css';
import TranslationTool from '@fishing_cat/components/pages/classroom/TranslationTool';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { QUIZ_STATUS } from '@fishing_cat/enums/quiz';

import * as $ from './MultiplePoll.style';
import { Answer, MultiplePollProps } from './MultiplePoll.type';

const MultiplePoll: React.FC<MultiplePollProps> = ({
  answerQuiz,
  quizAnswer,
  setIsSubmit,
  isSubmit,
  isLoading,
  answer,
  setAnswer,
  quiz,
}) => {
  const { t } = useTranslation();

  const { enableTranslation } = useContext(QuizContext);

  const { type, imgUrl, status: quizStatus, optionList, studentAnswer, optionType, id: questionId } = quiz;

  const addAnswer = (ans: Answer) => {
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
      if (!isSubmit && studentAnswer?.length === 0) {
        setAnswer([]);
      }
      setIsSubmit(true);
    }
  }, [quizStatus, imgUrl]);

  return (
    <>
      <Image questionImg={imgUrl} />

      {enableTranslation && <TranslationTool questionId={questionId} />}

      {!isSubmit && <$.MultipleHintStyle>{t('SelectAll')}</$.MultipleHintStyle>}
      <div className={`${style.option_container} ${optionList.length > 3 && style.option_container_left}`}>
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
        text='submittedSuccessfully'
      />
    </>
  );
};

export default MultiplePoll;
