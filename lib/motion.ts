import type { CSSProperties } from 'react';

/** Stagger helper for `[data-reveal]` and `.intro` elements: `style={delay(i)}` sets `--d`. */
export const delay = (i: number, step = 90): CSSProperties => ({ ['--d' as string]: `${i * step}ms` });
