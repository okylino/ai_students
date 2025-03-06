export interface UpdateAssignmentStatusReq {
  assignment_id: number;
  status: 'READ' | 'UNREAD'|'DONE';
}

export interface UpdateAssignmentStatusResp {
  success: boolean;
}