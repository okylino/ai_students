import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { Footer } from '../../components/Footer/Footer';
import { useGetAssignmentListQuery, useUpdateAssignmentStatusMutation } from '@/api/services/assignmentService';
import emptyImage from '../../assets/images/empty.png';
import i18next from 'i18next';
import documentIcon from '../../assets/assignment/Icon-book.png';
import globeIcon from '../../assets/assignment/Icon-globe.png';
import exerciseIcon from '../../assets/assignment/Icon-assignment.png';
import chatIcon from '../../assets/assignment/Icon-single-chat-bubble.png';

export const Assignment: FC = () => {
  const { t, i18n } = useTranslation('assignment');
  const [activeTab, setActiveTab] = useState(0);
  const [updateAssignmentStatus] = useUpdateAssignmentStatusMutation();

  const lessonId = '1';
  const { data: assignmentData, isLoading, error } = useGetAssignmentListQuery({ lesson_id: lessonId });

  const assignments = assignmentData?.assignments || [];
  const currentAssignment = assignments.find((a) => a.id === activeTab);

  // 如果没有选中的作业，默认选择第一个作业的 id
  useEffect(() => {
    if (assignments.length > 0 && !currentAssignment) {
      setActiveTab(assignments[0].id);
    }
  }, [assignments, currentAssignment]);

  // 确保使用中文，但要等待 i18n 初始化完成
  useEffect(() => {
    if (i18n.isInitialized && i18n.language !== 'zh') {
      i18n.changeLanguage('zh');
    }
  }, [i18n.isInitialized]);

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

  return (
    <>
      <AssignmentWrapper>
        <Navigation>
          <Link to='/my-class'>{t('navigation.myClass')}</Link>
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
                    <div className='practice-content'>
                      <img src='/src/assets/assignment/practice.png' alt='Practice with AI' />
                      <div className='practice-text'>
                        <p>{t('moreExercises.practiceWithAI')}</p>
                        <p className='due-date'>{t('moreExercises.dueDate', { date: '2025-02-17' })}</p>
                      </div>
                    </div>
                    <PracticeButton>
                      <img src={chatIcon} alt='Chat' />
                      {t('moreExercises.practiceNow')}
                    </PracticeButton>
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
      </AssignmentWrapper>

      <Footer />
    </>
  );
};
