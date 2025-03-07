import { LESSON_STATUS } from '@/enums/lessonStatus';

export interface LatestLessonResp {
  data: LatestLesson;
}

interface LatestLesson {
  lessonId: string;
  roomId: string;
  status: LESSON_STATUS;
}
