"use client";

import { ArrowUpRight } from "lucide-react";
import { ctaLabel } from "@/lib/road";
import type { MatchmakerPreset } from "@/data/matchmaker";
import { useRoad } from "@/components/providers/RoadProvider";
import { preloadMatchmaker, useMatchmaker } from "@/components/providers/MatchmakerProvider";

type Variant = "solid" | "light" | "outline" | "outline-light";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-terracotta-deep text-sand hover:bg-ink",
  light: "bg-sand text-ink hover:bg-terracotta hover:text-ink",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-sand",
  "outline-light": "border border-sand/40 text-sand hover:border-sand hover:bg-sand hover:text-ink",
};

export function PlanTripButton({
  variant = "solid",
  size = "md",
  preset,
  label,
  className = "",
  compact = false,
}: {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  preset?: MatchmakerPreset;
  label?: string;
  className?: string;
  /** Short label on small phones, used in the nav. */
  compact?: boolean;
}) {
  const { road } = useRoad();
  const { open } = useMatchmaker();
  const sizes = {
    sm: "min-h-11 px-4 text-[0.8125rem] sm:px-5",
    md: "min-h-12 px-6 text-sm",
    lg: "min-h-14 px-8 text-base",
  }[size];
  return (
    <button
      type="button"
      onPointerEnter={preloadMatchmaker}
      onFocus={preloadMatchmaker}
      onClick={() => open(preset)}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] whitespace-nowrap transition-colors duration-300 ${sizes} ${VARIANTS[variant]} ${className}`}
    >
      {compact ? (
        <>
          <span className="sm:hidden">Plan a trip</span>
          <span className="hidden sm:inline">{label ?? ctaLabel(road)}</span>
        </>
      ) : (
        <span>{label ?? ctaLabel(road)}</span>
      )}
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />
    </button>
  );
}
