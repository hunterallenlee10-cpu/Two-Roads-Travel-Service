import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { PlanTripButton } from "@/components/ui/PlanTripButton";
import { ForkGlyph } from "@/components/brand/ForkGlyph";

export const metadata: Metadata = {
  title: "Wrong turn",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-sand">
      <div className="absolute inset-0">
        <Photo id="pages/notfound" sizes="100vw" priority />
      </div>
      <div aria-hidden className="absolute inset-0 bg-ink/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
      <div className="px-gutter relative z-10 mx-auto w-full max-w-[1400px] py-32 text-center">
        <ForkGlyph className="mx-auto h-14 w-14 text-sand/80" />
        <p className="eyebrow mt-8 text-sand/80">Error 404</p>
        <h1 className="font-display text-display mt-6 font-light">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="rise-in block">You took a wrong turn.</span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="rise-in block italic" style={{ animationDelay: "150ms" }}>
              Both roads lead home.
            </span>
          </span>
        </h1>
        <p className="text-lede fade-in mx-auto mt-8 max-w-[38ch] text-sand/85" style={{ animationDelay: "400ms" }}>
          The page you were looking for is not here. The trip you are looking for might be.
        </p>
        <div className="fade-in mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "550ms" }}>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-sand/40 px-8 font-semibold transition-colors hover:bg-sand hover:text-ink"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            Take me home
          </Link>
          <PlanTripButton variant="light" size="lg" />
        </div>
      </div>
    </section>
  );
}
