import { ReactNode } from 'react';

import { colorMap } from '@fishing_cat/components/customButton/CustomButton';

export interface DialogProviderProps {
  children: ReactNode;
}

export interface Actions {
  [key: string]: { label: string; onClick: () => void; color?: keyof typeof colorMap; outlined?: boolean };
}

export interface OpenDialogParams {
  content: ReactNode;
  action?: Actions;
  showCloseBtn?: boolean;
  closeAction?: () => void;
  width: string;
}

export interface DialogContextType {
  openDialog: (params: OpenDialogParams) => void;
  closeDialog: () => void;
}
