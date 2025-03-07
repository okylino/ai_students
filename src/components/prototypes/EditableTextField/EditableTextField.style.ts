import { FormControl, styled } from '@mui/material';

import { NEUTRAL } from '@/styles/colors';

export const Card = styled(FormControl)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 64px;
  border-radius: 16px;
  background-color: ${NEUTRAL[0]};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);
`;

export const Action = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: normal;
  & svg {
    width: 20px;
    height: 20px;
  }
  -webkit-tap-highlight-color: transparent;
`;

export const HelperText = styled('div')`
  margin: 8px 0 0 0;
  text-align: right;
  font-size: 14px;
  line-height: 160%;
  color: ${NEUTRAL[500]};
`;

export const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
