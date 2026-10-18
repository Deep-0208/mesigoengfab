import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AssemblySection } from '@/components/AssemblySection';
import { About } from '@/components/About';
import { Machinery } from '@/components/Machinery';
import { Applications } from '@/components/Applications';
import { Workshop } from '@/components/Workshop';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';
import { homepageJsonLd } from '@/lib/jsonld';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-3 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="w-full max-w-full overflow-x-clip">
        <Hero />
        <AssemblySection />
        <About />
        <Machinery />
        <Applications />
        <Workshop />
        <Enquiry />
      </main>
      <Footer />
      <RevealOnScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
