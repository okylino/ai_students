import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import {
  useGetAssignmentMutation,
  useLazyGetQuizByIdQuery,
  useSubmitAssignmentMutation,
  useSubmitQuizAnswerMutation,
} from '@/api/services/assignmentService';
import warningIcon from '@/assets/assignment/Icon_Warning.png';
import hintIcon from '@/assets/practice/Group.png';
import { AIChat } from '@/components/AIChat';
import { Loading } from '@/components/Loading';
import { Quiz } from '@/components/Quiz';

import {
  ChatSection,
  CloseButton,
  ContentWrapper,
  ErrorIconContainer,
  ErrorMessage,
  ErrorToast,
  HintIcon,
  HintText,
  HintWrapper,
  Navigation,
  PracticeZoneWrapper,
  QuizSection,
  Separator,
  SubmitButton,
  TopBar,
} from './PracticeZone.styles';

export const PracticeZone: FC = () => {
  const { assignmentId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('practiceZone');

  const [getAssignment, { data: assignmentData, isLoading: isAssignmentLoading }] = useGetAssignmentMutation();
  const [currentQuizId, setCurrentQuizId] = useState('');
  const [currentQuizData, setCurrentQuizData] = useState<any>(null);
  const [isQuizChanging, setIsQuizChanging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [getQuiz, { isLoading: isQuizLoading }] = useLazyGetQuizByIdQuery();
  const [submitQuizAnswer] = useSubmitQuizAnswerMutation();
  const [submitAssignment] = useSubmitAssignmentMutation();

  const [quizCache, setQuizCache] = useState<Record<string, any>>({});

  useEffect(() => {
    if (assignmentId) {
      getAssignment({ assignmentId })
        .unwrap()
        .then((response) => {
          if (response.quiz?.quizId) {
            const { quizId } = response.quiz;
            setCurrentQuizId(quizId);
            setQuizCache((prev) => ({
              ...prev,
              [quizId]: {
                ...response.quiz,
                nextQuizId: response.nextQuizId,
                previousQuizId: response.previousQuizId,
                studentAnswer: response.studentAnswer ? [response.studentAnswer] : [],
                seq: response.quiz.seq,
              },
            }));
          }
        })
        .catch((error) => {
          console.error('Failed to fetch assignment:', error);
          setErrorMessage('Failed to fetch assignment. Please try again.');
        });
    }
  }, [assignmentId, getAssignment]);

  useEffect(() => {
    if (assignmentId && currentQuizId) {
      if (quizCache[currentQuizId]) {
        setCurrentQuizData(quizCache[currentQuizId]);
        return;
      }

      setIsQuizChanging(true);
      getQuiz({ assignmentId, quizId: currentQuizId })
        .unwrap()
        .then((response) => {
          if (response.data.quiz) {
            const quizData = {
              ...response.data.quiz,
              quizId: response.data.quiz.quizId,
              optionType: response.data.quiz.optionType,
              optionList: response.data.quiz.optionList.map((option) => ({
                ...option,
                optionId: option.optionId,
                isAiAnswer: option.isAiAnswer,
              })),
              quizType: response.data.quiz.quizType,
              chirpId: response.data.quiz.chirpId,
              nextQuizId: response.data.nextQuizId,
              previousQuizId: response.data.previousQuizId,
              studentAnswer: response.data.studentAnswer ? [response.data.studentAnswer] : [],
              seq: response.data.quiz.seq,
            };
            setQuizCache((prev) => ({
              ...prev,
              [currentQuizId]: quizData,
            }));
            setCurrentQuizData(quizData);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch quiz:', error);
        })
        .finally(() => {
          setIsQuizChanging(false);
        });
    }
  }, [assignmentId, currentQuizId, getQuiz, quizCache]);

  useEffect(
    () => () => {
      setCurrentQuizId('');
      setCurrentQuizData(null);
      setQuizCache({});
    },
    [],
  );

  const handleAnswerSelect = async (optionId: number) => {
    if (!assignmentId || !currentQuizId) return;
    console.log('handle  Answ', assignmentId, '------', currentQuizId);
    try {
      const updatedData = {
        ...currentQuizData,
        studentAnswer:
          currentQuizData.quizType === 'SINGLE_SELECT'
            ? [optionId]
            : currentQuizData.studentAnswer?.includes(optionId)
              ? currentQuizData.studentAnswer.filter((id: number) => id !== optionId)
              : [...(currentQuizData.studentAnswer || []), optionId],
      };

      setQuizCache((prev) => ({
        ...prev,
        [currentQuizId]: updatedData,
      }));
      setCurrentQuizData(updatedData);

      await submitQuizAnswer({
        assignmentId,
        quizId: currentQuizId,
        body: {
          student_answer: updatedData.studentAnswer,
        },
      }).unwrap();
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setErrorMessage('Failed to submit answer. Please try again.');
    }
  };

  const handleSubmitAssignment = async () => {
    if (!assignmentId) return;

    const totalAnswered = Object.values(quizCache).filter((quiz) => quiz.studentAnswer?.length > 0).length;
    const totalQuizzes = assignmentData?.totalQuizzes || 0;

    if (totalAnswered < totalQuizzes) {
      setErrorMessage(`Please check if all ${totalQuizzes} questions have been answered before submitting.`);
      return;
    }

    try {
      await submitAssignment({ assignmentId }).unwrap();
      // Navigate back to assignment page with state
      navigate(`/assignment/${lessonId}`, {
        state: { fromPractice: true },
      });
    } catch (error) {
      console.error('Failed to submit assignment:', error);
      setErrorMessage('Failed to submit assignment. Please try again.');
    }
  };

  return (
    <PracticeZoneWrapper>
      {(isAssignmentLoading || isQuizLoading || isQuizChanging || !assignmentData?.quiz) && <Loading />}

      <TopBar>
        <Navigation>
          <Link to='/my-class'>{t('navigation.myClass')}</Link>
          <Separator>/</Separator>
          <Link to='/assignment'>{t('navigation.assignment')}</Link>
          <Separator>/</Separator>
          <span>{t('navigation.practiceZone')}</span>
        </Navigation>
        <SubmitButton onClick={handleSubmitAssignment}>{t('submit')}</SubmitButton>
      </TopBar>

      {errorMessage && (
        <ErrorToast>
          <ErrorIconContainer>
            <img src={warningIcon} alt='Warning' width={24} height={24} />
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorIconContainer>
          <CloseButton onClick={() => setErrorMessage(null)} />
        </ErrorToast>
      )}

      <HintWrapper>
        <HintIcon src={hintIcon} alt='hint' />
        <HintText>
          {t(
            'hintText',
            'You may ask your AI assistant if you need any help. Remember to submit when you complete all the questions.',
          )}
        </HintText>
      </HintWrapper>

      <ContentWrapper>
        <QuizSection>
          {assignmentData?.quiz && currentQuizData && (
            <Quiz
              quiz={currentQuizData}
              totalQuizzes={assignmentData.totalQuizzes}
              currentQuiz={currentQuizData?.seq}
              studentAnswer={currentQuizData?.studentAnswer}
              onAnswerSelect={handleAnswerSelect}
              onPrevious={() => {
                if (currentQuizData?.previousQuizId) {
                  setCurrentQuizId(currentQuizData.previousQuizId);
                }
              }}
              onNext={() => {
                if (currentQuizData?.nextQuizId) {
                  setCurrentQuizId(currentQuizData.nextQuizId);
                }
              }}
            />
          )}
        </QuizSection>

        <ChatSection>
          <AIChat assignmentId={assignmentId || ''} quizId={currentQuizId} />
        </ChatSection>
      </ContentWrapper>

      <LegalAndVersionInfo />
    </PracticeZoneWrapper>
  );
};
