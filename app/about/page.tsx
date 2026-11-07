import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { OFF_THE_CLOCK, TEAM, WHY_US } from "@/data/team";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { CtaBand } from "@/components/pages/CtaBand";
import { Photo } from "@/components/ui/Photo";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { ClipReveal, Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "Two Roads Travel Service is a mother and daughter team. Meet Michele, owner and advisor for cruises, Europe, luxury, solo and group travel, and Sarah, advisor for family vacations, honeymoons and destination weddings.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Header: the two of them, front and center */}
      <section aria-labelledby="about-title" className="bg-sand pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6 lg:pb-8">
            <p className="eyebrow flex items-center gap-3 text-terracotta-deep">
              <span className="h-px w-8 bg-current" aria-hidden />
              Meet our team
            </p>
            <h1 id="about-title" className="font-display text-display mt-6 font-light">
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="rise-in block">Meet Michele</span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <em className="rise-in block italic" style={{ animationDelay: "90ms" }}>
                  and Sarah.
                </em>
              </span>
            </h1>
            <p className="text-lede fade-in mt-8 max-w-[44ch] text-ink-muted" style={{ animationDelay: "300ms" }}>
              A mother and daughter who plan your trip the way we would plan one for our own family. One of us will learn what you are hoping for, build it around you, and stay with you until you are home.
            </p>
            <div className="fade-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "450ms" }}>
              <PlanTripButton size="lg" />
              <a href={SITE.phoneHref} className="inline-flex min-h-14 items-center gap-2 px-2 font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                {SITE.phone}
              </a>
            </div>
          </div>
          <figure className="lg:col-span-5 lg:col-start-8">
            <div className="fade-in relative aspect-[4/5] overflow-hidden bg-sand-2">
              <Photo id="team/together" sizes="(min-width: 1024px) 40vw, 100vw" priority />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
              <ForkGlyph className="h-4 w-4 text-terracotta" />
              Michele, left, and her daughter Sarah
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title" className="py-section bg-paper">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-10 lg:grid-cols-12">
          <SectionIntro
            id="story-title"
            eyebrow="Our story"
            lines={["Family run.", <em key="e" className="italic">Personal by design.</em>]}
            className="lg:col-span-5"
          />
          <Reveal className="text-lede space-y-6 text-ink-muted lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p>
              Two Roads is a family business in the truest sense. Michele owns the agency, and her daughter Sarah plans alongside her as a travel advisor. We each have our own specialties, and we share one belief: travel goes better when someone takes the time to get you first.
            </p>
            <p>
              That is the difference between us and a booking site. A website can sell you a room. We want to know who you are traveling with, what you loved about your last trip, and what you never want to do again. Then we build around it, and we stay with you until you are home.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The advisors */}
      <section aria-label="Our advisors" className="py-section bg-sand">
        <div className="px-gutter mx-auto max-w-[1680px] space-y-24 md:space-y-36">
          {TEAM.map((a, i) => (
            <article key={a.key} id={a.key} aria-labelledby={`${a.key}-name`} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-12 md:gap-8">
              <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <ClipReveal className="relative mx-auto aspect-[4/5] max-w-[480px] overflow-hidden bg-sand-2 md:mx-0">
                  <Photo id={a.portrait} sizes="(min-width: 768px) 480px, 100vw" />
                </ClipReveal>
              </div>
              <div className={`md:col-span-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}>
                <p className="eyebrow text-terracotta-deep">{a.role}</p>
                <h2 id={`${a.key}-name`} className="font-display text-headline mt-5 font-light">
                  {a.name}
                </h2>
                <p className="font-display mt-3 text-2xl font-light italic text-ink-muted">{a.relation}.</p>
                <div className="mt-8 max-w-[52ch] space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
                  {a.bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <h3 className="eyebrow mt-10 text-ink">Specialties</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.specialties.map((s) => (
                    <li key={s} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-medium">
                      <ForkGlyph road={a.road} className="h-3.5 w-3.5 text-ink" />
                      {s}
                    </li>
                  ))}
                </ul>
                <PlanTripButton variant="outline" className="mt-10" label={`Plan a trip with ${a.name}`} preset={{ interest: `Planning with ${a.name}` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section aria-labelledby="why-us-title" className="py-section bg-paper">
        <div className="px-gutter mx-auto max-w-[1680px]">
          <SectionIntro
            id="why-us-title"
            eyebrow="Why plan with us"
            lines={["Better than booking", <em key="e" className="italic">on your own.</em>]}
            lede="A booking site gets you a reservation. We get you a trip that fits, and someone to call when it matters."
            className="max-w-4xl"
          />
          <ul className="mt-14 grid gap-px bg-ink/10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.08} className="bg-paper p-8 md:p-10">
                <span className="eyebrow text-terracotta-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-8 text-3xl leading-tight font-light">{w.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Off the clock */}
      <section aria-labelledby="travel-too-title" className="on-dark grain py-section relative bg-ink text-sand">
        <div className="px-gutter relative z-10 mx-auto max-w-[1680px]">
          <SectionIntro
            id="travel-too-title"
            tone="light"
            eyebrow="Off the clock"
            lines={["We travel too.", <em key="e" className="italic">And we bring it home to you.</em>]}
            className="max-w-4xl"
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-3 md:mt-20 md:gap-8">
            {OFF_THE_CLOCK.map((p, i) => (
              <Reveal as="li" key={p.image} delay={i * 0.1} className={i === 1 ? "sm:mt-16" : i === 2 ? "sm:mt-8" : ""}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
                    <Photo id={p.image} sizes="(min-width: 640px) 33vw, 100vw" />
                  </div>
                  <figcaption className="eyebrow mt-4 flex items-center gap-3 text-mist">
                    <span className="h-px w-6 bg-current" aria-hidden />
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand heading={["Tell us where you are dreaming of.", "One of us will take it from there."]} />
    </>
  );
}
