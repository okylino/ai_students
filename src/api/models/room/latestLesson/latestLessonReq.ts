import { LESSON_FILTER } from '@/enums/lessonFilter';

export interface LatestLessonReq {
  value: number | string;
  filter: LESSON_FILTER;
}
