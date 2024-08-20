import {Breakpoint, useMediaQuery, useTheme} from '@mui/material';
import {ReadonlySignal, useComputed} from '@preact/signals';
import {useRef} from 'react';

export const mobileBreakpoint: Breakpoint = 'md';

export function useIsMobile(): boolean {
  const theme = useTheme();
  const permanentDrawerBreakpoint = theme.breakpoints.down(mobileBreakpoint);
  return useMediaQuery(permanentDrawerBreakpoint);
}

export function useComputedCached<T>(fn: () => T, isSame: (previous: T, updated: T) => boolean): ReadonlySignal<T> {
  const previousRef = useRef<T | undefined>(undefined);
  return useComputed(() => {
    const updated = fn();
    if (previousRef.current !== undefined && isSame(previousRef.current, updated)) {
      return previousRef.current;
    }
    previousRef.current = updated;
    return updated;
  });
}
