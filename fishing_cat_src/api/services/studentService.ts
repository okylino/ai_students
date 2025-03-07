import { createApi } from '@reduxjs/toolkit/query/react';

import baseAxios from '@fishing_cat/api/axios';
import { LessonByRoomReq } from '@fishing_cat/api/models/lesson/lessonByRoom/lessonByRoomReq';
import { ChooseSeatReq, ChooseSeatRes } from '@fishing_cat/api/models/student/chooseSeat';
import { RejoinSeatReq, RejoinSeatRes } from '@fishing_cat/api/models/student/rejoinSeat';
import { ReleaseSeatReq } from '@fishing_cat/api/models/student/releaseSeat';
import { StudentInfoReq } from '@fishing_cat/api/models/student/studentInfo';
import { StudentNameReq } from '@fishing_cat/api/models/student/studentName';
import { StudentPointsReq, StudentPointsResp } from '@fishing_cat/api/models/student/studentPoints';
import { StudentSeatReq, StudentSeatRes } from '@fishing_cat/api/models/student/studentSeat';
import { studentStatusReq } from '@fishing_cat/api/models/student/studentStatus';
import { UserIdByDeviceIdReq, UserIdByDeviceIdResp } from '@fishing_cat/api/models/student/userIdByDeviceId';
import { RESTFUL_METHOD } from '@fishing_cat/enums/restfulMethodEnum';
import { axiosBaseQuery } from '@fishing_cat/redux/slices/apiSlice';

export function getStudentInfo(data: StudentInfoReq) {
  return baseAxios.get(`/lessons/${data.lessonId}/students/${data.studentId}`);
}

export function getLessonByRoom(data: LessonByRoomReq) {
  return baseAxios.get(`/lessons?value=${data.value}&filter=${data.filter}&is_the_latest_one=true`);
}

export const putStudentStatus = async (data: studentStatusReq) => {
  const { status } = data;
  return baseAxios.put(`/lessons/${data.lessonId}/attendant/${data.studentId}`, { status });
};

export const releaseSeat = async (data: ReleaseSeatReq) =>
  baseAxios.delete(`/lessons/${data.lesson_id}/attendant/${data.student_id}?role=student`);

export function getRoomList() {
  return baseAxios.get(`/account/room_list`);
}

export const putStudentName = async (data: StudentNameReq) => {
  const { display_name } = data;
  return baseAxios.put(`/lessons/${data.lesson_id}/attendant/${data.student_id}/display_name`, {
    display_name,
  });
};

export const chooseSeat = async (data: ChooseSeatReq) => {
  const { lesson_id, ...dataWithoutLessonId } = data;
  console.log(dataWithoutLessonId);
  return baseAxios
    .post<ChooseSeatRes>(`/lessons/${data.lesson_id}/choose_seat`, dataWithoutLessonId)
    .then((res) => res.data);
};

export const getStudentSeat = async (data: StudentSeatReq) => {
  const emailParam = data.email ? `email=${data.email}` : '';
  return baseAxios
    .get<StudentSeatRes>(`/lessons/${data.lesson_id}/attendant/${data.student_id}?${emailParam}`)
    .then((res) => res.data.data);
};

export const getStudentPoints = async (data: StudentPointsReq) =>
  baseAxios
    .get<StudentPointsResp>(`/lessons/${data.lessonId}/attendant/${data.userId}/points?latest=true`)
    .then((res) => res.data.total_points);

export const rejoinSeat = async (data: RejoinSeatReq) => {
  const { lesson_id, ...dataWithoutLessonId } = data;
  return baseAxios
    .post<RejoinSeatRes>(`/lessons/${data.lesson_id}/rejoin_seat`, dataWithoutLessonId)
    .then((res) => res.data.data);
};

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getUserIdByDeviceId: build.query<UserIdByDeviceIdResp, UserIdByDeviceIdReq>({
      query: ({ lessonId, deviceId }) => ({
        url: `/lessons/${lessonId}/device/${deviceId}/student`,
        method: RESTFUL_METHOD.GET,
      }),
    }),
  }),
});

export const { useGetUserIdByDeviceIdQuery } = studentApi;
