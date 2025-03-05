import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const QuestionIcon = styled('div')`
  width: 24px;
  height: 24px;
  display: flex;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ $isActived }: { $isActived: boolean }) => ($isActived ? COLOR.NEUTRAL[300] : 'transparent')};

  :hover {
    background-color: ${COLOR.NEUTRAL[300]};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Description = styled('span')`
  margin-right: 10px;
  color: ${COLOR.GRAY[900]};
  font-size: 14px;
  line-height: 17.6px;
`;

export const RefreshWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const Refresh = styled('span')`
  color: ${COLOR.BLUE[600]};
  text-decoration: underline;
  font-size: 14px;
  line-height: 17.6px;
`;

export const RefreshIcon = styled('div')`
  width: 18px;
  height: 18px;
  display: flex;
  margin-right: 4px;

  :hover {
    border-radius: 4px;
  }

  svg {
    width: 100%;
    height: 100%;

    path {
      fill: ${COLOR.BLUE[600]};
    }
  }
`;

export const Countdown = styled('span')`
  margin-left: 8px;
  font-size: 14px;
  color: ${COLOR.GRAY[600]};
`;

export const Spinner = styled('div')`
  width: 14px;
  height: 14px;
  border: 1px solid ${COLOR.NEUTRAL[400]};
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
