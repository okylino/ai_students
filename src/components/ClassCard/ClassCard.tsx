import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Card,
  CardHeader,
  HeaderTop,
  Title,
  ClassId,
  CardContent,
  LessonList,
  LessonItem,
  TimeStamp,
  StarWrapper,
  StarIconImg,
  StarCount,
  ButtonGroup,
  ActionButton,
  ExpandButton,
  SeeAllText
} from './ClassCard.style';
import { ClassCardProps } from './ClassCard.type';
import KeyboardArrowUpIcon from '../../assets/classes/KeyboardArrowUp.png';

const MAX_VISIBLE_LESSONS = 3;

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  classId,
  lessons,
  isExpanded,
  onExpand,
  onAssignmentClick,
  onReviewClick,
  onJoinClick
}) => {
  const { t } = useTranslation('classes');
  const hasMoreLessons = lessons.length > MAX_VISIBLE_LESSONS;
  const visibleLessons = lessons.slice(0, MAX_VISIBLE_LESSONS);

  return (
    <Card>
      <CardHeader>
        <HeaderTop>
          <Title>{title}</Title>
          <ExpandButton onClick={onExpand} isExpanded={isExpanded}>
            <img src={KeyboardArrowUpIcon} alt="expand" />
          </ExpandButton>
        </HeaderTop>
        <ClassId>{t('classIdLabel')}{classId}</ClassId>
      </CardHeader>
      <CardContent isExpanded={isExpanded}>
        <LessonList>
          {visibleLessons.map((lesson, index) => (
            <LessonItem key={index}>
              <TimeStamp>{lesson.startTime}</TimeStamp>
              <StarWrapper>
                <StarIconImg />
                <StarCount>{lesson.stars}</StarCount>
              </StarWrapper>
              <ButtonGroup>
                {lesson.hasAssignment && (
                  <ActionButton variant="outlined" onClick={onAssignmentClick}>
                    {t('assignment')}
                  </ActionButton>
                )}
                <ActionButton variant="outlined" onClick={onReviewClick}>
                  {t('review')}
                </ActionButton>
                <ActionButton variant="contained" onClick={onJoinClick}>
                  {t('join')}
                </ActionButton>
              </ButtonGroup>
            </LessonItem>
          ))}
          {hasMoreLessons && (
            <SeeAllText>
              {t('seeAllLessons', { count: lessons.length })}
            </SeeAllText>
          )}
        </LessonList>
      </CardContent>
    </Card>
  );
};

export default ClassCard;