import { LINK_RESULT, TASK_RESULT, TASK_TYPE } from '@/enums/task';

export interface LessonStudentTasksResp {
  data: Task[];
}

export interface Task {
  taskId: string;
  assign: string;
  taskType: TASK_TYPE;
  taskCoverPreviewUrl: string | null;
  taskResultType: TASK_RESULT | LINK_RESULT;
  pinned: boolean;
}
