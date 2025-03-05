import { alpha } from '@mui/material';
import { styled } from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const Dropdown = styled.div`
  position: relative;
`;

export const DropdownBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  gap: 4px;
  font-weight: 600;
  color: ${COLOR.NEUTRAL[1000]};
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  border-radius: 12px;
  background: ${COLOR.NEUTRAL[0]};
  box-shadow: 0px 0px 6px 0px ${alpha(COLOR.NEUTRAL[1000], 0.3)};
  min-width: 320px;
  padding: 24px 24px 4px;
  z-index: 10;
  color: ${COLOR.NEUTRAL[900]};
`;

export const Item = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  gap: 8px;

  &:hover {
    background-color: ${COLOR.GRAY[200]};
  }

  > svg {
    width: 18px;
    height: 18px;
  }
`;

export const SignItem = styled(Item)`
  justify-content: flex-end;
  padding: 8px 8px 8px 12px;
  font-weight: 500;

  &:hover {
    background-color: initial;
  }
`;

export const SeatNumber = styled.div`
  font-size: 16px;
  background-color: ${COLOR.BLUE[600]};
  border-radius: 50%;
  color: ${COLOR.NEUTRAL[0]};
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: inline-block;
  padding-top: 4px;
`;

export const Name = styled.span`
  font-size: 20px;
  margin: 4px 0px;
  color: ${COLOR.GRAY[900]};
  font-size: 18px;
  font-weight: 600;
  line-height: 120%;
`;

export const Email = styled.span`
  color: ${COLOR.GRAY[900]};
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  line-height: 160%;
`;

export const SeatTag = styled.div`
  width: fit-content;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid ${COLOR.GRAY[400]};
  border-radius: 100px;
  background-color: ${COLOR.VIOLET[50]};
  font-size: 12px;
  font-weight: 500;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Avatar = styled.div<{ $background: string; $isAvatarPage?: boolean }>`
  width: 64px;
  height: 64px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$background};
  border-radius: 50%;
  cursor: ${(props) => (props.$isAvatarPage ? 'initial' : 'pointer')};
`;

export const SmallAvatar = styled(Avatar)<{ $background: string }>`
  width: 40px;
  height: 40px;
`;

export const AvatarIcon = styled.img`
  width: 52px;
  height: 52px;
`;

export const SamllAvatarIcon = styled(AvatarIcon)`
  width: 32px;
  height: 32px;
`;

export const Divider = styled.div<{ $isBottom?: boolean }>`
  width: 100%;
  margin: 12px 0px ${(props) => (props.$isBottom ? '4px' : '12px')} 0px;
  border-bottom: 1px solid ${COLOR.NEUTRAL[500]};
`;
