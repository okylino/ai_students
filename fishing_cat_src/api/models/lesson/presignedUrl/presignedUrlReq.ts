import { PRESIGNED_URL } from '@fishing_cat/enums/presignedUrlType';

export interface PresignedUrlReq {
  lessonId: string;
  type: PRESIGNED_URL;
}
