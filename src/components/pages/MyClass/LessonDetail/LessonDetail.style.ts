import { styled } from '@mui/material';

import Star from '@/assets/svgr/icons/star.svg';
import { YELLOW } from '@/styles/colors';

export const LessonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const LessonContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: start;
    gap: 12px;
  }
`;

export const ButtonWrapper = styled('div')`
  width: 120px;

  @media (max-width: 576px) {
    width: 80px;
  }
`;

export const Point = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
`;

export const StarIcon = styled(Star)`
  color: ${YELLOW[500]};
  width: 28px;
  height: 28px;
`;
