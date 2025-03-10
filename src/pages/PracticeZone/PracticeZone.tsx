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
    if (assignmentId) {
      getAssignment({ assignmentId })
        .unwrap()
        .then((response) => {
          console.log('Assignment data:', response);
        })
        .catch((err) => {
          console.error('Failed to fetch assignment:', err);
        });
    }
  }, [assignmentId, getAssignment]);

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('error.loading')}</div>;
  }

  if (!data) {
    return <div>{t('error.noData')}</div>;
  }

  return (
    <PracticeZoneWrapper>
      <TopBar>
        <Navigation>
          <Link to="/my-class">{t('navigation.myClass')}</Link>
          <Separator>/</Separator>
          <Link to="/assignment">{t('navigation.assignment')}</Link>
          <Separator>/</Separator>
          <span>{t('navigation.practiceZone')}</span>
        </Navigation>
        <SubmitButton>{t('submit')}</SubmitButton>
      </TopBar>

      <HintWrapper>
        <HintIcon src={hintIcon} alt="hint" />
        <HintText>
          {t('hintText', 'You may ask your AI assistant if you need any help. Remember to submit when you complete all the questions.')}
        </HintText>
      </HintWrapper>

      <ContentWrapper>
        <QuizSection>
          <Quiz
            quiz={data.quiz ?? []}
            totalQuizzes={data.totalQuizzes ?? 0}
            currentQuiz={data.currentQuiz ?? 0}
            studentAnswer={data.studentAnswer ?? []}
            onAnswerSelect={() => {}}
          />
        </QuizSection>

        <ChatSection>
          <AIChat />
        </ChatSection>
      </ContentWrapper>

      <LegalAndVersionInfo />
    </PracticeZoneWrapper>
  );
};