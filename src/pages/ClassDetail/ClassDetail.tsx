import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ClassCard from '../../components/ClassCard';
import { LessonStatus } from '../../components/ClassCard/ClassCard.enum';
import { LessonWithStatus } from '../../components/ClassCard/ClassCard.type';
import {
  ClassDetailContainer,
  BackButton,
  PaginationWrapper,
  StyledPagination,
  PageInfo,
} from './ClassDetail.style';

const ITEMS_PER_PAGE = 10;

const ClassDetail: React.FC = () => {
  const { t } = useTranslation('classes');
  const navigate = useNavigate();
  const { classId } = useParams();
  const [page, setPage] = React.useState(1);

  // Mock data - 在实际应用中应该从 API 获取
  const mockLessons: LessonWithStatus[] = Array(81).fill(null).map((_, index) => ({
    startTime: `Jan ${String(index + 1).padStart(2, '0')}, 2024 11:03-11:58`,
    stars: 0,
    hasAssignment: true,
    canJoin: index === 0,
    hasReview: true,
    unreadAssignments: Math.floor(Math.random() * 4), // 随机生成0-3的未读数
    status: index === 0 ? LessonStatus.UPCOMING : LessonStatus.COMPLETED,
  }));

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleBack = () => {
    navigate('/classes');
  };

  const handleAssignmentClick = () => {
    // 处理作业点击
  };

  const handleReviewClick = () => {
    // 处理复习点击
  };

  const handleJoinClick = () => {
    // 处理加入课程点击
  };

  const totalPages = Math.ceil(mockLessons.length / ITEMS_PER_PAGE);
  const currentLessons = mockLessons.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <ClassDetailContainer>
      <BackButton onClick={handleBack}>← {t('backToMyClass')}</BackButton>

      <ClassCard
        title="Exploring Graphs and Equations through Motion and Action"
        classId={classId || '68710912'}
        lessons={currentLessons}
        isexpanded={true}
        onExpand={() => {}}
        onAssignmentClick={handleAssignmentClick}
        onReviewClick={handleReviewClick}
        onJoinClick={handleJoinClick}
        hideExpandButton={true}
        showAllLessons={true}
        hideSeeAllText={true}
      />

      <PaginationWrapper>
        <PageInfo>
          {(page - 1) * ITEMS_PER_PAGE + 1} - {Math.min(page * ITEMS_PER_PAGE, mockLessons.length)} of {mockLessons.length}
        </PageInfo>
        <StyledPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="circular" // 使用圆形按钮
          size="medium"
          siblingCount={2}
        />
      </PaginationWrapper>
    </ClassDetailContainer>
  );
};

export default ClassDetail;