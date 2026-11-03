"use client";

import { ArrowUpRight } from "lucide-react";
import { ROADS, type Road } from "@/lib/road";
import type { ImageId } from "@/lib/images";
import { useRoad } from "@/components/providers/RoadProvider";
import { preloadMatchmaker, useMatchmaker } from "@/components/providers/MatchmakerProvider";
import { Photo } from "@/components/ui/Photo";
import { SplitHeading } from "@/components/ui/Motion";

const TILES: { road: Road; image: ImageId }[] = [
  { road: "unwind", image: "atlas/south-pacific" },
  { road: "discover", image: "atlas/south-america" },
];

/** Step 1 of the Matchmaker, inline, so people can start right on the page. */
export function MatchmakerTeaser() {
  const { road, setRoad } = useRoad();
  const { open } = useMatchmaker();

  const start = (r: Road | "both") => {
    if (r !== "both") setRoad(r);
    open({ road: r, startStep: 1 });
  };

  return (
    <section id="matchmaker" aria-labelledby="mm-title" className="on-dark grain py-section relative bg-ink text-sand">
      <div className="px-gutter relative z-10 mx-auto max-w-[1680px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ember">
              <span className="h-px w-8 bg-current" aria-hidden />
              Trip Matchmaker · Step 1 of 7
            </p>
            <SplitHeading id="mm-title" lines={["Which road", <em key="e" className="italic">are you on?</em>]} className="font-display text-headline mt-6 font-light" />
          </div>
          <p className="text-lede max-w-[34ch] text-mist">Seven quick questions. Two minutes. Then a real person takes it from there.</p>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6" role="group" aria-label="Choose your road">
          {TILES.map((t) => {
            const chosen = road === t.road;
            return (
              <button
                key={t.road}
                type="button"
                onPointerEnter={preloadMatchmaker}
                onClick={() => start(t.road)}
                aria-pressed={chosen}
                className="group relative aspect-[4/3] overflow-hidden text-left md:aspect-[16/11]"
              >
                <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]">
                  <Photo id={t.image} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10" />
                {chosen && (
                  <span className="eyebrow absolute top-5 left-5 rounded-full bg-sand px-3 py-1.5 text-[0.62rem] text-ink">Your road</span>
                )}
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
                  <span>
                    <span className="font-display block text-[clamp(2.25rem,5vw,4.5rem)] leading-none font-light">
                      I want to <em className="italic">{ROADS[t.road].label.toLowerCase()}</em>
                    </span>
                    <span className="mt-3 block max-w-[36ch] text-sm text-sand/85 md:text-base">{ROADS[t.road].line}</span>
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => start("both")}
            className="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-sand/85 underline decoration-sand/30 underline-offset-4 hover:text-sand hover:decoration-sand"
          >
            Honestly, a little of both
          </button>
        </div>
      </div>
    </section>
  );
}
