import { createApi } from '@reduxjs/toolkit/query/react';
import { AssignmentListReq, AssignmentListResp } from '../models/assignment/assignmentList';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const assignmentApi = createApi({
  /**
   * Get list of assignments in a lesson
   * @param params - Request parameters containing lesson_id
   * @returns Promise with assignment list response
   */
  reducerPath: 'assignmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    /** [GET] get room list with lesson */
    getAssignmentList: builder.query<AssignmentListResp, AssignmentListReq>({
      query: (params) => ({
        url: '/assignments',
        method: 'GET',
        params,
      }),
    }),
    updateAssignmentStatus: builder.mutation<void, { assignment_id: number; status: 'READ' | 'UNREAD' }>({
      query: (body) => ({
        url: '/assignments/status',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useGetAssignmentListQuery, useUpdateAssignmentStatusMutation } = assignmentApi;

