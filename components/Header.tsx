import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/92 backdrop-blur-md supports-[backdrop-filter]:bg-base/80">
      <div className="container-x flex h-16 items-stretch justify-between gap-6">
        <a href="#top" aria-label="Mesigo Eng Fab, back to top" className="flex items-center">
          <Logo priority />
        </a>

        <nav aria-label="Primary" className="hidden lg:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <a href="#enquiry" className="btn-primary hidden min-h-10 px-5 sm:inline-flex">
            Request a Quote
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
