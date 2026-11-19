"use client";

import { ArrowUpRight } from "lucide-react";
import { journeysFor, PRICE_DISCLAIMER } from "@/data/journeys";
import { useRoad } from "@/components/providers/RoadProvider";
import { useMatchmaker } from "@/components/providers/MatchmakerProvider";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/lib/images";
import { ClipReveal, Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

const COUNT = ["No", "One", "Two", "Three", "Four", "Five", "Six"];

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
              lines={[`${COUNT[journeys.length] ?? "A few"} ${journeys.length === 1 ? "journey" : "journeys"}`, <em key="e" className="italic">worth the wait.</em>]}
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
              <div className={`grid gap-6 md:col-span-8 ${i % 2 ? "md:order-2" : ""}`}>
                <ClipReveal className="relative aspect-[4/3] overflow-hidden bg-ink md:aspect-[16/10]">
                  <Photo id={j.image} sizes="(min-width: 768px) 66vw, 100vw" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
                  <span className="absolute top-5 left-5 flex flex-wrap gap-2">
                    {j.badge && <span className="eyebrow rounded-full bg-terracotta-deep px-3 py-1.5 text-[0.62rem] text-sand">{j.badge}</span>}
                    <span className="eyebrow rounded-full bg-sand/90 px-3 py-1.5 text-[0.62rem] text-ink">{j.nights} nights</span>
                  </span>
                </ClipReveal>
                {j.map && (
                  <Reveal>
                    <figure className="border border-ink/10 bg-paper p-3 md:p-4">
                      <div className="relative overflow-hidden" style={{ aspectRatio: `${getImage(j.map).width} / ${getImage(j.map).height}` }}>
                        <Photo id={j.map} sizes="(min-width: 768px) 66vw, 100vw" className="object-contain" />
                      </div>
                      <figcaption className="mt-3 flex items-center justify-between gap-4">
                        <span className="eyebrow text-ink-muted">Itinerary map</span>
                        <a
                          href={getImage(j.map).src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                        >
                          View larger
                          <span className="sr-only"> itinerary map (opens in a new tab)</span>
                          <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                        </a>
                      </figcaption>
                    </figure>
                  </Reveal>
                )}
              </div>
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
                    <dt className="eyebrow text-ink-muted">{j.priceLabel ?? "From"}</dt>
                    <dd className="font-display mt-2 text-3xl font-light">
                      {j.fromPrice}{" "}
                      {j.priceNote ? (
                        <span className="mt-1.5 block font-sans text-xs leading-snug text-ink-muted">{j.priceNote}</span>
                      ) : (
                        <span className="font-sans text-sm text-ink-muted">pp</span>
                      )}
                    </dd>
                  </div>
                  {j.details?.map((d) => (
                    <div key={d.label}>
                      <dt className="eyebrow text-ink-muted">{d.label}</dt>
                      <dd className="mt-2 text-[1.0625rem]">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                {j.ports && (
                  <div className="mt-8 border-t border-ink/15 pt-6">
                    <h4 className="eyebrow text-ink-muted">Itinerary</h4>
                    <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.9375rem] leading-snug">
                      {j.ports.map((port, k) => (
                        <li key={port} className="flex items-center gap-2">
                          {k > 0 && <span aria-hidden className="h-px w-3 bg-terracotta-deep/60" />}
                          {port}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <p className="mt-4 text-xs leading-relaxed text-ink-muted">{PRICE_DISCLAIMER}</p>
                <button
                  type="button"
                  onClick={() => open({ interest: `${j.title} (${[j.operator, ...(j.details ?? []).map((d) => d.value), `${j.nights} nights`].join(", ")})` })}
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
