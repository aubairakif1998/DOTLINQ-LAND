import type { Metadata } from 'next';
import { KnowledgeIndex } from '@/components/knowledge/KnowledgePages';
import { ARTICLES, EDI_SERVICE_SCOPE } from '@/lib/articles';
import { SEO, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

const title = 'Knowledge Hub — Partner Network Strategy';
const description = `Strategy notes for leaders who run partner ecosystems. ${EDI_SERVICE_SCOPE.short}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'partner integration',
    'EDI strategy',
    'B2B exchange',
    'trading partner networks',
    'DotLinQ knowledge',
    ...SEO.keywords.slice(0, 8),
  ],
  alternates: { canonical: '/knowledge' },
  openGraph: {
    title: `${title} | DotLinQ`,
    description,
    url: `${SITE_URL}/knowledge`,
    type: 'website',
    images: [SEO.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | DotLinQ`,
    description,
    images: [SEO.ogImage.url],
  },
};

export default function KnowledgeHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/knowledge#collection`,
        url: `${SITE_URL}/knowledge`,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: ARTICLES.map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/knowledge/${article.slug}`),
            name: article.title,
          })),
        },
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Knowledge Hub', path: '/knowledge' },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KnowledgeIndex />
    </>
  );
}
