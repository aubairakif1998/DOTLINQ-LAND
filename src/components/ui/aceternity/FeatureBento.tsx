'use client';

import {
  Activity,
  ArrowLeftRight,
  Layers,
  Link2,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { Reveal } from '@/components/marketing/Motion';
import { cn } from '@/lib/utils';

const BENTO = [
  {
    title: 'Real-time partner exchange',
    body: 'Inbound and outbound under the same partnership rules — with lifecycle status you can operate.',
    icon: ArrowLeftRight,
    className: 'md:col-span-2',
    visual: 'exchange',
  },
  {
    title: 'Secure partner pathways',
    body: 'Connectivity treated as product infrastructure — not a forgotten utility.',
    icon: Link2,
    className: '',
    visual: 'channel',
  },
  {
    title: 'Native Studio intelligence',
    body: 'Partner formats shaped for your architecture — versioned beside the relationship, not exiled to another tool.',
    icon: Layers,
    className: '',
    visual: 'map',
  },
  {
    title: 'Validate before impact',
    body: 'Structural and business rules stop bad data before it reaches your systems or your partners.',
    icon: ShieldCheck,
    className: '',
    visual: 'validate',
  },
  {
    title: 'Orchestrated flow',
    body: 'Receive and transmit pipelines that honor expectations, directionality, and delivery targets.',
    icon: Workflow,
    className: '',
    visual: 'flow',
  },
  {
    title: 'Monitor the network',
    body: 'Acknowledgments, retries, exceptions, and partner health — so ops sees the lane, not a log dump.',
    icon: Activity,
    className: 'md:col-span-2',
    visual: 'monitor',
  },
] as const;

function MiniVisual({ kind }: { kind: (typeof BENTO)[number]['visual'] }) {
  if (kind === 'exchange') {
    return (
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {['Order → Enterprise', 'Fulfillment → Partner', 'Invoice validated', 'Status → Operations'].map(
          (row) => (
            <div
              key={row}
              className="rounded-lg border border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] bg-[var(--brand-mist)] px-3 py-2 text-[12px] font-medium text-[var(--brand-ink)]"
            >
              {row}
            </div>
          )
        )}
      </div>
    );
  }
  if (kind === 'map') {
    return (
      <div className="mt-6 space-y-1.5 font-mono text-[11px] text-[#475569]">
        <div className="rounded-md bg-[var(--brand-mist)] px-2.5 py-1.5">partner.po → order.id</div>
        <div className="rounded-md bg-[var(--brand-mist)] px-2.5 py-1.5">shipTo.* → location.*</div>
      </div>
    );
  }
  if (kind === 'monitor') {
    return (
      <div className="mt-6 flex h-16 items-end gap-1.5">
        {[40, 65, 48, 80, 55, 90, 70, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-[linear-gradient(180deg,#1A8FD6,#0A1628)] opacity-80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-6 h-14 rounded-lg border border-dashed border-[color-mix(in_srgb,var(--brand-azure)_35%,transparent)] bg-[linear-gradient(135deg,#E8F4FC,transparent)]" />
  );
}

/** Aceternity-inspired bento feature section. */
export function FeatureBento() {
  return (
    <section id="features" className="scroll-mt-24 border-b dl-divider dl-surface dl-section">
      <div className="dl-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="dl-eyebrow">Platform</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything a global partner network needs — in one fabric
          </h2>
          <p className="mt-4 text-[16px] text-[#475569]">
            From first connection to shaped delivery and acknowledgment, DotLinQ keeps enterprise
            exchange coherent at scale.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {BENTO.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.04} className={item.className}>
                <article
                  className={cn(
                    'dl-card group relative h-full overflow-hidden p-6 sm:p-7',
                    'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgba(14,165,233,0.18),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100'
                  )}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-[0_8px_20px_-10px_rgba(14,165,233,0.8)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">{item.body}</p>
                  <MiniVisual kind={item.visual} />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
