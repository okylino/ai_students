export * from './assignmentListReq';
export * from './assignmentListResp';

export interface Material {
  content: string;
  type: string;
  title: string;
  keyword: string;
  description: string;
  url: string;
  img_url: string;
  submission: {
    submission_id: string;
    _opened: boolean;
  };
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  status: string;
  assignment_id: string;
  created_at: number;
  objective_index: number;
  resource_id: string;
  has_feedback: boolean;
  material_list: Material[];
  quiz_list: null;
  _answerable: boolean;
}

export interface AssignmentListResp {
  assignments: Assignment[];
}

export interface AssignmentListReq {
  lesson_id: string;
} 