import { styled } from '@mui/material';

import { NEUTRAL, VIOLET } from '@/styles/colors';

export const PlayerContainer = styled('div')<{ $width: string; $height: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background-color: ${NEUTRAL[200]};
  border-radius: 99px;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  align-self: flex-start;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    width: 100%;
  }
`;

export const PlayPauseButton = styled('div')`
  cursor: pointer;
  color: ${VIOLET[600]};
`;

export const ProgressBar = styled('input')<{ value?: number }>`
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: ${NEUTRAL[500]};
  height: 6px;
  border-radius: 3px;

  /* Hide the slider thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
    border: 0;
  }

  /* Progress bar color */
  &::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
    background: ${({ value }) =>
      `linear-gradient(to right, ${VIOLET[600]} 0%, ${VIOLET[600]} ${value}%, ${NEUTRAL[500]} ${value}%, ${NEUTRAL[500]} 100%)`};
  }
`;

export const TimeDisplay = styled('span')`
  font-size: 14px;
  color: ${VIOLET[600]};
  min-width: 32px;
`;
