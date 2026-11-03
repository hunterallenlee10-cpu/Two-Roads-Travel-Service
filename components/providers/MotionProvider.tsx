"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Animation features load lazily so they never compete with the first paint.
 * reducedMotion="user" respects prefers-reduced-motion everywhere: transform and layout
 * animations become instant, gentle opacity fades remain, and server and client render the same.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
