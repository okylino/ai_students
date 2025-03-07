import '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    yellow: true;
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true;
  }
  interface Palette {
    neutral: Palette['primary'];
    yellow: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    yellow?: PaletteOptions['primary'];
    valid?: Palette['primary'];
    inValid?: Palette['primary'];
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteColor {
    hover?: string;
    pressed?: string;
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    hover?: string;
    pressed?: string;
    lighter?: string;
  }
}
