'use client';

import { useEffect } from 'react';

/**
 * Marks `[data-reveal]` elements with `data-revealed` as they scroll into view.
 * CSS in globals.css only hides them once `html[data-reveal-ready]` is set, so
 * server-rendered content stays visible without JS. Anything already on screen
 * at mount is revealed immediately (no flash). Skipped under reduced motion.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const fold = window.innerHeight * 0.92;
    for (const el of els) if (el.getBoundingClientRect().top < fold) el.dataset.revealed = '';
    document.documentElement.dataset.revealReady = '';

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.revealed = '';
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.05 },
    );
    for (const el of els) if (!('revealed' in el.dataset)) io.observe(el);

    return () => {
      io.disconnect();
      delete document.documentElement.dataset.revealReady;
    };
  }, []);

  return null;
}
