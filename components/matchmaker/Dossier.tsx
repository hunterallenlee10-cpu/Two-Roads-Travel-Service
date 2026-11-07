"use client";

import { Download, Phone } from "lucide-react";
import type { TripAnswers } from "@/data/matchmaker";
import { SITE } from "@/data/site";
import { ROADS } from "@/lib/road";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { Wordmark } from "@/components/brand/Wordmark";

function roadTitle(road: TripAnswers["road"]) {
  if (road === "unwind" || road === "discover") return ROADS[road].title;
  return "A little of both roads";
}

/** The success state: a luxury itinerary cover summarizing the answers. Prints cleanly. */
export function Dossier({ answers, reference, onClose }: { answers: TripAnswers; reference: string; onClose: () => void }) {
  const firstName = answers.name.trim().split(/\s+/)[0];
  const rows: [string, string][] = [
    ["Traveling", answers.travelers ?? "Open"],
    ["Drawn to", answers.places.length ? answers.places.join(", ") : "Open"],
    ["When", answers.when ?? "Flexible"],
    ["How long", answers.length ?? "Open"],
    ["Budget per person", answers.budget ?? "Help me decide"],
    ["Make it unforgettable", answers.extras.length ? answers.extras.join(", ") : "We will talk it through"],
  ];
  if (answers.interest) rows.unshift(["Starting from", answers.interest]);
  const road = answers.road === "unwind" || answers.road === "discover" ? answers.road : null;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <article
        aria-labelledby="dossier-title"
        className="print-dossier relative overflow-hidden border border-ink/15 bg-paper shadow-[0_40px_80px_-40px_rgba(14,42,51,0.45)]"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-12">
          <Wordmark road={road} />
          <span className="eyebrow text-right text-ink-muted">
            Trip Dossier
            <span className="block text-ink">{reference}</span>
          </span>
        </div>

        <div className="relative px-6 py-10 md:px-12 md:py-14">
          <ForkGlyph road={road} className="pointer-events-none absolute -top-6 -right-10 h-72 w-72 text-ink opacity-[0.07] md:h-96 md:w-96" />
          <p className="eyebrow text-terracotta-deep">Prepared for {answers.name.trim() || "you"}</p>
          <h2 id="dossier-title" className="font-display text-display mt-5 font-light">
            Your Trip <em className="italic">Dossier</em>
          </h2>
          <p className="font-display mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-light italic text-terracotta-deep">
            {roadTitle(answers.road)}
          </p>

          <dl className="mt-10 grid gap-x-10 border-t border-ink/15 sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k} className="border-b border-ink/10 py-5">
                <dt className="eyebrow text-ink-muted">{k}</dt>
                <dd className="font-display mt-2 text-xl leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          {answers.notes.trim() && (
            <div className="border-b border-ink/10 py-5">
              <p className="eyebrow text-ink-muted">In your words</p>
              <p className="font-display mt-2 text-xl leading-snug italic">“{answers.notes.trim()}”</p>
            </div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-display text-2xl leading-snug">
                {firstName ? `Thank you, ${firstName}.` : "Thank you."} Michelle or Shannon will reach out within one business day.
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {answers.callTime ? `We will aim for the ${answers.callTime.toLowerCase()}.` : "We will call at a good time for you."} Reach us at {SITE.phone}.
              </p>
            </div>
            <p className="font-display text-lg italic text-ink-muted">{SITE.signature}</p>
          </div>
        </div>
      </article>

      <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={SITE.phoneHref}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-terracotta-deep px-7 font-semibold text-sand transition-colors hover:bg-ink"
        >
          <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Call {SITE.phone}
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-ink/25 px-7 font-semibold transition-colors hover:bg-ink hover:text-sand"
        >
          <Download aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Download my dossier
        </button>
        <button type="button" onClick={onClose} className="inline-flex min-h-14 items-center justify-center px-4 font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          Back to the site
        </button>
      </div>
    </div>
  );
}
