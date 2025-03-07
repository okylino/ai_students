import { ThemeOptions } from '@mui/material';

import { INVALID, NEUTRAL, TEAL, VALID, VIOLET, YELLOW } from './colors';

const muiThemeConfig = Object.freeze<ThemeOptions>({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 500,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Source Sans 3',
      '-apple-system',
      'system-ui',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#CFCFCF',
          },
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },

  palette: {
    primary: {
      main: VIOLET[700],
      hover: VIOLET[600],
      pressed: VIOLET[800],
      dark: VIOLET[700],
      light: VIOLET[50],
      contrastText: NEUTRAL[0],
    },
    neutral: {
      main: NEUTRAL[500],
      hover: NEUTRAL[200],
      pressed: NEUTRAL[300],
      dark: NEUTRAL[900],
      contrastText: NEUTRAL[900],
    },
    secondary: {
      main: TEAL[600],
      hover: TEAL[500],
      pressed: TEAL[800],
      dark: TEAL[700],
      light: TEAL[50],
      contrastText: NEUTRAL[0],
    },
    yellow: {
      main: YELLOW[500],
      dark: YELLOW[700],
      light: YELLOW[50],
      contrastText: NEUTRAL[0],
    },
    success: {
      main: VALID.DEFAULT,
    },
    error: {
      main: INVALID[600],
    },
    warning: {
      main: YELLOW[500],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default muiThemeConfig;
