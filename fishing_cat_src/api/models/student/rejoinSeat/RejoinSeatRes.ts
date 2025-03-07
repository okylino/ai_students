export interface RejoinSeat {
  student_id: string;
  socket_token: string;
  display_name: string;
}

export interface RejoinSeatRes {
  data: RejoinSeat;
}
