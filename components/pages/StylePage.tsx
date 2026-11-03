import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { STYLE_PAGES } from "@/data/pages";
import { TRAVEL_STYLES } from "@/data/styles";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";

export function styleMetadata(slug: string): Metadata {
  const p = STYLE_PAGES[slug];
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: `${p.title} | Two Roads Travel Service`, description: p.description, url: `/${slug}` },
  };
}

/** Shared template for every "way to travel" page. */
export function StylePage({ slug }: { slug: string }) {
  const p = STYLE_PAGES[slug];
  const preset = { interest: p.interest };
  const others = TRAVEL_STYLES.filter((s) => s.href !== `/${slug}`).slice(0, 4);

  return (
    <>
      <PageHero
        image={p.hero}
        eyebrow={p.eyebrow}
        title={
          <>
            {p.headline[0]} <em className="italic">{p.headline[1]}</em>
          </>
        }
        intro={p.intro}
        preset={preset}
      />

      <section aria-labelledby="points-title" className="py-section bg-sand">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-12">
          <SectionIntro
            id="points-title"
            eyebrow={`How we plan ${p.title.toLowerCase()}`}
            lines={["Planned around", <em key="e" className="italic">the way you travel.</em>]}
            className="lg:col-span-5"
          />
          <ol className="grid gap-0 lg:col-span-6 lg:col-start-7">
            {p.points.map((pt, i) => (
              <Reveal as="li" key={pt.title} delay={i * 0.08} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/15 py-8">
                <span className="font-display text-2xl font-light text-terracotta-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <h3 className="font-display text-[1.75rem] leading-tight font-light">{pt.title}</h3>
                  <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-muted">{pt.body}</p>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {p.extra === "deals" && <FeaturedJourneys />}

      {p.places.length > 0 && (
        <section aria-labelledby="places-title" className="py-section bg-paper">
          <div className="px-gutter mx-auto max-w-[1680px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionIntro
                id="places-title"
                eyebrow={p.extra === "new" ? "Worth a look" : "Where it shines"}
                lines={p.extra === "new" ? ["New roads", <em key="e" className="italic">to consider.</em>] : ["A few places", <em key="e" className="italic">to start.</em>]}
              />
              <Link href="/destinations" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                All destinations <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
            <ul className="mt-14 grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
              {p.places.map((pl, i) => (
                <Reveal as="li" key={pl.name} delay={i * 0.07}>
                  <figure className="relative aspect-[3/4] overflow-hidden bg-ink text-sand">
                    <Photo id={pl.image} sizes="(min-width: 1024px) 25vw, 50vw" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                    <figcaption className="font-display absolute bottom-4 left-4 text-2xl leading-none font-light md:text-3xl">{pl.name}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="goodfor-title" className="py-section bg-sand-2">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12">
          <SectionIntro id="goodfor-title" eyebrow="A good fit for" lines={["Is this", <em key="e" className="italic">your road?</em>]} className="lg:col-span-5" />
          <ul className="lg:col-span-6 lg:col-start-7">
            {p.goodFor.map((g, i) => (
              <Reveal as="li" key={g} delay={i * 0.06} className="font-display flex items-baseline gap-5 border-b border-ink/15 py-5 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-light">
                <span className="eyebrow text-terracotta-deep">{String(i + 1).padStart(2, "0")}</span>
                {g}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-sand py-20 md:py-28">
        <div className="px-gutter mx-auto max-w-[1680px]">
          <h2 id="more-title" className="eyebrow text-ink-muted">
            Other ways to travel
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {others.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden bg-ink">
                    <span className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-105">
                      <Photo id={s.image} sizes="(min-width: 768px) 25vw, 50vw" />
                    </span>
                  </span>
                  <span className="font-display mt-3 block text-xl leading-tight font-light md:text-2xl">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand preset={preset} />
    </>
  );
}
