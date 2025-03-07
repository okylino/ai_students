import * as $ from '@/components/prototypes/BasicDialog/BasicDialog.style';
import { BasicDialogProps } from '@/components/prototypes/BasicDialog/BasicDialog.type';

export default function BasicDialog({
  children,
  width,
  isOpen,
  height = 'auto',
  isVerticalCenter = false,
  style,
  mobileWidth = 'auto',
  ...otherProps
}: BasicDialogProps) {
  return (
    <$.CustomDialog
      style={style}
      $width={width}
      $height={height}
      $mobileWidth={mobileWidth}
      $isVerticalCenter={isVerticalCenter}
      open={isOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      {...otherProps}
    >
      {children}
    </$.CustomDialog>
  );
}
