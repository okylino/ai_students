import { Chip, styled } from '@mui/material';

export const EventChip = styled(Chip)(({ theme, color = 'primary' }) => ({
  height: '40px',
  borderRadius: '25.6px',
  fontSize: '16px',
  fontWeight: 600,
  padding: '0 4px 0 16px',
  color: color === 'default' ? theme.palette.primary.dark : theme.palette[color].dark,
  backgroundColor: color === 'default' ? theme.palette.primary.light : theme.palette[color].light,
  [theme.breakpoints.down('xs')]: {
    width: 'initial',
    fontSize: '14px',
    fontWeight: 500,
  },
  '& .MuiChip-icon': {
    marginLeft: 0,
    width: '40px',
    height: '40px',
    [theme.breakpoints.down('xs')]: {
      width: '32px',
      height: '32px',
    },
  },
}));

export const EventTag = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  padding: '16px',
  [theme.breakpoints.down('xs')]: {
    padding: '0',
    gap: '6.4px',
  },
}));

export const CurrentCount = styled('span')(({ theme }) => ({
  fontSize: '40px',
  lineHeight: '120%',
  fontWeight: 700,
  [theme.breakpoints.down('xs')]: {
    fontSize: '32px',
  },
}));

export const Description = styled('span')(({ theme }) => ({
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '160%',
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px',
  },
}));

export const Content = styled('div')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});
