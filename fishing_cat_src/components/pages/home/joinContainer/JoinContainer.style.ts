import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const RoomName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${COLOR.TEAL[500]};
  margin-bottom: 36px;

  @media (max-width: 620px) {
    margin-bottom: 24px;
  }
`;
