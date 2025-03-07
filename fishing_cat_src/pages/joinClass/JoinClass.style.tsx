import { alpha } from '@mui/material';
import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 384px;
  height: auto;
  gap: 20px;
  padding: 24px;
  background-color: ${COLOR.NEUTRAL[0]};
  border-radius: 16px;
  box-shadow: 0px 0px 6px 0px ${alpha(COLOR.NEUTRAL[1000], 0.29)};
  @media (max-width: 375px) {
    position: relative;
    top: 0px;
    width: 335px;
  }
`;

export const Title = styled.div`
  text-align: center;
  font-weight: 600;
  width: 100%;
  height: 42px;
  font-size: 24px;
  font-weight: 600px;
  background-color: transparent;
  border-bottom: 4px solid ${COLOR.TEAL[500]};
  border-top: none;
  border-left: none;
  border-right: none;
  color: ${COLOR.TEAL[500]};
`;
export const BackButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 14px;
  height: 48px;
  width: 100%;
  border: transparent;
  background-color: transparent;
  cursor: pointer;

  color: ${COLOR.TEAL[500]};
  font-family: Gotham;
  font-size: 16px;
  font-weight: 500;

  svg {
    width: 48px;
    height: 48px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 30px 0px 16px;

  @media (max-width: 375px) {
    position: relative;
    top: 0px;
  }
`;
