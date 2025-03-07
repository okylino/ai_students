import { LinkMeta } from '@fishing_cat/components/pages/classroom/response/ResponseTask.type';
import { TASK_FLOW } from '@fishing_cat/enums/taskFlow';
import { TASK_TYPE } from '@fishing_cat/enums/taskType';

export interface TaskClosedMessage {
  task_id: string;
  status: TASK_FLOW;
}

export interface TaskCallback {
  student_id: string;
  sid: string;
}

export interface TaskCreatedMessage {
  task_id: string;
  lesson_id: string;
  assign: string;
  task_type: TASK_TYPE;
  created_at: number;
  seat_number_list: number[];
  link_url?: string;
  link_meta?: LinkMeta;
  img_url?: string;
}

export interface TaskMarkingMessage {
  task_id: string;
  student_id: string;
  img_url: string;
  version: number;
}
