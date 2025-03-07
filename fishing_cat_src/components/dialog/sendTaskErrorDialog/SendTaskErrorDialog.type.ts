import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

export interface SendTaskErrorDialogProps extends Omit<ControlDialogProps, 'setIsOpen'> {
  onClose: () => void;
}
