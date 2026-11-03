import type { RoadOrNone } from "@/lib/road";
import { ForkGlyph } from "./ForkGlyph";

/** Typographic lockup: forked-path glyph + "Two Roads" set in the display serif. */
export function Wordmark({ road = null, size = "md" }: { road?: RoadOrNone; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <ForkGlyph road={road} className={big ? "h-14 w-14" : "h-7 w-7 shrink-0"} />
      <span className="flex flex-col leading-none">
        <span className={`font-display ${big ? "text-5xl md:text-6xl" : "text-[1.4rem]"} tracking-[-0.03em]`}>
          Two <em className="font-light italic">Roads</em>
        </span>
        <span className={`eyebrow mt-1 ${big ? "text-[0.7rem]" : "text-[0.5rem]"} tracking-[0.34em] opacity-80`}>
          Travel Service
        </span>
      </span>
    </span>
  );
}
