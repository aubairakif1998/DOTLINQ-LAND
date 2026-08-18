import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/knowledge/KnowledgePages';
import { EDI_SERVICE_SCOPE, getArticle, getAllArticleSlugs } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/knowledge/${article.slug}` },
    openGraph: {
      title: `${article.title} | DotLinQ`,
      description: article.excerpt,
      type: 'article',
      url: `${SITE_URL}/knowledge/${article.slug}`,
      publishedTime: article.dateIso,
    },
  };
}

export default async function KnowledgeArticleRoute({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateIso,
    author: { '@type': 'Organization', name: 'DotLinQ' },
    publisher: { '@type': 'Organization', name: 'DotLinQ' },
    mainEntityOfPage: `${SITE_URL}/knowledge/${article.slug}`,
    about: EDI_SERVICE_SCOPE.short,
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
