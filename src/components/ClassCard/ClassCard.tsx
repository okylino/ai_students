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
  SeeAllText,
} from './ClassCard.style';
import { ClassCardProps, LessonWithStatus, LessonActionsProps } from './ClassCard.type';
import KeyboardArrowUpIcon from '../../assets/classes/KeyboardArrowUp.png';
import { Badge } from '@mui/material';
import { LessonStatus } from './ClassCard.enum';
import { useNavigate } from 'react-router-dom';

const MAX_VISIBLE_LESSONS = 3;

// 修改示例数据以确保所有必要的字段都有值
const mockLessons: LessonWithStatus[] = [
  {
    startTime: 'Jan 05, 2024 11:00',
    stars: 0,
    hasAssignment: false,
    canJoin: true,
    hasReview: false,
    status: LessonStatus.UPCOMING,
    unreadAssignments: 0,
  },
  {
    startTime: 'Jan 06, 2024 11:00',
    stars: 5,
    hasAssignment: true,
    canJoin: false,
    hasReview: false, // 进行中的课程还没有复习选项
    status: LessonStatus.IN_PROGRESS,
    unreadAssignments: 2,
  },
  {
    startTime: 'Jan 07, 2024 11:00',
    stars: 3,
    hasAssignment: true,
    canJoin: false,
    hasReview: true,
    status: LessonStatus.COMPLETED,
    unreadAssignments: 0,
  },
];

// 将 LessonActions 组件声明为一个常量，确保只声明一次
const LessonActions: React.FC<LessonActionsProps> = ({ lesson, onAssignmentClick, onReviewClick, onJoinClick }) => {
  const { t } = useTranslation('classes');

  // 根据课程状态显示不同的按钮
  switch (lesson.status) {
    case LessonStatus.UPCOMING:
      return lesson.canJoin ? (
        <ButtonGroup>
          <ActionButton variant='contained' onClick={onJoinClick}>
            {t('join')}
          </ActionButton>
        </ButtonGroup>
      ) : null;

    case LessonStatus.IN_PROGRESS:
      return (
        <ButtonGroup>
          {lesson.hasAssignment && (
            <Badge badgeContent={lesson.unreadAssignments} color='error' max={3} invisible={!lesson.unreadAssignments}>
              <ActionButton variant='outlined' onClick={onAssignmentClick}>
                {t('assignment')}
              </ActionButton>
            </Badge>
          )}
        </ButtonGroup>
      );

    case LessonStatus.COMPLETED:
      return (
        <ButtonGroup>
          {lesson.hasAssignment && (
            <Badge badgeContent={lesson.unreadAssignments} color='error' max={3} invisible={!lesson.unreadAssignments}>
              <ActionButton variant='outlined' onClick={onAssignmentClick}>
                {t('assignment')}
              </ActionButton>
            </Badge>
          )}
          {lesson.hasReview && (
            <ActionButton variant='outlined' onClick={onReviewClick}>
              {t('review')}
            </ActionButton>
          )}
        </ButtonGroup>
      );

    default:
      return null;
  }
};

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  classId,
  lessons = mockLessons,
  isexpanded,
  onExpand,
  onAssignmentClick,
  onReviewClick,
  onJoinClick,
  hideExpandButton = false,
  showAllLessons = false,
  hideSeeAllText = false,
}) => {
  const { t } = useTranslation('classes');
  const navigate = useNavigate();
  const hasMoreLessons = lessons.length > MAX_VISIBLE_LESSONS;
  const visibleLessons = showAllLessons ? lessons : lessons.slice(0, MAX_VISIBLE_LESSONS);

  const handleSeeAllClick = () => {
    navigate(`/classDetail`);
  };

  return (
    <Card>
      <CardHeader>
        <HeaderTop>
          <Title>{title}</Title>
          {!hideExpandButton && (
            <ExpandButton onClick={onExpand} isexpanded={isexpanded}>
              <img src={KeyboardArrowUpIcon} alt='expand' />
            </ExpandButton>
          )}
        </HeaderTop>
        <ClassId>
          {t('classIdLabel')}
          {classId}
        </ClassId>
      </CardHeader>
      <CardContent isexpanded={isexpanded}>
        <LessonList>
          {visibleLessons.map((lesson, index) => (
            <LessonItem key={index}>
              <TimeStamp>{lesson.startTime}</TimeStamp>
              <StarWrapper>
                <StarIconImg />
                <StarCount>{lesson.stars}</StarCount>
              </StarWrapper>
              <LessonActions
                lesson={lesson}
                onAssignmentClick={onAssignmentClick}
                onReviewClick={onReviewClick}
                onJoinClick={onJoinClick}
              />
            </LessonItem>
          ))}
          {!hideSeeAllText && hasMoreLessons && !showAllLessons && (
            <SeeAllText onClick={handleSeeAllClick}>
              {t('seeAllLessons', { count: lessons.length })}
            </SeeAllText>
          )}
        </LessonList>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
