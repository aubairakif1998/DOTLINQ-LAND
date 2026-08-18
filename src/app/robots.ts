import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/aubairadmin', '/aubairadmin/', '/api/', '/api'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/knowledge', '/llms.txt'],
        disallow: ['/aubairadmin', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/knowledge', '/llms.txt'],
        disallow: ['/aubairadmin', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
