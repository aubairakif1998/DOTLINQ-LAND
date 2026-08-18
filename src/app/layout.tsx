import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { BRAND } from '@/lib/brand';
import { SEO, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.titleDefault,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'technology',
  keywords: [...SEO.keywords],
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    images: [
      {
        url: SEO.ogImage.url,
        secureUrl: SEO.ogImage.secureUrl,
        width: SEO.ogImage.width,
        height: SEO.ogImage.height,
        alt: SEO.ogImage.alt,
        type: SEO.ogImage.type,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.twitterTitle,
    description: SEO.twitterDescription,
    images: [SEO.ogImage.url],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/brand/dotlinq-mark.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/brand/dotlinq-mark.png', type: 'image/png', sizes: '180x180' }],
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#0A1628',
    // Helps older scrapers that ignore og:image
    'image': SEO.ogImage.url,
  },
};

/** Sitewide Organization + WebSite only — page-specific graphs live on each route. */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [organizationJsonLd(), websiteJsonLd()],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className={`${plusJakarta.className} min-h-full bg-white text-[#0F172A]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
