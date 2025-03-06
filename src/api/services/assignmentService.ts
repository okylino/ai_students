import { createApi } from '@reduxjs/toolkit/query/react';
import { AssignmentListReq, AssignmentListResp } from '../models/assignment/assignmentList';
import { UpdateAssignmentStatusReq, UpdateAssignmentStatusResp } from '../models/assignment/updateAssignmentStatus';
import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';

export const assignmentApi = createApi({
  /**
   * Get list of assignments in a lesson
   * @param params - Request parameters containing lesson_id
   * @returns Promise with assignment list response
   */
  reducerPath: `assignments`,
  baseQuery,
  endpoints: defineEndpoints(({ query, mutation }) => ({
    /** [GET] get room list with lesson */
    getAssignmentList: query.get<AssignmentListResp, AssignmentListReq>('assignments/:lesson_id'),

    /** [PUT] update assignment status */
    updateAssignmentStatus: mutation.put<UpdateAssignmentStatusResp, UpdateAssignmentStatusReq>('assignments/:assignment_id/status'),
  }))
});

export const { useGetAssignmentListQuery, useUpdateAssignmentStatusMutation } = assignmentApi;

