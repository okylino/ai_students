import { ATTENDANT_STATUS } from '@fishing_cat/enums/attendantStatus';
import { SEAT_TYPE } from '@fishing_cat/enums/seatType';

export interface LessonSeatRes {
  student_attend: LessonSeat;
}

export interface LessonSeat {
  serial_number: number;
  seat_number: string;
  display_name: string | null;
  status: ATTENDANT_STATUS;
  user_type: SEAT_TYPE;
}
