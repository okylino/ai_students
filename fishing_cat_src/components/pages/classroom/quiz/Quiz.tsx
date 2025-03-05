import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { postSaveStudentQuizAnswer } from '@fishing_cat/api/services/quizService';
import { useGetTranslateSettingQuery } from '@fishing_cat/api/services/translationService';
import MultiplePoll from '@fishing_cat/components/pages/classroom/quiz/multiplePoll/MultiplePoll';
import MultipleSelect from '@fishing_cat/components/pages/classroom/quiz/multipleSelect/MultipleSelect';
import { QuizContextData } from '@fishing_cat/components/pages/classroom/quiz/Quiz.type';
import SinglePoll from '@fishing_cat/components/pages/classroom/quiz/singlePoll/SinglePoll';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { QuizProvider } from '@fishing_cat/context/quizContext/QuizContext';
import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';
import { QUIZ_STATUS } from '@fishing_cat/enums/quiz';
import useSocketEventListener from '@fishing_cat/hooks/useSocketEventListener';
import { isApiResponseOption, QuizData } from '@fishing_cat/pages/classroom/Classroom.type';
import { QuizCallback, RevealQuizAnswerMessage } from '@fishing_cat/socket/models/quiz';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

import { CheckCircle, CheckIcon, ErrorIcon, ToastWrapper } from './quiz.style';
import Record from './Record';
import ShortAnswer from './ShortAnswer';
import SingleSelect from './SingleSelect';
import TrueFalse from './TrueFalse';

const QuizComponentMap = {
  TRUE_FALSE: TrueFalse,
  SINGLE_SELECT: SingleSelect,
  MULTIPLE_SELECT: MultipleSelect,
  RECORD: Record,
  SHORT_ANSWER: ShortAnswer,
  MULTIPLE_POLL: MultiplePoll,
  SINGLE_POLL: SinglePoll,
};

const Quiz = ({ quiz }: { quiz: QuizData }) => {
  const { type, id: quizId, optionList, sourceType, title, studentAnswer, status } = quiz;
  const QuestionComponent = QuizComponentMap[type];
  const [quizAnswer, setQuizAnswer] = useState<RevealQuizAnswerMessage['answer']>([]);
  const { t } = useTranslation();
  const [isAnswerSuccessToast, setIsAnswerSuccessToast] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [isAnswerSuccess, setIsAnswerSuccess] = useState(false);
  const { socket, isConnected } = useSocketContext();
  const { lessonId } = useContext(LessonContext);
  const oldQuizId = useRef(quizId);

  const onRevealQuizAnswers = (msg: RevealQuizAnswerMessage, callback: ({ student_id, sid }: QuizCallback) => void) => {
    if (msg.quiz_id === quizId) setQuizAnswer(msg.answer);
    const userId = getUserIdByLessonId({ lessonId });

    if (socket.id && userId) callback({ student_id: userId, sid: socket.id });
  };

  const { data: translateSettingData } = useGetTranslateSettingQuery({ quizId }, { skip: !quizId });
  const enableTranslation = translateSettingData?.enableTranslation || false;

  useSocketEventListener('reveal_quiz_answers', onRevealQuizAnswers);

  useEffect(() => {
    if (isConnected) setIsLoading(false);
  }, [isConnected]);

  useEffect(() => {
    // 換題目時如果新的題目學生沒有答案，則把畫面舊有的學生答案清空
    if (studentAnswer?.length === 0 && quizId !== oldQuizId.current) {
      setIsSubmit(false);
      setAnswer([]);
      setQuizAnswer([]);
      oldQuizId.current = quizId;
    }
  }, [quizId, studentAnswer?.length]);

  useEffect(() => {
    const answer = optionList
      .filter((option) => isApiResponseOption(option) && option.is_answer)
      .map((option) => option.option_id);
    if ((status === QUIZ_STATUS.FINISH || status === QUIZ_STATUS.DISCLOSED) && answer.length > 0) {
      setQuizAnswer(answer);
    }

    if (status === QUIZ_STATUS.FINISH || status === QUIZ_STATUS.DISCLOSED) setIsSubmit(true);
  }, [status, optionList]);

  const answerQuiz = async (answer) => {
    setIsLoading(true);
    const userId = getUserIdByLessonId({ lessonId });

    if (userId && quizId) {
      const answerData = {
        quizId,
        body: {
          student_id: userId,
          answer_data: Array.isArray(answer) ? answer.map((obj) => obj.option_id) : answer,
        },
      };
      try {
        await postSaveStudentQuizAnswer(answerData);
        changeToastStatus(true);
        setIsSubmit(true);
        setIsAnswerSuccess(true);
      } catch (e) {
        changeToastStatus(false);
        setIsAnswerSuccess(false);
      }
    }
  };

  const changeToastStatus = (status) => {
    setIsLoading(false);
    setIsAnswerSuccessToast(status);
    setTimeout(() => {
      setIsAnswerSuccessToast(null);
    }, 3000);
  };

  const quizContextData: QuizContextData = useMemo(
    () => ({
      enableTranslation,
      sourceType,
      questionTitle: title,
      optionList,
    }),
    [enableTranslation, sourceType, title, optionList],
  );

  return (
    <>
      {isAnswerSuccessToast !== null && (
        <ToastWrapper $isSuccess={isAnswerSuccessToast}>
          {isAnswerSuccessToast ? (
            <>
              <CheckCircle>
                <CheckIcon />
              </CheckCircle>
              {t('toastSubmitSuccess')}
            </>
          ) : (
            <>
              <ErrorIcon />
              {t('toastSubmitFailed')}
            </>
          )}
        </ToastWrapper>
      )}

      {QuestionComponent && (
        <QuizProvider quizData={quizContextData}>
          <QuestionComponent
            answerQuiz={answerQuiz}
            quizAnswer={quizAnswer}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            isLoading={isLoading}
            answer={answer}
            setAnswer={setAnswer}
            setIsAnswerSuccess={setIsAnswerSuccess}
            isAnswerSuccess={isAnswerSuccess}
            quiz={quiz}
          />
        </QuizProvider>
      )}
    </>
  );
};

export default Quiz;
