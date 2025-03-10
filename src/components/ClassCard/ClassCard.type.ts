import { LessonStatus } from './ClassCard.enum';

export interface LessonWithStatus {
  startTime: string;
  stars: number;
  hasAssignment: boolean;
  canJoin: boolean;
  hasReview: boolean;
  unreadAssignments?: number;
  status: LessonStatus;
}

export interface ClassCardProps {
  title: string;
  classId: string;
  lessons: LessonWithStatus[];
  isexpanded: boolean;
  onExpand: () => void;
  onAssignmentClick: () => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
  hideExpandButton?: boolean;
  showAllLessons?: boolean;
  hideSeeAllText?: boolean;
}

export interface LessonActionsProps {
  lesson: LessonWithStatus;
  onAssignmentClick: () => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
} 