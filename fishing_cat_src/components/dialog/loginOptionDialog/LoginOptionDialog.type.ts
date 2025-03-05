import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

export interface LoginOptionDialogProps extends ControlDialogProps {
  onGuestJoin: () => void;
}
