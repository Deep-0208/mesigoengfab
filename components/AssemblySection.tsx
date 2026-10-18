import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { AssemblyVideo } from './AssemblyVideo';
import { delay } from '@/lib/motion';

// Components visible in the animation, in the order they come together.
const components = [
  'Trough and screw flight',
  'Inlet hopper',
  'Bearing housings',
  'Top cover',
  'Discharge spout',
  'Coupling',
  'Geared motor drive',
];

export function AssemblySection() {
  return (
    <section id="assembly" aria-labelledby="assembly-heading" className="border-b border-line bg-deep">
      <div className="container-x pt-20 md:pt-28">
        <p className="eyebrow" data-reveal="up">Engineering in motion</p>
        <h2 id="assembly-heading" className="h2 mt-5 max-w-[18ch]" data-reveal="up" style={delay(1)}>
          Engineered, component by component
        </h2>
        <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-muted" data-reveal="up" style={delay(2)}>
          Watch an industrial screw conveyor come together, part by part, into a complete material-handling system.
        </p>
      </div>

      {/* Wider than the text column: the machine is the focal point of the page. */}
      <div className="mx-auto mt-12 w-full max-w-[96rem] px-0 sm:px-8 md:mt-14 lg:px-10">
        <div className="border-y border-line sm:border" data-reveal="frame">
          <AssemblyVideo
            src="/videos/mesigo-screw-conveyor-assembly.mp4"
            poster="/images/mesigo-screw-conveyor-poster.webp"
            assembledPoster="/images/mesigo-screw-conveyor-assembled.webp"
            describedBy="assembly-description"
          />
        </div>
      </div>

      <div className="container-x pb-20 md:pb-28">
        <div className="mt-10 grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <h3 className="tech-label text-muted">In the assembly</h3>
            <ol
              id="assembly-description"
              className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem] text-ink sm:grid-cols-3 xl:grid-cols-4"
            >
              {components.map((c, i) => (
                <li key={c} className="border-l border-steel pl-3" data-reveal="up" style={delay(i, 60)}>
                  {c}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-subtle">Illustrative 3D render of a horizontal screw conveyor.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-start xl:flex-row xl:justify-end">
            <a href="#enquiry" className="btn-primary">
              Request a Quote
            </a>
            <a
              href="#machinery"
              className="nudge-x inline-flex min-h-12 items-center gap-2 px-1 text-[0.95rem] font-medium text-ink underline decoration-steel underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              Explore Our Machinery
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
