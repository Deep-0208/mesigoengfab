'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/data/navigation';

/** Desktop section links with an active state driven by IntersectionObserver (no scroll listeners). */
export function NavLinks() {
  const [active, setActive] = useState<string>('top');

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section is "current" while it crosses a thin band 35-45% down the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <ul className="flex h-full items-stretch">
      {navLinks.map((link) => {
        const current = active === link.id;
        return (
          <li key={link.href} className="flex">
            <a
              href={link.href}
              aria-current={current ? 'location' : undefined}
              className={`relative inline-flex items-center px-3.5 text-[0.9rem] whitespace-nowrap transition-colors duration-300 after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-500 after:ease-(--ease-machined) ${
                current ? 'text-ink after:scale-x-100' : 'text-muted after:scale-x-0 hover:text-ink'
              }`}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
