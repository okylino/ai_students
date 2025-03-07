import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

export interface ChangeTaskDialogProps extends ControlDialogProps {
  onChangeTask: () => void;
}
