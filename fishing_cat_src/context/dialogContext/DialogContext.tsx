import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';

import Dialog from '@fishing_cat/components/prototypes/dialog/Dialog';
import {
  Actions,
  DialogContextType,
  DialogProviderProps,
  OpenDialogParams,
} from '@fishing_cat/context/dialogContext/DialogContext.type';

const defaultValue: DialogContextType = {
  openDialog: () => {},
  closeDialog: () => {},
};

const DialogContext = createContext(defaultValue);

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [actions, setActions] = useState<Actions>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<ReactNode>(null);
  const onCloseRef = useRef<() => void>(() => {});
  const showCloseBtnRef = useRef<boolean>(true);
  const widthRef = useRef<string>('auto');

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const openDialog = useCallback(
    ({
      content,
      action = {},
      showCloseBtn = true,
      closeAction = () => closeDialog(),
      width = 'auto',
    }: OpenDialogParams) => {
      setActions(action);
      contentRef.current = content;
      onCloseRef.current = closeAction;
      showCloseBtnRef.current = showCloseBtn;
      widthRef.current = width;
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    [closeDialog],
  );

  const value = useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog],
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        ref={dialogRef}
        onClose={onCloseRef.current}
        actions={actions}
        showCloseBtn={showCloseBtnRef.current}
        width={widthRef.current}
      >
        {contentRef.current}
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
