import { TRUST_ITEMS } from "@/data/content";
import { ForkGlyph } from "@/components/brand/ForkGlyph";

export function TrustStrip() {
  return (
    <section aria-label="Who we are" className="border-b border-ink/10 bg-sand">
      <ul className="px-gutter mx-auto flex max-w-[1920px] flex-col flex-wrap items-center justify-center gap-x-8 gap-y-3 py-7 text-center text-[0.9375rem] text-ink-muted md:flex-row md:py-8">
        {TRUST_ITEMS.map((item, i) => (
          <li key={item} className="smallcaps flex items-center gap-8">
            {i > 0 && <ForkGlyph className="hidden h-3.5 w-3.5 text-terracotta md:block" />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
