import { BaseUpdateNoteReq } from '@/api/models/common/baseNote';

export interface GetQuizNoteReq {
  quizId: string;
}

export interface UpdateQuizNoteReq extends BaseUpdateNoteReq {
  quizId: string;
}
