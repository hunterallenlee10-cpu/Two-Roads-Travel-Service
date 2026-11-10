"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEAM } from "@/data/team";
import { ROADS } from "@/lib/road";
import { useRoad } from "@/components/providers/RoadProvider";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { Photo } from "@/components/ui/Photo";
import { ClipReveal, Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

/** The mother and daughter behind Two Roads. The advisor whose specialties fit the visitor's road gets a tag. */
export function MeetTheTeam() {
  const { road } = useRoad();
  return (
    <section id="team" aria-labelledby="team-title" className="py-section bg-paper">
      <div className="px-gutter mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <figure className="lg:col-span-6">
          <ClipReveal className="relative aspect-[4/5] overflow-hidden bg-sand-2 lg:aspect-[5/6]">
            <Photo id="team/together" sizes="(min-width: 1024px) 46vw, 100vw" />
          </ClipReveal>
          <figcaption className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
            <ForkGlyph className="h-4 w-4 text-terracotta" />
            Michele, left, and her daughter Sarah
          </figcaption>
        </figure>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionIntro
            id="team-title"
            eyebrow="Meet your advisors"
            lines={["Two advisors.", <em key="e" className="italic">One family.</em>]}
            lede="Two Roads is a mother and daughter team. We plan every trip like it is for family, because to us, it is."
          />

          <ul className="mt-12 border-t border-ink/15">
            {TEAM.map((a, i) => {
              const fits = road === a.road;
              return (
                <Reveal as="li" key={a.key} delay={0.1 + i * 0.08} className="flex items-center gap-5 border-b border-ink/10 py-6 md:gap-6">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-sand-2 md:h-24 md:w-24">
                    <Photo id={a.avatar} sizes="96px" alt="" />
                  </div>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-display text-[1.75rem] leading-none font-light md:text-[2rem]">{a.name}</span>
                      <span className="eyebrow text-[0.65rem] text-ink-muted">{a.role}</span>
                    </p>
                    <p className="mt-2 leading-snug text-ink-muted">{a.short}</p>
                    {fits && road && (
                      <p className="eyebrow mt-3 inline-flex items-center gap-2 rounded-full bg-terracotta/12 px-3 py-1.5 text-[0.62rem] text-terracotta-deep">
                        <ForkGlyph road={road} className="h-3.5 w-3.5" />
                        Fits {ROADS[road].title.replace("The road", "the road")}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Link
            href="/about"
            className="group mt-10 inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/30 px-6 text-sm font-semibold transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-sand"
          >
            Meet the team
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
