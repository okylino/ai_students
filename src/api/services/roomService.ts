import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';
import { LatestLessonReq, LatestLessonResp } from '@/api/models/room/latestLesson';
import { LessonListReq, LessonListResp } from '@/api/models/room/lessonList';
import { RoomLessonListResp } from '@/api/models/room/roomLessonList';

export const roomApi = createApi({
  reducerPath: `roomApi`,
  baseQuery,
  endpoints: defineEndpoints(({ query }) => ({
    /** [GET] get room list with lesson */
    getRoomLessonList: query.get<RoomLessonListResp>('/account/room_list_with_lesson'),
    /** [GET] get latest lesson */
    getLatestLesson: query.get<LatestLessonResp, LatestLessonReq>('lessons'),
    /** [GET] get lesson list */
    getLessonList: query.get<LessonListResp, LessonListReq>('/account/:roomId/lesson_list'),
  })),
});

export const { useGetRoomLessonListQuery, useLazyGetLatestLessonQuery, useGetLessonListQuery } = roomApi;
