import { TASK_RESULT, TASK_TYPE } from '@/enums/task';

export interface TaskDetailResp {
  data: Screenshot | Link;
}

interface BaseTask {
  taskId: string;
  assign: string;
  /** timestamp (s) */
  createdAt: number;
  taskSubjectCoverPreviewUrl: string;
}

export interface Screenshot extends BaseTask {
  taskResultType: TASK_RESULT;
  verbose: ScreenshotVerbose[];
  taskTeacherCoverPreviewUrl: string | null;
  taskStudentCoverPreviewUrl: string | null;
  taskType: TASK_TYPE.SCREENSHOT;
}

export interface Link extends BaseTask {
  isOpened: boolean;
  verbose: LinkVerbose[];
  taskType: TASK_TYPE.LINK;
}

interface BaseVerbose {
  taskId: string;
  assign: string;
  /** timestamp (s) */
  createdAt: number;
  taskCoverPreviewUrl: string;
  version: number;
}

interface ScreenshotVerbose extends BaseVerbose {
  taskResultType: TASK_RESULT;
  taskType: TASK_TYPE.SCREENSHOT;
}

interface LinkVerbose extends BaseVerbose {
  isOpen: boolean;
  taskType: TASK_TYPE.LINK;
}
