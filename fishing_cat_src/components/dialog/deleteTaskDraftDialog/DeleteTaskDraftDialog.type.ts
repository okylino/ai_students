import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

export interface DeleteTaskDraftDialogProps extends ControlDialogProps {
  onDeleteTaskDraft: () => void;
}
