import styled from 'styled-components';

import closeIcon from '@fishing_cat/assets/svgr/icons/close.svg';
import COLOR from '@fishing_cat/styles/color';

export const Dialog = styled.dialog<{ $width: string }>`
  border: none;
  border-radius: 16px;
  padding: 24px;
  width: ${(props) => props.$width};

  &:focus-visible {
    outline: none;
  }

  &::backdrop {
    background-color: ${COLOR.NEUTRAL[1000]};
    opacity: 0.4;
  }

  @media (max-width: ${(props) => props.$width}) {
    width: 95%;
  }
`;

export const CloseImg = styled(closeIcon)`
  float: right;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const Content = styled.div`
  margin-bottom: 48px;

  h1 {
    font-size: 24px;
    font-weight: 600;
  }

  p {
    font-size: 16px;
  }
`;
