'use client';

import Image from 'next/image';
import { Activity, Layers, Workflow } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/aceternity/BackgroundBeams';
import { ContainerScroll } from '@/components/ui/aceternity/ContainerScroll';
import { StudioHorizontalTour } from '@/components/ui/aceternity/StudioHorizontalTour';
import { Reveal } from '@/components/marketing/Motion';

export const PRODUCT_SHOTS = {
  processFlow: {
    src: '/product/process-flow.png',
    alt: 'DotLinQ Configuration Studio — Process Flow visual pipeline',
  },
  mappingStudio: {
    src: '/product/mapping-studio.png',
    alt: 'DotLinQ Mapping Studio — visual transformation canvas from partner formats to enterprise schemas',
  },
  monitoring: {
    src: '/product/inbound-monitoring.png',
    alt: 'DotLinQ Monitoring Studio — inbound transaction lifecycle visibility',
  },
} as const;

function Shot({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={3010}
      height={1508}
      quality={95}
      priority={priority}
      className={className ?? 'h-full w-full bg-white object-contain object-top'}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 94vw, 1400px"
    />
  );
}

/** Product showcase: Container Scroll + horizontal studio stepper/projection. */
export function ProductShowcase() {
  const studioSteps = [
    {
      id: 'configuration',
      step: '01',
      label: 'Configuration',
      title: 'Process Flows',
      description:
        'Design the partnership path as a governed visual pipeline — receive, validate, transform, and deliver in one operating surface your teams can actually run.',
      icon: Workflow,
      content: (
        <Shot src={PRODUCT_SHOTS.processFlow.src} alt={PRODUCT_SHOTS.processFlow.alt} />
      ),
    },
    {
      id: 'mapping',
      step: '02',
      label: 'Mapping',
      title: 'Mapping Studio',
      description:
        'Shape partner language into your enterprise model on a visual canvas. Transformations stay versioned beside the relationship — ready for network scale.',
      icon: Layers,
      content: (
        <Shot
          src={PRODUCT_SHOTS.mappingStudio.src}
          alt={PRODUCT_SHOTS.mappingStudio.alt}
          priority
        />
      ),
    },
    {
      id: 'monitoring',
      step: '03',
      label: 'Monitoring',
      title: 'Lifecycle truth',
      description:
        'Follow every exchange through the pipeline with context. Exceptions surface while work is still moving — so operations sees the network, not a mystery folder.',
      icon: Activity,
      content: (
        <Shot src={PRODUCT_SHOTS.monitoring.src} alt={PRODUCT_SHOTS.monitoring.alt} />
      ),
    },
  ];

  return (
    <>
      <section
        id="product"
        className="scroll-mt-24 overflow-hidden border-b dl-divider bg-gradient-to-b from-[#e8eef8] to-[#f3f6fb]"
        aria-labelledby="product-showcase-heading"
      >
        <ContainerScroll
          titleComponent={
            <div>
              <p className="dl-eyebrow">Product in action</p>
              <h2
                id="product-showcase-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl md:text-5xl"
              >
                Mapping Studio — visual intelligence at scale
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#475569] sm:text-[16px]">
                High-fidelity product surface. Partner formats become enterprise language — designed
                once, reused across the network.
              </p>
            </div>
          }
        >
          <Shot
            src={PRODUCT_SHOTS.mappingStudio.src}
            alt={PRODUCT_SHOTS.mappingStudio.alt}
            priority
            className="h-full w-full bg-white object-contain object-top"
          />
        </ContainerScroll>
      </section>

      <section
        id="studios"
        className="relative overflow-hidden border-b border-white/10 dl-hero-dark"
        aria-labelledby="studios-tour-heading"
      >
        <BackgroundBeams variant="dark" className="opacity-80" />
        <div className="dl-container relative py-16 sm:py-20 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Platform
            </p>
            <h2
              id="studios-tour-heading"
              className="mt-3 text-3xl font-bold text-white sm:text-4xl"
            >
              One platform. Three operating surfaces.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-300">
              Step horizontally through Configuration, Mapping, and Monitoring — the same product
              surfaces enterprise teams operate every day.
            </p>
          </Reveal>

          <div className="mt-12 md:mt-14">
            <StudioHorizontalTour
              steps={studioSteps}
              defaultId="configuration"
              tone="dark"
              autoPlay
            />
          </div>
        </div>
      </section>
    </>
  );
}
