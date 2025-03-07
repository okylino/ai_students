import { styled } from '@mui/material';

import { NEUTRAL } from '@/styles/colors';

export const AlertBox = styled('div')<{ color: string }>(({ color }) => ({
  zIndex: 1000,
  position: 'fixed',
  top: '32px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '440px',
  maxWidth: '85%',
  minHeight: '48px',
  border: `2px solid ${color}`,
  borderRadius: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '0px',
  color: `${NEUTRAL[900]}`,
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  gap: '6px',
}));

export const AlertIcon = styled('div')<{ color: string }>(({ color }) => ({
  color: `${color}`,
  width: '40px',
  height: '40px',
}));
