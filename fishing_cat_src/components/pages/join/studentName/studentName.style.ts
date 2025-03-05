import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 36px;

  @media (max-width: 465px) {
    gap: 12px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
`;

export const NameInput = styled.input<{ $isActive: boolean }>`
  background-color: ${COLOR.NEUTRAL[0]};
  border-radius: 8px;
  width: 368px;
  height: 48px;
  border: ${(props) => (props.$isActive ? `2px solid ${COLOR.BLUE[600]}` : `2px solid ${COLOR.GRAY[600]}`)};
  padding: 14px 20px;
  color: ${COLOR.NEUTRAL[1000]};
  outline: none;

  &::placeholder {
    color: ${COLOR.GRAY[500]};
  }

  @media (max-width: 465px) {
    width: 300px;
  }
`;

export const SerialNumber = styled.div`
  background-color: ${COLOR.NEUTRAL[0]};
  border-radius: 50%;
  color: ${COLOR.BLUE[600]};
  font-size: 18px;
  width: 48px;
  height: 48px;
  display: inline-block;
  padding-top: 4px;
  font-weight: 600;
  border: 2px solid ${COLOR.BLUE[600]};
  text-align: center;
  vertical-align: middle;
  line-height: 36px;
  vertical-align: middle;
`;

export const InputDescription = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px 20px;
  color: ${COLOR.GRAY[500]};
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 38px 0 36px 0;
`;
