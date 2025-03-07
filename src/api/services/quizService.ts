import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';

import { BaseNoteResp, BaseUpdateNoteResp } from '../models/common/baseNote';
import { BasePinResp } from '../models/common/basePin';
import { GetQuizNoteReq, UpdateQuizNoteReq } from '../models/quiz/quizNote';
import { GetQuizPinReq, UpdateQuizPinReq } from '../models/quiz/quizPin';
import { QuizRecordsStudentReq, QuizRecordsStudentResp } from '../models/quiz/quizRecordsStudent';
import { GetQuizSeqInfoReq, GetQuizSeqInfoResp } from '../models/quiz/quizSeqInfo';

export const quizApi = createApi({
  reducerPath: `quizApi`,
  baseQuery,
  endpoints: defineEndpoints(({ query, mutation }) => ({
    /** [GET] get student's single quiz record */
    getQuizRecord: query.get<QuizRecordsStudentResp['data'], QuizRecordsStudentReq>('/quiz_records/:quizId/student', {
      transformResponse: (response: QuizRecordsStudentResp) => response.data,
    }),
    /** [GET] get quiz pin status */
    getQuizPin: query.get<BasePinResp['data'], GetQuizPinReq>('/quizzes/:quizId/pin', {
      transformResponse: (response: BasePinResp) => response.data,
    }),
    /** [POST] update quiz pin status */
    updateQuizPin: mutation.post<BasePinResp['data'], UpdateQuizPinReq>('/quizzes/:quizId/pin', {
      transformResponse: (response: BasePinResp) => response.data,
      async onQueryStarted({ quizId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(quizApi.util.updateQueryData('getQuizPin', { quizId }, () => data));
        } catch (err) {
          /* empty */
        }
      },
    }),
    /** [GET] get quiz seq info */
    getQuizSeqInfo: query.get<GetQuizSeqInfoResp['data'], GetQuizSeqInfoReq>('/quizzes/:quizId/seq_info', {
      transformResponse: (response: GetQuizSeqInfoResp) => response.data,
    }),
    /** [GET] get quiz note */
    getQuizNote: query.get<BaseNoteResp['data'], GetQuizNoteReq>('/quizzes/:quizId/note', {
      transformResponse: (response: BaseNoteResp) => response.data,
    }),
    /** [POST] update quiz note */
    updateQuizNote: mutation.post<BaseUpdateNoteResp['data'], UpdateQuizNoteReq>('/quizzes/:quizId/note', {
      transformRespnse: (response: BaseUpdateNoteResp) => response.data,
      async onQueryStarted({ quizId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data)
            dispatch(
              quizApi.util.updateQueryData('getQuizNote', { quizId }, () => ({
                noteId: data.noteId,
                note: data.note,
              })),
            );
        } catch (err) {
          /* empty */
        }
      },
    }),
  })),
});

export const {
  useGetQuizPinQuery,
  useUpdateQuizPinMutation,
  useGetQuizSeqInfoQuery,
  useGetQuizNoteQuery,
  useUpdateQuizNoteMutation,
  useGetQuizRecordQuery,
} = quizApi;
