"use client";

import { ROADS, type Road } from "@/lib/road";
import { useRoad } from "@/components/providers/RoadProvider";
import { ForkGlyph } from "@/components/brand/ForkGlyph";

/** "Your road: Unwind · switch". Before a choice, a tiny two-way toggle. */
export function RoadPill({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const { road, setRoad, switchRoad } = useRoad();
  const ring = tone === "light" ? "border-sand/35 text-sand" : "border-ink/20 text-ink";
  const hover = tone === "light" ? "hover:bg-sand/10" : "hover:bg-ink/5";

  if (!road) {
    return (
      <div
        role="group"
        aria-label="Choose your road"
        className={`inline-flex min-h-11 items-center gap-1 rounded-full border py-1 pr-1 pl-3.5 text-[0.8125rem] ${ring} ${className}`}
      >
        <span className="mr-1 font-medium opacity-80">Your road</span>
        {(["unwind", "discover"] as Road[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRoad(r)}
            className={`min-h-9 rounded-full px-3 font-semibold transition-colors ${hover}`}
          >
            {ROADS[r].label}
          </button>
        ))}
      </div>
    );
  }

  const other = road === "unwind" ? "Discover" : "Unwind";
  return (
    <button
      type="button"
      onClick={switchRoad}
      aria-label={`Your road is ${ROADS[road].label}. Switch to ${other}.`}
      className={`group inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.8125rem] transition-colors ${ring} ${hover} ${className}`}
    >
      <ForkGlyph road={road} className="h-4 w-4" />
      <span>
        Your road: <strong className="font-semibold">{ROADS[road].label}</strong>
      </span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span className="underline decoration-current/40 underline-offset-4 transition-colors group-hover:decoration-current">
        switch
      </span>
    </button>
  );
}
