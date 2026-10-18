import Image from 'next/image';

/**
 * The logo's gear-and-skyline mark at its native 121:160 proportion, with the
 * name set as live text (the source PNG's wordmark is too low-res for a header).
 * Colours follow the logo: neutral "MESIGO", orange "ENG FAB".
 */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image src="/images/mesigo-logo-mark.png" alt="" width={27} height={36} className="h-9 w-auto" priority={priority} />
      <span className="font-display text-[1.05rem] leading-none font-semibold tracking-[0.02em] whitespace-nowrap text-ink">
        MESIGO <span className="text-accent">ENG FAB</span>
      </span>
    </span>
  );
}
