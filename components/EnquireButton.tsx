'use client';

import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const ENQUIRE_EVENT = 'mesigo:enquire';

/**
 * Jumps to the enquiry form and preselects the machinery category.
 * Without JavaScript it is still a plain #enquiry link.
 */
export function EnquireButton({ slug, name }: { slug: string; name: string }) {
  return (
    <a
      href="#enquiry"
      onClick={() => window.dispatchEvent(new CustomEvent(ENQUIRE_EVENT, { detail: slug }))}
      className="nudge-x inline-flex min-h-12 items-center gap-2 text-[0.95rem] font-medium text-accent transition-colors hover:text-accent-hover"
    >
      Enquire about {name.toLowerCase()}
      <ArrowRight size={16} aria-hidden />
    </a>
  );
}
