export interface SaveStudentQuizAnswerReq {
  quizId: string;
  body: SaveStudentQuizAnswerBody;
}
export interface SaveStudentQuizAnswerBody {
  student_id: string;
  answer_data: string[];
}
