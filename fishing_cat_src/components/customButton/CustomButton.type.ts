export interface CustomButtonProps<ColorMapType> {
  children: React.ReactNode;
  width?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
  color?: ColorMapType;
  outlined?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface ColorGroup {
  default: string;
  hover: string;
  active: string;
}

export interface BtnStyleType {
  $color?: string;
  $backgroundColor?: ColorGroup;
  $disabled?: boolean;
  $loading?: boolean;
  $outlined?: boolean;
  $width?: string;
}
