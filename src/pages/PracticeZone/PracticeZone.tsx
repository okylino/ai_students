import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  PracticeZoneWrapper,
  TopBar,
  Navigation,
  Separator,
  SubmitButton,
  HintWrapper,
  HintIcon,
  HintText,
  ContentWrapper,
  QuizSection,
  ChatSection,
} from './PracticeZone.styles';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/Quiz';
import { AIChat } from '@/components/AIChat';
import { useGetAssignmentMutation, useLazyGetQuizByIdQuery } from '@/api/services/assignmentService';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import hintIcon from '@/assets/practice/Group.png';
import { Loading } from '@/components/Loading';

export const PracticeZone: FC = () => {
  const { assignmentId } = useParams();
  const { t } = useTranslation('practiceZone');

  const [getAssignment, { data: assignmentData, isLoading: isAssignmentLoading, error }] = useGetAssignmentMutation();
  const [currentQuizId, setCurrentQuizId] = useState('');
  const [currentQuizData, setCurrentQuizData] = useState<any>(null);
  const [isQuizChanging, setIsQuizChanging] = useState(false);

  const [getQuiz, { isLoading: isQuizLoading }] = useLazyGetQuizByIdQuery();

  const [quizCache, setQuizCache] = useState<Record<string, any>>({});

  useEffect(() => {
    if (assignmentId) {
      getAssignment({ assignmentId }).unwrap()
        .then(response => {
          if (response.quiz?.quizId) {
            const quizId = response.quiz.quizId;
            setCurrentQuizId(quizId);
            setQuizCache(prev => ({
              ...prev,
              [quizId]: {
                ...response.quiz,
                nextQuizId: response.nextQuizId,
                previousQuizId: response.previousQuizId,
                studentAnswer: response.studentAnswer ? [response.studentAnswer] : [],
                seq: response.quiz.seq
              }
            }));
          }
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
        .then(response => {
          if (response.data.quiz) {
            const quizData = {
              ...response.data.quiz,
              quizId: response.data.quiz.quizId,
              optionType: response.data.quiz.optionType,
              optionList: response.data.quiz.optionList.map(option => ({
                ...option,
                optionId: option.optionId,
                isAiAnswer: option.isAiAnswer
              })),
              quizType: response.data.quiz.quizType,
              chirpId: response.data.quiz.chirpId,
              nextQuizId: response.data.nextQuizId,
              previousQuizId: response.data.previousQuizId,
              studentAnswer: response.data.studentAnswer ? [response.data.studentAnswer] : [],
              seq: response.data.quiz.seq
            };
            setQuizCache(prev => ({
              ...prev,
              [currentQuizId]: quizData
            }));
            setCurrentQuizData(quizData);
          }
        })
        .catch(error => {
          console.error('Failed to fetch quiz:', error);
        })
        .finally(() => {
          setIsQuizChanging(false);
        });
    }
  }, [assignmentId, currentQuizId, getQuiz, quizCache]);

  useEffect(() => {
    return () => {
      setCurrentQuizId('');
      setCurrentQuizData(null);
      setQuizCache({});
    };
  }, []);

  const handleAnswerSelect = (optionId: number) => {
    if (!assignmentId || !currentQuizId) return;

    try {
      const updatedData = {
        ...currentQuizData,
        studentAnswer: currentQuizData.quizType === 'SINGLE_SELECT'
          ? [optionId]  // 单选：直接替换为新选项
          : currentQuizData.studentAnswer?.includes(optionId)
            ? currentQuizData.studentAnswer.filter((id: number) => id !== optionId)  // 多选：如果已选中则移除
            : [...(currentQuizData.studentAnswer || []), optionId]  // 多选：如果未选中则添加
      };

      setQuizCache(prev => ({
        ...prev,
        [currentQuizId]: updatedData
      }));
      setCurrentQuizData(updatedData);

      console.log('Selected option:', optionId);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const saveCurrentAnswer = async () => {
    if (!currentQuizData?.studentAnswer?.length) return;

    try {
      console.log('Answer saved:', currentQuizData.studentAnswer[0]);
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };

  const handlePrevious = async () => {
    if (currentQuizData?.previousQuizId) {
      await saveCurrentAnswer();
      setCurrentQuizId(currentQuizData.previousQuizId);
    }
  };

  const handleNext = async () => {
    if (currentQuizData?.nextQuizId) {
      await saveCurrentAnswer();
      setCurrentQuizId(currentQuizData.nextQuizId);
    }
  };

  return (
    <PracticeZoneWrapper>
      {(isAssignmentLoading || isQuizLoading || isQuizChanging || error || !assignmentData?.quiz) && <Loading />}

      <TopBar>
        <Navigation>
          <Link to='/my-class'>{t('navigation.myClass')}</Link>
          <Separator>/</Separator>
          <Link to='/assignment'>{t('navigation.assignment')}</Link>
          <Separator>/</Separator>
          <span>{t('navigation.practiceZone')}</span>
        </Navigation>
        <SubmitButton>{t('submit')}</SubmitButton>
      </TopBar>

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
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </QuizSection>

        <ChatSection>
          <AIChat />
        </ChatSection>
      </ContentWrapper>

      <LegalAndVersionInfo />
    </PracticeZoneWrapper>
  );
};