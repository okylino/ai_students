import { ChipProps } from '@mui/material';

export interface EventTagProps extends ChipProps {
  color?: ChipProps['color']
  icon: ChipProps['icon']
  eventTitle: string;
  currentCount: number;
  description?: string;
}
