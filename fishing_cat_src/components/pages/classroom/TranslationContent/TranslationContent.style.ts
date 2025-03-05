import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

const WRAPPER_HEIGHT = 270;
const WRAPPER_PADDING = 16;

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: ${WRAPPER_PADDING}px 12px ${WRAPPER_PADDING}px ${WRAPPER_PADDING}px;
  margin-bottom: 24px;
  border-radius: 10px;
  background-color: ${COLOR.NEUTRAL[0]};
`;

export const Content = styled('div')`
  width: 100%;
  height: ${WRAPPER_HEIGHT - WRAPPER_PADDING * 2}px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 16px;

  @media (max-width: 700px) {
    max-height: initial;
  }
`;

export const Item = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Origin = styled('p')`
  color: ${COLOR.NEUTRAL[900]};
`;

export const ResultText = styled('p')`
  color: ${COLOR.GRAY[600]};
`;
