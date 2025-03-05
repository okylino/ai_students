import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

import { InputStyle } from './EnterClassId.type';

export const Input = styled.input<InputStyle>`
  background-color: ${COLOR.NEUTRAL[0]};
  border-radius: 8px;
  width: 100%;
  height: 48px;
  border: 1px solid ${(props) => (props.$warn ? COLOR.RED[300] : COLOR.GRAY[600])};
  padding: 10px 16px;
  color: ${COLOR.NEUTRAL[1000]};
  outline: none;

  &:focus-visible {
    border-color: ${(props) => (props.$warn ? COLOR.RED[300] : props.$color)};
  }
`;
export const WarningText = styled.p`
  color: ${COLOR.INVALID.Default};
  font-size: 16px;
  margin-top: 6px;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  width: 100%;
  flex: 0 1 0;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const VerticalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const InputBox = styled.div`
  display: flex;
  flex: 1 0 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ShowCount = styled.span`
  height: 100%;
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  align-items: center;
  color: ${COLOR.GRAY[600]};
`;

export const ClassId = styled.div`
  width: 70px;
  color: ${COLOR.GRAY[900]};
  font-size: 16px;
  font-weight: 600;
`;

export const MoveRight = styled.div`
  position: relative;
  left: 86px;
  margin-top: 16px;
`;
