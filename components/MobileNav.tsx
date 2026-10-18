'use client';

import { useEffect, useRef, useState } from 'react';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { navLinks } from '@/data/navigation';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex size-12 items-center justify-center text-ink transition-colors hover:text-accent"
      >
        {open ? <X size={24} aria-hidden /> : <List size={24} aria-hidden />}
      </button>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        inert={!open}
        className={`absolute inset-x-0 top-full border-b border-line bg-base transition-[opacity,translate,visibility] duration-300 ease-(--ease-machined) motion-reduce:transition-none ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <ul className="container-x pt-2 pb-6">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={`border-b border-line transition-[opacity,translate] duration-500 ease-(--ease-machined) motion-reduce:transition-none ${
                open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center font-display text-xl text-ink transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a href="#enquiry" onClick={() => setOpen(false)} className="btn-primary w-full">
              Request a Quote
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
