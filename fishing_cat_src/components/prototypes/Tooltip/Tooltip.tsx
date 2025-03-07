import { TooltipProps } from '@mui/material';

import * as $ from './Tooltip.style';

export const Tooltip = ({ children, title, placement, ...restProps }: TooltipProps) => (
  <$.CustomTooltip title={title} placement={placement} {...restProps}>
    {children}
  </$.CustomTooltip>
);

export default Tooltip;
