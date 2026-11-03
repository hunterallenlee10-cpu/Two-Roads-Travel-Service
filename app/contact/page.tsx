import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { PageHero } from "@/components/pages/PageHero";
import { CallbackForm } from "@/components/pages/CallbackForm";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { Reveal } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call Two Roads Travel Service at 610-849-2302, request a call back, or start the Trip Matchmaker.",
  alternates: { canonical: "/contact" },
};

const SERVICE = [
  { title: "Changes to a booking", body: "Call your advisor. What can change depends on the supplier and your fare or booking terms. Ask your advisor, policies vary." },
  { title: "Problems on a travel day", body: "Delays, cancellations, missed connections. Call us, and we will help you understand your options." },
  { title: "Documents and final payments", body: "Your advisor will let you know what is due and when, and help you check which documents your trip needs." },
  { title: "After you are home", body: "Feedback, a question about a charge, or planning the next one. We would love to hear how it went." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="pages/contact"
        eyebrow="Contact"
        title={
          <>
            One conversation. <em className="italic">That is where it starts.</em>
          </>
        }
        intro="Call, request a call back, or start the Trip Matchmaker. A real person will take it from there."
        short
      >
        <a href={SITE.phoneHref} className="inline-flex min-h-14 items-center gap-2 px-2 font-semibold underline decoration-sand/40 underline-offset-4 hover:decoration-sand">
          <Phone aria-hidden className="h-4 w-4" /> {SITE.phone}
        </a>
      </PageHero>

      <section aria-label="Ways to reach us" className="py-section bg-sand">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-6 lg:grid-cols-12">
          <Reveal className="on-dark grain relative flex flex-col justify-between bg-ink p-8 text-sand md:p-12 lg:col-span-5">
            <div className="relative z-10">
              <p className="eyebrow text-ember">Call us</p>
              <a href={SITE.phoneHref} className="font-display mt-6 block text-[clamp(2.5rem,5vw,4.75rem)] leading-none font-light hover:text-ember">
                {SITE.phone}
              </a>
              <p className="mt-6 max-w-[34ch] text-mist">Tap to call from your phone. Tell us where you are dreaming of, or what is not going to plan.</p>
              {/* PLACEHOLDER: confirm office hours with the client. */}
              <p className="mt-6 inline-block border border-dashed border-sand/40 px-3 py-2 text-sm text-sand/85">Office hours: add hours here</p>
            </div>
            <div className="relative z-10 mt-14 border-t border-sand/15 pt-8">
              <p className="eyebrow text-ember">Prefer to start in writing?</p>
              <p className="font-display mt-4 text-3xl leading-tight font-light">
                The Trip Matchmaker takes <em className="italic">about two minutes.</em>
              </p>
              <PlanTripButton variant="light" className="mt-6" label="Start the Trip Matchmaker" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="border border-ink/10 bg-paper p-8 md:p-12 lg:col-span-7">
            <p className="eyebrow text-terracotta-deep">Request a call back</p>
            <h2 className="font-display text-title mt-4 max-w-[20ch] font-light">
              Tell us when to call. <em className="italic">We will be there.</em>
            </h2>
            <div className="mt-10">
              <CallbackForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="customer-service" aria-labelledby="service-title" className="py-section scroll-mt-24 bg-paper">
        <div className="px-gutter mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3 text-terracotta-deep">
              <span className="h-px w-8 bg-current" aria-hidden />
              Customer service
            </p>
            <h2 id="service-title" className="font-display text-headline mt-6 font-light">
              Already traveling <em className="italic">with us?</em>
            </h2>
            <p className="text-lede mt-6 max-w-[34ch] text-ink-muted">You have a personal travel advocate. Before, during and after the trip.</p>
          </div>
          <ul className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {SERVICE.map((s) => (
              <li key={s.title} className="bg-paper p-7 md:p-9">
                <h3 className="font-display text-2xl leading-tight font-light">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
