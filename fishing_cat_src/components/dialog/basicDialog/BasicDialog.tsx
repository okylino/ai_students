import * as $ from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import { BasicDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

export default function BasicDialog({
  children,
  width,
  isOpen,
  onClose = () => {},
  height = 'auto',
  isVerticalCenter = false,
  isCloseOnBackdropClick = true,
}: BasicDialogProps) {
  const handleCloseDialog = () => {
    if (!isCloseOnBackdropClick) return;
    onClose();
  };

  return (
    <$.CustomDialog
      $width={width}
      $height={height}
      $isVerticalCenter={isVerticalCenter}
      open={isOpen}
      onClose={handleCloseDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {children}
    </$.CustomDialog>
  );
}
