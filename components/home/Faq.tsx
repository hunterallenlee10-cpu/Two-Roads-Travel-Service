"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQS, type Faq as FaqItem } from "@/data/content";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Faq({ items = FAQS, title = true }: { items?: FaqItem[]; title?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const base = useId();

  return (
    <section id="faq" aria-labelledby={title ? "faq-title" : undefined} aria-label={title ? undefined : "Questions"} className="py-section bg-sand">
      <div className="px-gutter mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12">
        {title && (
          <SectionIntro
            id="faq-title"
            eyebrow="Questions"
            lines={["Good questions.", <em key="e" className="italic">Straight answers.</em>]}
            className="lg:col-span-4"
          />
        )}
        <div className={title ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-8 lg:col-start-3"}>
          {items.map((f, i) => {
            const isOpen = openIndex === i;
            const id = `${base}-${i}`;
            return (
              <div key={f.q} className="border-b border-ink/15 first:border-t">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    id={`${id}-button`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="group flex min-h-16 w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] leading-tight font-light">{f.q}</span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:border-ink ${
                        isOpen ? "rotate-45 bg-ink text-sand" : ""
                      }`}
                    >
                      <Plus aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`${id}-panel`}
                      role="region"
                      aria-labelledby={`${id}-button`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-8 text-[1.0625rem] leading-relaxed text-ink-muted">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
