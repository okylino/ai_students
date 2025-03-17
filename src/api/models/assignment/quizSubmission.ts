export interface QuizSubmissionReq {
  student_answer: number[];
}

export interface QuizSubmissionResp {
  data: {
    submission_id: string;
    assignment_id: string;
    supply_content_id: string;
    student_id: string;
    answer: number[];
    chat_id: string;
    status: 'OPEN' | 'SUBMITTED';
    created_at: number;
    updated_at: number;
  };
}

export interface AssignmentSubmissionResp {
  data: Array<{
    assignment_id: string;
    supplies_id: string;
    student_id: string;
    lesson_id: string;
    status: 'DONE';
    created_at: number;
    updated_at: number;
  }>;
} 