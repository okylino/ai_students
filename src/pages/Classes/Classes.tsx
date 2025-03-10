import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ClassCard from '../../components/ClassCard';
import { PageTitle, ClassesContainer, ClassList, ContentWrapper } from './Classes.style';
import { LessonStatus } from '../../components/ClassCard/ClassCard.enum';

const Classes: React.FC = () => {
  const { t } = useTranslation();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(['68710912', '68710915']));

  const mockClasses = [
    {
      id: '68710912',
      titleKey: 'exploringGraphs',
      classId: '68710912',
      lessons: [
        {
          startTime: 'Jan 05, 2024 11:05-now',
          stars: 2,
          hasAssignment: true,
          canJoin: true,
          hasReview: false,
          status: LessonStatus.IN_PROGRESS,
        },
        {
          startTime: 'Jan 05, 2024 11:03-11:58',
          stars: 5,
          hasAssignment: true,
          canJoin: false,
          hasReview: true,
          status: LessonStatus.COMPLETED,
        },
        {
          startTime: 'Jan 12, 2024 11:03-11:58',
          stars: 6,
          hasAssignment: true,
          canJoin: false,
          hasReview: true,
          status: LessonStatus.COMPLETED,
        },
        {
          startTime: 'Jan 12, 2024 11:03-11:58',
          stars: 6,
          hasAssignment: true,
          canJoin: false,
          hasReview: true,
          status: LessonStatus.COMPLETED,
        },
        {
          startTime: 'Jan 05, 2024 11:03-11:58',
          stars: 5,
          hasAssignment: true,
          canJoin: false,
          hasReview: true,
          status: LessonStatus.COMPLETED,
        },
        {
          startTime: 'Jan 12, 2024 11:03-11:58',
          stars: 6,
          hasAssignment: true,
          canJoin: false,
          hasReview: true,
          status: LessonStatus.COMPLETED,
        },
        {
          startTime: 'Jan 12, 2024 11:03-11:58',
          stars: 6,
          hasAssignment: true,
          canJoin: false,
          hasReview: true,
          status: LessonStatus.COMPLETED,
        },
      ],
    },
    {
      id: '68710915',
      titleKey: 'motionAndAction',
      classId: '68710915',
      lessons: [
        {
          startTime: 'Jan 05, 2024 11:00-now',
          stars: 0,
          hasAssignment: false,
          canJoin: true,
          hasReview: false,
          status: 'upcoming',
        },
      ],
    },
  ];

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

  return (
    <ContentWrapper>
      <PageTitle>{t('allClasses')}</PageTitle>
      <ClassesContainer>
        <ClassList>
          {mockClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              {...classItem}
              title={t(classItem.titleKey)}
              isexpanded={expandedIds.has(classItem.id)}
              onExpand={() => handleExpand(classItem.id)}
              onAssignmentClick={() => console.log('Assignment clicked')}
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
