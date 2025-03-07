import { Button, ButtonProps, styled } from '@mui/material';
import { Theme } from '@mui/system';

import { NEUTRAL } from '@/styles/colors';

export const Spinner = styled(`div`)({
  width: '20px',
  height: '20px',
  border: `2px solid ${NEUTRAL[0]}`,
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  boxSizing: 'border-box',
  animation: 'rotation 1s linear infinite',

  '@keyframes rotation': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});

interface CustomButtonStyleProps extends ButtonProps {
  $width: string | undefined;
  $height: string | undefined;
}

export const CustomButtonStyle = styled(Button)<CustomButtonStyleProps>(({
  theme,
  color = 'primary',
  $width,
  $height,
  variant,
}) => {
  const paletteColor = color === 'inherit' ? ({} as Theme['palette']) : theme.palette[color];
  const isOutlined = variant === 'outlined' || color === 'neutral';
  return {
    width: $width,
    height: $height,
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '16px',
    padding: '7px 10px',
    color: color === 'neutral' ? paletteColor.contrastText : undefined,
    borderColor: paletteColor.main,
    '&:hover': {
      backgroundColor: paletteColor.hover,
      color: paletteColor.contrastText,
    },
    '&:active': {
      backgroundColor: paletteColor.pressed,
      color: paletteColor.contrastText,
    },
    '&.Mui-disabled': {
      color: isOutlined ? NEUTRAL[500] : paletteColor.contrastText,
      backgroundColor: isOutlined ? NEUTRAL[0] : NEUTRAL[500],
    },
  };
});
