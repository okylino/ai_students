import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
`;

export const LineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Line = styled.span`
  color: ${COLOR.GRAY[300]};
  flex: 1;
  border-top: 1px solid ${COLOR.GRAY[600]};
`;
