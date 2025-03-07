import { TASK_RESULT_TYPE } from '@fishing_cat/enums/taskResultType';
import { TASK_TYPE } from '@fishing_cat/enums/taskType';

export interface UpdateTaskResultReq {
  taskId: string;
  body: UpdateTaskResultReqBody[];
}
export interface UpdateTaskResultReqBody {
  student_id: string;
  task_type: TASK_TYPE;
  img_url?: string;
  task_result_type?: TASK_RESULT_TYPE;
  version?: number;
}
