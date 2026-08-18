import type { MetadataRoute } from 'next';
import { getAllArticleSlugs, getArticle } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const articles = getAllArticleSlugs().map((slug) => {
    const article = getArticle(slug);
    return {
      url: `${SITE_URL}/knowledge/${slug}`,
      lastModified: article?.dateIso ? new Date(article.dateIso) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  // Only indexable HTML documents — hash fragments are not separate URLs for crawlers
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/knowledge`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articles,
  ];
}
