import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ClassCard from '../../components/ClassCard';
import { PageTitle, ClassesContainer, ClassList, ContentWrapper } from './Classes.style';
import { LessonStatus } from '../../components/ClassCard/ClassCard.enum';
import { useGetLessonListQuery } from '../../api/services/roomService';
import { LessonWithStatus } from '../../components/ClassCard/ClassCard.type';
import { useNavigate } from 'react-router-dom';

const Classes: React.FC = () => {
  const { t } = useTranslation('classes');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(['68710912', '68710915']));
  const navigate = useNavigate();
  // Fetch lesson data using the API
  const {
    data: lessonListData,
    isLoading,
    error,
  } = useGetLessonListQuery({
    roomId: '68710912', // You might want to make this dynamic or fetch from a parent component
    limit: 10, // Adjust as needed
    offset: 0,
  });

  // Transform API response to the format expected by ClassCard
  const transformedLessons = useMemo(() => {
    if (!lessonListData?.data?.lessonsInfo) return [];

    return lessonListData.data.lessonsInfo.map((lesson) => {
      // Determine lesson status based on available data
      let status = LessonStatus.UPCOMING;
      const now = Date.now();

      if (lesson.startTime * 1000 <= now && lesson.endTime * 1000 > now) {
        status = LessonStatus.IN_PROGRESS;
      } else if (lesson.endTime * 1000 < now) {
        status = LessonStatus.COMPLETED;
      }

      // Transform to LessonWithStatus format
      const transformedLesson: LessonWithStatus = {
        startTime: lesson.startTime,
        endTime: lesson.endTime,
        points: lesson.points || 0,
        lessonId: lesson.lessonId,
        hasAssignment: lesson.unreadAssignmentCount > 0, // 假设有未读作业表示有作业
        availableJoin: lesson.availableJoin,
        hasReview: status === LessonStatus.COMPLETED, // 假设已完成的课程有复习
        status: status,
        unreadAssignmentCount: lesson.unreadAssignmentCount || 0,
      };

      return transformedLesson;
    });
  }, [lessonListData]);
  const intoDetailAssignment = (lessonId: string) => {
    navigate(`/assignment/${lessonId}`);
  };
  // Use transformed data from API
  const classes = useMemo(() => {
    if (lessonListData?.data) {
      return [
        {
          id: lessonListData.data.roomNumber || '',
          titleKey: '',
          classId: lessonListData.data.roomNumber || '',
          lessons: transformedLessons,
          roomNumber: lessonListData.data.roomNumber,
          roomDisplayName: lessonListData.data.roomDisplayName,
        },
      ];
    }

    // Return empty array if no data
    return [];
  }, [lessonListData, transformedLessons]);

  const handleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching lesson data:', error);
    return <div>Error loading class data</div>;
  }

  if (classes.length === 0) {
    return <div>No classes available</div>;
  }

  return (
    <ContentWrapper>
      <PageTitle>{t('allClasses')}</PageTitle>
      <ClassesContainer>
        <ClassList>
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              {...classItem}
              title={t('exploringGraphs')}
              isexpanded={expandedIds.has(classItem.id)}
              onExpand={() => handleExpand(classItem.id)}
              onAssignmentClick={(lessonId) => intoDetailAssignment(lessonId)}
              onReviewClick={() => console.log('Review clicked')}
              onJoinClick={() => console.log('Join clicked')}
            />
          ))}
        </ClassList>
      </ClassesContainer>
    </ContentWrapper>
  );
};

export default Classes;
