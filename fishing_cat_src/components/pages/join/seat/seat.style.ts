import { alpha } from '@mui/material';
import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const SeatNumber = styled.div<{ $isActive: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => (props.$isActive ? COLOR.NEUTRAL[0] : COLOR.BLUE[600])};
`;

export const Name = styled.div<{ $isActive: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.$isActive ? COLOR.NEUTRAL[0] : COLOR.GRAY[900])};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70px;
  margin: 0 auto;
`;

export const SeatBtn = styled.button<{ $isActive: boolean }>`
  background-color: ${(props) => (props.$isActive ? COLOR.BLUE[600] : COLOR.NEUTRAL[0])};
  border-radius: 8px;
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px 6px ${alpha(COLOR.NEUTRAL[1000], 0.29)};
  padding: 0;
  border: none;

  &:hover {
    background-color: ${COLOR.BLUE[600]};
    ${SeatNumber}, ${Name} {
      color: ${COLOR.NEUTRAL[0]};
    }
  }

  &:disabled {
    background-color: ${COLOR.NEUTRAL[0]};
    ${SeatNumber}, ${Name} {
      color: ${COLOR.GRAY[400]};
    }
  }
`;
