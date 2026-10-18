/**
 * Company facts. Every value here is taken from a public source checked on
 * 2026-10-18; see docs/verified-facts.md for the source of each line.
 * Do not add claims (certifications, capacity, clients, export markets)
 * without client confirmation.
 */
export const company = {
  name: 'Mesigo Eng Fab',
  legalForm: 'Proprietorship',
  foundingYear: 2014,
  proprietor: 'Dinesh Panchal',
  gstin: '24BZQPP6811A1ZF',
  phoneDisplay: '+91 91064 07607',
  phoneHref: 'tel:+919106407607',
  whatsappNumber: '919106407607',
  indiamartUrl: 'https://www.indiamart.com/mesigoengfab/',
  address: {
    street: 'Plot No. 6 & 7, Nilkanth Industrial Park, Opp. Darshan Hotel',
    locality: 'Por',
    city: 'Vadodara',
    region: 'Gujarat',
    postalCode: '391243',
    country: 'IN',
  },
} as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const defaultWhatsappText = 'Hello Mesigo Eng Fab, I would like to discuss a machinery requirement.';
