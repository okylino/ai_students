import styled from 'styled-components';

import ArrowCounterClockwiseIcon from '@/assets/svgr/icons/arrow-counterclockwise.svg';
import Check from '@/assets/svgr/icons/check.svg';
import Warning from '@/assets/svgr/icons/exclamation-triangle-fill.svg';
import Mic from '@/assets/svgr/icons/mic.svg';
import Square from '@/assets/svgr/icons/square-fill.svg';

import { RecordAudioButtonProps } from './Quiz.type';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexJustifyCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonWrapper = styled(FlexJustifyCenter)`
  margin-right: 0;
`;

export const SendBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
`;

export const AnswerTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
`;

export const RefreshBtn = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const RefreshIcon = styled(ArrowCounterClockwiseIcon)`
  width: 36px;
  height: 36px;
`;

export const CheckCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #78cb3d;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 19px;
`;

export const CheckIcon = styled(Check)`
  color: #fff;
  padding-left: 1px;
  width: 17px;
  height: 17px;
`;

export const ErrorIcon = styled(Warning)`
  color: #ff4248;
  width: 20px;
  height: 20px;
  padding-left: 1px;
  margin-right: 19px;
`;

export const MicIcon = styled(Mic)`
  width: 26px;
  height: 26px;
`;

export const MicIconButton = styled.button`
  margin-top: 14px;
  background-color: #fff;
  border: 2px solid #0a8cf0;
  border-radius: 50%;
  color: #0a8cf0;
  width: 72px;
  height: 72px;
  display: inline-block;
  padding-top: 4px;
  font-weight: 600;
`;

export const RecordStopButton = styled.button`
  margin-top: 14px;
  background-color: #0a8cf0;
  border: 2px solid #0a8cf0;
  border-radius: 50%;
  color: #fff;
  width: 72px;
  height: 72px;
  display: inline-block;
  padding-top: 4px;
  font-weight: 600;
`;

export const RecordStopIcon = styled(Square)`
  width: 26px;
  height: 26px;
  color: #fff;
`;

export const RecordAudioButton = styled.button<RecordAudioButtonProps>`
  margin-left: 20px;
  background-color: ${(props) => (props.$active ? '#005fbd' : '#ffffff')};
  border: 2px solid ${(props) => (props.$active ? '#005fbd' : '#0a8cf0')};
  border-radius: 50%;
  color: #0a8cf0;
  width: 48px;
  height: 48px;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecordAudioIcon = styled(ArrowCounterClockwiseIcon)`
  width: 20px;
  height: 20px;
`;

export const ToastWrapper = styled.div<{
  $isSuccess: boolean;
}>`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 102;
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
  min-width: 20%;
  color: #000;
  width: 440px;
  border: ${(props) => (props.$isSuccess ? '#78cb3d 2px solid' : '#ff4248 2px solid')};

  @media (max-width: 700px) {
    width: 70%;
  }
`;
