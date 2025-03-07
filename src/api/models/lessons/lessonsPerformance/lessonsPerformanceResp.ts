export interface LessonsPerformanceResp {
  data: PerformanceData;
}

export interface PerformanceData {
  roomName: string;
  /** startTime (timeStamp:s) */
  startTime: number;
  /** endTime (timeStamp:s) */
  endTime: number;
  totalPoints: number;
  quizCounts: {
    ansCount: number;
    totalCount: number;
  };
  taskCounts: {
    ansCount: number;
    totalCount: number;
  };
  pickedTimes: number;
  raceTimes: number;
}
