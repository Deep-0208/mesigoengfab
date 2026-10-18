/**
 * Only the production deployment may be indexed. On Vercel this follows
 * VERCEL_ENV; on any other host set SITE_ENV=production for the live site.
 * Previews, staging and local builds get noindex (robots.txt + X-Robots-Tag).
 */
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.SITE_ENV === 'production';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mesigoengfab.com').replace(/\/$/, '');
