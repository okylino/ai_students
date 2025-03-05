import { BasePinReq } from '../../common/basePin';

export interface GetTaskPinReq {
  taskId: string;
}

export interface UpdateTaskPinReq extends GetTaskPinReq, BasePinReq {}
