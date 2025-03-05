import { ButtonProps } from '@mui/material';

export interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  width?: string;
  height?: string;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
}
