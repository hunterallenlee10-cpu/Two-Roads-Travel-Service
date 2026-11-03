import type { ReactNode } from "react";
import { SplitHeading, Reveal } from "./Motion";

/** Eyebrow, split-line headline and an optional lede. */
export function SectionIntro({
  eyebrow,
  lines,
  lede,
  id,
  tone = "dark",
  className = "",
  size = "headline",
}: {
  eyebrow: string;
  lines: ReactNode[];
  lede?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  className?: string;
  size?: "headline" | "display";
}) {
  const muted = tone === "light" ? "text-mist" : "text-ink-muted";
  const accent = tone === "light" ? "text-ember" : "text-terracotta-deep";
  return (
    <div className={className}>
      <p className={`eyebrow flex items-center gap-3 ${accent}`}>
        <span className="h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </p>
      <SplitHeading id={id} lines={lines} className={`font-display mt-6 font-light ${size === "display" ? "text-display" : "text-headline"}`} />
      {lede && (
        <Reveal delay={0.2}>
          <p className={`text-lede mt-6 max-w-[46ch] ${muted}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
