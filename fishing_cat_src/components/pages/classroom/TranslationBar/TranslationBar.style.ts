import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

export const Bar = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 6px 0px 8px;
  border-radius: 10px;
  background-color: ${COLOR.NEUTRAL[0]};
  color: ${COLOR.GRAY[800]};
`;

export const Icon = styled('div')`
  display: flex;
  cursor: pointer;
  color: ${COLOR.NEUTRAL[1000]};

  svg {
    width: 24px;
    height: 24px;
  }
`;
