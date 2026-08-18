import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { BRAND } from '@/lib/brand';
import { FAQ } from '@/lib/marketing-content';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const title = {
  default: 'DotLinQ | The Enterprise Platform for Partner Networks',
  template: '%s | DotLinQ',
};

const description =
  'DotLinQ launches October 30, 2026 — the enterprise platform that turns fragmented trading relationships into one governed network. Join the waitlist.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'technology',
  keywords: [
    'DotLinQ',
    'Dot LinQ',
    'Dot-Link',
    'partner integration platform',
    'B2B integration',
    'trading partner network',
    'enterprise integration',
    'supply chain connectivity',
    'partner onboarding',
    'global commerce',
    'logistics integration',
    'retail partner network',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND.name,
    title: 'DotLinQ | Connect Every Dot. Automate Every Flow.',
    description,
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DotLinQ — Enterprise Partner Integration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DotLinQ | Enterprise Partner Integration Platform',
    description:
      'The operating fabric for global partner networks. Launching October 30, 2026. Join the waitlist.',
    images: ['/brand/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/brand/dotlinq-mark.png',
  },
  other: {
    'theme-color': '#0A1628',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'DotLinQ',
      alternateName: ['Dot LinQ', 'Dot-Link', 'DotLink'],
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/dotlinq-logo.png`,
      },
      email: BRAND.email,
      description:
        'DotLinQ is an enterprise partner integration platform for organizations that run complex trading networks — connecting, governing, and operating B2B exchange at global scale.',
      foundingDate: '2026',
      sameAs: [BRAND.social.linkedin],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: BRAND.email,
        url: `${SITE_URL}/#waitlist`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'DotLinQ',
      alternateName: 'DotLinQ Official Site',
      description: 'Official website for DotLinQ — Connect Every Dot. Automate Every Flow.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: 'DotLinQ | Enterprise Partner Integration Platform',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      description,
      inLanguage: 'en-US',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/og-image.png`,
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'DotLinQ',
      alternateName: 'Dot-Link',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Enterprise Integration Platform',
      operatingSystem: 'Web',
      url: `${SITE_URL}/`,
      description:
        'DotLinQ unifies partner connectivity, governance, transformation intelligence, systems handoff, and operational monitoring for global trading networks.',
      featureList: [
        'Secure partner connectivity',
        'Trading partner profiling',
        'Native transformation Studio',
        'Document validation',
        'Enterprise systems handoff',
        'Network monitoring and analytics',
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
        price: '0',
        priceCurrency: 'USD',
        url: `${SITE_URL}/#waitlist`,
        description: 'Request DotLinQ early access',
      },
      provider: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className={`${plusJakarta.className} min-h-full bg-white text-[#0F172A]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
