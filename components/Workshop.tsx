import Image from 'next/image';
import { delay } from '@/lib/motion';

// Captions describe what the photos show and what the catalogue lists; no process claims beyond that.
const stages = [
  {
    title: 'Screw flights and shafts',
    body: 'Helical and taper flights are fabricated in mild steel or stainless steel for screw conveyors and screw elevators.',
    image: {
      src: '/images/machinery/taper-screw-flights.webp',
      alt: 'Fabricated taper screw flights on shafts, laid out on the workshop floor',
    },
  },
  {
    title: 'Troughs, casings and frames',
    body: 'U-trough and tubular casings, inlet hoppers and support frames are made to suit each plant’s layout and material.',
    image: {
      src: '/images/machinery/inclined-screw-conveyor-workshop.webp',
      alt: 'Inclined screw conveyor casing under fabrication in the workshop',
    },
  },
  {
    title: 'Drives and assembly',
    body: 'Conveyors, elevators and ash conditioners are supplied with their geared motor drives fitted.',
    image: {
      src: '/images/machinery/ash-conditioner.webp',
      alt: 'Assembled ash conditioner with blue geared motor drive in the fabrication yard',
    },
  },
];

/**
 * Sticky stack of full-bleed photo cards (md+). Each card pins a little lower
 * than the last; as the next card slides up, the previous one recedes (scale +
 * dim) via a CSS scroll-driven animation in globals.css (.stack). Browsers
 * without scroll timelines get the plain sticky stack. Below md: stacked cards,
 * caption under the photo.
 */
export function Workshop() {
  return (
    <section aria-labelledby="workshop-heading" className="section-y border-b border-line bg-deep">
      <div className="container-x">
        <h2 id="workshop-heading" className="h2 max-w-[18ch]" data-reveal="up">
          Built in our workshop
        </h2>

        <ol className="stack mt-14 md:mt-16">
          {stages.map((s, i) => (
            <li
              key={s.title}
              className="mb-6 origin-top md:sticky md:mb-[min(14vh,8rem)] md:last:mb-0"
              style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
            >
              <article className="relative overflow-hidden border border-line bg-panel" data-reveal="up">
                <div
                  className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] md:aspect-auto md:h-[min(66vh,34rem)]"
                  data-reveal="wipe"
                  style={delay(2)}
                >
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1344px) 1264px, 100vw" className="photo-grade object-cover" />
                  {/* Scrim keeps the overlaid caption at AA contrast over any part of the photo (md+ only). */}
                  <div aria-hidden className="absolute inset-0 hidden bg-linear-to-t from-base via-base/55 to-transparent md:block" />
                </div>
                <div className="p-6 sm:p-8 md:absolute md:inset-x-0 md:bottom-0 md:max-w-2xl md:p-12">
                  <h3 className="display text-[1.75rem] leading-tight md:text-[2.5rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-muted md:text-ink/80">{s.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
