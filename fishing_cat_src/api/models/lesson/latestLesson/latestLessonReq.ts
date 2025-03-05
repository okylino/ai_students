import { LESSON_FILTER } from '@fishing_cat/enums/lessonFilter';

export interface LatestLessonReq {
  value: string | number;
  filter: LESSON_FILTER;
}
