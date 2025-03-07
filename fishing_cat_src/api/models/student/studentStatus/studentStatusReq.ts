import { STUDENT_STATUS } from '@fishing_cat/enums/studentStatus';

export interface studentStatusReq {
  status: STUDENT_STATUS;
  lessonId: string;
  studentId: string;
}
