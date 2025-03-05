export interface EditableTextFieldProps {
  className?: string;
  defaultValue?: string;
  maxLength?: number;
  onConfirm: (value: string) => void | Promise<void>;
  label?: React.ReactNode;
  placeholder?: string;
}
