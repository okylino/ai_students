import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

export const Wrapper = styled('div')`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const TranslationAction = styled('div')`
  display: flex;
  margin-bottom: 10px;
`;

export const Text = styled('p')`
  margin-right: 4px;
  color: ${COLOR.BLUE[600]};
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Icon = styled('div')`
  display: flex;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${COLOR.BLUE[600]};
    }
  }
`;
