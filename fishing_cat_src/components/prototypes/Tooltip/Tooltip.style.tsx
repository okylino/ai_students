import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

// eslint-disable-next-line import/prefer-default-export
export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '8px 12px',
    backgroundColor: COLOR.NEUTRAL[1000],
    color: COLOR.NEUTRAL[0],
    fontSize: 12,
    fontWeight: 400,
  },
}));
