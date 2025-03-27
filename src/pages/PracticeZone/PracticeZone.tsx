import { FC, useEffect, useState, useRef, useLayoutEffect } from 'react';
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

  // Add ref for the quiz container
  const quizContainerRef = useRef<HTMLDivElement>(null);
  
  // Add state to control AIChat rendering
  const [showAIChat, setShowAIChat] = useState(false);
  
  // Control scroll position with useLayoutEffect (runs synchronously before browser paint)
  useLayoutEffect(() => {
    // Ensure we're always at the top of the page after render
    window.scrollTo(0, 0);
    
    // Focus on quiz container without scrolling
    if (quizContainerRef.current) {
      quizContainerRef.current.focus({ preventScroll: true });
    }
  }, [currentQuizId]);
  
  // Show AI chat after a delay to ensure it doesn't steal focus
  useEffect(() => {
    if (currentQuizData) {
      // Hide AI chat during transitions
      setShowAIChat(false);
      
      // Show AI chat after a significant delay to ensure it doesn't affect scroll
      const timer = setTimeout(() => {
        setShowAIChat(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuizId, currentQuizData]);

  // Original assignment loading effect
  useEffect(() => {
    if (assignmentId) {
      // Hide AI chat during load
      setShowAIChat(false);
      
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

  // Quiz loading effect
  useEffect(() => {
    if (assignmentId && currentQuizId) {
      // Hide AI chat during quiz loading
      setShowAIChat(false);
      
      console.log('EFFECT: Checking cache for quiz:', currentQuizId);
      
      if (quizCache[currentQuizId]) {
        console.log('EFFECT: Using cached data for quiz:', currentQuizId);
        setCurrentQuizData(quizCache[currentQuizId]);
        return;
      }

      console.log('EFFECT: No cache found, loading from server for quiz:', currentQuizId);
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
    
    console.log('SELECT: Answer selected for quiz:', currentQuizId, 'option:', optionId);
    console.log('SELECT: Current quiz data before update:', currentQuizData);
    console.log('SELECT: Current cache before update:', quizCache);
    
    try {
      // 先计算新的答案
      const updatedStudentAnswer = 
        currentQuizData.quizType === 'SINGLE_SELECT'
          ? [optionId]
          : currentQuizData.studentAnswer?.includes(optionId)
            ? currentQuizData.studentAnswer.filter((id: number) => id !== optionId)
            : [...(currentQuizData.studentAnswer || []), optionId];
      
      console.log('SELECT: Calculated new answer:', updatedStudentAnswer);
      
      // 创建更新后的数据
      const updatedData = {
        ...currentQuizData,
        studentAnswer: updatedStudentAnswer,
      };
      
      console.log('SELECT: Updated data object:', updatedData);
      
      // 重要：先更新本地状态和缓存，确保UI立即响应
      setCurrentQuizData(updatedData);
      
      console.log('SELECT: Updating cache');
      setQuizCache(prev => {
        const updated = {
          ...prev,
          [currentQuizId]: updatedData,
        };
        console.log('SELECT: New cache state:', updated);
        return updated;
      });
      
      // 然后再提交到服务器
      console.log('SELECT: Submitting to server');
      const response = await submitQuizAnswer({
        assignmentId,
        quizId: currentQuizId,
        body: {
          student_answer: updatedStudentAnswer,
        },
      }).unwrap();
      
      console.log('SELECT: Server response:', response);
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

  const handleNavigation = (newQuizId: string) => {
    console.log('NAV: Navigating from quiz', currentQuizId, 'to quiz', newQuizId);
    
    // Hide AI chat during navigation
    setShowAIChat(false);
    
    // Focus on quiz container before navigation
    if (quizContainerRef.current) {
      quizContainerRef.current.focus({ preventScroll: true });
    }
    
    // Set new quiz ID
    setCurrentQuizId(newQuizId);
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
        <QuizSection 
          ref={quizContainerRef} 
          tabIndex={-1} 
          style={{ outline: 'none' }}
        >
          {assignmentData?.quiz && currentQuizData && (
            <Quiz
              quiz={currentQuizData}
              totalQuizzes={assignmentData.totalQuizzes}
              currentQuiz={currentQuizData?.seq}
              studentAnswer={currentQuizData?.studentAnswer}
              onAnswerSelect={handleAnswerSelect}
              onPrevious={() => {
                if (currentQuizData?.previousQuizId) {
                  handleNavigation(currentQuizData.previousQuizId);
                }
              }}
              onNext={() => {
                if (currentQuizData?.nextQuizId) {
                  handleNavigation(currentQuizData.nextQuizId);
                }
              }}
            />
          )}
        </QuizSection>

        {/* Only render AI Chat when explicitly allowed */}
        {showAIChat && (
          <ChatSection>
            <AIChat assignmentId={assignmentId || ''} quizId={currentQuizId} />
          </ChatSection>
        )}
      </ContentWrapper>

      <LegalAndVersionInfo />
    </PracticeZoneWrapper>
  );
};
