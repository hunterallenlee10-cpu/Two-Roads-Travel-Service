"use client";

import { useMemo } from "react";
import { Heart, Sparkles, User, Users, Wine, X, type LucideIcon } from "lucide-react";
import {
  BUDGET_OPTIONS,
  CALL_TIMES,
  EXTRA_OPTIONS,
  LENGTH_OPTIONS,
  ROAD_OPTIONS,
  SURPRISE,
  TRAVELER_OPTIONS,
  type TripAnswers,
} from "@/data/matchmaker";
import { atlasFor } from "@/data/destinations";
import type { ImageId } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Chip, CheckTile, RadioTile, SelectedBadge } from "./Choice";

export type StepProps = {
  answers: TripAnswers;
  update: (patch: Partial<TripAnswers>) => void;
  /** Advance after a pointer pick on single-choice steps. */
  autoNext: () => void;
};

const ROAD_IMAGES: Record<string, ImageId> = {
  unwind: "hero/unwind",
  discover: "hero/discover",
  both: "atlas/greece",
};

export function StepRoad({ answers, update, autoNext }: StepProps) {
  return (
    <fieldset>
      <legend className="sr-only">Your road</legend>
      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
        {ROAD_OPTIONS.map((o) => {
          const on = answers.road === o.value;
          return (
            <RadioTile
              key={o.value}
              name="road"
              value={o.value}
              checked={on}
              onChange={(v, pointer) => {
                update({ road: v as TripAnswers["road"] });
                if (pointer) autoNext();
              }}
            >
              <span
                className={`relative flex h-28 overflow-hidden bg-ink text-sand ring-offset-2 ring-offset-sand transition-shadow md:h-auto md:aspect-[4/5] ${on ? "ring-2 ring-terracotta-deep" : ""}`}
              >
                <span className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-105">
                  <Photo id={ROAD_IMAGES[o.value]} sizes="(min-width: 768px) 33vw, 100vw" />
                </span>
                <span aria-hidden className={`absolute inset-0 transition-colors ${on ? "bg-ink/25" : "bg-ink/45"}`} />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <SelectedBadge on={on} />
                <span className="relative mt-auto block p-4 md:p-6">
                  <span className="font-display block text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-light">{o.label}</span>
                  <span className="mt-1.5 block text-sm text-sand/85">{o.line}</span>
                </span>
              </span>
            </RadioTile>
          );
        })}
      </div>
    </fieldset>
  );
}

const TRAVELER_ICONS: Record<string, LucideIcon> = {
  Solo: User,
  Couple: Heart,
  Family: Users,
  Friends: Wine,
  "Wedding or group": Sparkles,
};

export function StepTravelers({ answers, update, autoNext }: StepProps) {
  return (
    <fieldset>
      <legend className="sr-only">Who is traveling</legend>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {TRAVELER_OPTIONS.map((t, i) => {
          const on = answers.travelers === t;
          const Icon = TRAVELER_ICONS[t];
          return (
            <RadioTile
              key={t}
              name="travelers"
              value={t}
              checked={on}
              className={i === TRAVELER_OPTIONS.length - 1 ? "col-span-2 md:col-span-1" : ""}
              onChange={(v, pointer) => {
                update({ travelers: v });
                if (pointer) autoNext();
              }}
            >
              <span
                className={`flex min-h-32 flex-col justify-between border p-5 transition-colors duration-300 md:aspect-square md:p-6 ${
                  on ? "border-ink bg-ink text-sand" : "border-ink/15 bg-paper hover:border-ink/50"
                }`}
              >
                <Icon aria-hidden className={`h-6 w-6 ${on ? "text-ember" : "text-terracotta-deep"}`} strokeWidth={1.4} />
                <span className="font-display mt-6 text-2xl leading-tight font-light md:text-[1.75rem]">{t}</span>
              </span>
            </RadioTile>
          );
        })}
      </div>
    </fieldset>
  );
}

export function StepPlaces({ answers, update }: StepProps) {
  const road = answers.road === "unwind" || answers.road === "discover" ? answers.road : null;
  const chapters = atlasFor(road);
  const toggle = (name: string) => {
    const has = answers.places.includes(name);
    update({ places: has ? answers.places.filter((p) => p !== name) : [...answers.places, name] });
  };
  return (
    <div className="space-y-10">
      {answers.interest && (
        <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-sand-2 py-1.5 pr-1.5 pl-4 text-sm">
          <span className="text-ink-muted">Starting from</span>
          <strong className="font-semibold">{answers.interest}</strong>
          <button
            type="button"
            onClick={() => update({ interest: null })}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/10"
            aria-label={`Remove ${answers.interest}`}
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </p>
      )}
      {chapters.map((c) => (
        <fieldset key={c.key}>
          <legend className="eyebrow mb-4 text-terracotta-deep">{c.title}</legend>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {c.places.map((p) => {
              const on = answers.places.includes(p.name);
              return (
                <CheckTile key={p.name} name="places" value={p.name} checked={on} onChange={() => toggle(p.name)}>
                  <span className={`relative block aspect-[4/5] overflow-hidden bg-ink text-sand md:aspect-[4/3] ${on ? "ring-2 ring-terracotta-deep ring-offset-2 ring-offset-sand" : ""}`}>
                    <span className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-105">
                      <Photo id={p.image} sizes="(min-width: 768px) 25vw, 50vw" />
                    </span>
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <SelectedBadge on={on} />
                    <span className="font-display absolute bottom-3 left-3 text-xl leading-none font-light md:bottom-4 md:left-4 md:text-2xl">{p.name}</span>
                  </span>
                </CheckTile>
              );
            })}
          </div>
        </fieldset>
      ))}
      <CheckTile name="places" value={SURPRISE} checked={answers.places.includes(SURPRISE)} onChange={() => toggle(SURPRISE)}>
        <span
          className={`flex min-h-20 items-center justify-between gap-4 border px-6 py-5 transition-colors ${
            answers.places.includes(SURPRISE) ? "border-ink bg-ink text-sand" : "border-dashed border-ink/30 bg-paper hover:border-ink"
          }`}
        >
          <span>
            <span className="font-display block text-2xl font-light">Surprise me</span>
            <span className="block text-sm opacity-75">Tell us what you love. We will find the place.</span>
          </span>
          <Sparkles aria-hidden className="h-6 w-6 shrink-0" strokeWidth={1.4} />
        </span>
      </CheckTile>
    </div>
  );
}

export function StepWhen({ answers, update }: StepProps) {
  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return {
        value: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        short: d.toLocaleDateString("en-US", { month: "short" }),
        year: d.getFullYear(),
      };
    });
  }, []);
  return (
    <div className="space-y-12">
      <fieldset>
        <legend className="eyebrow mb-4 text-terracotta-deep">When</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7 md:gap-3">
          {months.map((m) => {
            const on = answers.when === m.value;
            return (
              <RadioTile key={m.value} name="when" value={m.value} checked={on} onChange={(v) => update({ when: v })}>
                <span
                  className={`flex min-h-16 flex-col items-center justify-center border px-2 py-3 transition-colors ${
                    on ? "border-ink bg-ink text-sand" : "border-ink/15 bg-paper hover:border-ink/50"
                  }`}
                >
                  <span className="font-display text-xl leading-none font-light">{m.short}</span>
                  <span className="mt-1 text-xs opacity-70">{m.year}</span>
                </span>
              </RadioTile>
            );
          })}
          <RadioTile name="when" value="Flexible" checked={answers.when === "Flexible"} onChange={(v) => update({ when: v })} className="col-span-3 sm:col-span-4 md:col-span-2">
            <span
              className={`flex h-full min-h-16 items-center justify-center border px-4 transition-colors ${
                answers.when === "Flexible" ? "border-ink bg-ink text-sand" : "border-dashed border-ink/30 bg-paper hover:border-ink"
              }`}
            >
              <span className="font-display text-xl font-light italic">I am flexible</span>
            </span>
          </RadioTile>
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-4 text-terracotta-deep">How long</legend>
        <div className="flex flex-wrap gap-2.5">
          {LENGTH_OPTIONS.map((l) => (
            <Chip key={l} name="length" value={l} checked={answers.length === l} onChange={(v) => update({ length: v })}>
              {l}
            </Chip>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function StepBudget({ answers, update, autoNext }: StepProps) {
  return (
    <fieldset>
      <legend className="sr-only">Budget per person</legend>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
        {BUDGET_OPTIONS.map((b, i) => {
          const on = answers.budget === b;
          const help = b === "Help me decide";
          return (
            <RadioTile
              key={b}
              name="budget"
              value={b}
              checked={on}
              onChange={(v, pointer) => {
                update({ budget: v });
                if (pointer) autoNext();
              }}
            >
              <span
                className={`flex min-h-24 flex-col justify-between border p-5 transition-colors md:min-h-44 ${
                  on ? "border-ink bg-ink text-sand" : help ? "border-dashed border-ink/30 bg-paper hover:border-ink" : "border-ink/15 bg-paper hover:border-ink/50"
                }`}
              >
                <span aria-hidden className="flex gap-1">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <span key={j} className={`h-1.5 w-5 rounded-full ${!help && j <= i ? (on ? "bg-ember" : "bg-terracotta") : on ? "bg-sand/20" : "bg-ink/10"}`} />
                  ))}
                </span>
                <span className={`font-display mt-6 text-2xl leading-tight font-light ${help ? "italic" : ""}`}>{b}</span>
              </span>
            </RadioTile>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-ink-muted">Per person, before flights unless you tell us otherwise. A range is all we need.</p>
    </fieldset>
  );
}

export function StepExtras({ answers, update }: StepProps) {
  const toggle = (v: string) =>
    update({ extras: answers.extras.includes(v) ? answers.extras.filter((e) => e !== v) : [...answers.extras, v] });
  return (
    <div className="space-y-10">
      <fieldset>
        <legend className="eyebrow mb-4 text-terracotta-deep">Pick any that fit</legend>
        <div className="flex flex-wrap gap-2.5">
          {EXTRA_OPTIONS.map((e) => (
            <Chip key={e} type="checkbox" name="extras" value={e} checked={answers.extras.includes(e)} onChange={() => toggle(e)}>
              {e}
            </Chip>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="mm-notes" className="eyebrow mb-4 block text-terracotta-deep">
          Anything else we should know?
        </label>
        <textarea
          id="mm-notes"
          rows={4}
          value={answers.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="A milestone birthday, a dream we keep putting off, a bad knee, a picky eater..."
          className="w-full max-w-3xl resize-y border border-ink/20 bg-paper p-5 text-base leading-relaxed placeholder:text-ink-muted/70 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-terracotta"
        />
      </div>
    </div>
  );
}

export type ContactErrors = Partial<Record<"name" | "email" | "phone", string>>;

export function StepContact({ answers, update, errors }: StepProps & { errors: ContactErrors }) {
  const field = (key: "name" | "email" | "phone", label: string, type: string, autoComplete: string, inputMode?: "email" | "tel") => (
    <div>
      <label htmlFor={`mm-${key}`} className="eyebrow mb-3 block text-ink-muted">
        {label}
      </label>
      <input
        id={`mm-${key}`}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={answers[key]}
        onChange={(e) => update({ [key]: e.target.value })}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `mm-${key}-err` : undefined}
        className={`min-h-14 w-full border-b-2 bg-transparent px-0 text-xl transition-colors focus:outline-none focus-visible:outline-none md:text-2xl ${
          errors[key] ? "border-terracotta-deep" : "border-ink/20 focus:border-ink"
        }`}
      />
      {errors[key] && (
        <p id={`mm-${key}-err`} className="mt-2 text-sm font-medium text-terracotta-deep">
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <div className="max-w-3xl space-y-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="md:col-span-2">{field("name", "Your name", "text", "name")}</div>
        {field("email", "Email", "email", "email", "email")}
        {field("phone", "Phone", "tel", "tel", "tel")}
      </div>
      <fieldset>
        <legend className="eyebrow mb-4 text-ink-muted">Best time to call</legend>
        <div className="flex flex-wrap gap-2.5">
          {CALL_TIMES.map((t) => (
            <Chip key={t} name="callTime" value={t} checked={answers.callTime === t} onChange={(v) => update({ callTime: v })}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>
      <p className="text-sm text-ink-muted">Your advisor uses this to reach you about your trip.</p>
    </div>
  );
}
