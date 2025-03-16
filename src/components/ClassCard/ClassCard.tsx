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
import { ClassCardProps, LessonActionsProps } from './ClassCard.type';
import KeyboardArrowUpIcon from '../../assets/classes/KeyboardArrowUp.png';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MAX_VISIBLE_LESSONS = 3;

// 将 LessonActions 组件声明为一个常量，确保只声明一次
const LessonActions: React.FC<LessonActionsProps> = ({ lesson, onAssignmentClick, onReviewClick, onJoinClick }) => {
  const { t } = useTranslation('classes');

  // 根据课程状态显示不同的按钮
   return  lesson.availableJoin ? (
        <ButtonGroup>
          <ActionButton variant='contained' onClick={onJoinClick}>
            {t('join')}
          </ActionButton>
        </ButtonGroup>
      ) :  <ButtonGroup>
      {!lesson.availableJoin && (
        <Badge
          badgeContent={lesson.unreadAssignmentCount}
          color='error'
          max={3}
          invisible={!lesson.unreadAssignmentCount}
        >
          <ActionButton variant='outlined' onClick={onAssignmentClick}>
            {t('assignment')}
          </ActionButton>
        </Badge>
      )}
      <ActionButton variant='outlined' onClick={onReviewClick}>
        {t('review')}
      </ActionButton>
    </ButtonGroup>;

};

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  classId,
  lessons = [],
  isexpanded,
  onExpand,
  onAssignmentClick,
  onReviewClick,
  onJoinClick,
  hideExpandButton = false,
  showAllLessons = false,
  hideSeeAllText = false,
  roomNumber,
  roomDisplayName,
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
          <Title>{title || roomDisplayName}</Title>
          {!hideExpandButton && (
            <ExpandButton onClick={onExpand} isexpanded={isexpanded}>
              <img src={KeyboardArrowUpIcon} alt='expand' />
            </ExpandButton>
          )}
        </HeaderTop>
        <ClassId>
          {t('classIdLabel')}
          {classId || roomNumber}
        </ClassId>
      </CardHeader>
      <CardContent isexpanded={isexpanded}>
        <LessonList>
          {visibleLessons.map((lesson, index) => (
            <LessonItem key={lesson.lessonId || index}>
              <TimeStamp>{formatTimestamp(lesson.startTime)}</TimeStamp>
              <StarWrapper>
                <StarIconImg />
                <StarCount>{lesson.points}</StarCount>
              </StarWrapper>
              <LessonActions
                lesson={lesson}
                onAssignmentClick={()=>onAssignmentClick(lesson.lessonId)}
                onReviewClick={onReviewClick}
                onJoinClick={onJoinClick}
              />
            </LessonItem>
          ))}
          {!hideSeeAllText && hasMoreLessons && !showAllLessons && (
            <SeeAllText onClick={handleSeeAllClick}>{t('seeAllLessons', { count: lessons.length })}</SeeAllText>
          )}
        </LessonList>
      </CardContent>
    </Card>
  );
};

// 添加一个辅助函数来格式化时间戳
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export default ClassCard;
