export interface BaseSeqInfoResp {
  data: {
    previousId: string | null;
    nextId: string | null;
    totalCount: number;
    /** index start from 1 */
    currentIndex: number;
  };
}
