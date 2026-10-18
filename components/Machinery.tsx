import Image from 'next/image';
import { featuredMachinery, otherEquipment } from '@/data/machinery';
import { EnquireButton } from './EnquireButton';
import { Marquee } from './Marquee';
import { delay } from '@/lib/motion';

export function Machinery() {
  const [featured, ...rest] = featuredMachinery;

  return (
    <section id="machinery" aria-labelledby="machinery-heading" className="border-b border-line bg-deep">
      <div className="container-x section-y">
        <h2 id="machinery-heading" className="h2 max-w-[16ch]" data-reveal="up">
          Machinery we fabricate
        </h2>

        {/* Lead machine: the one the assembly video shows. */}
        <article className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="overflow-hidden bg-panel lg:col-span-5" data-reveal="wipe">
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.width}
              height={featured.image.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="photo-grade aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-(--ease-machined) hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col lg:col-span-7 lg:pt-4">
            <h3 className="display text-[2rem] leading-tight md:text-[2.75rem]" data-reveal="up" style={delay(2)}>
              {featured.name}
            </h3>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted" data-reveal="up" style={delay(3)}>
              {featured.summary}
            </p>
            {featured.specs && (
              <dl className="mt-10 grid max-w-xl grid-cols-2 border-t border-line">
                {featured.specs.map((s, i) => (
                  <div
                    key={s.label}
                    data-reveal="up"
                    style={delay(i + 4, 80)}
                    className={`py-5 ${i % 2 === 0 ? 'pr-6' : 'border-l border-line pl-6'} ${i > 1 ? 'border-t border-line' : ''}`}
                  >
                    <dt className="tech-label">{s.label}</dt>
                    <dd className="mt-2 font-display text-xl text-ink md:text-2xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-4 text-sm text-subtle">Ranges as listed in our catalogue; each conveyor is sized to the duty.</p>
            <div className="mt-6">
              <EnquireButton slug={featured.slug} name={featured.name} />
            </div>
          </div>
        </article>

        {/* Supporting machines: horizontal accordion at xl; below that an exact-fit grid
            (sm: 2+2+full-width, lg: wide+1 / 1+1+1). */}
        <div data-reveal="up" className="acc mt-20 grid gap-4 sm:grid-cols-2 md:mt-24 lg:grid-cols-3 sm:[&>*:last-child]:col-span-2 lg:[&>*:first-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
          {rest.map((item) => (
            <article key={item.slug} className="acc-item group flex flex-col overflow-hidden border border-line bg-panel">
              <div className="relative aspect-[4/3] overflow-hidden xl:aspect-auto xl:flex-1">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className={
                    item.image.cutout
                      ? 'object-contain p-6 transition-transform duration-1000 ease-(--ease-machined) group-hover:scale-[1.04] xl:p-8'
                      : 'photo-grade object-cover transition-transform duration-1000 ease-(--ease-machined) group-hover:scale-[1.04]'
                  }
                />
              </div>
              <div className="border-t border-line p-5 lg:p-6 xl:h-[13.5rem] xl:overflow-hidden">
                <h3 className="font-display text-xl leading-snug text-ink">{item.name}</h3>
                <div className="acc-detail xl:min-w-[19rem]">
                  <p className="mt-2 leading-relaxed text-muted">{item.summary}</p>
                  <div className="mt-1">
                    <EnquireButton slug={item.slug} name={item.name} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pb-20 md:pb-28">
        <h3 className="container-x tech-label mb-4">Also fabricated</h3>
        <Marquee items={otherEquipment} label="other fabricated equipment" />
      </div>
    </section>
  );
}
