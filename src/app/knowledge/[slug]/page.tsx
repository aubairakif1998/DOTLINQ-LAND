import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/knowledge/KnowledgePages';
import { EDI_SERVICE_SCOPE, getArticle, getAllArticleSlugs } from '@/lib/articles';
import { SEO, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return {
      title: 'Article not found',
      robots: { index: false, follow: false },
    };
  }

  const url = `/knowledge/${article.slug}`;
  const title = article.title;
  const description = article.excerpt;

  return {
    title,
    description,
    keywords: [
      article.category,
      'DotLinQ',
      'EDI',
      'partner networks',
      'B2B integration',
      EDI_SERVICE_SCOPE.badge,
    ],
    authors: [{ name: 'DotLinQ Editorial' }],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | DotLinQ`,
      description,
      type: 'article',
      url: absoluteUrl(url),
      publishedTime: article.dateIso,
      modifiedTime: article.dateIso,
      authors: ['DotLinQ'],
      section: article.category,
      tags: [article.category, 'EDI', 'partner networks'],
      images: [SEO.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DotLinQ`,
      description,
      images: [SEO.ogImage.url],
    },
  };
}

export default async function KnowledgeArticleRoute({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = absoluteUrl(`/knowledge/${article.slug}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.dateIso,
        dateModified: article.dateIso,
        inLanguage: 'en-US',
        articleSection: article.category,
        wordCount: Math.max(
          200,
          article.sections.reduce(
            (n, s) => n + s.paragraphs.join(' ').split(/\s+/).length,
            article.closing.split(/\s+/).length
          )
        ),
        timeRequired: `PT${article.readingMinutes}M`,
        author: {
          '@type': 'Organization',
          name: 'DotLinQ',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'DotLinQ',
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/brand/dotlinq-logo.png'),
          },
        },
        image: [absoluteUrl(SEO.ogImage.url)],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        about: EDI_SERVICE_SCOPE.short,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Knowledge Hub', path: '/knowledge' },
        { name: article.title, path: `/knowledge/${article.slug}` },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePage article={article} />
    </>
  );
}
