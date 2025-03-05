import { alpha } from '@mui/material';
import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const SeatWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(10, 80px);
  gap: 10px;
  padding-bottom: 80px;

  @media (max-width: 925px) {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 90px);
    width: 83%;
    margin: 0 auto;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -3px 6px ${alpha(COLOR.NEUTRAL[1000], 0.29)};
  height: 80px;
  padding: 16px;
  position: fixed;
  background-color: ${COLOR.GRAY[100]};
  bottom: env(safe-area-inset-bottom, 0);
  width: 100%;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 36px 0;
`;

export const Content = styled.p`
  font-size: 16px;
`;
export const Body = styled.div`
  flex-direction: column;
  flex-grow: 1;
`;
export const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 144px);
  flex-direction: column;
`;
