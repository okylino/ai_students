export interface AssignmentListResp {
  assignments: {
    id: number;
    title: string;
    status: 'READ' | 'UNREAD';
    materialList: {
      id: string;
      title: string;
      description: string;
      img_url: string;
    }[];
    // ... other fields
  }[];
}

export class AssignmentListReq {
}