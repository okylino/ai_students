import { LessonStatus } from './ClassCard.enum';

export interface LessonWithStatus {
  startTime: number;
  endTime: number;
  points: number;
  lessonId: string;
  hasAssignment: boolean;
  availableJoin: boolean;
  hasReview: boolean;
  unreadAssignmentCount?: number;
  status: LessonStatus;
}

export interface ClassCardResponse {
  data: {
    lesson_count: number;
    lessons_info: Array<{
      unreadAssignmentCount: number;
      startTime: number;
      endTime: number;
      lessonId: string;
      points: number;
      availableJoin: boolean;
    }>;
    offset: number;
    roomDisplayName: string;
    limit: number;
    roomNumber: string;
  };
}

export interface ClassCardProps {
  title: string;
  classId: string;
  lessons: LessonWithStatus[];
  isexpanded: boolean;
  onExpand: () => void;
  onAssignmentClick: (lessonId:string) => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
  hideExpandButton?: boolean;
  showAllLessons?: boolean;
  hideSeeAllText?: boolean;
  roomNumber?: string;
  roomDisplayName?: string;
}

export interface LessonActionsProps {
  lesson: LessonWithStatus;
  onAssignmentClick: () => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
}
