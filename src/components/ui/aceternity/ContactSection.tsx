'use client';

import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Reveal } from '@/components/marketing/Motion';
import { SpotlightShader } from '@/components/ui/aceternity/BackgroundBeams';
import { BRAND } from '@/lib/brand';
import { joinWaitlist } from '@/lib/config';
import { trackLandingEvent } from '@/lib/analytics';

type ContactSectionProps = {
  onOpenWaitlist: () => void;
};

/** Aceternity-inspired contact section — submits into waitlist. */
export function ContactSection({ onOpenWaitlist }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');
    try {
      const result = await joinWaitlist({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        notes: message.trim() || undefined,
        source: 'contact',
      });
      void trackLandingEvent('waitlist_submit');
      setStatus('done');
      setFeedback(result.message);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Unable to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 border-b dl-divider dl-surface dl-section">
      <div className="dl-container grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="dl-eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Talk to us about your partner network
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">
            Tell us about your partner ecosystem — retailers, logistics networks, suppliers, systems
            of record — and we will follow up as early access opens on {BRAND.launchDate}.
          </p>
          <ul className="mt-8 space-y-4 text-[14.5px] text-[#475569]">
            <li className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white shadow-sm">
                <Mail className="size-4 text-[var(--brand-azure-deep)]" />
              </span>
              <a className="font-medium text-[var(--brand-ink)] hover:underline" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white shadow-sm">
                <MapPin className="size-4 text-[var(--brand-azure-deep)]" />
              </span>
              <span>Launching {BRAND.launchDate} · Waitlist open now</span>
            </li>
          </ul>
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="mt-8 text-[14px] font-semibold text-[var(--brand-azure-deep)] hover:underline"
          >
            Prefer the quick waitlist dialog →
          </button>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-white p-6 shadow-[0_24px_60px_-36px_rgba(10,22,40,0.35)] sm:p-8">
            <SpotlightShader className="opacity-40" />
            <form onSubmit={onSubmit} className="relative space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[13px] font-medium text-[var(--brand-ink)]">
                  Full name
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-lg border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-[var(--brand-mist)] px-3 text-[14px] outline-none transition focus:border-[var(--brand-azure)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-azure)_25%,transparent)]"
                    placeholder="Alex Morgan"
                  />
                </label>
                <label className="grid gap-1.5 text-[13px] font-medium text-[var(--brand-ink)]">
                  Work email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-lg border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-[var(--brand-mist)] px-3 text-[14px] outline-none transition focus:border-[var(--brand-azure)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-azure)_25%,transparent)]"
                    placeholder="alex@company.com"
                  />
                </label>
              </div>
              <label className="grid gap-1.5 text-[13px] font-medium text-[var(--brand-ink)]">
                Company
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-11 rounded-lg border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-[var(--brand-mist)] px-3 text-[14px] outline-none transition focus:border-[var(--brand-azure)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-azure)_25%,transparent)]"
                  placeholder="Acme Logistics"
                />
              </label>
              <label className="grid gap-1.5 text-[13px] font-medium text-[var(--brand-ink)]">
                What are you integrating?
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="rounded-lg border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-[var(--brand-mist)] px-3 py-2.5 text-[14px] outline-none transition focus:border-[var(--brand-azure)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-azure)_25%,transparent)]"
                  placeholder="Partner onboarding, fulfillment networks, enterprise handoff…"
                />
              </label>
              {feedback ? (
                <p
                  className={
                    status === 'error'
                      ? 'rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700'
                      : 'rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-800'
                  }
                >
                  {feedback}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="dl-btn-primary w-full sm:w-auto"
              >
                {status === 'loading' ? 'Sending…' : 'Join waitlist'}
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
