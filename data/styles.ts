import type { ImageId } from "@/lib/images";
import type { Leaning, RoadOrNone } from "@/lib/road";

export type TravelStyle = {
  key: string;
  title: string;
  href: string;
  image: ImageId;
  line: string;
  road: Leaning;
};

/** The eight homepage cards. */
export const TRAVEL_STYLES: TravelStyle[] = [
  { key: "ocean", title: "Ocean Cruises", href: "/cruises", image: "styles/ocean-cruise", line: "Unpack once. Wake up somewhere new.", road: "unwind" },
  { key: "river", title: "River Cruises", href: "/river-cruises", image: "styles/river-cruise", line: "Small ships through the heart of old Europe.", road: "discover" },
  { key: "all-inclusive", title: "All-Inclusives", href: "/all-inclusives", image: "styles/all-inclusive", line: "Every meal, every sunset, already handled.", road: "unwind" },
  { key: "tours", title: "Tours", href: "/tours", image: "styles/tours", line: "Guided days, local stories, no guesswork.", road: "discover" },
  { key: "weddings", title: "Destination Weddings", href: "/destination-weddings", image: "styles/destination-wedding", line: "Say yes somewhere unforgettable.", road: "unwind" },
  { key: "active", title: "Active and Sporting", href: "/sporting-active", image: "styles/active", line: "Trails, paddles and the view you earned.", road: "discover" },
  { key: "luxury", title: "Luxury Escapes", href: "/luxury-escapes", image: "styles/luxury", line: "Quiet suites, private moments, nothing rushed.", road: "unwind" },
  { key: "short", title: "Short Stays", href: "/short-stays", image: "styles/short-stays", line: "A long weekend that feels like a week.", road: "both" },
];

const ORDER: Record<"unwind" | "discover", string[]> = {
  unwind: ["ocean", "all-inclusive", "luxury", "weddings", "short", "river", "tours", "active"],
  discover: ["river", "tours", "active", "short", "ocean", "luxury", "all-inclusive", "weddings"],
};

export function stylesFor(road: RoadOrNone) {
  if (!road) return TRAVEL_STYLES;
  return ORDER[road].map((k) => TRAVEL_STYLES.find((s) => s.key === k)!);
}
