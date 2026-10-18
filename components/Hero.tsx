import Image from 'next/image';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { delay } from '@/lib/motion';

/**
 * Editorial split: the headline block sits on the baseline of the photo so the
 * two read as one composition, with open space above the type.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="border-b border-line bg-base">
      <div className="container-x grid gap-12 pt-12 pb-16 md:pt-16 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-12 lg:pb-14">
        <div className="lg:col-span-7 lg:pb-8">
          <h1 id="hero-heading" className="display text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[clamp(3.2rem,4.5vw,4.9rem)]">
            <span className="intro-line block lg:whitespace-nowrap">
              <span style={delay(1)}>Engineered machinery.</span>
            </span>{' '}
            <span className="intro-line block text-muted lg:whitespace-nowrap">
              <span style={delay(2)}>Built for industry.</span>
            </span>
          </h1>
          <p className="intro mt-7 max-w-[46ch] text-lg leading-relaxed text-muted" style={delay(4)}>
            Screw conveyors, bucket elevators, blenders, hoppers and dust collection systems, designed and fabricated in
            Vadodara since 2014.
          </p>
          <div className="intro mt-10 flex flex-col gap-3 sm:flex-row" style={delay(5)}>
            <a href="#enquiry" className="btn-primary">
              Request a Quote
            </a>
            <a href="#machinery" className="btn-ghost nudge-y">
              Explore Our Machinery
              <ArrowDown size={16} aria-hidden />
            </a>
          </div>
        </div>

        <figure className="max-w-xl lg:col-span-5 lg:max-w-none">
          <div className="overflow-hidden bg-panel">
            <Image
              style={delay(1)}
              src="/images/machinery/u-trough-screw-conveyor.webp"
              alt="Stainless steel U-trough screw conveyor fabricated by Mesigo Eng Fab, with the screw flight visible inside the open trough"
              width={720}
              height={900}
              priority
              sizes="(min-width: 1344px) 520px, (min-width: 1024px) 38vw, 100vw"
              className="intro-media photo-grade aspect-[4/5] w-full object-cover lg:max-h-[min(calc(100dvh-12rem),46rem)]"
            />
          </div>
          <figcaption className="intro tech-label mt-3" style={delay(7)}>Stainless steel U-trough screw conveyor</figcaption>
        </figure>
      </div>
    </section>
  );
}
