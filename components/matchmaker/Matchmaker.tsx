"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, X } from "lucide-react";
import { STEP_TITLES, type TripAnswers } from "@/data/matchmaker";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { makeReference, submitTripRequest } from "@/lib/submit";
import { useMatchmaker } from "@/components/providers/MatchmakerProvider";
import { useRoad } from "@/components/providers/RoadProvider";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { Dossier } from "./Dossier";
import { StepBudget, StepContact, StepExtras, StepPlaces, StepRoad, StepTravelers, StepWhen, type ContactErrors } from "./Steps";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL = STEP_TITLES.length;

const HELP: string[] = [
  "Pick the one that sounds most like the trip in your head.",
  "So we plan for the right people.",
  "Choose as many as you like. Or let us surprise you.",
  "A month and a rough length is plenty.",
  "A range is all we need. No judgement here.",
  "The details that turn a good trip into the one you talk about.",
  "Michele or Sarah will reach out within one business day.",
];

function validateStep(step: number, a: TripAnswers): string | null {
  switch (step) {
    case 0:
      return a.road ? null : "Choose a road, or pick a little of both.";
    case 1:
      return a.travelers ? null : "Tell us who is coming along.";
    case 2:
      return a.places.length ? null : "Pick at least one place, or let us surprise you.";
    case 3:
      if (!a.when) return "Choose a month, or tell us you are flexible.";
      return a.length ? null : "Choose how long you would like to go.";
    case 4:
      return a.budget ? null : "Choose a range, or let us help you decide.";
    default:
      return null;
  }
}

function contactErrors(a: TripAnswers): ContactErrors {
  const errs: ContactErrors = {};
  if (!a.name.trim()) errs.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email.trim())) errs.email = "Please add a valid email address.";
  if (a.phone.replace(/\D/g, "").length < 10) errs.phone = "Please add a phone number with area code.";
  return errs;
}

export default function Matchmaker() {
  const { isOpen, close, answers, setAnswers, step, setStep, done, setDone } = useMatchmaker();
  const { setRoad } = useRoad();
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const advanceTimer = useRef<number | undefined>(undefined);

  const onClose = useCallback(() => {
    window.clearTimeout(advanceTimer.current);
    close();
  }, [close]);
  useFocusTrap(dialog, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  // Move focus to the step title whenever the step changes, and scroll to the top.
  useEffect(() => {
    if (!isOpen) return;
    scroller.current?.scrollTo({ top: 0 });
    const id = window.setTimeout(() => heading.current?.focus({ preventScroll: true }), reduce ? 0 : 120);
    return () => window.clearTimeout(id);
  }, [isOpen, step, done, reduce]);

  const update = useCallback(
    (patch: Partial<TripAnswers>) => {
      setAnswers((a) => ({ ...a, ...patch }));
      setError(null);
      setErrors((e) => {
        const next = { ...e };
        for (const k of Object.keys(patch)) delete next[k as keyof ContactErrors];
        return next;
      });
    },
    [setAnswers],
  );

  const goTo = (s: number) => {
    setDir(s > step ? 1 : -1);
    setError(null);
    setStep(s);
  };

  const submit = async () => {
    const errs = contactErrors(answers);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setError("A few details need a look.");
      const first = Object.keys(errs)[0];
      document.getElementById(`mm-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    const ref = makeReference();
    await submitTripRequest({
      type: "trip-request",
      submittedAt: new Date().toISOString(),
      reference: ref,
      answers,
      page: window.location.pathname,
    });
    setReference(ref);
    setSubmitting(false);
    setDone(true);
  };

  const next = () => {
    window.clearTimeout(advanceTimer.current);
    if (step === TOTAL - 1) {
      void submit();
      return;
    }
    const err = validateStep(step, answers);
    if (err) {
      setError(err);
      return;
    }
    if (step === 0 && (answers.road === "unwind" || answers.road === "discover")) setRoad(answers.road);
    goTo(step + 1);
  };

  // After a pointer pick on single-choice steps, glide on. Keyboard users stay in control.
  const autoNext = () => {
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      document.getElementById("mm-next")?.click();
    }, 420);
  };

  const props = { answers, update, autoNext };
  const progress = done ? 1 : (step + 1) / TOTAL;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mm-step-title"
          className="print-reset fixed inset-0 z-[100] flex flex-col bg-sand text-ink"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <header className="no-print flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-[var(--gutter)]">
            <div className="flex items-center gap-3">
              <ForkGlyph road={answers.road === "both" ? null : answers.road} className="h-7 w-7" />
              <span className="font-display text-xl">
                Trip <em className="italic">Matchmaker</em>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="eyebrow hidden text-ink-muted sm:inline">{done ? "Complete" : `Step ${step + 1} of ${TOTAL}`}</span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-sand"
              >
                <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                <span className="sr-only">Close the Trip Matchmaker</span>
              </button>
            </div>
          </header>
          <div
            className="no-print h-[3px] shrink-0 bg-ink/10"
            role="progressbar"
            aria-label="Matchmaker progress"
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-valuenow={done ? TOTAL : step + 1}
          >
            <div className="h-full origin-left bg-terracotta transition-transform duration-700 ease-[var(--ease-out-soft)]" style={{ transform: `scaleX(${progress})` }} />
          </div>

          <p aria-live="polite" className="sr-only">
            {done ? "Your trip request is sent. Your Trip Dossier is ready." : `Step ${step + 1} of ${TOTAL}: ${STEP_TITLES[step]}`}
          </p>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            className="print-reset flex min-h-0 flex-1 flex-col"
          >
            <div ref={scroller} data-lenis-prevent className="print-reset min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] py-10 md:py-16">
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <m.div
                    key={done ? "done" : step}
                    custom={dir}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -48 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    {done ? (
                      <>
                        <h2 id="mm-step-title" ref={heading} tabIndex={-1} className="sr-only">
                          Your Trip Dossier
                        </h2>
                        <Dossier answers={answers} reference={reference} onClose={onClose} />
                      </>
                    ) : (
                      <>
                        <div className="mb-10 md:mb-14">
                          <p className="eyebrow text-terracotta-deep">
                            {String(step + 1).padStart(2, "0")} <span className="text-ink-muted">/ 0{TOTAL}</span>
                          </p>
                          <h2 id="mm-step-title" ref={heading} tabIndex={-1} className="font-display text-headline mt-4 font-light focus:outline-none">
                            {STEP_TITLES[step]}
                            <span className="text-terracotta">.</span>
                          </h2>
                          <p className="text-lede mt-4 max-w-[48ch] text-ink-muted">{HELP[step]}</p>
                        </div>
                        {step === 0 && <StepRoad {...props} />}
                        {step === 1 && <StepTravelers {...props} />}
                        {step === 2 && <StepPlaces {...props} />}
                        {step === 3 && <StepWhen {...props} />}
                        {step === 4 && <StepBudget {...props} />}
                        {step === 5 && <StepExtras {...props} />}
                        {step === 6 && <StepContact {...props} errors={errors} />}
                      </>
                    )}
                  </m.div>
                </AnimatePresence>
              </div>
            </div>

            {!done && (
              <footer className="no-print shrink-0 border-t border-ink/10 bg-sand/95 backdrop-blur">
                <p role="alert" className="px-[var(--gutter)] text-center text-sm font-medium text-terracotta-deep">
                  {error && <span className="block pt-3">{error}</span>}
                </p>
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-[var(--gutter)] py-3 md:py-4">
                  <button
                    type="button"
                    onClick={() => goTo(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-opacity disabled:pointer-events-none disabled:opacity-0 md:px-5"
                  >
                    <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                    Back
                  </button>
                  <button
                    id="mm-next"
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-sand transition-colors hover:bg-terracotta-deep disabled:opacity-70 md:px-8"
                  >
                    {submitting ? (
                      <>
                        <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Sending
                      </>
                    ) : step === TOTAL - 1 ? (
                      <>Send to my advisor</>
                    ) : (
                      <>
                        Continue <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                      </>
                    )}
                  </button>
                </div>
              </footer>
            )}
          </form>
        </m.div>
      )}
    </AnimatePresence>
  );
}
