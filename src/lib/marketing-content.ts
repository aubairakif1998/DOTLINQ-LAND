/** Site navigation, section copy, and FAQ — global enterprise partner-network voice */

export const NAV = {
  products: {
    label: 'Products',
    href: '#products',
    columns: [
      {
        heading: 'Platform modules',
        links: [
          {
            title: 'DotLinQ Connect',
            description: 'Secure pathways with partner identity at the center',
            href: '#products',
          },
          {
            title: 'DotLinQ Studio',
            description: 'Transformation intelligence beside every relationship',
            href: '#products',
          },
          {
            title: 'DotLinQ Validate',
            description: 'Stop bad data before it reaches systems or partners',
            href: '#products',
          },
          {
            title: 'DotLinQ Flow',
            description: 'Inbound & outbound orchestration by partnership',
            href: '#products',
          },
          {
            title: 'DotLinQ Monitor',
            description: 'Lifecycle, exceptions & partner health in one view',
            href: '#products',
          },
        ],
      },
      {
        heading: 'Capabilities',
        links: [
          {
            title: 'Partner integration fabric',
            description: 'Connectivity, intelligence, systems & ops in one surface',
            href: '#platform',
          },
          {
            title: 'Enterprise system handoff',
            description: 'Business-ready data into the systems you already run',
            href: '#platform',
          },
          {
            title: 'Trading partner network',
            description: 'Profiles, partnerships & governed pathways',
            href: '#solutions',
          },
        ],
      },
    ],
  },
  solutions: {
    label: 'Solutions',
    href: '#solutions',
    columns: [
      {
        heading: 'By business outcome',
        links: [
          {
            title: 'Partner onboarding at scale',
            description: 'Go live with identity, pathways & intelligence as one story',
            href: '#solutions',
          },
          {
            title: 'Bidirectional exchange',
            description: 'Receive and transmit under shared partnership rules',
            href: '#how-it-works',
          },
          {
            title: 'Exception & SLA visibility',
            description: 'See risk before operations or finance feel it',
            href: '#solutions',
          },
          {
            title: 'Transformation without sprawl',
            description: 'Keep intelligence inside the integration fabric',
            href: '#platform',
          },
        ],
      },
    ],
  },
  industry: {
    label: 'Industry',
    href: '#industry',
    columns: [
      {
        heading: 'Where DotLinQ focuses',
        links: [
          {
            title: 'Logistics & fulfillment',
            description: 'Shipment, fulfillment & status at network scale',
            href: '#industry',
          },
          {
            title: 'Retail & suppliers',
            description: 'Order to fulfillment to settlement with partnership discipline',
            href: '#industry',
          },
          {
            title: 'Global partner connectivity',
            description: 'Unify partners, pathways & systems of record',
            href: '#industry',
          },
        ],
      },
    ],
  },
  knowledge: {
    label: 'Knowledge Hub',
    href: '/knowledge',
    columns: [
      {
        heading: 'For integration leaders',
        links: [
          {
            title: 'Partner exchange is a product surface',
            description: 'Why fragmentation becomes three programs',
            href: '/knowledge/partner-exchange-product-surface',
          },
          {
            title: 'In-product intelligence economics',
            description: 'Keep transforms where the relationship lives',
            href: '/knowledge/in-product-intelligence-economics',
          },
          {
            title: 'Pathways as first-class capability',
            description: 'Connectivity with the dignity of core systems',
            href: '/knowledge/pathways-first-class-capability',
          },
          {
            title: 'All articles',
            description: 'Browse the Knowledge Hub',
            href: '/knowledge',
          },
        ],
      },
    ],
  },
  about: {
    label: 'Who We Are',
    href: '#about',
    columns: [
      {
        heading: 'Company',
        links: [
          {
            title: 'About DotLinQ',
            description: 'Building the fabric for how global partners exchange',
            href: '#about',
          },
          {
            title: 'Contact us',
            description: 'Talk with the DotLinQ team',
            href: '#waitlist',
          },
          {
            title: 'Launch — October 30, 2026',
            description: 'Join the waitlist before early access opens',
            href: '#waitlist',
          },
        ],
      },
    ],
  },
} as const;

export const TRUST_STRIP = [
  'Enterprise-grade connectivity',
  'Bidirectional by design',
  'In-product transformation',
  'Systems of record handoff',
  'Network-wide visibility',
] as const;

export const RESULTS = [
  {
    value: 'One fabric',
    label: 'Instead of five vendors',
    body: 'Connectivity, partner identity, transformation, system handoff, and monitoring stop living in separate contracts and separate UIs.',
  },
  {
    value: 'Both directions',
    label: 'Under one partnership',
    body: 'What you receive and what you send share identity, policy, and operational visibility — one relationship, both ways.',
  },
  {
    value: 'Your architecture',
    label: 'Not theirs forever',
    body: 'Partner formats become the data model your enterprise already runs on — shaped once, reused across the network.',
  },
] as const;

export const VALUE_CARDS = [
  {
    title: 'Onboard the relationship — not a checklist of tools',
    body: 'Partner identity, secure pathways, document expectations, and transformation assemble as one go-live path. Global onboarding stops being a scavenger hunt across portals.',
  },
  {
    title: 'End transformation exile',
    body: 'Intelligence belongs in Studio — versioned next to the partnership. No export to a disconnected stack your operators never trust.',
  },
  {
    title: 'Operate the exchange, not the aftermath',
    body: 'See lifecycle, exceptions, and partner health while work is still moving — before an empty dock or a commercial dispute becomes the notification.',
  },
] as const;

export const CAPABILITIES = [
  {
    title: 'Connectivity as enterprise infrastructure',
    body: 'Production pathways with the same seriousness as core systems config — identities, endpoints, and trust inside the product.',
  },
  {
    title: 'Trading partner master data',
    body: 'Every counterpart gets an authoritative profile. Partnerships inherit identity, pathways, and rules instead of reinventing them per project.',
  },
  {
    title: 'Partnership governance',
    body: 'What can be exchanged, in which direction, and under which rules is explicit — so commercial documents process intentionally.',
  },
  {
    title: 'Native Studio intelligence',
    body: 'Bidirectional transforms between partner formats and enterprise models — designed once, reused across similar partners, retained in-product.',
  },
  {
    title: 'Systems of record integration',
    body: 'Ingress of business-ready payloads; egress composed from operational systems with partner-correct documents on the way out.',
  },
  {
    title: 'Monitoring for network operators',
    body: 'Exchange state, exceptions, and partner performance — the pulse of your B2B network, not a spreadsheet graveyard.',
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Establish the lane',
    body: 'Stand up secure pathways and trading partner records that define how each counterpart is authorized to exchange.',
  },
  {
    step: '02',
    title: 'Bind the partnership',
    body: 'Attach document expectations and directionality so every exchange inherits policy — not tribal knowledge in email threads.',
  },
  {
    step: '03',
    title: 'Shape the intelligence',
    body: 'In Studio, map partner formats to your architecture and back. Version it. Reuse it across similar partners.',
  },
  {
    step: '04',
    title: 'Run both directions',
    body: 'Validate, orchestrate, and deliver into systems on ingress; compose and transmit on egress with acknowledgments tracked.',
  },
  {
    step: '05',
    title: 'Operate continuously',
    body: 'Monitor lifecycle and partner health. Retry with context. Improve transforms where exceptions cluster.',
  },
] as const;

export const INDUSTRIES = [
  {
    title: 'Logistics & fulfillment',
    body: 'Carriers and fulfillment networks run on shipment, status, and settlement signals under unforgiving SLAs. DotLinQ gives you partner-specific lanes, intelligence into your operational systems, and monitoring that shows which relationship is at risk before the dock does.',
    points: [
      'Bidirectional partner exchange at scale',
      'Pathways that survive partner audits',
      'Clean handoff into operational systems',
    ],
  },
  {
    title: 'Retail & suppliers',
    body: 'Retailer–supplier networks punish fragmentation. A mis-shaped order becomes a chargeback; a missing fulfillment signal becomes empty shelves. DotLinQ profiles every trading partner, governs partnerships, and keeps transformation inside the same surface that runs the network — so commercial documents stay coherent from commitment to warehouse.',
    points: [
      'Order → fulfillment → settlement with shared policy',
      'Partner identity that scales beyond one banner',
      'Data aligned to merchandising & order systems',
    ],
  },
] as const;

export const KNOWLEDGE = [
  {
    title: 'Partner exchange is a product surface — not a mailbox',
    body: 'If connectivity, transformation, and monitoring live in three places, your “integration program” is three programs. DotLinQ collapses that fracture for global partner networks.',
    href: '/knowledge/partner-exchange-product-surface',
  },
  {
    title: 'Why in-product intelligence changes the economics',
    body: 'Every transform that lives outside the partnership UI costs context switches, version drift, and consultant lock-in. Keep the intelligence where the relationship lives.',
    href: '/knowledge/in-product-intelligence-economics',
  },
  {
    title: 'Pathways deserve the same dignity as core systems',
    body: 'How trust travels between trading partners is not a forgotten utility. DotLinQ treats connectivity as first-class platform capability.',
    href: '/knowledge/pathways-first-class-capability',
  },
] as const;

export const FAQ = [
  {
    q: 'Why replace typical EDI duct-tape setups?',
    a: 'Most EDI setups are just expensive duct tape — AS2 in one place, maps in another, monitoring somewhere else. Different tools, different teams, different truths about the same trading partner. DotLinQ (Dot-Link) is an EDI-scoped enterprise platform that turns fragmented partner exchange into one governed network: Connect secure pathways, map in Studio, run inbound and outbound Process Flows, validate before bad data lands, and monitor the full lifecycle.',
  },
  {
    q: 'What is DotLinQ’s service scope?',
    a: 'DotLinQ is designed and offered within the service scope of Electronic Data Interchange (EDI) and B2B partner document exchange. We connect trading partners, govern bidirectional exchange, shape formats for enterprise systems, validate commercial documents, and operate network visibility — under that EDI mandate.',
  },
  {
    q: 'What is DotLinQ?',
    a: 'DotLinQ (Dot-Link) is an enterprise partner integration platform for organizations that run complex trading networks. It unifies secure connectivity, partner profiling, partnership governance, validation, native transformation Studio, systems handoff, and operational monitoring — inbound and outbound — within the scope of EDI.',
  },
  {
    q: 'How is DotLinQ different from a traditional gateway?',
    a: 'Gateways primarily move files. DotLinQ owns the trading relationship: partner identity, pathway bindings, bidirectional intelligence into your enterprise architecture, and lifecycle visibility. The document is the payload; the partnership is the product.',
  },
  {
    q: 'Does DotLinQ support outbound as well as inbound?',
    a: 'Yes. Bidirectional by design. Documents received into your estate and documents originated from your operational systems travel under the same partnerships, pathways, and transformation discipline.',
  },
  {
    q: 'Who is DotLinQ built for?',
    a: 'Logistics, retail, suppliers, and teams who treat EDI as commercial infrastructure — not a firefighting side project. Enterprises and operators running partner ecosystems where exchange is core to how the business runs.',
  },
  {
    q: 'What is DotLinQ Studio?',
    a: 'An embedded transformation workspace for bidirectional maps between partner formats and your enterprise models. Designed once, reused across relationships, retained inside the same product that runs exchanges.',
  },
  {
    q: 'When does DotLinQ launch?',
    a: 'DotLinQ launches October 30, 2026. Join the waitlist now for early access invitations around launch.',
  },
  {
    q: 'Is DotLinQ generally available?',
    a: 'DotLinQ is in active development ahead of the October 30, 2026 launch. Join the waitlist for early access invitation. Live demos are not offered at this stage.',
  },
] as const;

export const REFERENCE_PATH =
  'A partner sends a commercial order → DotLinQ validates and shapes it for your architecture → your systems of record update. Later, operations raises a fulfillment signal → Studio composes what the partner expects → transmit on the governed pathway → Monitor records delivery and acknowledgment. Same partnership. Both directions. No black box.';
