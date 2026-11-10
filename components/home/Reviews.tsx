import { ArrowUpRight } from "lucide-react";
import { REVIEWS, REVIEW_SOURCE } from "@/data/content";
import { Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Photo } from "@/components/ui/Photo";

/** Verified rating from the agency's Virtuoso profile, plus any client reviews copied from it. */
export function Reviews() {
  const s = REVIEW_SOURCE;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="py-section bg-paper">
      <div className="px-gutter mx-auto max-w-[1680px]">
        <SectionIntro id="reviews-title" eyebrow="Reviews and referrals" lines={["Travelers who", <em key="e" className="italic">felt gotten.</em>]} className="max-w-3xl" />

        <Reveal className="on-dark grain relative mt-14 grid gap-10 bg-ink p-8 text-sand md:mt-20 md:grid-cols-12 md:items-center md:gap-8 md:p-12">
          <div className="relative z-10 md:col-span-5">
            <p className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-none font-light">{s.recommended}</p>
            <p className="eyebrow mt-4 text-ember">Recommended on {s.name}</p>
          </div>
          <div className="relative z-10 md:col-span-7">
            <p className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug font-light">
              All {s.count} reviewers on {s.name} recommend us. <em className="italic">{s.note}</em>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-sand px-6 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ember"
              >
                Read all {s.count} reviews
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                <span className="sr-only">(opens {s.name} in a new tab)</span>
              </a>
              <span className="flex items-center gap-3 text-sm text-mist">
                <span aria-hidden className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-sand-2">
                  <Photo id="team/michele-avatar" sizes="40px" alt="" />
                </span>
                From Michele&rsquo;s {s.name} profile
              </span>
            </div>
          </div>
        </Reveal>

        {REVIEWS.length > 0 && (
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal as="li" key={r.name + i} delay={i * 0.1} className="flex flex-col justify-between border border-ink/12 bg-sand p-7 md:p-9">
                <blockquote className="font-display text-[1.5rem] leading-[1.25] font-light md:text-[1.7rem]">
                  <span aria-hidden className="mb-2 block text-5xl leading-none text-terracotta">“</span>
                  {r.quote}
                </blockquote>
                <footer className="mt-10 border-t border-ink/10 pt-6">
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="block text-sm text-ink-muted">{r.trip ? `${r.trip} · ` : ""}Verified on {s.name}</span>
                </footer>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
