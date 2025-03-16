import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';
import { sortByPinnedFirst } from '@/utils/lessonUtils';

import { LessonsPerformanceReq, LessonsPerformanceResp } from '../models/lessons/lessonsPerformance';
import { LessonStudentQuizzesReq, LessonStudentQuizzesResp } from '../models/lessons/lessonsStudentQuizzes';
import { LessonStudentTasksReq, LessonStudentTasksResp } from '../models/lessons/lessonsStudentTasks';

export const lessonApi = createApi({
  reducerPath: `lessonApi`,
  baseQuery,
  tagTypes: ['lesson'],
  endpoints: defineEndpoints(({ query }) => ({
    /** [GET] get student quizzes */
    getStudentQuizzes: query.get<LessonStudentQuizzesResp, LessonStudentQuizzesReq>(
      '/lessons/:lessonId/student_quizzes',
      {
        transformResponse: (response: unknown) => ({
          ...(response as LessonStudentQuizzesResp),
          data: sortByPinnedFirst((response as LessonStudentQuizzesResp).data),
        }),
      },
    ),
    /** [GET] get student's quizzes */
    getStudentTasks: query.get<LessonStudentTasksResp, LessonStudentTasksReq>('/lessons/:lessonId/student_tasks', {
      transformResponse: (response: unknown ) => ({
        ...(response as LessonStudentTasksResp),
        data: sortByPinnedFirst((response as LessonStudentTasksResp).data),
      }),
    }),
    /** [GET] get lesson performance */
    getLessonPerformance: query.get<LessonsPerformanceResp, LessonsPerformanceReq>('/lessons/:lessonId/performance'),
  })),
});

export const { usePrefetch, useGetStudentQuizzesQuery, useGetStudentTasksQuery, useGetLessonPerformanceQuery } =
  lessonApi;
