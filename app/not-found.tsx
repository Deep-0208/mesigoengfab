import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Page not found | Mesigo Eng Fab',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="container-x flex min-h-[100dvh] flex-col justify-center py-16">
      <Logo />
      <h1 className="display mt-10 text-4xl">This page does not exist</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-muted">
        The address may have changed. Our screw conveyors, elevators and other machinery are on the homepage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/#machinery" className="btn-primary">
          Explore Our Machinery
        </Link>
        <Link href="/#enquiry" className="btn-ghost">
          Request a Quote
        </Link>
      </div>
    </main>
  );
}
