"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import type { Road, RoadOrNone } from "@/lib/road";
import { prefersReducedMotion } from "@/lib/scroll";

const STORAGE_KEY = "tworoads.road";

type RoadContextValue = {
  road: RoadOrNone;
  setRoad: (road: RoadOrNone) => void;
  switchRoad: () => void;
};

const RoadContext = createContext<RoadContextValue | null>(null);

function readStored(): RoadOrNone {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "unwind" || v === "discover" ? v : null;
  } catch {
    return null;
  }
}

function persist(road: RoadOrNone) {
  try {
    if (road) window.localStorage.setItem(STORAGE_KEY, road);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode, settings). The road still works for this visit.
  }
}

function markRoot(road: RoadOrNone) {
  if (road) document.documentElement.dataset.road = road;
  else delete document.documentElement.dataset.road;
}

export function RoadProvider({ children }: { children: React.ReactNode }) {
  const [road, setRoadState] = useState<RoadOrNone>(null);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount to keep SSR markup stable
      setRoadState(stored);
      markRoot(stored);
    }
  }, []);

  const setRoad = useCallback((next: RoadOrNone) => {
    const apply = () => {
      flushSync(() => setRoadState(next));
      markRoot(next);
      persist(next);
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !prefersReducedMotion()) doc.startViewTransition(apply);
    else apply();
  }, []);

  const switchRoad = useCallback(() => {
    setRoad((road === "unwind" ? "discover" : "unwind") as Road);
  }, [road, setRoad]);

  const value = useMemo(() => ({ road, setRoad, switchRoad }), [road, setRoad, switchRoad]);
  return <RoadContext.Provider value={value}>{children}</RoadContext.Provider>;
}

export function useRoad() {
  const ctx = useContext(RoadContext);
  if (!ctx) throw new Error("useRoad must be used inside RoadProvider");
  return ctx;
}
