import {Breakpoint, useMediaQuery, useTheme} from '@mui/material';

export const mobileBreakpoint: Breakpoint = 'md';

export function useIsMobile(): boolean {
  const theme = useTheme();
  const permanentDrawerBreakpoint= theme.breakpoints.down(mobileBreakpoint)
  return useMediaQuery(permanentDrawerBreakpoint);
}
