"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/data/site";
import { pick } from "@/lib/road";
import { useRoad } from "@/components/providers/RoadProvider";
import { Photo } from "@/components/ui/Photo";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { SplitHeading, Reveal } from "@/components/ui/Motion";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { road } = useRoad();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} aria-labelledby="final-title" className="on-dark relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-sand">
      <m.div className="absolute inset-[-12%_0] motion-reduce:!transform-none" style={{ y }}>
        <Photo id="cta/fork" sizes="100vw" />
      </m.div>
      <div aria-hidden className="absolute inset-0 bg-ink/45" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/50" />

      <div className="px-gutter relative z-10 mx-auto w-full max-w-[1500px] py-32 text-center">
        <Reveal>
          <p className="font-display mx-auto max-w-[30ch] text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug font-light text-sand/85 italic">
            “Two roads diverged in a wood, and I, I took the one less traveled by,
          </p>
        </Reveal>
        <SplitHeading
          id="final-title"
          lines={[<em key="a" className="italic">…and that has made</em>, "all the difference.”"]}
          className="font-display text-display mt-8 font-light"
          delay={0.1}
        />
        <Reveal delay={0.3}>
          <p className="eyebrow mt-8 text-sand/75">Robert Frost, The Road Not Taken, 1916</p>
          <p className="text-lede mx-auto mt-12 max-w-[36ch] text-sand/90">
            {pick(road, {
              unwind: "Your road to unwind starts with one conversation.",
              discover: "Your road to discover starts with one conversation.",
              none: "Whichever road is yours, it starts with one conversation.",
            })}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PlanTripButton variant="light" size="lg" />
            <a href={SITE.phoneHref} className="inline-flex min-h-14 items-center px-4 text-base font-semibold underline decoration-sand/40 underline-offset-4 hover:decoration-sand">
              or call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
