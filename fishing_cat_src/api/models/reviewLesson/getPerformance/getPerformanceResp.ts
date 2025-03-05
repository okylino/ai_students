export interface Counts {
  ansCount: number;
  totalCount: number;
}
export interface GetPerformanceResp {
  totalPoints: number;
  quizCounts: Counts;
  taskCounts: Counts;
  pickedTimes: number;
  raceTimes: number;
}
