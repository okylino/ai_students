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
import { ClassCardProps } from './ClassCard.type';
import KeyboardArrowUpIcon from '../../assets/classes/KeyboardArrowUp.png';
import { Badge } from '@mui/material';

const MAX_VISIBLE_LESSONS = 3;

// 添加课程状态枚举
enum LessonStatus {
  UPCOMING = 'upcoming', // 即将开始的课程
  IN_PROGRESS = 'inProgress', // 进行中的课程
  COMPLETED = 'completed', // 已完成的课程
}

interface LessonWithStatus {
  startTime: string;
  stars: number;
  hasAssignment: boolean;
  canJoin: boolean;
  hasReview: boolean;
  unreadAssignments?: number;
  status: LessonStatus;
}

interface LessonActionsProps {
  lesson: LessonWithStatus;
  onAssignmentClick: () => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
}

// 修改 ClassCardProps 类型
interface ClassCardProps {
  title: string;
  classId: string;
  lessons: LessonWithStatus[]; // 确保使用 LessonWithStatus 类型
  isExpanded: boolean;
  onExpand: () => void;
  onAssignmentClick: () => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
}

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
  lessons = mockLessons, // 使用示例数据作为默认值
  isExpanded,
  onExpand,
  onAssignmentClick,
  onReviewClick,
  onJoinClick,
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
            <img src={KeyboardArrowUpIcon} alt='expand' />
          </ExpandButton>
        </HeaderTop>
        <ClassId>
          {t('classIdLabel')}
          {classId}
        </ClassId>
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
              <LessonActions
                lesson={lesson}
                onAssignmentClick={onAssignmentClick}
                onReviewClick={onReviewClick}
                onJoinClick={onJoinClick}
              />
            </LessonItem>
          ))}
          {hasMoreLessons && <SeeAllText>{t('seeAllLessons', { count: lessons.length })}</SeeAllText>}
        </LessonList>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
