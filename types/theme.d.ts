// theme.d.ts (create this file in your project, e.g. in `src/`)
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;  // keep existing
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true; // ✅ add custom breakpoint
  }
}
