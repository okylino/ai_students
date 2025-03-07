import { LessonInfo } from '@/api/models/room/roomLessonList';

export interface LessonListResp {
  data: LessonList;
}

export interface LessonList {
  roomNumber: string;
  roomDisplayName: string;
  lessonCount: number;
  lessonsInfo: LessonInfo[];
  limit: number;
  offset: number;
}
