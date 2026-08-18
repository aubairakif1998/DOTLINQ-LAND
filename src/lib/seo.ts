import { BRAND } from '@/lib/brand';
import { SITE_URL } from '@/lib/site';

/**
 * EDI positioning used across meta tags, Open Graph, JSON-LD, and llms.txt.
 * Voice: most EDI setups are expensive duct tape — DotLinQ unifies the network.
 */
export const EDI_SEO_PITCH = {
  hook: 'Most EDI setups are just expensive duct tape.',
  problem:
    'AS2 in one place. Maps in another. Monitoring somewhere else. Different tools, different teams, different truths about the same trading partner.',
  solution:
    'DotLinQ (Dot-Link) is an EDI-scoped enterprise platform that turns fragmented partner exchange into one governed network.',
  audience:
    'Built for logistics, retail, suppliers, and teams who treat EDI as commercial infrastructure — not a firefighting side project.',
  capabilities: [
    'Connect partners on secure pathways (without burying trust in a side utility)',
    'Map partner documents into your enterprise model in Studio — visually, versioned, reusable',
    'Run inbound + outbound flows as one controlled Process Flow',
    'Validate before bad data hits your systems (or your partners)',
    'Monitor the full lifecycle — so ops sees the network, not a mystery folder',
  ],
} as const;

const capabilitySummary =
  'Connect secure pathways, map in Studio, run inbound and outbound Process Flows, validate before bad data lands, and monitor the full EDI lifecycle.';

export const SEO = {
  siteName: BRAND.name,
  titleDefault: 'DotLinQ | EDI Platform for Partner Networks (Dot-Link)',
  titleTemplate: '%s | DotLinQ',
  /** Primary meta description (~search snippet length). */
  description:
    'DotLinQ (Dot-Link) replaces expensive EDI duct tape with one governed network — Connect, Studio, Process Flow, Validate, and Monitor. Launching October 30, 2026.',
  /** Longer social / OG copy with the hot-take positioning. */
  ogDescription:
    'Hot take: most EDI setups are expensive duct tape — AS2 here, maps there, monitoring elsewhere. DotLinQ (Dot-Link) is an EDI-scoped enterprise platform that turns fragmented partner exchange into one governed network. Connect, Studio, Process Flow, Validate, Monitor.',
  ogTitle: 'DotLinQ | Connect Every Dot. Automate Every Flow.',
  twitterTitle: 'DotLinQ (Dot-Link) | EDI Platform for Partner Networks',
  twitterDescription:
    'Most EDI setups are expensive duct tape. DotLinQ unifies pathways, Studio mapping, Process Flows, validation, and lifecycle monitoring — for logistics, retail, and suppliers who treat EDI as commercial infrastructure.',
  ogImage: {
    url: '/brand/og-image.png?v=11',
    width: 1200,
    height: 630,
    alt: 'DotLinQ logo — Connect Every Dot. Automate Every Flow.',
  },
  keywords: [
    'DotLinQ',
    'Dot LinQ',
    'Dot-Link',
    'EDI platform',
    'EDI software',
    'EDI duct tape',
    'AS2',
    'EDI mapping',
    'EDI monitoring',
    'B2B EDI',
    'Process Flow EDI',
    'partner integration platform',
    'B2B integration',
    'trading partner network',
    'enterprise integration',
    'supply chain connectivity',
    'partner onboarding',
    'electronic data interchange',
    'logistics EDI',
    'retail EDI',
    'supplier EDI',
    'B2B document exchange',
  ],
  longDescription: [
    EDI_SEO_PITCH.hook,
    EDI_SEO_PITCH.problem,
    `We're fixing that. ${EDI_SEO_PITCH.solution}`,
    `How DotLinQ helps in the EDI world: ${EDI_SEO_PITCH.capabilities.join('; ')}.`,
    EDI_SEO_PITCH.audience,
  ].join(' '),
  capabilitySummary,
} as const;

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'DotLinQ',
    alternateName: ['Dot LinQ', 'Dot-Link', 'DotLink'],
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/brand/dotlinq-logo.png'),
      width: 975,
      height: 328,
    },
    image: [
      absoluteUrl(SEO.ogImage.url.split('?')[0]!),
      absoluteUrl('/brand/dotlinq-logo.png'),
    ],
    email: BRAND.email,
    description: SEO.longDescription,
    foundingDate: '2026',
    sameAs: [BRAND.social.linkedin],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: BRAND.email,
        url: absoluteUrl('/#waitlist'),
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: BRAND.email,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'DotLinQ',
    alternateName: 'DotLinQ Official Site',
    description: SEO.ogDescription,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
}

export function homePageJsonLd(faq: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: SEO.titleDefault,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        description: SEO.longDescription,
        inLanguage: 'en-US',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(SEO.ogImage.url),
        },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'DotLinQ',
        alternateName: ['Dot-Link', 'Dot LinQ'],
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'EDI Enterprise Integration Platform',
        operatingSystem: 'Web',
        url: `${SITE_URL}/`,
        image: absoluteUrl(SEO.ogImage.url),
        description: SEO.longDescription,
        featureList: [...EDI_SEO_PITCH.capabilities],
        audience: {
          '@type': 'Audience',
          audienceType:
            'Logistics, retail, suppliers, and enterprise teams operating EDI as commercial infrastructure',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/PreOrder',
          price: '0',
          priceCurrency: 'USD',
          url: absoluteUrl('/#waitlist'),
          description: 'Request DotLinQ early access',
          validFrom: '2026-01-01',
        },
        provider: { '@id': `${SITE_URL}/#organization` },
        releaseNotes: `Product launch ${BRAND.launchDate}`,
      },
      {
        '@type': 'Event',
        '@id': `${SITE_URL}/#launch`,
        name: 'DotLinQ Product Launch',
        description: `${EDI_SEO_PITCH.solution} ${EDI_SEO_PITCH.audience}`,
        startDate: BRAND.launchIso,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
          '@type': 'VirtualLocation',
          url: absoluteUrl('/#waitlist'),
        },
        organizer: { '@id': `${SITE_URL}/#organization` },
        image: absoluteUrl(SEO.ogImage.url),
        url: absoluteUrl('/#waitlist'),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faq.map((item) => ({
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
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
