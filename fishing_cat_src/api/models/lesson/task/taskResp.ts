import { TASK_STATUS } from '@fishing_cat/enums/taskStatus';

export type TaskResp = TaskInfo[];
export interface TaskInfo {
  task_id: string;
  created_at: number;
  trigger_type: TASK_STATUS;
  version: number;
  img_url: string;
  student_img_url: string;
  teacher_img_url: string;
  link_url: string;
  is_opened: boolean;
  result_id: string;
  link_meta: LinkMeta;
}
export interface LinkMeta {
  title: string;
  description: string;
  site_name: string;
  image: string;
}
