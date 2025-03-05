import { forwardRef } from 'react';

import CustomButton from '@fishing_cat/components/customButton';
import * as $ from '@fishing_cat/components/prototypes/dialog/Dialog.style';
import { DialogProps } from '@fishing_cat/components/prototypes/dialog/Dialog.type';
import { useDialogContext } from '@fishing_cat/context/dialogContext/DialogContext';

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, onClose, actions, showCloseBtn, width }, ref) => {
    const { closeDialog } = useDialogContext();

    return (
      <$.Dialog ref={ref} $width={width}>
        <$.Content>
          {showCloseBtn && (
            <$.CloseImg
              style={{ float: 'right' }}
              onClick={() => {
                onClose();
                closeDialog();
              }}
            />
          )}
          {children}
        </$.Content>
        <$.ButtonWrapper>
          {actions &&
            Object.entries(actions).map(([key, { label, onClick, color, outlined }]) => (
              <CustomButton
                type='button'
                key={key}
                onClick={() => {
                  onClick();
                  closeDialog();
                }}
                color={color}
                outlined={outlined}
                style={{ minWidth: '120px' }}
              >
                {label}
              </CustomButton>
            ))}
        </$.ButtonWrapper>
      </$.Dialog>
    );
  },
);

Dialog.displayName = 'Dialog';

export default Dialog;
