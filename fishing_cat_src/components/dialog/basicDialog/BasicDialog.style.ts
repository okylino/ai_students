import Dialog from '@mui/material/Dialog';
import { styled } from 'styled-components';

import closeIcon from '@fishing_cat/assets/svgr/icons/close.svg';
import COLOR from '@fishing_cat/styles/color';

export const CustomDialog = styled(Dialog)<{ $width: string; $height: string; $isVerticalCenter: boolean }>`
  & .MuiPaper-root {
    border-radius: 16px;
    width: 100%;
    max-width: ${(props) => props.$width};
    min-height: ${(props) => props.$height};
    padding: 24px;
    margin: 12px;
    ${(props) => props.$isVerticalCenter && `justify-content: center;`}
  }
`;

export const BaseTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BaseContent = styled.p`
  font-size: 16px;
`;

export const BaseCloseIcon = styled(closeIcon)`
  cursor: pointer;
  color: ${COLOR.NEUTRAL[1000]};
  width: 24px;
  height: 24px;
`;

export const BaseButtonWrapper = styled.div<{ $marginTop: string }>`
  bottom: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: ${(props) => props.$marginTop};
`;
