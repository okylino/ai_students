import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AssignmentListReq,
  AssignmentListResp,
} from '../models/assignment/assignmentList';
import defineEndpoints from '@/api/definedEndpoints';
import baseQuery from '@/api/baseQuery';

export const assignmentApi = createApi({
  /**
   * Get list of assignments in a lesson
   * @param params - Request parameters containing lesson_id
   * @returns Promise with assignment list response
   */
  reducerPath: `assignments`,
  baseQuery,
  endpoints: defineEndpoints(({ query }) => ({
    /** [GET] get room list with lesson */
    getAssignmentList: query.get<AssignmentListResp, AssignmentListReq>('assignments/:lesson_id'),
   
  })),
}); 
 

export const { useGetAssignmentListQuery } = assignmentApi;
