import baseAxios from '../axios';
import { CreateQuizResultReq } from '../models/quiz/createQuizResult';
import { SaveStudentQuizAnswerReq } from '../models/quiz/saveStudentQuizAnswer/saveStudentQuizAnswerReq';

export const postCreateQuizResult = async (data: CreateQuizResultReq) =>
  baseAxios.post(`/lessons/${data.lessonId}/students/${data.studentId}/quizzes`);

export const postSaveStudentQuizAnswer = async (data: SaveStudentQuizAnswerReq) =>
  baseAxios.put(`/quizzes/${data.quizId}/quiz_results`, data.body);
