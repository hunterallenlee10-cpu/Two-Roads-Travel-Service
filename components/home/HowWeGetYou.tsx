"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

/** Sticky photo on the left, steps scroll on the right. The photo follows the active step. */
export function HowWeGetYou() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
      revert = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section id="how" aria-labelledby="how-title" className="py-section bg-sand">
      <div className="px-gutter mx-auto max-w-[1680px]">
        <SectionIntro
          id="how-title"
          eyebrow="How we get you"
          lines={["Your personal", <em key="e" className="italic">travel advocate.</em>]}
          lede="From getting you on the flight to finding the right package, cruise, shore excursions and restaurants."
          className="max-w-4xl"
        />

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* Sticky photo stack, tablet and up */}
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-[14vh] h-[72vh] overflow-hidden rounded-[2px] bg-ink">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[clip-path,transform] duration-[1400ms] ease-[var(--ease-out-soft)]"
                  style={{
                    clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    transform: i === active ? "scale(1)" : "scale(1.08)",
                    zIndex: i,
                  }}
                >
                  <Photo id={s.image} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              ))}
              <div className="absolute bottom-0 left-0 z-10 flex items-center gap-4 bg-sand py-3 pr-5 pl-0 text-ink">
                <span className="font-display text-2xl tabular-nums">{STEPS[active].n}</span>
                <span className="h-px w-10 bg-ink/30" aria-hidden />
                <span className="eyebrow text-ink-muted">{STEPS[active].title}</span>
              </div>
            </div>
          </div>

          <ol className="md:col-span-5 md:col-start-8">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex flex-col justify-center border-t border-ink/15 py-10 md:min-h-[72vh] md:py-0"
              >
                <div className="relative mb-8 aspect-[4/5] overflow-hidden md:hidden">
                  <Photo id={s.image} sizes="100vw" />
                </div>
                <span
                  aria-hidden
                  className={`font-display outline-text text-[clamp(5rem,11vw,10rem)] leading-[0.8] font-light transition-opacity duration-700 [--stroke:var(--color-terracotta)] ${
                    i === active ? "opacity-100" : "md:opacity-30"
                  }`}
                >
                  {s.n}
                </span>
                <h3 className="font-display text-title mt-6 font-light">
                  <span className="eyebrow mb-3 block text-terracotta-deep">{s.title}</span>
                  {s.heading}
                </h3>
                <p className="mt-5 max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
