import { ReactNode } from 'react';

import { Actions } from '@fishing_cat/context/dialogContext/DialogContext.type';

export interface DialogProps {
  children: ReactNode;
  onClose: () => void;
  actions: Actions;
  showCloseBtn: boolean;
  width: string;
}
