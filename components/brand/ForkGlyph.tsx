import type { RoadOrNone } from "@/lib/road";

/**
 * The forked-path glyph: one road that splits in two.
 * When a road is chosen, its branch is drawn in terracotta and the other fades.
 */
export function ForkGlyph({
  road = null,
  className = "",
  title,
}: {
  road?: RoadOrNone;
  className?: string;
  title?: string;
}) {
  const left = road === "discover" ? 0.35 : 1;
  const right = road === "unwind" ? 0.35 : 1;
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M16 30.5V19.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M16 19.5C16 13.5 8.5 12 7 2.5"
        stroke={road === "unwind" ? "var(--color-terracotta)" : "currentColor"}
        strokeOpacity={left}
        strokeWidth="1.75"
        strokeLinecap="round"
        style={{ transition: "stroke-opacity .6s, stroke .6s" }}
      />
      <path
        d="M16 19.5C16 13.5 23.5 12 25 2.5"
        stroke={road === "discover" ? "var(--color-terracotta)" : "currentColor"}
        strokeOpacity={right}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray={road ? undefined : "0.1 3.4"}
        style={{ transition: "stroke-opacity .6s, stroke .6s" }}
      />
    </svg>
  );
}
