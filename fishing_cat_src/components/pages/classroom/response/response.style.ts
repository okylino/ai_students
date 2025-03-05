import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';
import Check from '@/assets/svgr/icons/check.svg';
import Warning from '@/assets/svgr/icons/exclamation-triangle-fill.svg';

import { ToolButtonProps } from './Response.type';

export const ToolButton = styled.button<ToolButtonProps>`
  margin-right: 24px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background-color: #00000000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  line-height: 1;
  text-align: center;
  vertical-align: middle;
  box-shadow: ${(props) => (props.$active ? `0 0 0 1px ${COLOR.NEUTRAL[0]}, 0 0 0 3px ${COLOR.GRAY[900]}` : 'none')};
`;

export const ToolWrapper = styled.span`
  margin-right: 24px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background-color: #00000000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  line-height: 1;
  text-align: center;
  vertical-align: middle;
  padding: 1px 0;
`;

export const ErrorIcon = styled(Warning)`
  color: #ff4248;
  width: 20px;
  height: 20px;
  padding-left: 1px;
  margin-right: 19px;
`;

export const CheckCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #5edc09;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 3px;
`;

export const CheckIcon = styled(Check)`
  color: #fff;
  width: 20px;
  height: 20px;
`;
