/**
 * DotLinQ — brand & product voice
 * Audience: global enterprise operators, supply-chain & commerce leaders
 * Pronunciation: Dot-Link
 * Tone: visionary, calm authority — outcomes over protocol laundry lists
 */
export const BRAND = {
  name: 'DotLinQ',
  pronunciation: 'Dot-Link',
  nameParts: { prefix: 'Dot', linq: 'LinQ' },
  shortName: 'DL',
  slug: 'dotlinq',
  category: 'Enterprise Partner Integration Platform',
  tagline: 'Connect Every Dot. Automate Every Flow.',
  shortTagline: 'Connect Every Dot.',
  launchDate: 'October 30, 2026',
  launchDateShort: 'Oct 30, 2026',
  launchIso: '2026-10-30T00:00:00.000Z',
  launchLabel: 'Product launch',

  heroEyebrow: 'Global commerce · Partner networks · Intelligent exchange',
  heroHeadline: 'The operating system for how the world’s partners do business together.',
  heroDescription:
    'DotLinQ is the enterprise platform that turns fragmented trading relationships into one governed network — so orders, fulfillment, and financial documents move with clarity, control, and confidence across every partner you work with.',
  heroSupport:
    'Built for organizations that run complex partner ecosystems at scale — where a missed handoff is not a technical inconvenience, but a commercial event.',

  brandIdea:
    'Every partner is a commitment. Every exchange is a promise kept or broken. DotLinQ is the fabric that makes those promises coherent — from the first connection to the record in your systems of truth.',

  shortDescription:
    'Global enterprises still run mission-critical commerce through partner networks that were never designed as a single product. DotLinQ replaces that patchwork with one operating fabric for how organizations connect, transform, and operate B2B exchange at scale.',

  longDescription:
    'Leaders responsible for partner ecosystems need more than another connection tool. They need identity that survives audits, pathways that honor commercial SLAs, intelligence that shapes data for the systems the business actually runs on, and visibility when something stalls before the customer feels it. DotLinQ governs partnerships end to end — inbound and outbound — under one set of rules, one surface, one operational truth.',

  mappingStudioPitch:
    'DotLinQ Studio is where partner language becomes enterprise language. Design reusable transformations that travel with each relationship, stay versioned beside the partnership, and remain inside the same product that runs the network — not stranded in a side tool your operators never open.',

  differentiatorTitle: 'Intelligence lives where the partnership lives',
  differentiatorBody:
    'When a partner sends a commercial document, DotLinQ does not merely store a file. It validates intent, shapes data for your architecture, and delivers into the systems that run the business. When your operations raise a fulfillment signal, the reverse path composes what the partner expects — under the same relationship, both directions, full lifecycle.',

  outcomePitch:
    'Faster partner go-live. Data aligned to your architecture. Exceptions visible before finance and operations feel them. A trading network you can run with executive confidence — not apologize for.',

  socialDescription:
    'DotLinQ | The enterprise platform for partner networks — EDI-scoped B2B exchange with clarity.',

  /** Commercial mandate: we provide this service within EDI scope. */
  serviceScope: {
    title: 'Service scope: EDI',
    badge: 'EDI service scope',
    short:
      'DotLinQ is designed and offered within the service scope of Electronic Data Interchange (EDI) and B2B partner document exchange.',
    long: 'DotLinQ provides enterprise software and related services in the scope of EDI — enabling organizations to connect trading partners, govern bidirectional document exchange, shape partner formats for enterprise systems, validate commercial documents, and operate network visibility.',
  },

  copyright: `© ${new Date().getFullYear()} DotLinQ`,
  email: 'support@dotlinq.com',
  invoiceEmail: 'billing@dotlinq.com',
  companyName: 'DotLinQ',
  website: 'https://www.dotlinq.com/',
  social: { linkedin: 'https://www.linkedin.com/company/dotlinq/' },
  assets: {
    logo: '/brand/dotlinq-logo.png?v=9',
    mark: '/brand/dotlinq-mark.png?v=9',
  },
  colors: {
    azure: '#1A8FD6',
    navy: '#0A1628',
    primary: '#1A8FD6',
    ink: '#0F172A',
    slate: '#475569',
    mist: '#F5F8FB',
    background: '#FFFFFF',
  },
  modules: [
    {
      id: 'connect',
      name: 'DotLinQ Connect',
      title: 'Connect',
      body: 'Secure partner pathways as first-class infrastructure — identities, endpoints, and trust configured beside the relationship, not buried in a side utility.',
    },
    {
      id: 'studio',
      name: 'DotLinQ Studio',
      title: 'Studio',
      body: 'Native transformation intelligence that turns partner formats into the data models your enterprise already understands — and back again.',
    },
    {
      id: 'validate',
      name: 'DotLinQ Validate',
      title: 'Validate',
      body: 'Structural and business-rule checks before bad data pollutes your systems — or a flawed document reaches a trading partner.',
    },
    {
      id: 'flow',
      name: 'DotLinQ Flow',
      title: 'Flow',
      body: 'Orchestrated receive and transmit pipelines that honor partnership rules, directionality, and delivery targets at network scale.',
    },
    {
      id: 'monitor',
      name: 'DotLinQ Monitor',
      title: 'Monitor',
      body: 'Lifecycle visibility, retries, and partner performance — so operations sees the network, not a folder of unexplained failures.',
    },
  ],
} as const;

export const dotLinqTheme = {
  colors: {
    brand: {
      navy: '#0A1628',
      primary: '#1A8FD6',
      azure: '#1A8FD6',
      ink: '#0F172A',
    },
    background: {
      primary: '#F5F8FB',
      secondary: '#FFFFFF',
      dark: '#0A1628',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#64748B',
      inverse: '#FFFFFF',
    },
  },
  gradient: 'linear-gradient(135deg, #1A8FD6, #0E6FA8)',
  innovationGradient: 'linear-gradient(135deg, #0A1628, #1A8FD6)',
} as const;

/** @deprecated Use dotLinqTheme */
export const daytaLinqTheme = dotLinqTheme;
