import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { OFFICIAL_SOURCES, RESOURCES } from "@/data/resources";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/pages/CtaBand";

export const metadata: Metadata = {
  title: "Travel Resources",
  description: "A travel checklist, passport and document tips, a packing list and travel insurance basics from Two Roads Travel Service.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        image="pages/resources"
        eyebrow="Travel resources"
        title={
          <>
            Ready, <em className="italic">set, go.</em>
          </>
        }
        intro="Checklists and plain-language basics for a calmer departure. General guidance only. Your advisor can tell you what applies to your trip."
        short
      >
        <a href="#checklist" className="inline-flex min-h-14 items-center px-2 font-semibold underline decoration-sand/40 underline-offset-4 hover:decoration-sand">
          Start with the checklist
        </a>
      </PageHero>

      <div className="py-section bg-sand">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-ink-muted">On this page</p>
              <ol className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
                {RESOURCES.map((r, i) => (
                  <li key={r.id}>
                    <a
                      href={`#${r.id}`}
                      className="font-display inline-flex min-h-11 items-center gap-3 rounded-full border border-ink/15 px-4 text-lg font-light hover:border-ink lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:text-2xl"
                    >
                      <span className="eyebrow text-terracotta-deep">{String(i + 1).padStart(2, "0")}</span>
                      {r.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="space-y-28 lg:col-span-8 lg:col-start-5">
            {RESOURCES.map((r) => (
              <section key={r.id} id={r.id} aria-labelledby={`${r.id}-title`} className="scroll-mt-28">
                <h2 id={`${r.id}-title`} className="font-display text-headline font-light">
                  {r.title}
                </h2>
                <p className="text-lede mt-5 max-w-[50ch] text-ink-muted">{r.lede}</p>
                <div className="mt-12 grid gap-10 md:grid-cols-2">
                  {r.groups.map((g) => (
                    <div key={g.heading} className="border-t border-ink/15 pt-6">
                      <h3 className="eyebrow text-terracotta-deep">{g.heading}</h3>
                      <ul className="mt-5 space-y-4">
                        {g.items.map((it) => (
                          <li key={it} className="flex gap-3 leading-relaxed">
                            <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-terracotta-deep" strokeWidth={2} />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <aside aria-labelledby="sources-title" className="bg-sand-2 p-8 md:p-12">
              <h2 id="sources-title" className="font-display text-title font-light">
                Always check <em className="italic">the official word.</em>
              </h2>
              <p className="mt-4 max-w-[56ch] text-ink-muted">
                This page is general information, not legal, medical or insurance advice. Entry rules and requirements change, so confirm with official sources before you travel.
              </p>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {OFFICIAL_SOURCES.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      {s.label}
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
      <CtaBand heading={["Questions about your trip?", "Ask your advisor."]} />
    </>
  );
}
