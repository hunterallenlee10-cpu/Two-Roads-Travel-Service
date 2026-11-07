"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { PRIMARY_NAV, SITE } from "@/data/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { RoadPill } from "./RoadPill";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 48);
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > 640);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !solid;
  const text = light ? "text-sand" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-out-soft)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-sand/80 shadow-[0_1px_0_rgba(14,42,51,0.08)] backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"} ${text}`}
      >
        {light && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-32 bg-gradient-to-b from-ink/45 to-transparent" />
        )}
        <nav aria-label="Main" className="px-gutter mx-auto flex h-[var(--nav-h)] max-w-[1920px] items-center justify-between gap-4">
          <Link href="/" aria-label="Two Roads Travel Service, home" className="-ml-1 rounded-sm p-1">
            {/* Both tones are stacked so the logo cross-fades with the header background. */}
            <span className="grid">
              <Wordmark tone="light" eager className={`col-start-1 row-start-1 transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`} />
              <Wordmark tone="dark" eager className={`col-start-1 row-start-1 transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`} />
            </span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {PRIMARY_NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative inline-flex min-h-11 items-center px-3 text-[0.875rem] font-medium after:absolute after:inset-x-3 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden min-h-11 items-center gap-2 px-2 text-sm font-medium 2xl:inline-flex"
            >
              <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              {SITE.phone}
            </a>
            <a
              href={SITE.phoneHref}
              aria-label={`Call ${SITE.phone}`}
              className="hidden h-11 w-11 items-center justify-center rounded-full xl:inline-flex 2xl:hidden"
            >
              <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <div className="hidden md:block">
              <RoadPill tone={light ? "light" : "dark"} />
            </div>
            <PlanTripButton size="sm" variant={light ? "light" : "solid"} compact />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full xl:hidden"
            >
              <Menu aria-hidden className="h-6 w-6" strokeWidth={1.5} />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          requestAnimationFrame(() => menuButton.current?.focus({ preventScroll: true }));
        }}
      />
    </>
  );
}
