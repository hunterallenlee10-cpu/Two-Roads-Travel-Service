import { SITE } from "@/data/site";
import type { MatchmakerPreset } from "@/data/matchmaker";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { SplitHeading } from "@/components/ui/Motion";

/** Closing call to action used on every inner page. */
export function CtaBand({ preset, heading }: { preset?: MatchmakerPreset; heading?: [string, string] }) {
  const [a, b] = heading ?? ["Tell us a little.", "We will take it from there."];
  return (
    <section aria-labelledby="cta-band-title" className="on-dark grain relative overflow-hidden bg-ink text-sand">
      <ForkGlyph className="pointer-events-none absolute -right-24 -bottom-24 h-[520px] w-[520px] text-sand/[0.05]" />
      <div className="px-gutter py-section relative z-10 mx-auto flex max-w-[1680px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <SplitHeading id="cta-band-title" lines={[a, <em key="b" className="italic">{b}</em>]} className="font-display text-headline max-w-[18ch] font-light" />
        <div className="flex flex-wrap items-center gap-4">
          <PlanTripButton variant="light" size="lg" preset={preset} />
          <a href={SITE.phoneHref} className="inline-flex min-h-14 items-center px-2 font-semibold underline decoration-sand/40 underline-offset-4 hover:decoration-sand">
            or call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
