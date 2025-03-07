import styled from 'styled-components';

import { BtnStyleType } from '@fishing_cat/components/customButton/CustomBtn.type';
import COLOR from '@fishing_cat/styles/color';

const getBtnDefaultColor = (props: BtnStyleType) => {
  if (props.$loading) return props.$backgroundColor?.active;
  if (props.$disabled) return COLOR.GRAY[400];
  if (props.$outlined) return 'transparent';
  return props.$backgroundColor?.default;
};

const getBtnHoverColor = (props: BtnStyleType) => {
  if (props.$loading) return props.$backgroundColor?.active;
  if (props.$disabled) return COLOR.GRAY[400];
  return props.$backgroundColor?.hover;
};
export const BtnStyle = styled.button<BtnStyleType>`
  display: flex;
  height: 40px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;

  /* Font style */
  font-family: Source Sans Pro;
  font-size: 16px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;

  width: ${(props) => props.$width};
  background-color: ${(props) => getBtnDefaultColor(props)};
  border: ${(props) => (props.$outlined ? `2px solid ${props.$backgroundColor?.default}` : 'transparent')};
  color: ${(props) => (props.$outlined ? props.$backgroundColor?.default : COLOR.NEUTRAL[0])};
  cursor: ${(props) => (props.$disabled || props.$loading ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => getBtnHoverColor(props)};
    color: ${(props) => props.$outlined && COLOR.NEUTRAL[0]};
    border: ${(props) => props.$outlined && `2px solid ${props.$backgroundColor?.hover}`};
  }
  &:active {
    background-color: ${(props) => !props.$disabled && props.$backgroundColor?.active};
    color: ${(props) => props.$outlined && COLOR.NEUTRAL[0]};
    border: ${(props) => props.$outlined && `2px solid ${props.$backgroundColor?.active}`};
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${COLOR.NEUTRAL[0]};
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
