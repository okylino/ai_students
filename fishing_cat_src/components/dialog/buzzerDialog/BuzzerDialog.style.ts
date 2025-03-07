import styled from 'styled-components';

import { BaseCloseIcon } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';

export const CloseIcon = styled(BaseCloseIcon)`
  position: absolute;
  width: 32px;
  right: 24px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 30px 0;
`;

export const Circle = styled.button<{ $primaryColor: string; $secondaryColor: string }>`
  width: 240px;
  height: 240px;
  background-color: ${(props) => props.$primaryColor};
  border-radius: 50%;
  border: 4px solid ${(props) => props.$secondaryColor};
  box-shadow: 0 0 0 20px #bec2c2;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  font-size: 36px;
  color: #fff;
`;

export const Number = styled.span`
  color: #0a8cf0;
`;
