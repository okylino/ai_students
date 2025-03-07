import { styled } from '@mui/system';

import { NEUTRAL, VIOLET } from '@/styles/colors';

export const ActionRow = styled('div')`
  display: flex;
  gap: 12px;
  align-items: center;
  user-select: none;
`;

export const RecordHeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;

  ${({ theme }) => theme.breakpoints.down('md')} {
    &[data-size='large']:has(${ActionRow} > *:nth-child(2)) {
      flex-direction: column;
      justify-content: center;
      gap: 12px;
    }
  }
`;

export const FlexRow = styled('div')`
  display: flex;
  gap: 8px;
`;

export const Icon = styled('div')`
  width: 24px;
  height: 24px;
  color: ${NEUTRAL[700]};

  > svg {
    width: inherit;
    height: inherit;
  }

  ${(props) =>
    props.onClick &&
    `cursor: pointer;
      &:hover {
        background-color: ${NEUTRAL[200]};
        border-radius: 4px;
      }
    `}
`;

export const Title = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${NEUTRAL[900]};
  line-height: 160%;

  ${RecordHeaderWrapper}[data-size='large'] & {
    font-size: 24px;
    ${Icon} {
      width: 36px;
      height: 36px;
    }
    ${({ theme }) => theme.breakpoints.down('md')} {
      font-size: 20px;
      ${Icon} {
        width: 28px;
        height: 28px;
      }
    }
  }
`;

export const Tag = styled('div')`
  user-select: none;
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${VIOLET[50]};
  color: ${VIOLET[700]};
  font-size: 14px;

  ${RecordHeaderWrapper}[data-size='large'] & {
    font-size: 20px;
    ${({ theme }) => theme.breakpoints.down('md')} {
      font-size: 16px;
    }
  }
`;
