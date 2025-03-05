export interface TaskSeqResp {
  data: {
    taskId: string;
    previousId: string;
    nextId: string;
    totalCount: number;
    currentIndex: number;
  };
}
