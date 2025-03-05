import { BasePinReq } from '../../common/basePin';

export interface GetQuizPinReq {
  quizId: string;
}

export interface UpdateQuizPinReq extends GetQuizPinReq, BasePinReq {}
