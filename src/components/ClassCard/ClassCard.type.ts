export interface Lesson {
  startTime: string;
  stars: number;
  hasAssignment?: boolean;
}

export interface ClassCardProps {
  id: string;
  title: string;
  titleKey: string;
  classId: string;
  lessons: Lesson[];
  isExpanded: boolean;
  onExpand: () => void;
  onAssignmentClick: () => void;
  onReviewClick: () => void;
  onJoinClick: () => void;
} 