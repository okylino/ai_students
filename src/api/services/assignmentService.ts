import { createApi } from '@reduxjs/toolkit/query/react';
import { AssignmentListReq, AssignmentListResp } from '../models/assignment/assignmentList';
import { UpdateAssignmentStatusReq, UpdateAssignmentStatusResp } from '../models/assignment/updateAssignmentStatus';
import { AssignmentDetailReq, AssignmentDetailResp } from '../models/assignment/assignmentDetail';
import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';

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
    updateAssignmentStatus: mutation.put<UpdateAssignmentStatusResp, UpdateAssignmentStatusReq>('assignments/:assignment_id/status'),

    /** [POST] get assignment detail */
    getAssignment: mutation.post<AssignmentDetailResp, AssignmentDetailReq>(
      '/assignment/:assignmentId',
      {
        query: (args) => ({
          url: `/assignment/${args.assignmentId}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        transformResponse: (response: { data: AssignmentDetailResp }) => response.data
      }
    ),
  })),
});

export const { useGetAssignmentListQuery, useUpdateAssignmentStatusMutation, useGetAssignmentMutation } = assignmentApi;

