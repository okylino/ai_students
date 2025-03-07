export type PinResourceType = 'QUIZ' | 'TASK';

export interface BasePinResp {
  data: Partial<PinData>;
}

interface PinData {
  id: string;
  lessonId: string;
  resourceId: string;
  resourceType: {
    type: string;
    enum: PinResourceType[];
  };
  studentId: string;
  pinTime: number | null;
}
