import { styled } from '@mui/material';

import { NEUTRAL } from '@/styles/colors';

export const Wrapper = styled('div')`
  padding: 16px 24px;
`;

export const Navigator = styled('div')`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: ${NEUTRAL[900]};
  font-size: 20px;
  font-weight: 600;
  padding: 16px 0;
  cursor: pointer;
`;
