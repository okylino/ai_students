import * as $ from '@/components/prototypes/CustomButton/CustomButton.style';
import { CustomButtonProps } from '@/components/prototypes/CustomButton/CustomButton.type';

const CustomButton = ({
  width,
  height,
  onClick,
  loading,
  children,
  variant = 'contained',
  color = 'primary',
  type = 'button',
  ...otherProps
}: CustomButtonProps) => (
  <$.CustomButtonStyle
    variant={variant}
    $width={width}
    $height={height}
    disableRipple
    color={color}
    {...otherProps}
    onClick={onClick}
    type={type}
  >
    {loading ? <$.Spinner /> : children}
  </$.CustomButtonStyle>
);
export default CustomButton;
