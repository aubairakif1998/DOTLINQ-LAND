import type { Metadata } from 'next';
import { MarketingHomePage } from '@/components/marketing/HomePage';
import { FAQ } from '@/lib/marketing-content';
import { SEO, homePageJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    absolute: SEO.titleDefault,
  },
  description: SEO.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    url: SITE_URL,
    type: 'website',
    images: [SEO.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.twitterTitle,
    description: SEO.twitterDescription,
    images: [SEO.ogImage.url],
  },
};

export default function Home() {
  const jsonLd = homePageJsonLd(FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingHomePage />
    </>
  );
}
