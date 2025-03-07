export interface RoomData {
  display_name: string;
  room_id: string;
  icon: number;
  student_count: number;
  room_number: string;
}

export interface RoomInfoResp {
  data: RoomData;
}
