// Chat Records Response Types
export interface ChatRecord {
  user: string;
  content: string;
  timestamp: string;
}

export interface ChatRecordsMeta {
  limit: number;
  offset: number;
  pages: number;
  total_items: number;
}

export interface ChatRecordsResp {
  data: ChatRecord[];
  meta: ChatRecordsMeta;
}

// Start AI Tutor Types
export interface StartAITutorReq {
  lesson_insight_id: string;
  chirp_id: string;
}

export interface StartAITutorResp {
  data: {
    sessionId: string;
    chats: ChatRecord[];
    suggestions: string[];
  };
}

// Chat with AI Tutor Types
export interface ChatWithAITutorReq {
  lesson_insight_id: string;
  session_id: string;
  request_id: string;
  message: string;
}

export interface ChatWithAITutorResp {
  data: {
    lesson_insight_id: string;
    session_id: string;
    request_id: string;
    chats: ChatRecord[];
    suggestions: string[];
  };
}

// Stop AI Tutor Types
export interface StopAITutorReq {
  lesson_insight_id: string;
  session_id: string;
  request_id: string;
}

export interface StopAITutorResp {
  data: string;
}

// End AI Tutor Response
export interface EndAITutorResp {
  data: string;
} 