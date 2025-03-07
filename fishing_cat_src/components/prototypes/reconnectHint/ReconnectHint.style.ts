import styled from 'styled-components';

import WarningIcon from '@/assets/svgr/icons/exclamation-triangle-fill.svg';

export const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 102;
  border: #ff4248 2px solid;
  border-radius: 8px;
  top: 76px;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 0.6rem 24px;
  color: #000;
  min-width: 440px;

  @media (max-width: 490px) {
    min-width: 85%;
    width: 85%;
  }
`;

export const ErrorIcon = styled(WarningIcon)`
  color: #ff4248;
  width: 20px;
  height: 20px;
  padding-left: 1px;
  margin-right: 19px;
`;
