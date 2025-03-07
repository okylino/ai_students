import baseAxios from '@fishing_cat/api/axios';

import { LatestLessonReq, LatestLessonResp } from '../models/lesson/latestLesson';
import { LessonSeatReq, LessonSeatRes } from '../models/lesson/lessonSeat';
import { PresignedUrlReq } from '../models/lesson/presignedUrl/presignedUrlReq';
import { PresignedUrlResp } from '../models/lesson/presignedUrl/presignedUrlResp';
import { QuizReq, QuizResp } from '../models/lesson/quiz';
import { TaskReq, TaskResp } from '../models/lesson/task';
import { ToolReq } from '../models/lesson/tool/toolReq';
import { ToolResp } from '../models/lesson/tool/toolResp';

export const getLatestLesson = async (data: LatestLessonReq) =>
  baseAxios.get<LatestLessonResp>(`/lessons?filter=${data.filter}&value=${data.value}`).then((res) => res.data.data);

export const lessonSeat = async (data: LessonSeatReq) =>
  baseAxios
    .get<LessonSeatRes>(`/lessons/${data.lesson_id}/attendant_list?group=false`)
    .then((res) => res.data.student_attend);
export const getQuiz = async (data: QuizReq) =>
  baseAxios.get<QuizResp>(`/lessons/${data.lessonId}/students/${data.studentId}/quizzes`).then((res) => res.data.data);
export const getTask = async (data: TaskReq) =>
  baseAxios.get<TaskResp>(`/lessons/${data.lessonId}/students/${data.studentId}/tasks`).then((res) => res.data);
export const getTool = async (data: ToolReq) =>
  baseAxios.get<ToolResp>(`/lessons/${data.lessonId}/tool`).then((res) => res.data);

export const postPresignedUrl = async (data: PresignedUrlReq) =>
  baseAxios.post<PresignedUrlResp>(`/lessons/${data.lessonId}/resources`, { type: data.type }).then((res) => res.data);
