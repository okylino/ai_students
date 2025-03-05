import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';
import { BUZZER_STATUS } from '@fishing_cat/enums/buzzerStatus';

export interface BuzzerDialogProps extends Omit<ControlDialogProps, 'setIsOpen'> {
  status: BUZZER_STATUS;
  successNumber: string;
  onBuzzer: () => void;
  onClose: () => void;
}
