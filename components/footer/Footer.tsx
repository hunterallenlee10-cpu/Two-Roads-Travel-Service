import Link from "next/link";
import { Phone } from "lucide-react";
import { FOOTER_NAV, SITE } from "@/data/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { PlanTripButton } from "@/components/ui/PlanTripButton";

export function Footer() {
  return (
    <footer className="on-dark grain relative bg-ink text-sand">
      <div className="px-gutter relative z-10 mx-auto max-w-[1680px] pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Two Roads Travel Service, home" className="inline-block">
              <Wordmark tone="light" size="lg" />
            </Link>
            <p className="font-display mt-8 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight font-light italic">
              {SITE.signature}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sand/30 px-5 text-sm font-semibold transition-colors hover:bg-sand hover:text-ink"
              >
                <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                {SITE.phone}
              </a>
              <PlanTripButton variant="light" />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_NAV.map((col) => (
              <div key={col.title} className={col.title === "Ways to travel" ? "row-span-2 sm:row-span-1" : ""}>
                <h2 className="eyebrow text-ember">{col.title}</h2>
                <ul className="mt-5 space-y-0.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="inline-flex min-h-11 items-center text-[0.9375rem] text-sand/80 transition-colors hover:text-sand sm:min-h-9">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 grid gap-4 border-t border-sand/15 pt-8 text-[0.8125rem] leading-relaxed text-mist md:grid-cols-2">
          <div className="space-y-1">
            <p>{SITE.network}</p>
            <p>{SITE.legal}</p>
          </div>
          <div className="space-y-1 md:text-right">
            <p>
              Photography by Pexels contributors.{" "}
              <Link href="/credits" className="underline decoration-mist/40 underline-offset-4 hover:text-sand">
                Photo credits
              </Link>
            </p>
            <p>{SITE.credit}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
