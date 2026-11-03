"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stylesFor } from "@/data/styles";
import { pick } from "@/lib/road";
import { useRoad } from "@/components/providers/RoadProvider";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Motion";

const MORE = [
  { label: "Vacations", href: "/vacations" },
  { label: "Resort Packages", href: "/resort-packages" },
  { label: "Hot Deals", href: "/hot-deals" },
  { label: "New Destinations", href: "/new-destinations" },
];

export function WaysToTravel() {
  const { road } = useRoad();
  const styles = stylesFor(road);

  const lines = pick(road, {
    unwind: ["Slow mornings,", <em key="e" className="italic">warm water.</em>],
    discover: ["Go further.", <em key="e" className="italic">See more.</em>],
    none: ["Every way", <em key="e" className="italic">to go.</em>],
  });
  const lede = pick(road, {
    unwind: "We put the easy, beautiful ways to travel first. Everything else is a scroll away.",
    discover: "River decks, guided streets and trails up front. The calmer options are still here.",
    none: "Ocean decks or old-town streets. Pick a way to travel and we will shape it around you.",
  });

  return (
    <section id="ways" aria-labelledby="ways-title" className="py-section bg-paper">
      <div className="px-gutter mx-auto max-w-[1920px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro key={road ?? "none"} id="ways-title" eyebrow="Ways to travel" lines={lines} lede={lede} className="max-w-3xl" />
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted md:max-w-xs md:justify-end">
            {MORE.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-flex min-h-11 items-center underline decoration-ink/25 underline-offset-4 hover:text-ink hover:decoration-ink">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="no-scrollbar -mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 md:mx-0 md:mt-20 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {styles.map((s, i) => (
            <li
              key={s.key}
              className={`w-[78vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none ${i % 2 === 1 ? "lg:translate-y-16" : ""}`}
            >
              <Reveal delay={(i % 4) * 0.08}>
                <Link href={s.href} className="group block">
                  <div className="relative aspect-[3/4.3] overflow-hidden bg-ink">
                    <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]">
                      <Photo id={s.image} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw" />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
                    <span className="eyebrow absolute top-4 left-4 text-sand/90">{String(i + 1).padStart(2, "0")}</span>
                    {road && s.road === road && (
                      <span className="eyebrow absolute top-3.5 right-4 rounded-full bg-sand/90 px-2.5 py-1 text-[0.6rem] text-ink">
                        Your road
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-sand">
                      <h3 className="font-display text-[clamp(1.6rem,2.2vw,2.25rem)] leading-none font-light">{s.title}</h3>
                      <p className="mt-2 text-sm leading-snug text-sand/85 transition-all duration-700 ease-[var(--ease-out-soft)] md:max-h-0 md:translate-y-2 md:opacity-0 md:group-hover:max-h-16 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:max-h-16 md:group-focus-visible:opacity-100">
                        {s.line}
                      </p>
                    </div>
                    <span className="absolute right-4 bottom-5 flex h-10 w-10 items-center justify-center rounded-full border border-sand/40 text-sand opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
