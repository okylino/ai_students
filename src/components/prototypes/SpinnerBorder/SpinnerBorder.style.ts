import styled, { keyframes } from 'styled-components';

const spinnerBorder = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerBorder = styled.div`
  color: #fff;
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  display: inline-block;
  vertical-align: 0.25em;
  border-radius: 50%;
  animation: 0.75s linear infinite ${spinnerBorder};
`;

export const VisuallyHidden = styled.span`
  visibility: hidden;
`;
