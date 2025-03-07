import { useTranslation } from 'react-i18next';

import { ATTENDANT_STATUS } from '@fishing_cat/enums/attendantStatus';
import { SEAT_TYPE } from '@fishing_cat/enums/seatType';
import { useAppSelector } from '@fishing_cat/redux/hook.ts';

import * as $ from './seat.style';
import { SeatProps } from './seat.type';

const Seat = ({ type, seatNumber, serialNumber, displayName, setSelectedSeat, selectedSeat, status }: SeatProps) => {
  const { t } = useTranslation();
  const isActive = selectedSeat.serialNumber === serialNumber;
  const loginUser = useAppSelector((state) => state.userStore.user);
  const isSeatTypeDisabled = loginUser?.userId ? type === SEAT_TYPE.A || type === SEAT_TYPE.B : type === SEAT_TYPE.A;

  const handleSelectSeat = () => {
    setSelectedSeat({ serialNumber, type });
  };

  return (
    <$.SeatBtn
      $isActive={isActive}
      disabled={status === ATTENDANT_STATUS.ACTIVE || status === ATTENDANT_STATUS.ABSENT || isSeatTypeDisabled}
      onClick={handleSelectSeat}
    >
      <$.SeatNumber $isActive={isActive}>{seatNumber}</$.SeatNumber>
      <$.Name $isActive={isActive}>{displayName || t('guest')}</$.Name>
    </$.SeatBtn>
  );
};

export default Seat;
