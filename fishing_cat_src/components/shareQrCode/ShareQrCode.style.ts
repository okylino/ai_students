import { alpha } from '@mui/material';
import styled from 'styled-components';

import closeIcon from '@fishing_cat/assets/svgr/icons/close.svg';
import COLOR from '@fishing_cat/styles/color';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${alpha(COLOR.NEUTRAL[1000], 0.66)};
  width: 100%;
  overflow: auto;
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SizeWrapper = styled.div`
  max-height: 100%;
  width: 100%;
`;

export const QrCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 40px 0;
`;

export const RoomInfoWrapper = styled.div`
  display: flex;
  gap: 24px;
  color: ${COLOR.NEUTRAL[0]};
  font-size: 20px;
  font-weight: 600;
`;

export const RoomName = styled.p`
  color: ${COLOR.NEUTRAL[0]};
  font-size: 24px;
  font-weight: 600;
`;

export const QrCodeImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 15px;
`;

export const Info = styled.div`
  display: flex;
  gap: 10px;
`;

export const CloseIcon = styled(closeIcon)`
  position: fixed;
  top: 10px;
  right: 10px;
  color: ${COLOR.NEUTRAL[0]};
`;

export const copyButton = styled.button`
  background-color: ${COLOR.BLUE[600]};
  border: none;
  border-radius: 4px;
  padding: 0;
  line-height: normal;

  svg {
    color: ${COLOR.NEUTRAL[0]};
    width: 24px;
    height: 24px;
  }
`;
