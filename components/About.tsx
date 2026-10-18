import { company } from '@/data/company';
import { delay } from '@/lib/motion';

const facts = [
  { label: 'Established', value: String(company.foundingYear) },
  { label: 'Proprietor', value: company.proprietor },
  { label: 'Workshop', value: `${company.address.locality}, ${company.address.city}` },
  { label: 'Constitution', value: company.legalForm },
  { label: 'GSTIN', value: company.gstin },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y border-b border-line bg-base">
      <div className="container-x">
        <h2 id="about-heading" className="sr-only">
          About Mesigo Eng Fab
        </h2>
        <p data-reveal="up" className="display max-w-[30ch] text-[1.9rem] leading-[1.18] text-muted sm:text-[2.4rem] lg:text-[3.1rem]">
          Since {company.foundingYear}, we have designed and fabricated{' '}
          <span className="text-ink">screw conveyors</span>, <span className="text-ink">bucket elevators</span> and{' '}
          <span className="text-ink">dust-control systems</span> for process plants, from our workshop in Por, Vadodara.
        </p>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[58ch] space-y-5 text-lg leading-relaxed text-muted lg:col-span-6" data-reveal="up">
            <p>
              {company.name} is a proprietorship run by {company.proprietor}. Each machine is fabricated to the
              material, layout and capacity the buyer specifies, in stainless steel (SS304) or mild steel, rather than
              picked from a fixed catalogue.
            </p>
            <p>
              Alongside conveying and elevating equipment, the workshop builds ribbon blenders, storage hoppers, rotary
              airlocks, hydraulic baling presses, screw flights and storage tanks.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-8 lg:grid-cols-2">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal="up" style={delay(i + 1, 70)}>
                <dt className="tech-label">{f.label}</dt>
                <dd className="mt-1.5 font-display text-lg text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
