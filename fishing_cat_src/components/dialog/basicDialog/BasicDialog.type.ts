import { ReactNode } from 'react';

export interface BasicDialogProps {
  children: ReactNode;
  width: string;
  isOpen: boolean;
  onClose?: () => void;
  height?: string;
  isVerticalCenter?: boolean;
  isCloseOnBackdropClick?: boolean;
}

export interface ControlDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
