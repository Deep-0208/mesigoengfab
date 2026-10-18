import { company, defaultWhatsappText, whatsappLink } from '@/data/company';
import { featuredMachinery } from '@/data/machinery';
import { navLinks, assemblyLink } from '@/data/navigation';
import { Logo } from './Logo';

const linkClass = 'inline-flex min-h-12 items-center md:min-h-10 text-[0.95rem] text-muted transition-colors hover:text-ink';

export function Footer() {
  const { address } = company;
  return (
    <footer className="bg-deep">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-[38ch] leading-relaxed text-muted">
            Screw conveyors, bucket elevators, hoppers, blenders, dust collectors and baling presses for process plants,
            fabricated in Por, Vadodara.
          </p>
          <a href="#enquiry" className="btn-primary mt-8">
            Request a Quote
          </a>
        </div>

        <nav aria-label="Footer sections" className="lg:col-span-2">
          <h2 className="tech-label">Site</h2>
          <ul className="mt-4">
            {[navLinks[1], assemblyLink, navLinks[2], navLinks[3], navLinks[4]].map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer machinery" className="lg:col-span-3">
          <h2 className="tech-label">Machinery</h2>
          <ul className="mt-4">
            {featuredMachinery.map((m) => (
              <li key={m.slug}>
                <a href="#machinery" className={linkClass}>
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="tech-label">Contact</h2>
          <ul className="mt-4">
            <li>
              <a href={company.phoneHref} className={linkClass}>
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink(defaultWhatsappText)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <address className="mt-4 text-[0.95rem] leading-relaxed not-italic text-muted">
            {address.street},<br />
            {address.locality}, {address.city},<br />
            {address.region} {address.postalCode}, India
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-subtle sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>GSTIN {company.gstin}</p>
        </div>
      </div>
    </footer>
  );
}
