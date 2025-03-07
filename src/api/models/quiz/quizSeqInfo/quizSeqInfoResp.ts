import { BaseSeqInfoResp } from '@/api/models/common/baseSeqInfo';

export interface GetQuizSeqInfoResp {
  data: BaseSeqInfoResp['data'] & {
    quizId: string;
  };
}
