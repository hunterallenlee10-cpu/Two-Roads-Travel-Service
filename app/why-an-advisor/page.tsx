import type { Metadata } from "next";
import { FAQS } from "@/data/content";
import { SITE } from "@/data/site";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/pages/CtaBand";
import { WhyAdvisor } from "@/components/home/WhyAdvisor";
import { HowWeGetYou } from "@/components/home/HowWeGetYou";
import { Faq } from "@/components/home/Faq";
import { Reveal } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Why Use a Travel Advisor",
  description: "Why use a travel advisor? One conversation instead of hours of tabs, and a personal travel advocate before, during and after your trip.",
  alternates: { canonical: "/why-an-advisor" },
};

const ROLES = [
  { title: "A translator", body: "Fare rules, cabin categories, resort fine print. We turn it into plain language before you commit." },
  { title: "A matchmaker", body: "There are thousands of ships, resorts and tours. We narrow them to the few that fit you." },
  { title: "An advocate", body: "When something changes, you have a person to call who already knows your trip." },
  { title: "A second set of eyes", body: "Documents, timings, connections. We look for the gaps before they find you." },
];

export default function WhyAdvisorPage() {
  return (
    <>
      <PageHero
        image="pages/why"
        eyebrow="Why use a travel advisor"
        title={
          <>
            Travel better. <em className="italic">With someone who gets you.</em>
          </>
        }
        intro={SITE.tagline + " We take the time to understand your travel interests until we get you."}
      />
      <section aria-labelledby="roles-title" className="py-section bg-paper">
        <div className="px-gutter mx-auto max-w-[1680px]">
          <h2 id="roles-title" className="font-display text-headline max-w-[18ch] font-light">
            What an advisor <em className="italic">actually does.</em>
          </h2>
          <ul className="mt-14 grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.08} className="bg-paper p-8 md:p-10">
                <span className="eyebrow text-terracotta-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-8 text-3xl leading-tight font-light">{r.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{r.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <WhyAdvisor showLink={false} />
      <HowWeGetYou />
      <Faq items={FAQS.slice(0, 4)} />
      <CtaBand />
    </>
  );
}
