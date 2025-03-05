import baseAxios from '../axios';
import { CreateTaskResultReq } from '../models/task/createTaskResult/createTaskResultReq';
import { CreateTaskResultResp } from '../models/task/createTaskResult/createTaskResultResp';
import { UpdateTaskResultReq } from '../models/task/updateTaskResult';

export const postCreateTaskResult = async (data: CreateTaskResultReq) =>
  baseAxios
    .post<CreateTaskResultResp>(`/lessons/${data.lessonId}/students/${data.studentId}/task_results`)
    .then((res) => res.data);

export const postUpdateTaskResult = async (data: UpdateTaskResultReq) =>
  baseAxios.post(`/tasks/${data.taskId}/task_results`, data.body);
