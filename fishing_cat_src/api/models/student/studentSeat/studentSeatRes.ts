export interface StudentSeatRes {
  data: studentSeat;
}

export interface studentSeat {
  is_joined: boolean;
  serial_number: number;
  seat_number: string;
  display_name: string;
  socket_access_token: string;
}
