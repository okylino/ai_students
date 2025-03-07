export interface CreateTaskResultResp {
  created_at: number;
  updated_at: number;
  img_url: string;
  version: number;
  task_id: string;
  student_id: string;
  trigger_type: string;
  group_id: string;
  is_opened: boolean;
  id: string;
}
