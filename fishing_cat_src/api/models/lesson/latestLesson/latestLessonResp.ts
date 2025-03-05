import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';

export interface LessonData {
  lesson_id: string;
  room_id: string;
  status: LESSON_STATUS;
}

export interface LatestLessonResp {
  data: LessonData;
}
