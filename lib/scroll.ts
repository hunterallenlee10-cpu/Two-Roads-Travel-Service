import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  window.__lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  window.__lenis?.start();
  document.documentElement.style.overflow = "";
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
