import { TASK_STATUS } from '@fishing_cat/enums/taskStatus';
import { TASK_TYPE } from '@fishing_cat/enums/taskType';
import { TaskMarkingMessage } from '@fishing_cat/socket/models/task';

export interface LinkMeta {
  title: string;
  description: string;
  image: string;
}

export interface CreateTask {
  id: string;
  originImg: string;
  createdAt: number;
  link: string;
  linkMeta?: LinkMeta;
  type: TASK_TYPE;
}

export interface TaskDetails extends CreateTask {
  status: TASK_STATUS;
  studentImg: string;
  studentFile: string;
  version: number;
  teacherImg: string;
  linkIsOpen: boolean;
}

export interface ResponseTask {
  imgData?: string;
  getImgUrl?: string;
  taskId?: string;
  version?: number;
}

interface CloseTask {
  msg?: { task_id: string; index: number };
  tasks?: TaskDetails[];
  currentTaskId?: string;
}

export interface ResponseTaskProps {
  currentTask: TaskDetails;
  handleClickLink: () => void;
  setResponseTask: (params: ResponseTask) => void;
  markingTask: (params: TaskMarkingMessage) => void;
  markingTaskMsg: TaskMarkingMessage;
  closeTaskMsg: CloseTask;
  isTaskSending: boolean;
  setIsTaskSending: (isTaskSending: boolean) => void;
  setCloseTaskMsg: (params: CloseTask) => void;
  setCurrentTaskId: (id: string) => void;
  currentTaskId: string;
}

export interface WrongToastProps {
  msg: string;
  handleClose: () => void;
}

export interface SubmitBtnProps {
  taskStatus: TASK_STATUS;
  responseTask: () => void;
  isTaskSending: boolean;
}

export interface ActionBtnProps {
  iconImg: React.ReactNode;
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export interface PaginationProps {
  currentTaskIndex: number;
  openTaskCount: number;
  handleChangeTask: (action: string) => void;
  isActionDisabled: boolean;
}
