"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ROADS, type Road } from "@/lib/road";
import { scrollToId } from "@/lib/scroll";
import type { ImageId } from "@/lib/images";
import { useRoad } from "@/components/providers/RoadProvider";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { Photo } from "@/components/ui/Photo";

const SIDES: { road: Road; image: ImageId; index: string }[] = [
  { road: "unwind", image: "hero/unwind", index: "01" },
  { road: "discover", image: "hero/discover", index: "02" },
];

export function Hero() {
  const { road, setRoad } = useRoad();
  const [active, setActive] = useState<Road | null>(null);
  const [justChose, setJustChose] = useState(false);
  const pointer = useRef<string>("mouse");
  const pointerDownAt = useRef(0);
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  const expanded = active ?? road;

  const choose = (side: Road) => {
    setRoad(side);
    setActive(side);
    setJustChose(true);
  };

  const onPaneClick = (side: Road) => {
    // On touch, the first tap opens the road. The second tap takes it.
    if (pointer.current === "touch" && expanded !== side) {
      setActive(side);
      return;
    }
    if (road === side) {
      scrollToId("how");
      return;
    }
    choose(side);
  };

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-title"
      className="on-dark relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-sand"
    >
      <div className="flex h-full flex-col md:flex-row" onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}>
        {SIDES.map(({ road: side, image, index }) => {
          const isOpen = expanded === side;
          const isClosed = expanded !== null && !isOpen;
          const chosen = road === side;
          const copy = ROADS[side];
          return (
            <button
              key={side}
              type="button"
              aria-pressed={chosen}
              aria-label={`${copy.title}. ${copy.line}${chosen ? " This is your road. Continue." : " Choose this road."}`}
              onPointerDown={(e) => {
                pointer.current = e.pointerType;
                pointerDownAt.current = Date.now();
              }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(side)}
              onKeyDown={() => (pointer.current = "keyboard")}
              onFocus={() => {
                // Focus from a tap or click should not open the road. Keyboard focus should.
                if (Date.now() - pointerDownAt.current > 400) setActive(side);
              }}
              onClick={() => onPaneClick(side)}
              className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden text-left outline-offset-[-6px] transition-[flex-grow] duration-[1100ms] ease-[var(--ease-road)]"
              style={{ flexGrow: isOpen ? 7 : isClosed ? 3 : 5, flexBasis: 0 }}
            >
              <m.div className="absolute inset-[-8%_0] motion-reduce:!transform-none" style={{ y: imageY }}>
                <div
                  className="absolute inset-0 transition-transform ease-out"
                  style={{
                    transform: `scale(${isOpen && !reduce ? 1.12 : 1.03})`,
                    transitionDuration: isOpen ? "7000ms" : "1600ms",
                  }}
                >
                  <Photo id={image} priority sizes="(min-width: 768px) 70vw, 100vw" />
                </div>
              </m.div>

              {/* Light falls off toward the edges. Closed side dims. */}
              <div
                aria-hidden
                className={`absolute inset-0 transition-colors duration-1000 ${isClosed ? "bg-ink/55" : "bg-ink/20"}`}
              />
              <div
                aria-hidden
                className={`absolute inset-0 ${
                  side === "unwind"
                    ? "bg-gradient-to-b from-ink/60 via-transparent to-transparent md:bg-gradient-to-t md:from-ink/80 md:via-ink/10"
                    : "bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                }`}
              />

              {side === "discover" && (
                <span aria-hidden className="absolute top-0 left-0 z-10 h-px w-full md:h-full md:w-px">
                  <span className="absolute inset-0 bg-sand/70 shadow-[0_0_18px_3px_rgba(229,138,94,0.65)]" />
                  <span className="absolute top-0 left-0 hidden h-1/5 w-px bg-gradient-to-b from-transparent via-white to-transparent [animation:seam-travel_4.5s_var(--ease-road)_infinite] md:block" />
                  <span className="absolute top-0 left-0 h-px w-1/5 bg-gradient-to-r from-transparent via-white to-transparent [animation:seam-travel-x_4.5s_var(--ease-road)_infinite] md:hidden" />
                </span>
              )}

              <span
                className={`absolute inset-x-0 z-10 flex px-[var(--gutter)] ${
                  side === "unwind"
                    ? "top-[calc(var(--nav-h)+12px)] md:top-auto md:bottom-12 md:justify-start"
                    : "bottom-6 justify-end text-right md:bottom-12"
                }`}
              >
                <span className={`flex max-w-xl flex-col ${side === "discover" ? "items-end" : "items-start"}`}>
                  <span className="eyebrow flex items-center gap-3 text-sand/85">
                    <span>{index}</span>
                    <span className="h-px w-8 bg-current opacity-60" />
                    <span>{chosen ? "Your road" : copy.label}</span>
                  </span>
                  {/* Collapsed to zero height until this road opens. */}
                  <span
                    className={`grid transition-[grid-template-rows] duration-[900ms] ease-[var(--ease-out-soft)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <span className={`flex min-h-0 flex-col overflow-hidden ${side === "discover" ? "items-end" : "items-start"}`}>
                      <span className="mt-2 block overflow-hidden pb-[0.15em]">
                        <span
                          className={`font-display block text-[clamp(1.75rem,3vw,3.25rem)] leading-none font-light whitespace-nowrap transition-transform duration-[900ms] ease-[var(--ease-out-soft)] ${
                            isOpen ? "translate-y-0" : "translate-y-[110%]"
                          }`}
                        >
                          The road to <em className="italic">{copy.label}</em>
                        </span>
                      </span>
                      <span
                        className={`hidden max-w-sm text-[0.9375rem] leading-relaxed text-sand/85 transition-[opacity,transform] delay-150 duration-700 sm:block ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                      >
                        {copy.line}
                      </span>
                      <span
                        className={`mt-4 mb-1 inline-flex min-h-11 items-center gap-2 rounded-full bg-sand px-5 text-sm font-semibold text-ink transition-[opacity,transform] delay-200 duration-700 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                      >
                        {chosen ? "Continue on this road" : "Take this road"}
                        {chosen ? (
                          <ArrowDown aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                        ) : (
                          <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                        )}
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Headline bridges both roads. It never blocks clicks. */}
      <m.div
        style={{ y: textY, opacity: textOpacity }}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center motion-reduce:!transform-none md:pb-[14vh]"
      >
        <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(14,42,51,0.42),transparent_75%)] md:bg-[radial-gradient(ellipse_45%_40%_at_50%_42%,rgba(14,42,51,0.3),transparent_75%)]" />
        <h1 id="hero-title" className="font-display text-mega font-light [text-shadow:0_2px_40px_rgba(14,42,51,0.45)]">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="rise-in block" style={{ animationDelay: "120ms" }}>
              We get you.
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="rise-in block italic" style={{ animationDelay: "260ms" }}>
              And we get you there.
            </span>
          </span>
        </h1>
        <p
          className="fade-in mt-5 max-w-[34ch] text-[clamp(1rem,1.4vw,1.25rem)] leading-snug text-sand/90 [text-shadow:0_1px_20px_rgba(14,42,51,0.6)]"
          style={{ animationDelay: "700ms" }}
        >
          Two roads. One advisor who knows which one is yours.
        </p>
      </m.div>

      {/* Fork badge sits where the roads split. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sand/40 bg-ink/40 backdrop-blur-md">
          <ForkGlyph road={expanded} className="h-7 w-7" />
        </span>
      </div>

      <p aria-live="polite" className="sr-only">
        {justChose && road ? `Your road is ${ROADS[road].label}. The page is now arranged around it.` : ""}
      </p>
    </section>
  );
}
