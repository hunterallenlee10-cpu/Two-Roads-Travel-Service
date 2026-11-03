import { REVIEWS } from "@/data/content";
import { Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="py-section bg-paper">
      <div className="px-gutter mx-auto max-w-[1680px]">
        <SectionIntro id="reviews-title" eyebrow="In their words" lines={["Travelers who", <em key="e" className="italic">felt gotten.</em>]} className="max-w-3xl" />
        <ul className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal as="li" key={i} delay={i * 0.1} className="flex flex-col justify-between border border-ink/12 bg-sand p-7 md:p-9">
              <div>
                <span className="eyebrow inline-block rounded-full border border-dashed border-terracotta-deep/60 px-3 py-1.5 text-[0.6rem] leading-tight text-terracotta-deep">
                  Sample review, replace with real client reviews
                </span>
                <blockquote className="font-display mt-8 text-[1.5rem] leading-[1.25] font-light md:text-[1.7rem]">
                  <span aria-hidden className="mb-2 block text-5xl leading-none text-terracotta">“</span>
                  {r.quote}
                </blockquote>
              </div>
              <footer className="mt-10 flex items-center gap-4 border-t border-ink/10 pt-6">
                <span aria-hidden className="h-10 w-10 rounded-full bg-sand-2" />
                <span>
                  <span className="block text-sm font-semibold">Client name</span>
                  <span className="block text-sm text-ink-muted">{r.trip}</span>
                </span>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
