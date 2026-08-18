/**
 * Knowledge Hub articles — full copywriter pieces
 * Vision-first; EDI named as service scope, not protocol laundry lists.
 */

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateIso: string;
  readingMinutes: number;
  excerpt: string;
  sections: ArticleSection[];
  closing: string;
};

/** Explicit commercial scope: DotLinQ is offered within EDI / B2B document exchange. */
export const EDI_SERVICE_SCOPE = {
  title: 'Service scope: EDI',
  short:
    'DotLinQ is designed and offered within the service scope of Electronic Data Interchange (EDI) and B2B partner document exchange.',
  long: 'DotLinQ provides enterprise software and related services in the scope of EDI — enabling organizations to connect trading partners, govern bidirectional document exchange, shape partner formats for enterprise systems, validate commercial documents, and operate network visibility. Our platform mandate is EDI and partner integration; we build for that scope with deliberate clarity.',
  badge: 'EDI service scope',
} as const;

export const ARTICLES: Article[] = [
  {
    slug: 'partner-exchange-product-surface',
    title: 'Partner exchange is a product surface — not a mailbox',
    category: 'Strategy',
    date: 'Aug 12, 2026',
    dateIso: '2026-08-12',
    readingMinutes: 6,
    excerpt:
      'If connectivity, transformation, and monitoring live in three places, your “integration program” is three programs. DotLinQ collapses that fracture for global partner networks.',
    sections: [
      {
        heading: 'The quiet cost of fragmentation',
        paragraphs: [
          'Most enterprises did not choose chaos. They inherited it. One team bought a gateway. Another licensed a mapping tool. Operations built dashboards in a spreadsheet because neither product spoke the language of the dock, the retailer, or the SLA that actually mattered.',
          'On paper, the program looks complete. In practice, every new trading partner becomes a coordination project across three vendors, three UIs, and three definitions of “done.” Leadership hears that integration is strategic. Operators experience it as a scavenger hunt.',
        ],
      },
      {
        heading: 'A mailbox is not a product',
        paragraphs: [
          'Moving a file from one endpoint to another is necessary. It is not sufficient. Commercial exchange is a relationship: identity, authorization, document expectations, transformation into the systems the business runs on, and visibility when something stalls before the customer feels it.',
          'When those concerns live in separate products, the partnership itself has no home. Certificates live in one vault. Maps live in another. Exceptions live in email. The enterprise owns risk without owning a coherent surface.',
        ],
      },
      {
        heading: 'What a product surface actually means',
        paragraphs: [
          'A product surface for partner exchange treats the trading relationship as the unit of design. Pathways, rules, intelligence, and monitoring assemble around that relationship — not around a folder, a queue, or a one-off project ticket.',
          'That shift changes economics. Onboarding becomes a story with a beginning and an end. Exceptions have context. Transformations travel with the partnership instead of rotting in a side tool. The network becomes operable — something a leader can inspect, improve, and trust.',
        ],
      },
      {
        heading: 'Why DotLinQ exists',
        paragraphs: [
          'DotLinQ is built for organizations that run partner ecosystems as commercial infrastructure. We collapse connectivity, governance, transformation, systems handoff, and monitoring into one fabric — so global partner programs stop fracturing into three jobs that never quite meet.',
          'We do this within a clear mandate: Electronic Data Interchange and B2B partner document exchange. The ambition is large. The scope is deliberate.',
        ],
      },
    ],
    closing:
      'If your integration program still feels like three programs, the issue is not effort. It is architecture. Partner exchange deserves a product surface — and DotLinQ is building exactly that.',
  },
  {
    slug: 'in-product-intelligence-economics',
    title: 'Why in-product intelligence changes the economics',
    category: 'Intelligence',
    date: 'Aug 14, 2026',
    dateIso: '2026-08-14',
    readingMinutes: 5,
    excerpt:
      'Every transform that lives outside the partnership UI costs context switches, version drift, and consultant lock-in. Keep the intelligence where the relationship lives.',
    sections: [
      {
        heading: 'The hidden tax on every map',
        paragraphs: [
          'Transformation looks inexpensive until you count the switches. An operator leaves the partnership screen, opens a separate mapping tool, reconstructs context from memory or a ticket, edits a map that may or may not match production, then returns hoping nothing drifted.',
          'Multiply that by retailers, carriers, suppliers, and seasonal partner changes. The tax is not the map. The tax is the distance between the relationship and the intelligence that serves it.',
        ],
      },
      {
        heading: 'Version drift is a commercial risk',
        paragraphs: [
          'When maps live outside the product that runs exchanges, versions multiply quietly. Consultants hold tribal knowledge. A “working” transform in a lab environment fails when a partner tightens a requirement. Nobody can answer, with confidence, which intelligence governs which relationship today.',
          'Enterprises pay for that uncertainty in chargebacks, dock delays, and emergency remapping. The spreadsheet of exceptions becomes the real system of record.',
        ],
      },
      {
        heading: 'Intelligence beside the partnership',
        paragraphs: [
          'DotLinQ Studio keeps transformation inside the same fabric that connects and monitors partners. Design once. Version deliberately. Reuse across similar relationships. Keep the map where operators already work — next to identity, pathways, and lifecycle visibility.',
          'That is not a convenience feature. It is an economic redesign: fewer handoffs, less consultant lock-in, faster change when a partner updates expectations, and a single place to ask “what governs this relationship?”',
        ],
      },
      {
        heading: 'Built for EDI-scoped exchange',
        paragraphs: [
          'Studio exists to serve EDI and B2B document exchange — shaping partner formats for enterprise architecture and composing partner-correct documents on the way out. The vision is executive-level. The craft is the durable work of making commercial documents coherent at scale.',
        ],
      },
    ],
    closing:
      'If transformation still lives in exile, you are paying a tax every week. Bring intelligence home. DotLinQ keeps it where the partnership lives.',
  },
  {
    slug: 'pathways-first-class-capability',
    title: 'Pathways deserve the same dignity as core systems',
    category: 'Operations',
    date: 'Aug 16, 2026',
    dateIso: '2026-08-16',
    readingMinutes: 5,
    excerpt:
      'How trust travels between trading partners is not a forgotten utility. DotLinQ treats connectivity as first-class platform capability.',
    sections: [
      {
        heading: 'Connectivity is not plumbing',
        paragraphs: [
          'Core systems receive executive attention because the business cannot run without them. Partner pathways often receive leftover attention — treated as plumbing until a certificate expires, an acknowledgment never returns, or a retailer’s portal becomes the only source of truth.',
          'That posture is outdated. In modern commerce, how trust travels between organizations is as consequential as how orders land in the system of record. Pathways carry commercial commitment. They deserve product gravity.',
        ],
      },
      {
        heading: 'What first-class looks like',
        paragraphs: [
          'First-class pathways sit beside partner identity, not behind a utility screen. They inherit partnership rules. They surface lifecycle and acknowledgment. They fail loudly with context instead of silently into a folder nobody watches.',
          'Operators should not need three tools to answer a simple question: is this relationship healthy right now? When connectivity is first-class, the answer lives on the same surface as the partnership itself.',
        ],
      },
      {
        heading: 'From utility to operating fabric',
        paragraphs: [
          'DotLinQ Connect treats secure partner pathways as infrastructure with the same seriousness as enterprise configuration. Identity, trust, and delivery expectations assemble with the relationship. Monitoring closes the loop so exceptions are operational events — not archaeological digs.',
          'Together with Studio, Validate, Flow, and Monitor, Connect forms one fabric for EDI-scoped partner exchange: inbound and outbound, governed and visible.',
        ],
      },
    ],
    closing:
      'Give pathways the dignity you already give core systems. Trust between partners is not a side job — it is the network. DotLinQ is built to run it that way.',
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
