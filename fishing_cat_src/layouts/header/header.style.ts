import { styled } from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const Header = styled.div`
  background-color: ${COLOR.NEUTRAL[0]};
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;

  ul li p {
    cursor: pointer;
    font-size: 16px;
  }

  ul li img {
    margin-right: 8px;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseIcon = styled.img`
  cursor: pointer;
`;

export const Content = styled.p`
  font-size: 16px;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Points = styled.div`
  margin-inline-start: 4px;
  border-radius: 48px;
  background: ${COLOR.GRAY[100]};
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 18px;
  font-weight: 700;
  margin-right: 8px;
  border-radius: 48px;

  svg {
    margin-inline-end: 8px;
    color: ${COLOR.YELLOW[500]};
  }
`;

export const Button = styled.button`
  background-color: unset;
  border: none;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
  }
`;
