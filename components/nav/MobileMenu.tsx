"use client";

import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import { PRIMARY_NAV, SITE } from "@/data/site";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Wordmark } from "@/components/brand/Wordmark";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { RoadPill } from "./RoadPill";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const close = useCallback(() => onClose(), [onClose]);
  useFocusTrap(ref, open, close);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    closeRef.current?.focus();
    return () => unlockScroll();
  }, [open]);

  const links = [{ label: "Home", href: "/" }, ...PRIMARY_NAV];

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-dark grain fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-sand"
          data-lenis-prevent
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="px-gutter relative z-10 flex h-[var(--nav-h)] items-center justify-between">
            <Link href="/" onClick={close} aria-label="Two Roads Travel Service, home">
              <Wordmark tone="light" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand/25"
            >
              <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="px-gutter relative z-10 flex flex-1 flex-col justify-center py-8">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <m.div
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.18 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={close}
                      className="font-display group flex items-baseline gap-4 py-1 text-[clamp(2.5rem,11vw,5rem)] leading-[1.05] font-light"
                    >
                      <span className="eyebrow w-6 text-[0.65rem] text-mist">{String(i + 1).padStart(2, "0")}</span>
                      <span className="transition-colors group-hover:text-ember group-hover:italic">{l.label}</span>
                    </Link>
                  </m.div>
                </li>
              ))}
            </ul>
          </nav>

          <m.div
            className="px-gutter relative z-10 flex flex-col gap-4 border-t border-sand/15 py-8 sm:flex-row sm:items-center sm:justify-between"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <RoadPill tone="light" className="self-start" />
            <div className="flex flex-wrap items-center gap-3">
              <a href={SITE.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sand/30 px-5 text-sm font-semibold">
                <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                {SITE.phone}
              </a>
              <PlanTripButton variant="light" />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
