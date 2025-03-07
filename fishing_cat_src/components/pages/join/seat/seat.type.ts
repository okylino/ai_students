import { ATTENDANT_STATUS } from '@fishing_cat/enums/attendantStatus';
import { SEAT_TYPE } from '@fishing_cat/enums/seatType';

export interface SeatProps {
  type: SEAT_TYPE;
  seatNumber: string;
  serialNumber: number;
  displayName: string;
  status: ATTENDANT_STATUS;
  selectedSeat: SelectedSeat;
  setSelectedSeat: Function;
}

export interface SelectedSeat {
  serialNumber: number;
  type: SEAT_TYPE;
}
