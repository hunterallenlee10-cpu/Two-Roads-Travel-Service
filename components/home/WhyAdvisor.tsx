import Link from "next/link";
import { ArrowRight, Minus } from "lucide-react";
import { COMPARISON } from "@/data/content";
import { ForkGlyph } from "@/components/brand/ForkGlyph";
import { Reveal } from "@/components/ui/Motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function WhyAdvisor({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="why" aria-labelledby="why-title" className="py-section bg-sand">
      <div className="px-gutter mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionIntro
            id="why-title"
            eyebrow="Why an advisor"
            lines={["Two ways", <em key="e" className="italic">to book a trip.</em>]}
            lede="Both get you a reservation. Only one gets you a person."
          />
          {showLink && (
            <Link
              href="/why-an-advisor"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              Why use a travel advisor <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          )}
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Booking it alone compared with booking with Two Roads</caption>
            <thead>
              <tr className="border-b border-ink/20">
                <th scope="col" className="eyebrow w-1/2 pr-4 pb-5 font-semibold text-ink-muted">
                  Booking it alone
                </th>
                <th scope="col" className="eyebrow w-1/2 pb-5 pl-4 font-semibold text-terracotta-deep">
                  Booking with Two Roads
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.us} className="border-b border-ink/10 align-top">
                  <td className="py-6 pr-4 md:py-8">
                    <Reveal delay={i * 0.05} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-muted md:text-lg">
                      <Minus aria-hidden className="mt-1 h-4 w-4 shrink-0 opacity-50" strokeWidth={1.5} />
                      <span>{row.alone}</span>
                    </Reveal>
                  </td>
                  <td className="py-6 pl-4 md:py-8">
                    <Reveal delay={i * 0.05 + 0.08} className="font-display flex gap-3 text-[1.125rem] leading-tight md:text-[1.75rem]">
                      <ForkGlyph road="discover" className="mt-1 h-5 w-5 shrink-0 text-ink" />
                      <span>{row.us}</span>
                    </Reveal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
