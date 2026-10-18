import type { Metadata, Viewport } from 'next';
import { Outfit, Geist, Geist_Mono } from 'next/font/google';
import { SITE_URL, isIndexable } from '@/lib/env';
import './globals.css';

/**
 * Outfit: display headings (geometric, engineered proportions).
 * Geist: body, navigation, form text.
 * Geist Mono: small technical labels and the video timecode only.
 */
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-outfit' });
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-geist' });
// Not preloaded: it only sets small labels, so it should not compete with the hero image for early bandwidth.
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-geist-mono', preload: false });

const title = 'Screw Conveyor Manufacturer in Vadodara | Mesigo Eng Fab';
const description =
  'Mesigo Eng Fab fabricates SS and MS screw conveyors, bucket elevators, ribbon blenders, hoppers and dust collectors in Vadodara, Gujarat. Request a quote.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Mesigo Eng Fab',
    locale: 'en_IN',
    title,
    description,
    images: [
      {
        url: '/images/og-mesigo-screw-conveyor.jpg',
        width: 1200,
        height: 630,
        alt: 'Assembled stainless steel screw conveyor with blue geared motor drive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/og-mesigo-screw-conveyor.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#111214',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${outfit.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
