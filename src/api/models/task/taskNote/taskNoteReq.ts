import { BaseUpdateNoteReq } from '@/api/models/common/baseNote';

export interface GetTaskNoteReq {
  taskId: string;
}

export interface UpdateTaskNoteReq extends BaseUpdateNoteReq {
  taskId: string;
}
