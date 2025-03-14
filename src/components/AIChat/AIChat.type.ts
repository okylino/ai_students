export interface AIChatProps {
  className?: string;
}

export interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
} 