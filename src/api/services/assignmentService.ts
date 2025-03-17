import { createApi } from '@reduxjs/toolkit/query/react';
import { AssignmentListReq, AssignmentListResp } from '../models/assignment/assignmentList';
import { UpdateAssignmentStatusReq, UpdateAssignmentStatusResp } from '../models/assignment/updateAssignmentStatus';
import {
  AssignmentDataDetailResp,
  AssignmentDetailReq,
  AssignmentDetailResp,
} from '../models/assignment/assignmentDetail';
import { QuizSubmissionReq, QuizSubmissionResp, AssignmentSubmissionResp } from '../models/assignment/quizSubmission';
import {
  ChatRecordsResp,
  StartAITutorReq,
  StartAITutorResp,
  ChatWithAITutorReq,
  ChatWithAITutorResp,
  StopAITutorReq,
  StopAITutorResp,
  EndAITutorResp,
} from '../models/assignment/aiChat';
import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';

interface FeedbackRequest {
  assignment_id: string;
  overall: boolean;
  reason?: string;
}

interface FeedbackResponse {
  data: string;
}

export const assignmentApi = createApi({
  /**
   * Get list of assignments in a lesson
   * @param params - Request parameters containing lesson_id
   * @returns Promise with assignment list response
   */
  reducerPath: 'assignmentApi',
  baseQuery,
  endpoints: defineEndpoints(({ query, mutation }) => ({
    /** [GET] get room list with lesson */
    getAssignmentList: query.get<AssignmentListResp, AssignmentListReq>('assignments/:lesson_id'),

    /** [PUT] update assignment status */
    updateAssignmentStatus: mutation.put<UpdateAssignmentStatusResp, UpdateAssignmentStatusReq>(
      'assignments/:assignment_id/status',
    ),

    /** [POST] get assignment detail */
    getAssignment: mutation.post<AssignmentDetailResp, AssignmentDetailReq>('/assignment/:assignmentId', {
      query: (args) => ({
        url: `/assignment/${args.assignmentId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      transformResponse: (response: unknown) => {
        return (response as { data: AssignmentDetailResp }).data;
      },
    }),

    getQuizById: query.get<AssignmentDataDetailResp, { assignmentId: string; quizId: string }>(
      'assignments/:assignmentId/quizzes/:quizId',
    ),

    /** [PUT] Update student's answer for single quiz */
    submitQuizAnswer: mutation.put<QuizSubmissionResp, { assignmentId: string; quizId: string; body: QuizSubmissionReq }>(
      'assignments/:assignmentId/quizzes/:quizId/results',
      {
        query: (args) => ({
          url: `/assignments/${args.assignmentId}/quizzes/${args.quizId}/results`,
          method: 'PUT',
          body: args.body,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      },
    ),

    /** [PUT] Submit the entire assignment */
    submitAssignment: mutation.put<AssignmentSubmissionResp, { assignmentId: string }>(
      'assignments/:assignmentId/submission',
      {
        query: (args) => ({
          url: `/assignments/${args.assignmentId}/submission`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      },
    ),

    /** [GET] Get chat records */
    getChatRecords: query.get<ChatRecordsResp, { assignmentId: string; quizId: string; limit: number; offset: number }>(
      'assignments/:assignmentId/quizzes/:quizId/chat_records',
    ),

    /** [POST] Start AI tutor */
    startAITutor: mutation.post<StartAITutorResp, { assignmentId: string; quizId: string; body: StartAITutorReq }>(
      'assignments/:assignmentId/quiz/:quizId/ai_tutor/start',
      {
        query: (args) => ({
          url: `/assignments/${args.assignmentId}/quiz/${args.quizId}/ai_tutor/start`,
          method: 'POST',
          body: args.body,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      },
    ),

    /** [POST] Chat with AI tutor */
    chatWithAITutor: mutation.post<
      ChatWithAITutorResp,
      { assignmentId: string; quizId: string; body: ChatWithAITutorReq }
    >('assignments/:assignmentId/quizzes/:quizId/ai_tutor/chat', {
      query: (args) => ({
        url: `/assignments/${args.assignmentId}/quizzes/${args.quizId}/ai_tutor/chat`,
        method: 'POST',
        body: args.body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),

    /** [POST] Stop AI tutor response */
    stopAITutor: mutation.post<StopAITutorResp, { assignmentId: string; quizId: string; body: StopAITutorReq }>(
      'assignments/:assignmentId/quizzes/:quizId/ai_tutor/stop',
      {
        query: (args) => ({
          url: `/assignments/${args.assignmentId}/quizzes/${args.quizId}/ai_tutor/stop`,
          method: 'POST',
          body: args.body,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      },
    ),

    /** [POST] End AI tutor session */
    endAITutor: mutation.post<EndAITutorResp, { assignmentId: string }>(
      'assignments/:assignmentId/ai_tutor/end',
      {
        query: (args) => ({
          url: `/assignments/${args.assignmentId}/ai_tutor/end`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      },
    ),

    /** [POST] Submit assignment feedback */
    submitFeedback: mutation.post<FeedbackResponse, FeedbackRequest>('/assignments/:assignment_id/feedback', {
      query: (args) => ({
        url: `/assignments/${args.assignment_id}/feedback`,
        method: 'POST',
        body: {
          overall: args.overall,
          ...(args.reason && { reason: args.reason }),
        },
      }),
    }),
  })),
});

export const {
  useGetAssignmentListQuery,
  useUpdateAssignmentStatusMutation,
  useGetAssignmentMutation,
  useGetQuizByIdQuery,
  useLazyGetQuizByIdQuery,
  useSubmitQuizAnswerMutation,
  useSubmitAssignmentMutation,
  useGetChatRecordsQuery,
  useStartAITutorMutation,
  useChatWithAITutorMutation,
  useStopAITutorMutation,
  useEndAITutorMutation,
  useSubmitFeedbackMutation,
} = assignmentApi;
