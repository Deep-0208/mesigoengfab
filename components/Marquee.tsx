'use client';

import { useState } from 'react';
import { Pause, Play } from '@phosphor-icons/react/dist/ssr';

/**
 * Slow typographic strip of the other fabricated equipment. Moves with CSS only;
 * pauses on hover/focus, via this toggle (WCAG 2.2.2), and stops entirely under
 * prefers-reduced-motion. The duplicate run exists only for the seamless loop.
 */
export function Marquee({ items, label }: { items: readonly string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="font-display text-[1.75rem] text-ink md:text-[2.25rem]">{item}</span>
          <span aria-hidden className="mx-8 h-px w-10 bg-steel md:mx-10" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative flex items-center border-y border-line" data-paused={paused}>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? `Resume scrolling list: ${label}` : `Pause scrolling list: ${label}`}
        className="relative z-10 inline-flex size-14 shrink-0 items-center justify-center border-r border-line bg-deep text-muted transition-colors hover:text-accent"
      >
        {paused ? <Play size={16} weight="fill" aria-hidden /> : <Pause size={16} weight="fill" aria-hidden />}
      </button>
      <div className="overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max">
          {run(false)}
          {run(true)}
        </div>
      </div>
    </div>
  );
}
