export enum ROUTE_PATH {
  LEARNING = '/learning',
  MY_CLASS = `${ROUTE_PATH.LEARNING}/my-class`,
  CLASS = `${ROUTE_PATH.LEARNING}/my-class/:id`,
  LESSON = `${ROUTE_PATH.LEARNING}/lesson/:lessonId`,
  QUIZ_RECORD = `${ROUTE_PATH.LEARNING}/lesson/:lessonId/quiz/:quizId`,
  TASK_RECORD = `${ROUTE_PATH.LEARNING}/lesson/:lessonId/task/:taskId`,
}
