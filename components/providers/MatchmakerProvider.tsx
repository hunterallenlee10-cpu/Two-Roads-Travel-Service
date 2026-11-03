"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { EMPTY_ANSWERS, type MatchmakerPreset, type TripAnswers } from "@/data/matchmaker";
import { useRoad } from "./RoadProvider";

// The Matchmaker is code-split: its JS loads on first open (or on hover of a CTA).
const loadMatchmaker = () => import("@/components/matchmaker/Matchmaker");
const Matchmaker = dynamic(loadMatchmaker, { ssr: false });

export function preloadMatchmaker() {
  void loadMatchmaker();
}

type MatchmakerContextValue = {
  isOpen: boolean;
  open: (preset?: MatchmakerPreset) => void;
  close: () => void;
  answers: TripAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<TripAnswers>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  done: boolean;
  setDone: (v: boolean) => void;
};

const Ctx = createContext<MatchmakerContextValue | null>(null);

export function MatchmakerProvider({ children }: { children: React.ReactNode }) {
  const { road } = useRoad();
  const [isOpen, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [answers, setAnswers] = useState<TripAnswers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(
    (preset: MatchmakerPreset = {}) => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      const fresh = done;
      setAnswers((prev) => {
        const base = fresh ? EMPTY_ANSWERS : prev;
        return {
          ...base,
          road: preset.road ?? base.road ?? road ?? null,
          interest: preset.interest ?? base.interest,
        };
      });
      if (fresh) setDone(false);
      setStep((prev) => preset.startStep ?? (fresh ? 0 : prev));
      setEverOpened(true);
      setOpen(true);
    },
    [done, road],
  );

  const close = useCallback(() => {
    setOpen(false);
    const el = returnFocus.current;
    if (el && document.contains(el)) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, answers, setAnswers, step, setStep, done, setDone }),
    [isOpen, open, close, answers, step, done],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {everOpened && <Matchmaker />}
    </Ctx.Provider>
  );
}

export function useMatchmaker() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMatchmaker must be used inside MatchmakerProvider");
  return ctx;
}
