import { FC, useEffect } from 'react';
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
import { useGetAssignmentMutation } from '@/api/services/assignmentService';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';
import hintIcon from '@/assets/practice/Group.png';

export const PracticeZone: FC = () => {
  const { assignmentId } = useParams();
  const { t } = useTranslation('practiceZone');

  const [getAssignment, { data, isLoading, error }] = useGetAssignmentMutation();

  useEffect(() => {
    let isSubscribed = true;

    if (assignmentId) {
      getAssignment({ assignmentId })
        .unwrap()
        .then((response) => {
          if (isSubscribed) {
            console.log('Assignment data:', response);
          }
        })
        .catch((err) => {
          if (isSubscribed) {
            console.error('Failed to fetch assignment:', err);
          }
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [assignmentId, getAssignment]);

  if (data) {
    console.log('PracticeZone data:', data);
  }

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('error.loading')}</div>;
  }

  if (!data?.quiz) {
    return <div>{t('error.noData')}</div>;
  }

  const handleAnswerSelect = (optionId: number) => {
    console.log('Selected option:', optionId);
    // TODO: 在这里添加处理答案的逻辑
  };

  return (
    <PracticeZoneWrapper>
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
          <Quiz
            quiz={data.quiz}
            totalQuizzes={data.totalQuizzes}
            currentQuiz={data.quiz.seq}
            studentAnswer={data.studentAnswer}
            onAnswerSelect={handleAnswerSelect}
            onPrevious={function (): void {
              throw new Error('Function not implemented.');
            }}
            onNext={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></Quiz>
        </QuizSection>

        <ChatSection>
          <AIChat />
        </ChatSection>
      </ContentWrapper>

      <LegalAndVersionInfo />
    </PracticeZoneWrapper>
  );
};