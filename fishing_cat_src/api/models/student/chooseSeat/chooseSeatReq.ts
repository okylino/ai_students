export interface ChooseSeatReq {
  lesson_id: string;
  serial_number: number;
  sid: string;
  user_id: string | null;
  device_id: string;
}
