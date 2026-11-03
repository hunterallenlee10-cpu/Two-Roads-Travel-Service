import type { Metadata } from "next";
import credits from "@/data/credits.generated.json";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Photography credits for the Two Roads Travel Service concept site.",
  alternates: { canonical: "/credits" },
};

type Credit = { id: string; section: string; photographer: string; pageUrl: string; license: string };

export default function CreditsPage() {
  const list = credits as Credit[];
  return (
    <section className="bg-sand pt-36 pb-24">
      <div className="px-gutter mx-auto max-w-[1100px]">
        <p className="eyebrow text-terracotta-deep">Photo credits</p>
        <h1 className="font-display text-headline mt-6 font-light">
          The eyes <em className="italic">behind the views.</em>
        </h1>
        <p className="text-lede mt-6 max-w-[56ch] text-ink-muted">
          Every photograph on this site comes from Pexels and is used under the Pexels License. Thank you to these photographers.
        </p>
        <table className="mt-14 w-full border-collapse text-left text-sm">
          <caption className="sr-only">Photographs, photographers and sources</caption>
          <thead>
            <tr className="border-b border-ink/20">
              <th scope="col" className="eyebrow hidden py-3 pr-4 text-ink-muted sm:table-cell">Photo</th>
              <th scope="col" className="eyebrow py-3 pr-4 text-ink-muted">Photographer</th>
              <th scope="col" className="eyebrow py-3 text-ink-muted">Source</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b border-ink/10">
                <td className="hidden py-3 pr-4 break-all text-ink-muted sm:table-cell">{c.id}</td>
                <td className="py-3 pr-4 font-medium">{c.photographer}</td>
                <td className="py-3">
                  <a href={c.pageUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    Pexels<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
