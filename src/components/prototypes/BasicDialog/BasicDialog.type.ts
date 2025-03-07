import { ReactNode } from 'react';

export interface BasicDialogProps {
  children: ReactNode;
  width: string;
  isOpen: boolean;
  height?: string;
  isVerticalCenter?: boolean;
  style?: React.CSSProperties;
  mobileWidth?: string;
}
