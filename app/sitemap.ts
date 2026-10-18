import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/env';

// Single-page site for this phase. Add /machinery/[slug]/ routes here when product pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: new Date('2026-10-18'), changeFrequency: 'monthly', priority: 1 }];
}
