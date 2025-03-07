import { ButtonProps } from '@mui/material/Button';

import { LessonInfo } from '@/api/models/room/roomLessonList';

export interface LessonDetailProps {
  lessonInfo: LessonInfo;
  roomId: string;
}

export interface ButtonConfig {
  variant: ButtonProps['variant'];
  onClick: () => void;
  label: string;
}
