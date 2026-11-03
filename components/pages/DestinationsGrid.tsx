"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { DESTINATIONS, REGIONS, type Region } from "@/data/destinations";
import { orderByRoad, ROADS, type Road } from "@/lib/road";
import { useRoad } from "@/components/providers/RoadProvider";
import { preloadMatchmaker, useMatchmaker } from "@/components/providers/MatchmakerProvider";
import { Photo } from "@/components/ui/Photo";

type RoadFilter = Road | "all";

export function DestinationsGrid() {
  const { road } = useRoad();
  const { open } = useMatchmaker();
  const reduce = useReducedMotion();
  const [region, setRegion] = useState<Region | "All">("All");
  const [roadFilter, setRoadFilter] = useState<RoadFilter>("all");

  const list = useMemo(() => {
    const filtered = DESTINATIONS.filter(
      (d) => (region === "All" || d.region === region) && (roadFilter === "all" || d.road === roadFilter || d.road === "both"),
    );
    return orderByRoad(filtered, road);
  }, [region, roadFilter, road]);

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
      active ? "border-ink bg-ink text-sand" : "border-ink/20 hover:border-ink"
    }`;

  return (
    <section aria-labelledby="dest-grid-title" className="py-section bg-sand">
      <div className="px-gutter mx-auto max-w-[1680px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 id="dest-grid-title" className="font-display text-headline font-light">
            Every place <em className="italic">we can take you.</em>
          </h2>
          <p className="text-ink-muted" aria-live="polite">
            Showing {list.length} of {DESTINATIONS.length} destinations
          </p>
        </div>

        <div className="mt-10 space-y-4 border-y border-ink/10 py-5">
          <div role="group" aria-label="Filter by road" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)]">
            <span className="eyebrow mr-2 self-center text-ink-muted">Road</span>
            {(["all", "unwind", "discover"] as RoadFilter[]).map((r) => (
              <button key={r} type="button" aria-pressed={roadFilter === r} onClick={() => setRoadFilter(r)} className={chip(roadFilter === r)}>
                {r === "all" ? "Both roads" : ROADS[r].label}
                {r !== "all" && r === road && <span className="ml-2 text-xs opacity-70">yours</span>}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter by region" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)]">
            <span className="eyebrow mr-2 self-center text-ink-muted">Region</span>
            {(["All", ...REGIONS] as const).map((r) => (
              <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(r)} className={chip(region === r)}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <m.ul layout={!reduce} className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((d) => (
              <m.li
                key={d.name}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onPointerEnter={preloadMatchmaker}
                  onClick={() => open({ interest: d.name })}
                  className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink text-left text-sand"
                  aria-label={`Plan a trip to ${d.name}`}
                >
                  <span className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]">
                    <Photo id={d.image} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />
                  </span>
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />
                  {road && d.road === road && (
                    <span className="eyebrow absolute top-3 left-3 rounded-full bg-sand/90 px-2.5 py-1 text-[0.58rem] text-ink">Your road</span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span className="eyebrow block text-[0.58rem] text-sand/75">{d.region}</span>
                    <span className="font-display mt-1.5 block text-[clamp(1.25rem,2vw,1.875rem)] leading-[1.05] font-light">{d.name}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-sand/85 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      Plan this trip <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
        {list.length === 0 && <p className="mt-10 text-ink-muted">Nothing on that combination yet. Try both roads.</p>}
      </div>
    </section>
  );
}
