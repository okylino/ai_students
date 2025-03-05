interface Material {
  content: string;
  type: string;
  title: string;
  keyword: string;
  description: string;
  url: string;
  img_url: string;
  submission?: {
    submission_id: string;
    is_opened: boolean;
  };
}

interface QuizOption {
  option_id: number;
  content: string;
  is_ai_answer: boolean;
  reason: string;
}

interface Quiz {
  quiz_id?: string;
  chirp_id: string;
  quiz_type: string;
  content: string;
  option_type: string;
  seq?: number;
  option_list: QuizOption[];
  student_answer?: number[];
  quiz_result?: boolean;
  subject?: string;
  country?: string;
  source_type?: string;
  collection_id?: string;
}

interface Assignment {
  assignment_id: string;
  created_at: number;
  objective_index: number;
  resource_id: string;
  status: 'UNREAD' | 'READ' | 'DONE';
  is_answerable: boolean;
  has_feedback: boolean;
  material_list: Material[];
  quiz_list?: Quiz[];
}

export interface AssignmentListResp {
  assignments: Assignment[];
} 