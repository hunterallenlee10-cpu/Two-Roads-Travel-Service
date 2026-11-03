"use client";

import { m, useInView } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline that reveals line by line, each line rising out of a mask.
 * We observe the heading itself: the masked lines start fully clipped, so they never intersect.
 */
export function SplitHeading({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag ref={ref} className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <m.span
            className="block"
            initial={{ y: "108%" }}
            animate={inView ? { y: "0%" } : { y: "108%" }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

/** Gentle fade and rise on enter. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "article";
}) {
  const M = m[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Image frame that opens from a clipped inset, like a shutter. */
export function ClipReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ clipPath: "inset(14% 10% 14% 10%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
