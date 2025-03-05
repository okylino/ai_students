import { styled } from '@mui/material';

import IconArrowDown from '@/assets/svgr/icons/icon_arrow_down.svg';
import { NEUTRAL, VIOLET } from '@/styles/colors';

export const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  color: ${NEUTRAL[900]};
  font-size: 20px;
  font-weight: 600;
`;

export const ActionButton = styled('button')`
  display: inline-flex;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: ${VIOLET[700]};
  justify-content: center;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
  }

  &:disabled {
    cursor: initial;
  }
`;

export const PrevIcon = styled(IconArrowDown)`
  rotate: 90deg;
`;

export const NextIcon = styled(IconArrowDown)`
  rotate: -90deg;
`;
