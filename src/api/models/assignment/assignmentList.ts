export interface AssignmentListResp {
  assignments: {
    id: number;
    title: string;
    status: 'READ' | 'UNREAD' | 'DONE';
    materialList: {
      id: string;
      title: string;
      description: string;
      img_url: string;
    }[];
    quizList:  Quiz[]
    
    // ... other fields
  }[];
}
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

export interface QuizOption {
  optionId: number;
  content: string;
  isAiAnswer: boolean;
  reason: string;
}

export interface Quiz {
  quizId: string;
  chirpId: string;
  quizType: string;
  content: string;
  optionType: string;
  seq: number;
  optionList: QuizOption[];
  studentAnswer: number[];
  quizResult: boolean;
  subject: string | null;
  country: string | null;
  sourceType: string | null;
  collectionId: string | null;
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
  material_list: Material[] | null;
  quiz_list: Quiz[] | null;
  _answerable: boolean;
}

export interface AssignmentListResp {
  assignments: Assignment[];
}

export interface AssignmentListReq {
  lesson_id: string;
}

export class AssignmentListReq {
}