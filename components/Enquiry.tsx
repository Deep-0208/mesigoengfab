import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { company, defaultWhatsappText, whatsappLink } from '@/data/company';
import { EnquiryForm } from './EnquiryForm';
import { delay } from '@/lib/motion';

export function Enquiry() {
  const { address } = company;
  const contactLink =
    'inline-flex min-h-12 items-center gap-2 font-display text-xl text-ink transition-colors hover:text-accent md:text-2xl';

  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="section-y border-b border-line bg-panel">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal="up">
          <h2 id="enquiry-heading" className="h2">
            Let’s discuss your machinery requirements
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
            Tell us the material, capacity and layout. We will come back with a configuration and quotation.
          </p>

          <dl className="mt-12 grid gap-7 border-t border-line pt-8">
            <div>
              <dt className="tech-label">Phone</dt>
              <dd>
                <a href={company.phoneHref} className={contactLink}>
                  {company.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tech-label">WhatsApp</dt>
              <dd>
                <a href={whatsappLink(defaultWhatsappText)} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  Chat on WhatsApp
                  <ArrowUpRight size={18} aria-hidden />
                </a>
              </dd>
            </div>
            <div>
              <dt className="tech-label">Workshop</dt>
              <dd>
                <address className="mt-2 leading-relaxed not-italic text-muted">
                  {address.street},<br />
                  {address.locality}, {address.city}, {address.region} {address.postalCode}
                </address>
              </dd>
            </div>
            <div>
              <dt className="tech-label">Catalogue</dt>
              <dd>
                <a
                  href={company.indiamartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 text-ink underline decoration-steel underline-offset-[6px] transition-colors hover:decoration-accent"
                >
                  Mesigo Eng Fab on IndiaMART
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7" data-reveal="up" style={delay(2)}>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
