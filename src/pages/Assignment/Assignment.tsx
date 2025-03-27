import { FC, useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AssignmentWrapper,
  Navigation,
  Separator,
  Title,
  TabList,
  Tab,
  NoAssignmentWrapper,
  Message,
  MaterialsGrid,
  MaterialCard,
  PracticeSection,
  PracticeButton,
  ContentWrapper,
  ContentSection,
} from './Assignment.style';

import { useGetAssignmentListQuery, useUpdateAssignmentStatusMutation } from '@/api/services/assignmentService';
import { AIChat } from '@/components/AIChat/AIChat';
import emptyImage from '../../assets/images/empty.png';
import i18next from 'i18next';
import documentIcon from '../../assets/assignment/Icon-book.png';
import globeIcon from '../../assets/assignment/Icon-globe.png';
import exerciseIcon from '../../assets/assignment/Icon-assignment.png';
import chatIcon from '../../assets/assignment/Icon-single-chat-bubble.png';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import { AssignmentFeedback } from '@/components/AssignmentFeedback';

export const Assignment: FC = () => {
  const { t, i18n } = useTranslation('assignment');
  const navigate = useNavigate();
  const location = useLocation();
  const { lessonId } = useParams<{ lessonId: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const [showAIChat, setShowAIChat] = useState(false);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number[]>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [updateAssignmentStatus] = useUpdateAssignmentStatusMutation();
  const [showFeedback, setShowFeedback] = useState(false);

  // Add debug logging for the lessonId parameter
  console.log('URL Params - lessonId:', lessonId);

  // Use the lessonId from URL params, fallback to '0' if not available
  const currentLessonId = lessonId || '0';

  // Log the query parameters being used
  console.log('Fetching assignments with lesson_id:', currentLessonId);

  const { data: assignmentData, isLoading, error } = useGetAssignmentListQuery({ lesson_id: currentLessonId });

  const assignments = assignmentData?.assignments || [];
  const currentAssignment = assignments.find((a) => a.id === activeTab);

  // 如果没有选中的作业，默认选择第一个作业的 id
  useEffect(() => {
    if (assignments.length > 0 && !currentAssignment) {
      setActiveTab(assignments[0].id);
    }
  }, [assignments, currentAssignment]);

  // 添加更详细的调试信息
  console.log('Current language details:', {
    language: i18next.language,
    languages: i18next.languages,
    isInitialized: i18next.isInitialized,
    resources: i18next.options.resources,
  });

  // 测试翻译是否工作
  console.log('Translation test:', {
    title: t('title', { date: '2024-01-12' }),
    loading: t('loading'),
    myClass: t('navigation.myClass'),
  });

  // 添加数据调试
  console.log('Current language:', currentAssignment);

  // 在 return 语句之前添加这些调试信息
  console.log('Debug info:', {
    assignmentData,
    assignments,
    currentAssignment,
    isLoading,
    error,
    i18nInitialized: i18n.isInitialized,
    currentLanguage: i18n.language,
  });

  // 在找到 currentAssignment 后立即添加调试日志
  useEffect(() => {
    console.log('Current Assignment Debug:', {
      currentAssignment,
      hasMaterialList: currentAssignment?.materialList,
      materialListLength: currentAssignment?.materialList?.length,
      fullData: currentAssignment,
    });
  }, [currentAssignment]);

  // 当切换到新的作业时，更新其状态为已读
  useEffect(() => {
    if (currentAssignment && currentAssignment.status === 'UNREAD') {
      updateAssignmentStatus({
        assignment_id: currentAssignment.id,
        status: 'READ',
      }).catch((error) => {
        console.error('Failed to update assignment status:', error);
      });
    }
  }, [currentAssignment, updateAssignmentStatus]);

  useEffect(() => {
    // When returning from practice zone with DONE status, show feedback
    if (location.state?.fromPractice && currentAssignment?.status === 'DONE') {
      setShowFeedback(true);
    }
  }, [location.state, currentAssignment]);

  // 修改 handleOptionClick 函数，添加调试信息但不改变原有逻辑
  const handleOptionClick = (quizId: string, optionId: number, quizType: string) => {
    console.log('Option clicked:', { quizId, optionId, quizType });

    setQuizAnswers((prev) => {
      const newAnswers = { ...prev };
      const currentAnswers = prev[quizId] || [];

      if (quizType === 'SINGLE_SELECT') {
        // 单选题：如果已选中则取消，否则选择新选项
        newAnswers[quizId] = currentAnswers.includes(optionId) ? [] : [optionId];
      } else {
        // 多选题：切换选中状态
        newAnswers[quizId] = currentAnswers.includes(optionId)
          ? currentAnswers.filter((id) => id !== optionId)
          : [...currentAnswers, optionId];
      }

      console.log('New answers state:', newAnswers);
      return newAnswers;
    });
  };

  // 添加处理点击事件的函数
  const handlePracticeClick = () => {
    if (currentAssignment) {
      // If there's only one quiz, use it directly
      if (currentAssignment.quizList && currentAssignment.quizList.length === 1) {
        setActiveQuizId(currentAssignment.quizList[0].quizId);
        setShowAIChat(true);
      } else {
        // If there are multiple quizzes, navigate to the practice page
        navigate(`/assignment/${lessonId}/practice/${currentAssignment.id}`);
      }
    }
  };

  const handleCloseAIChat = () => {
    setShowAIChat(false);
    setActiveQuizId(null);
  };

  const toggleExplanation = (quizId: string) => {
    setShowExplanations((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  return (
    <>
      <AssignmentWrapper>
        <Navigation>
          <Link to='/classes'>{t('navigation.myClass')}</Link>
          <Separator>/</Separator>
          <span>{t('navigation.assignment')}</span>
        </Navigation>

        <ContentWrapper>
          <Title>{t('title', { date: '2024-01-12 11:03-11:58' })}</Title>

          {isLoading ? (
            <div>{t('loading')}</div>
          ) : error ? (
            <NoAssignmentWrapper>
              <Message>{t('error.fetchFailed')}</Message>
              <Message secondary>{JSON.stringify(error)}</Message>
            </NoAssignmentWrapper>
          ) : !assignments || assignments.length === 0 ? (
            <NoAssignmentWrapper>
              <img src={emptyImage} alt={t('noAssignment.title')} />
              <Message>{t('noAssignment.title')}</Message>
              <Message secondary>{t('noAssignment.description')}</Message>
            </NoAssignmentWrapper>
          ) : (
            <>
              <TabList>
                {assignments.map((assignment) => {
                  console.log('Tab rendering:', {
                    id: assignment.id,
                    title: assignment.title,
                    status: assignment.status,
                    hasUnread: assignment.status === 'UNREAD',
                  });

                  return (
                    <Tab
                      key={`objective-${assignment.id}`}
                      $active={activeTab === assignment.id}
                      $hasUnread={assignment.status === 'UNREAD'}
                      onClick={() => setActiveTab(assignment.id)}
                    >
                      {assignment.title}
                    </Tab>
                  );
                })}
              </TabList>

              {currentAssignment ? (
                <ContentSection>
                  <div className='section-header'>
                    <img src={documentIcon} alt='Document' />
                    <h2>{currentAssignment.title}</h2>
                  </div>

                  <div className='section-header'>
                    <img src={globeIcon} alt='Globe' />
                    <h2>{t('extendedMaterials.title')}</h2>
                  </div>
                  <p className='description'>{t('extendedMaterials.description')}</p>
                  <MaterialsGrid>
                    {currentAssignment?.materialList && currentAssignment.materialList.length > 0 ? (
                      currentAssignment.materialList.map((material, index) => (
                        <MaterialCard key={`material-${index}`}>
                          <img
                            src={material.img_url}
                            alt={material.title}
                            onError={(e) => {
                              e.currentTarget.src = emptyImage;
                            }}
                          />
                          <div className='material-content'>
                            <h3>{material.title}</h3>
                            <p>{material.description}</p>
                          </div>
                        </MaterialCard>
                      ))
                    ) : (
                      <Message>{t('extendedMaterials.noMaterials')}</Message>
                    )}
                  </MaterialsGrid>

                  <div className='section-header'>
                    <img src={exerciseIcon} alt='Exercise' />
                    <h2>{t('moreExercises.title')}</h2>
                  </div>
                  <p className='description'>{t('moreExercises.description')}</p>

                  <PracticeSection>
                    {currentAssignment.status === 'DONE' && currentAssignment.quizList ? (
                      <>
                        {currentAssignment.quizList.map((quiz, index) => {
                          const quizId = quiz.quizId;
                          return (
                            <div key={`quiz-${quizId}`} className='quiz-card'>
                              <div className='quiz-header'>
                                <span className='quiz-number'>{index + 1}.</span>
                                <div className='quiz-question'>{quiz.content}</div>
                              </div>
                              <div className='quiz-options'>
                                {quiz.optionList.map((option) => {
                                  const isSelected = quiz.studentAnswer?.includes(option.optionId);
                                  const isCorrectAnswer = option.isAiAnswer;
                                  const isCorrectlySelected = isSelected && isCorrectAnswer;

                                  return (
                                    <div
                                      key={`option-${quizId}-${option.optionId}`}
                                      className={`option ${
                                        isSelected
                                          ? isCorrectlySelected
                                            ? 'selected correct'
                                            : 'selected incorrect'
                                          : isCorrectAnswer
                                            ? 'correct-answer'
                                            : ''
                                      }`}
                                    >
                                      <span className='option-label'>
                                        {String.fromCharCode(65 + option.optionId - 1)}.{' '}
                                      </span>
                                      <span className='option-content'>
                                        <strong>{option.content}</strong>
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                              <button className='show-explanation' onClick={() => toggleExplanation(quizId)}>
                                {showExplanations[quizId] ? t('hideExplanation') : t('showExplanation')}
                              </button>
                              {showExplanations[quizId] && (
                                <div className='explanation-section'>
                                  {quiz.optionList.map((option) => {
                                    const optionLabel = String.fromCharCode(65 + option.optionId - 1);
                                    return (
                                      <div
                                        key={`explanation-${quizId}-${option.optionId}`}
                                        className='explanation-item'
                                      >
                                        <span className='explanation-label'>({optionLabel})</span>
                                        <span className='explanation-content'>{option.reason}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : currentAssignment.quizList ? (
                      <>
                        {currentAssignment.quizList.map((quiz, index) => {
                          const quizId = quiz.quizId;
                          const currentAnswers = quizAnswers[quizId] || [];
                          return (
                            <div key={`quiz-${quizId}`} className='quiz-card'>
                              <div className='quiz-header'>
                                <span className='quiz-number'>{index + 1}.</span>
                                <div className='quiz-question'>{quiz.content}</div>
                              </div>
                              <div className='quiz-options'>
                                {quiz.optionList.map((option) => {
                                  const optionLabel = String.fromCharCode(65 + option.optionId - 1);
                                  const isSelected = currentAnswers.includes(option.optionId);

                                  return (
                                    <div
                                      key={`option-${quizId}-${option.optionId}`}
                                      className={`option clickable ${isSelected ? 'selected' : ''}`}
                                      onClick={() => {
                                        console.log('Option clicked directly');
                                        handleOptionClick(quizId, option.optionId, quiz.quizType);
                                      }}
                                    >
                                      <span className='option-label'>{optionLabel}.</span>
                                      <span className='option-content'>{option.content}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div className='practice-content'>
                          <img src='/src/assets/assignment/practice.png' alt='Practice with AI' />
                          <div className='practice-text'>
                            <p>{t('moreExercises.practiceWithAI')}</p>
                            <p className='due-date'>{t('moreExercises.dueDate', { date: '2025-02-17' })}</p>
                          </div>
                        </div>
                        <PracticeButton onClick={handlePracticeClick}>
                          <img src={chatIcon} alt='Chat' />
                          {t('moreExercises.practiceNow')}
                        </PracticeButton>
                      </>
                    )}
                  </PracticeSection>
                </ContentSection>
              ) : (
                <NoAssignmentWrapper>
                  <Message>{t('error.noAssignmentSelected')}</Message>
                </NoAssignmentWrapper>
              )}
            </>
          )}
        </ContentWrapper>
        <LegalAndVersionInfo />
      </AssignmentWrapper>

      {showAIChat && activeQuizId && currentAssignment && (
        <AIChat assignmentId={currentAssignment.id.toString()} quizId={activeQuizId} onClose={handleCloseAIChat} />
      )}

      {showFeedback && currentAssignment && (
        <AssignmentFeedback assignmentId={currentAssignment.id.toString()} onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
};
