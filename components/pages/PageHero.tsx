import type { ReactNode } from "react";
import type { ImageId } from "@/lib/images";
import type { MatchmakerPreset } from "@/data/matchmaker";
import { Photo } from "@/components/ui/Photo";
import { PlanTripButton } from "@/components/ui/PlanTripButton";

/** Full-bleed inner page hero with the page title set large over the photo. */
export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  preset,
  children,
  short = false,
}: {
  image: ImageId;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  preset?: MatchmakerPreset;
  children?: ReactNode;
  short?: boolean;
}) {
  return (
    <section className={`on-dark relative flex items-end overflow-hidden bg-ink text-sand ${short ? "min-h-[72svh]" : "min-h-[88svh]"}`}>
      <div className="absolute inset-0">
        <Photo id={image} sizes="100vw" priority />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/45" />
      <div className="px-gutter relative z-10 mx-auto w-full max-w-[1680px] pt-40 pb-14 md:pb-20">
        <p className="eyebrow flex items-center gap-3 text-sand/85">
          <span className="h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="font-display text-display mt-6 max-w-[16ch] font-light">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="rise-in block">{title}</span>
          </span>
        </h1>
        {intro && (
          <p className="text-lede fade-in mt-6 max-w-[48ch] text-sand/85" style={{ animationDelay: "300ms" }}>
            {intro}
          </p>
        )}
        <div className="fade-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "450ms" }}>
          <PlanTripButton variant="light" size="lg" preset={preset} />
          {children}
        </div>
      </div>
    </section>
  );
}
