import { company } from '@/data/company';
import { SITE_URL } from './env';

/**
 * Organization + WebSite only. A LocalBusiness subtype is deliberately left out
 * until the client confirms the workshop address (public listings disagree) and
 * opening hours. No ratings or reviews are published.
 */
export function homepageJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: company.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/mesigo-eng-fab-logo.png`,
        image: `${SITE_URL}/images/og-mesigo-screw-conveyor.jpg`,
        foundingDate: String(company.foundingYear),
        founder: { '@type': 'Person', name: company.proprietor },
        telephone: '+91-91064-07607',
        taxID: company.gstin,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: `${company.address.locality}, ${company.address.city}`,
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.country,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-91064-07607',
          contactType: 'sales',
          areaServed: 'IN',
        },
        sameAs: [company.indiamartUrl, 'https://www.tradeindia.com/mesigo-eng-fab-17474743/'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: company.name,
        inLanguage: 'en-IN',
        publisher: { '@id': orgId },
      },
    ],
  };
}
