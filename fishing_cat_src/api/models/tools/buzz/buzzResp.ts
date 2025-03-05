import { BUZZER_RESULT } from '@fishing_cat/enums/buzzerResult';

export interface BuzzResp {
  message: BUZZER_RESULT;
  data: {
    record_id: string;
    lesson_id: string;
    student_id: string;
    race_student_serial_number: number;
    race_student_seat_number: string;
  };
}
