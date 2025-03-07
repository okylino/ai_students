import { POINT_TYPE } from '@fishing_cat/enums/pointType';

export interface JoinLessonReq {
  user_id: string | null;
  lesson_id: string;
  role: string;
  access_token?: string;
}

export interface ChooseSeatMessage {
  student_id: string;

  display_name: string;
  serial_number: number;
  seat_number: string;
  points: number;
}

export interface ReleaseSeatMessage {
  serial_number: number;
  display_name: string;
  seat_number: string;
}

export interface StudentPointsMessage {
  type: POINT_TYPE;
  total_points: number;
}
