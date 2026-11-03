"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { atlasFor } from "@/data/destinations";
import { useRoad } from "@/components/providers/RoadProvider";
import { useMatchmaker } from "@/components/providers/MatchmakerProvider";
import { Photo } from "@/components/ui/Photo";

/**
 * The Atlas: a pinned horizontal journey through three moods (desktop, motion allowed).
 * On phones and with reduced motion it is a native swipeable snap-scroller.
 */
export function Atlas() {
  const { road } = useRoad();
  const { open } = useMatchmaker();
  const chapters = atlasFor(road);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !section.current || !track.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Each giant chapter word drifts a little slower than the track.
        gsap.utils.toArray<HTMLElement>("[data-atlas-word]").forEach((w) => {
          gsap.fromTo(w, { xPercent: 12 }, {
            xPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
          });
        });
      });
      revert = () => mm.revert();
    })();
    return () => {
      cancelled = true;
      revert?.();
    };
    // Re-measure when the road reorders chapters.
  }, [road]);

  return (
    <section
      ref={section}
      id="atlas"
      aria-labelledby="atlas-title"
      className="on-dark grain relative overflow-hidden bg-ink text-sand md:h-[100svh]"
    >
      <div className="px-gutter relative z-10 flex items-end justify-between pt-20 md:absolute md:inset-x-0 md:top-0 md:pt-[calc(var(--nav-h)+24px)]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-ember">
            <span className="h-px w-8 bg-current" aria-hidden />
            The Atlas
          </p>
          <h2 id="atlas-title" className="font-display text-title mt-4 font-light">
            Three moods. <em className="italic">Where is yours?</em>
          </h2>
        </div>
        <Link href="/destinations" className="hidden min-h-11 items-center gap-2 text-sm font-semibold text-sand/90 hover:text-sand md:inline-flex">
          All destinations <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>

      <div
        ref={track}
        className="no-scrollbar relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pt-10 pb-16 will-change-transform md:h-full md:items-center md:gap-6 md:pt-24 md:pb-0 motion-safe:md:snap-none motion-safe:md:overflow-visible motion-reduce:md:items-center"
        tabIndex={0}
        aria-label="Destinations by mood. Scroll sideways to explore."
      >
        {chapters.map((c) => (
          <div key={c.key} className="flex shrink-0 gap-4 md:gap-6">
            <div className="relative flex w-[80vw] shrink-0 snap-start flex-col justify-end pb-4 md:w-[38vw] md:max-w-[680px] md:pb-[12vh]">
              <span
                data-atlas-word
                aria-hidden
                className="font-display outline-text pointer-events-none absolute top-0 left-0 text-[clamp(6.5rem,16vw,17rem)] leading-[0.85] font-light whitespace-nowrap italic [--stroke:rgba(244,239,230,0.45)] md:top-[16vh]"
              >
                {c.word}
              </span>
              <div className="relative mt-44 md:mt-0">
                <p className="eyebrow text-ember">{c.title}</p>
                <h3 className="font-display mt-3 max-w-[16ch] text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.02] font-light">{c.line}</h3>
              </div>
            </div>
            {c.places.map((p, i) => (
              <figure
                key={p.name}
                className={`relative z-10 h-[62vh] max-h-[640px] w-[72vw] shrink-0 snap-start overflow-hidden md:h-[64vh] md:max-h-none md:w-[30vw] md:max-w-[520px] ${
                  i % 2 === 1 ? "md:translate-y-[5vh]" : "md:-translate-y-[3vh]"
                }`}
              >
                <Photo id={p.image} sizes="(min-width: 768px) 30vw, 72vw" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <span className="font-display block text-[clamp(1.75rem,2.6vw,2.75rem)] leading-none font-light">{p.name}</span>
                  <span className="mt-2 block max-w-[30ch] text-sm text-sand/85">{p.line}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
        <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center gap-6 pr-[var(--gutter)] md:w-[34vw]">
          <p className="font-display text-[clamp(2rem,3.4vw,3.5rem)] leading-[1.02] font-light">
            Not sure where? <em className="italic">That is our favorite question.</em>
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => open({ interest: "Help me choose a destination" })}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-sand px-6 text-sm font-semibold text-ink transition-colors hover:bg-ember"
            >
              Help me choose
            </button>
            <Link
              href="/destinations"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sand/40 px-6 text-sm font-semibold transition-colors hover:bg-sand hover:text-ink"
            >
              All destinations
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-8 z-10 hidden h-px bg-sand/15 md:block motion-reduce:md:hidden">
        <span ref={progress} className="block h-full origin-left scale-x-0 bg-ember" />
      </div>
    </section>
  );
}
