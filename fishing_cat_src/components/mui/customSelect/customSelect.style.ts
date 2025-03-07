import Select from '@mui/material/Select';
import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

// eslint-disable-next-line import/prefer-default-export
export const CustomizedSelect = styled(Select)`
  height: 40px;
  width: 100%;
  z-index: 1;
  margin-top: 8px;

  .MuiSelect-icon {
    right: 16px;
    top: auto;
    color: ${COLOR.NEUTRAL[1000]};
  }
`;
