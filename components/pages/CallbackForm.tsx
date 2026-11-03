"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { CALL_TIMES } from "@/data/matchmaker";
import { makeReference, submitTripRequest } from "@/lib/submit";
import { Chip } from "@/components/matchmaker/Choice";

/** A short "call me back" form. Uses the same submitTripRequest() as the Matchmaker. */
export function CallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Please add your name.";
    if (phone.replace(/\D/g, "").length < 10) errs.phone = "Please add a phone number with area code.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(errs.name ? "cb-name" : "cb-phone")?.focus();
      return;
    }
    setState("sending");
    await submitTripRequest({
      type: "callback",
      submittedAt: new Date().toISOString(),
      reference: makeReference(),
      answers: { name, phone, callTime },
      page: window.location.pathname,
    });
    setState("sent");
  };

  if (state === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sand">
          <Check aria-hidden className="h-5 w-5" />
        </span>
        <p className="font-display text-3xl leading-tight font-light">
          Thank you, {name.trim().split(/\s+/)[0]}. <em className="italic">We will call you{callTime && callTime !== "Anytime" ? ` in the ${callTime.toLowerCase()}` : ""}.</em>
        </p>
        <p className="text-ink-muted">An advisor will reach out within one business day.</p>
      </div>
    );
  }

  const input = (id: string, label: string, value: string, set: (v: string) => void, type: string, auto: string, err?: string) => (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={auto}
        inputMode={type === "tel" ? "tel" : undefined}
        value={value}
        onChange={(e) => {
          set(e.target.value);
          setErrors({});
        }}
        aria-invalid={err ? true : undefined}
        aria-describedby={err ? `${id}-err` : undefined}
        className={`min-h-14 w-full border-b-2 bg-transparent text-xl focus:outline-none ${err ? "border-terracotta-deep" : "border-ink/20 focus:border-ink"}`}
      />
      {err && (
        <p id={`${id}-err`} className="mt-2 text-sm font-medium text-terracotta-deep">
          {err}
        </p>
      )}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {input("cb-name", "Your name", name, setName, "text", "name", errors.name)}
        {input("cb-phone", "Phone", phone, setPhone, "tel", "tel", errors.phone)}
      </div>
      <fieldset>
        <legend className="eyebrow mb-3 text-ink-muted">Best time to call</legend>
        <div className="flex flex-wrap gap-2.5">
          {CALL_TIMES.map((t) => (
            <Chip key={t} name="cb-time" value={t} checked={callTime === t} onChange={(v) => setCallTime(v)}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex min-h-14 items-center gap-2 rounded-full bg-terracotta-deep px-8 font-semibold text-sand transition-colors hover:bg-ink disabled:opacity-70"
      >
        {state === "sending" ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          "Request a call"
        )}
      </button>
    </form>
  );
}
