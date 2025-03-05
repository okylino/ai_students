import * as $ from '@fishing_cat/components/customButton/CustomButton.style';
import { CustomButtonProps } from '@fishing_cat/components/customButton/CustomButton.type';
import COLOR from '@fishing_cat/styles/color';

/** colors provided by CustomBtn */
export const colorMap = {
  green: {
    default: COLOR.TEAL[500],
    hover: COLOR.BLUE[300],
    active: COLOR.BLUE[500],
  },
  grey: {
    default: COLOR.GRAY[800],
    hover: COLOR.GRAY[800],
    active: COLOR.GRAY[900],
  },
  blue: {
    default: COLOR.BLUE[600],
    hover: COLOR.BLUE[700],
    active: COLOR.BLUE[900],
  },
  red: {
    default: COLOR.RED[600],
    hover: COLOR.RED[300],
    active: COLOR.RED[600],
  },
};

/**
 *
 * @returns default blue button
 */
export const CustomButton = ({
  children,
  width,
  disabled,
  loading,
  style,
  type = 'button',
  color = 'blue',
  outlined = false,
  onClick,
}: CustomButtonProps<keyof typeof colorMap>) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
  };

  return (
    <$.BtnStyle
      type={type}
      $width={width}
      $backgroundColor={colorMap[color] || COLOR.NEUTRAL[0]}
      $outlined={outlined}
      $disabled={disabled}
      style={style}
      onClick={handleClick}
    >
      {loading ? <$.Spinner /> : children}
    </$.BtnStyle>
  );
};

export default CustomButton;
