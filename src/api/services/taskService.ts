import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';
import { BaseNoteResp, BaseUpdateNoteResp } from '@/api/models/common/baseNote';
import { TaskDetailReq, TaskDetailResp } from '@/api/models/task/taskDetail';
import { GetTaskNoteReq, UpdateTaskNoteReq } from '@/api/models/task/taskNote';
import { TaskSeqReq, TaskSeqResp } from '@/api/models/task/taskSeq';

import { BasePinResp } from '../models/common/basePin';
import { GetTaskPinReq, UpdateTaskPinReq } from '../models/task/taskPin';

export const taskApi = createApi({
  reducerPath: `taskApi`,
  baseQuery,
  endpoints: defineEndpoints(({ query, mutation }) => ({
    /** [GET] get task pin status */
    getTaskPin: query.get<BasePinResp, GetTaskPinReq>('/tasks/:taskId/pin'),
    /** [POST] update task pin status */
    updateTaskPin: mutation.post<BasePinResp, UpdateTaskPinReq>('/tasks/:taskId/pin', {
      async onQueryStarted({ taskId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(taskApi.util.updateQueryData('getTaskPin', { taskId }, () => data));
        } catch (err) {
          /* empty */
        }
      },
    }),
    /** [GET] get task seq */
    getTaskSeq: query.get<TaskSeqResp, TaskSeqReq>('/tasks/:taskId/seq_info'),
    /** [GET] get task detail */
    getTaskDetail: query.get<TaskDetailResp, TaskDetailReq>('/task_records/:taskId/student'),
    /** [GET] get task note */
    getTaskNote: query.get<BaseNoteResp, GetTaskNoteReq>('/tasks/:taskId/note'),
    /** [POST] update task note */
    updateTaskNote: mutation.post<BaseUpdateNoteResp, UpdateTaskNoteReq>('/tasks/:taskId/note', {
      async onQueryStarted({ taskId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            const { noteId, note } = data.data;
            dispatch(taskApi.util.updateQueryData('getTaskNote', { taskId }, () => ({ data: { noteId, note } })));
          }
        } catch (err) {
          /* empty */
        }
      },
    }),
  })),
});

export const {
  useGetTaskPinQuery,
  useUpdateTaskPinMutation,
  useGetTaskDetailQuery,
  useGetTaskSeqQuery,
  useGetTaskNoteQuery,
  useUpdateTaskNoteMutation,
} = taskApi;
