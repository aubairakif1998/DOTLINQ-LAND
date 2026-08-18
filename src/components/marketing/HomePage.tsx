"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Layers,
  Link2,
  Mail,
  Network,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  Reveal,
  Stagger,
  StaggerItem,
  fadeUp,
  stagger,
} from "@/components/marketing/Motion";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { WaitlistDialog } from "@/components/waitlist/WaitlistDialog";
import { Waitlist1 } from "@/components/waitlist/Waitlist1";
import { LaunchCountdown } from "@/components/waitlist/LaunchCountdown";
import { BackgroundBeams } from "@/components/ui/aceternity/BackgroundBeams";
import { BlogSection } from "@/components/ui/aceternity/BlogSection";
import { FeatureBento } from "@/components/ui/aceternity/FeatureBento";
import { ProductShowcase } from "@/components/ui/aceternity/ProductShowcase";
import { BRAND } from "@/lib/brand";
import { trackLandingEvent } from "@/lib/analytics";
import {
  CAPABILITIES,
  FAQ,
  HOW_IT_WORKS,
  INDUSTRIES,
  REFERENCE_PATH,
  RESULTS,
  VALUE_CARDS,
} from "@/lib/marketing-content";
import { cn } from "@/lib/utils";

const MODULE_ICONS = {
  connect: Link2,
  studio: Layers,
  validate: ShieldCheck,
  flow: Workflow,
  monitor: Activity,
} as const;

const CAPABILITY_ICONS = [
  Network,
  Users,
  Link2,
  Layers,
  Package,
  Activity,
] as const;

function PrimaryCta({
  onClick,
  children = "Join waitlist",
  className,
}: {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn("dl-btn-primary", className)}
      onClick={onClick}
    >
      {children}
      <ArrowRight className="size-4" />
    </button>
  );
}

function GhostCta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={cn("dl-btn-ghost", className)}>
      {children}
    </a>
  );
}

function IndustrySlider({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [index, setIndex] = useState(0);
  const current = INDUSTRIES[index];

  return (
    <div className="dl-card !p-0 overflow-hidden hover:transform-none hover:shadow-[0_1px_2px_rgb(10_22_40_/_0.04)]">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-white">
              {index === 0 ? (
                <Truck className="size-5" />
              ) : (
                <Building2 className="size-5" />
              )}
            </div>
            <div>
              <p className="dl-eyebrow">Industry focus</p>
              <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                {current.title}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 rounded-md transition-colors"
              aria-label="Previous industry"
              onClick={() =>
                setIndex((i) => (i === 0 ? INDUSTRIES.length - 1 : i - 1))
              }
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 rounded-md transition-colors"
              aria-label="Next industry"
              onClick={() => setIndex((i) => (i + 1) % INDUSTRIES.length)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#475569] sm:text-base">
          {current.body}
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {current.points.map((point) => (
            <li
              key={point}
              className="rounded-lg border border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] bg-[var(--brand-mist)] px-3 py-2.5 text-[13px] font-medium text-[var(--brand-ink)]"
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <PrimaryCta onClick={onJoinWaitlist}>Request early access</PrimaryCta>
        </div>
      </div>
    </div>
  );
}

export function MarketingHomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    void trackLandingEvent("page_view");
  }, []);

  const openWaitlist = () => {
    void trackLandingEvent("waitlist_open");
    setWaitlistOpen(true);
  };

  useEffect(() => {
    const openFromHash = () => {
      // #waitlist scrolls to Waitlist1; #contact still opens the dialog
      if (window.location.hash === "#contact") {
        setWaitlistOpen(true);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div id="top" className="marketing-page min-h-screen">
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <SiteHeader onJoinWaitlist={openWaitlist} />

      <main>
        {/* Hero — cinematic dark, Aceternity flash */}
        <section className="relative overflow-hidden border-b border-white/10 dl-hero-dark">
          <BackgroundBeams variant="dark" />
          <div className="dl-container relative flex min-h-[min(90vh,860px)] flex-col items-center justify-center py-24 text-center sm:py-28 lg:py-32">
            <motion.div
              className="mx-auto flex w-full max-w-4xl flex-col items-center"
              variants={reduce ? undefined : stagger}
              initial={reduce ? undefined : "hidden"}
              animate={reduce ? undefined : "show"}
            >
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1.5 text-[11px] font-semibold text-sky-200 shadow-[0_0_24px_-8px_rgba(56,189,248,0.65)]">
                  <CalendarDays className="size-3.5" />
                  Launching {BRAND.launchDate}
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-7 text-[12px] font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                {BRAND.heroEyebrow}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-5 font-bold tracking-tight"
              >
                {/* <span className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-5xl text-transparent sm:text-6xl lg:text-7xl">
                  {BRAND.nameParts.prefix}
                </span>
                <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-sky-400 bg-clip-text text-5xl text-transparent sm:text-6xl lg:text-7xl">
                  {BRAND.nameParts.linq}
                </span> */}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-3xl text-[1.85rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.4rem] lg:text-[2.9rem]"
              >
                {BRAND.heroHeadline}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-[16px] leading-relaxed text-slate-300/90 sm:text-[18px]"
              >
                {BRAND.heroSupport}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
              >
                <PrimaryCta onClick={openWaitlist}>
                  Join the waitlist
                </PrimaryCta>
                <a href="#studios" className="dl-btn-ghost-dark">
                  See the product
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-14 w-full max-w-lg">
                <LaunchCountdown compact />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-[13px] text-slate-400"
              >
                Early access invitations before and after launch.
              </motion.p>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f3f6fb] via-[#f3f6fb]/80 to-transparent" />
        </section>

        {/* Value cards */}
        <section className="dl-surface border-b dl-divider dl-section">
          <div className="dl-container">
            <Stagger className="grid gap-5 md:grid-cols-3">
              {VALUE_CARDS.map((card) => (
                <StaggerItem key={card.title}>
                  <article className="dl-card h-full p-6 sm:p-7">
                    <h2 className="text-[17px] font-bold leading-snug">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#64748B]">
                      {card.body}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <ProductShowcase />

        <FeatureBento />

        {/* Results */}
        <section
          className="dl-section border-b dl-divider bg-white"
          aria-labelledby="results-heading"
        >
          <div className="dl-container">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="dl-eyebrow">Why teams choose DotLinQ</p>
              <h2
                id="results-heading"
                className="mt-3 text-3xl font-bold sm:text-4xl"
              >
                Partner programs fail at the seams. Remove the seams.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-0 border-y dl-divider md:grid-cols-3">
              {RESULTS.map((item, i) => (
                <Reveal
                  key={item.label}
                  delay={i * 0.06}
                  className={cn(
                    "px-6 py-9 text-center md:px-8",
                    i < RESULTS.length - 1 &&
                      "border-b dl-divider md:border-b-0 md:border-r",
                  )}
                >
                  <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-[var(--brand-azure-deep)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-relaxed text-[#475569]">
                {BRAND.outcomePitch}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Platform / Products */}
        <section
          id="platform"
          className="scroll-mt-24 border-b dl-divider bg-white dl-section"
        >
          <div className="dl-container">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="dl-eyebrow">Platform</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Five capabilities. One operating fabric for partner networks.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">
                Connect, Studio, Validate, Flow, and Monitor are not bolted SKUs
                — they are one controlled path from trading partner certificate
                to acknowledgment.
              </p>
            </Reveal>

            <div id="products" className="mt-12 scroll-mt-24">
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {BRAND.modules.map((mod) => {
                  const Icon = MODULE_ICONS[mod.id];
                  return (
                    <StaggerItem key={mod.id}>
                      <article className="dl-card h-full bg-[var(--brand-mist)] p-5 hover:bg-white">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-white">
                          <Icon className="size-5" />
                        </div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                          DotLinQ
                        </p>
                        <h3 className="mt-1 text-[16px] font-bold">
                          {mod.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">
                          {mod.body}
                        </p>
                      </article>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>

            <Reveal className="mt-14">
              <div className="relative overflow-hidden rounded-2xl border border-sky-400/25 bg-gradient-to-br from-[#07111f] via-[#0c1a2e] to-[#0a1628] p-6 shadow-[0_0_60px_-20px_rgba(56,189,248,0.45)] sm:p-10">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-sky-400/20 blur-3xl"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-4 flex items-center gap-2 text-sky-300">
                      <Sparkles className="size-4" />
                      <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
                        The DotLinQ difference
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {BRAND.differentiatorTitle}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-[16px]">
                      {BRAND.differentiatorBody}
                    </p>
                  </div>
                  <PrimaryCta onClick={openWaitlist} className="shrink-0">
                    Get on the list
                  </PrimaryCta>
                </div>
              </div>
            </Reveal>

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((cap, i) => {
                const Icon = CAPABILITY_ICONS[i];
                return (
                  <StaggerItem key={cap.title}>
                    <article className="dl-card h-full p-5 sm:p-6">
                      <Icon className="size-5 text-[var(--brand-azure-deep)]" />
                      <h3 className="mt-3 text-[15px] font-bold">
                        {cap.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-[#64748B]">
                        {cap.body}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Solutions */}
        <section
          id="solutions"
          className="scroll-mt-24 dl-surface border-b dl-divider dl-section"
        >
          <div className="dl-container">
            <Reveal className="max-w-2xl">
              <p className="dl-eyebrow">Solutions</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Bidirectional exchange for real trading partner networks
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">
                {BRAND.shortDescription}
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-5 lg:grid-cols-2">
              <StaggerItem>
                <article className="dl-card h-full p-6 sm:p-8">
                  <h3 className="text-xl font-bold">Inbound intelligence</h3>
                  <p className="mt-1 text-[13px] font-semibold text-[var(--brand-azure-deep)]">
                    Trading partners → DotLinQ → systems of record
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#64748B]">
                    Partner documents arrive on governed pathways, pass
                    structural and business validation, shape into your
                    enterprise model in Studio, and land in your systems of
                    record with an audit trail — not a mystery drop folder.
                  </p>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article className="dl-card h-full p-6 sm:p-8">
                  <h3 className="text-xl font-bold">Outbound precision</h3>
                  <p className="mt-1 text-[13px] font-semibold text-[var(--brand-azure-deep)]">
                    Systems of record → DotLinQ → trading partners
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#64748B]">
                    Operational data becomes partner-correct through the reverse
                    transform, validates before it leaves, transmits on governed
                    pathways, and closes when acknowledgments return.
                  </p>
                </article>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-24 border-b dl-divider bg-white dl-section"
        >
          <div className="dl-container">
            <Reveal className="max-w-2xl">
              <p className="dl-eyebrow">How it works</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                From first certificate to continuous partner exchange
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#475569]">
                {BRAND.longDescription}
              </p>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {HOW_IT_WORKS.map((step) => (
                <StaggerItem key={step.step}>
                  <li className="dl-card flex h-full list-none flex-col bg-[var(--brand-mist)] p-5 hover:bg-white">
                    <span className="text-[12px] font-bold tabular-nums text-[var(--brand-azure-deep)]">
                      {step.step}
                    </span>
                    <h3 className="mt-2 text-[15px] font-bold">{step.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">
                      {step.body}
                    </p>
                  </li>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-10">
              <div className="rounded-xl border dl-divider bg-[var(--brand-mist)] px-5 py-4 sm:px-6">
                <p className="text-[14px] leading-relaxed text-[#475569]">
                  <span className="font-semibold text-[var(--brand-ink)]">
                    Reference path:{" "}
                  </span>
                  {REFERENCE_PATH}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Industry */}
        <section
          id="industry"
          className="scroll-mt-24 dl-surface border-b dl-divider dl-section"
        >
          <div className="dl-container">
            <Reveal className="mb-8 max-w-2xl">
              <p className="dl-eyebrow">Industry</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Built for logistics and retail partner volume
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">
                High-volume bidirectional document ecosystems need more than a
                generic integration brochure. They need a fabric that
                understands SLAs, chargebacks, and dock reality.
              </p>
            </Reveal>
            <Reveal>
              <IndustrySlider onJoinWaitlist={openWaitlist} />
            </Reveal>
          </div>
        </section>

        <BlogSection />

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 dl-surface border-b dl-divider dl-section"
        >
          <div className="dl-container">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <Reveal>
                <p className="dl-eyebrow">Who We Are</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Building the fabric that keeps every partner node speaking
                  clearly
                </h2>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#475569] sm:text-[16px]">
                  <p>{BRAND.brandIdea}</p>
                  <p>{BRAND.mappingStudioPitch}</p>
                  <p className="font-medium text-[var(--brand-ink)]">
                    {BRAND.outcomePitch}
                  </p>
                </div>
                <aside className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--brand-azure)_28%,transparent)] bg-[#E8F4FC]/70 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-azure-deep)]">
                    {BRAND.serviceScope.title}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#334155]">
                    {BRAND.serviceScope.long}
                  </p>
                </aside>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryCta onClick={openWaitlist}>Join waitlist</PrimaryCta>
                  <GhostCta href="#contact">Contact us</GhostCta>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="dl-card p-7 hover:transform-none">
                  <p className="dl-eyebrow">Company signal</p>
                  <ul className="mt-5 space-y-4 text-[14.5px] text-[#475569]">
                    {[
                      ["Founded", "2026"],
                      ["Launch", BRAND.launchDate],
                      ["Thesis", "Partnerships over files"],
                      ["Focus", "EDI & partner networks"],
                      ["Scope", BRAND.serviceScope.badge],
                      ["Status", "Waitlist open"],
                    ].map(([k, v], i, arr) => (
                      <li
                        key={k}
                        className={cn(
                          "flex justify-between gap-4",
                          i < arr.length - 1 && "border-b dl-divider pb-3",
                        )}
                      >
                        <span>{k}</span>
                        <span className="text-right font-semibold text-[var(--brand-ink)]">
                          {v}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-24 border-b dl-divider bg-white dl-section"
        >
          <div className="dl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="dl-eyebrow">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold">
                Straight answers for enterprise teams
              </h2>
              <p className="mt-3 text-[14.5px] text-[#64748B]">
                What DotLinQ is, how it differs from a traditional gateway, and
                why in-product intelligence matters — plus launch timing on{" "}
                {BRAND.launchDate}.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <Accordion
                type="single"
                collapsible
                className="w-full rounded-xl border dl-divider bg-[var(--brand-mist)] px-2"
              >
                {FAQ.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`item-${i}`}
                    className="border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] px-3"
                  >
                    <AccordionTrigger className="text-left text-[15px] font-semibold hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[14.5px] leading-relaxed text-[#475569]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* Shadcnblocks Waitlist 1 — inline email signup */}
        <Waitlist1 className="scroll-mt-24 border-b border-white/10" />
      </main>

      <footer className="relative overflow-hidden bg-[#040914] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(14,165,233,0.18),transparent_60%)]"
          aria-hidden
        />
        <div className="dl-container relative pt-14 pb-8 sm:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <a
                href="#top"
                className="inline-flex rounded-lg bg-white px-3 py-2"
              >
                <BrandLogo size="md" />
              </a>
              <p className="mt-5 text-[14px] leading-relaxed text-white/60">
                The enterprise platform for partner networks — connect, govern,
                and operate global B2B exchange. Launching {BRAND.launchDate}.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={BRAND.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DotLinQ on LinkedIn"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-[var(--brand-azure)] hover:text-[#7DD3FC]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                    aria-hidden
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  aria-label="Email DotLinQ"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-[var(--brand-azure)] hover:text-[#7DD3FC]"
                >
                  <Mail className="size-4" />
                </a>
              </div>
            </div>

            {(
              [
                [
                  "Products",
                  [
                    ["#product", "Product tour"],
                    ["#studios", "Studios"],
                    ["#features", "Features"],
                    ["#products", "Platform modules"],
                    ["#waitlist", "Early access"],
                  ],
                ],
                [
                  "Solutions",
                  [
                    ["#industry", "Logistics"],
                    ["#industry", "Retail"],
                    ["/knowledge", "Knowledge Hub"],
                    [`mailto:${BRAND.email}`, "Contact"],
                  ],
                ],
              ] as const
            ).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7DD3FC]">
                  {heading}
                </p>
                <ul className="mt-4 space-y-2.5 text-[14px] text-white/65">
                  {links.map(([href, label]) => (
                    <li key={label}>
                      {href === "#waitlist" ? (
                        <button
                          type="button"
                          className="transition hover:text-white"
                          onClick={openWaitlist}
                        >
                          {label}
                        </button>
                      ) : (
                        <a className="transition hover:text-white" href={href}>
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7DD3FC]">
                Who We Are
              </p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-white/65">
                <li>
                  <a className="transition hover:text-white" href="#about">
                    About DotLinQ
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-white" href="#faq">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="transition hover:text-white"
                    href={`mailto:${BRAND.email}`}
                  >
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    className="transition hover:text-white"
                    onClick={openWaitlist}
                  >
                    Join waitlist
                  </button>
                </li>
              </ul>
              <button
                type="button"
                className="mt-5 inline-flex h-10 items-center rounded-md bg-[var(--brand-azure)] px-4 text-[13px] font-semibold text-white transition hover:bg-[var(--brand-azure-deep)]"
                onClick={openWaitlist}
              >
                Request early access
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>{BRAND.copyright}. All rights reserved.</p>
            <p className="sm:text-right">{BRAND.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MarketingHomePage;
