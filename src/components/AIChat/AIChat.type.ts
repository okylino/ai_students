export interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

export interface AIChatProps {
  className?: string;
  assignmentId: string;
  quizId: string;
  onClose?: () => void;
} 