import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/** Every public page. Add new pages here so search engines find them. */
const PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/why-an-advisor", priority: 0.8 },
  { path: "/destinations", priority: 0.8 },
  { path: "/vacations", priority: 0.7 },
  { path: "/cruises", priority: 0.7 },
  { path: "/river-cruises", priority: 0.7 },
  { path: "/all-inclusives", priority: 0.7 },
  { path: "/destination-weddings", priority: 0.7 },
  { path: "/tours", priority: 0.7 },
  { path: "/luxury-escapes", priority: 0.7 },
  { path: "/resort-packages", priority: 0.7 },
  { path: "/short-stays", priority: 0.7 },
  { path: "/sporting-active", priority: 0.7 },
  { path: "/hot-deals", priority: 0.6 },
  { path: "/new-destinations", priority: 0.6 },
  { path: "/resources", priority: 0.5 },
  { path: "/credits", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE.url}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
