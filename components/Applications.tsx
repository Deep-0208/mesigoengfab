import Image from 'next/image';
import { applications } from '@/data/applications';
import { delay } from '@/lib/motion';

/**
 * Pinned split: the title column stays in view (CSS sticky, lg+) while the
 * industries, set as a two-column grid with rules only between rows, scroll
 * past it. Single column below sm; the title column stacks on top below lg.
 */
export function Applications() {
  return (
    <section id="applications" aria-labelledby="applications-heading" className="section-y border-b border-line bg-base">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24" data-reveal="up">
            <p className="eyebrow">Applications</p>
            <h2 id="applications-heading" className="h2 mt-5">
              Where our machines are used
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted">
              Each industry is listed with the machines we build for it.
            </p>
            <figure className="mt-10 hidden lg:block">
              <div className="overflow-hidden bg-panel">
                <Image
                  src="/images/machinery/cement-screw-conveyor.webp"
                  alt="Blue inclined tubular screw conveyor with feed hopper, fabricated for cement handling"
                  width={600}
                  height={800}
                  sizes="(min-width: 1024px) 28vw, 1px"
                  className="photo-grade aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="tech-label mt-3">Cement screw conveyor</figcaption>
            </figure>
          </div>
        </div>

        <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8 lg:self-start">
          {applications.map((a, i) => (
            <li
              key={a.name}
              data-reveal={i < 2 ? 'up' : 'rule'}
              style={delay(i % 2, 90)}
              className="border-t border-line py-8 first:border-t-0 first:pt-0 sm:nth-2:border-t-0 sm:nth-2:pt-0 lg:py-10"
            >
              <h3 className="display text-[1.6rem] leading-tight md:text-[1.9rem]">{a.name}</h3>
              <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-muted">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
