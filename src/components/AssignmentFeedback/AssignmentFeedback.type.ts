export interface FeedbackProps {
  assignmentId: string;
  onClose: () => void;
}

export interface FeedbackFormData {
  overall: 'positive' | 'negative';
  reason?: string;
  text?: string;
}

export enum FeedbackReason {
  UNCLEAR = "UNCLEAR",
  UNFRIENDLY = "UNFRIENDLY",
  NO_RESPONSE = "NO_RESPONSE"
} 