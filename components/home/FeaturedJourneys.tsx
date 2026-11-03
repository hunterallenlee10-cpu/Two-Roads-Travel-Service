"use client";

import { ArrowUpRight } from "lucide-react";
import { journeysFor, PRICE_DISCLAIMER } from "@/data/journeys";
import { useRoad } from "@/components/providers/RoadProvider";
import { useMatchmaker } from "@/components/providers/MatchmakerProvider";
import { Photo } from "@/components/ui/Photo";
import { ClipReveal, Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function FeaturedJourneys({ showIntro = true }: { showIntro?: boolean }) {
  const { road } = useRoad();
  const { open } = useMatchmaker();
  const journeys = journeysFor(road);

  return (
    <section id="journeys" aria-labelledby="journeys-title" className="py-section bg-sand-2">
      <div className="px-gutter mx-auto max-w-[1680px]">
        {showIntro && (
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionIntro
              id="journeys-title"
              eyebrow="Featured journeys"
              lines={["Two journeys", <em key="e" className="italic">worth the wait.</em>]}
              className="max-w-3xl"
            />
            <button
              type="button"
              onClick={() => open({ interest: "Current hot deals" })}
              className="group inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-ink/25 px-6 text-sm font-semibold transition-colors hover:bg-ink hover:text-sand md:self-auto"
            >
              See all current deals
              <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}

        <div className={`grid gap-16 md:gap-24 ${showIntro ? "mt-14 md:mt-20" : ""}`}>
          {journeys.map((j, i) => (
            <article key={j.key} className="grid items-center gap-8 md:grid-cols-12 md:gap-10" aria-labelledby={`j-${j.key}`}>
              <ClipReveal className={`relative aspect-[4/3] overflow-hidden bg-ink md:col-span-8 md:aspect-[16/10] ${i % 2 ? "md:order-2" : ""}`}>
                <Photo id={j.image} sizes="(min-width: 768px) 66vw, 100vw" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
                <span className="eyebrow absolute top-5 left-5 rounded-full bg-sand/90 px-3 py-1.5 text-[0.62rem] text-ink">
                  {j.nights} nights
                </span>
              </ClipReveal>
              <Reveal className={`md:col-span-4 ${i % 2 ? "md:order-1" : ""}`} delay={0.15}>
                <p className="eyebrow text-terracotta-deep">{j.line}</p>
                <h3 id={`j-${j.key}`} className="font-display text-title mt-4 font-light">
                  {j.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">{j.description}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
                  <div>
                    <dt className="eyebrow text-ink-muted">Length</dt>
                    <dd className="font-display mt-2 text-3xl font-light">{j.nights} nights</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-muted">From</dt>
                    <dd className="font-display mt-2 text-3xl font-light">
                      {j.fromPrice} <span className="font-sans text-sm text-ink-muted">pp</span>
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-ink-muted">{PRICE_DISCLAIMER}</p>
                <button
                  type="button"
                  onClick={() => open({ interest: `${j.title} (${j.operator}, ${j.nights} nights)` })}
                  className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-sand transition-colors hover:bg-terracotta-deep"
                >
                  Ask about this journey
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                </button>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
