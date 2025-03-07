import { styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';

export const CustomDialog = styled(Dialog)<{
  $mobileWidth: string;
  $width: string;
  $height: string;
  $isVerticalCenter: boolean;
}>(({ theme, $mobileWidth, $width, $height, $isVerticalCenter }) => ({
  '& .MuiPaper-root': {
    borderRadius: '16px',
    width: '100%',
    maxWidth: $width,
    minHeight: $height,
    padding: '24px',
    margin: '12px',
    ...($isVerticalCenter && {
      justifyContent: 'center',
    }),
    [theme.breakpoints.down('xs')]: {
      maxWidth: $mobileWidth,
    },
  },
}));
