import type { ImageId } from "@/lib/images";
import type { Leaning, RoadOrNone } from "@/lib/road";

export type AtlasPlace = { name: string; image: ImageId; line: string };
export type AtlasChapter = {
  key: "sun" | "culture" | "wild";
  word: string;
  title: string;
  line: string;
  road: Leaning;
  places: AtlasPlace[];
};

/** The three destination moods from the original site. */
export const ATLAS: AtlasChapter[] = [
  {
    key: "sun",
    word: "Sun",
    title: "Sunny escapes",
    line: "Warm water, soft sand, nowhere to be.",
    road: "unwind",
    places: [
      { name: "Caribbean", image: "atlas/caribbean", line: "Island after island, each with its own pace." },
      { name: "Hawaii", image: "atlas/hawaii", line: "Na Pali cliffs and slow island roads." },
      { name: "Mexico", image: "atlas/mexico", line: "Cenotes, ruins and long beach days." },
      { name: "South Pacific", image: "atlas/south-pacific", line: "Lagoons in colors you have to see." },
    ],
  },
  {
    key: "culture",
    word: "Culture",
    title: "Art and culture",
    line: "Old streets, long lunches, stories in stone.",
    road: "discover",
    places: [
      { name: "Greece", image: "atlas/greece", line: "White villages, blue domes, the Aegean." },
      { name: "Hungary", image: "atlas/budapest", line: "Budapest glowing on the Danube." },
      { name: "India", image: "atlas/india", line: "Palaces, markets and the Taj at dawn." },
      { name: "USA", image: "atlas/usa", line: "Open roads and national parks." },
    ],
  },
  {
    key: "wild",
    word: "Wild",
    title: "For the adventurer",
    line: "Big skies, bigger landscapes.",
    road: "discover",
    places: [
      { name: "Africa", image: "atlas/africa", line: "Safari mornings on the open savanna." },
      { name: "Alaska", image: "atlas/alaska", line: "Glaciers you hear before you see." },
      { name: "South America", image: "atlas/south-america", line: "Patagonia peaks at first light." },
      { name: "Indonesia", image: "atlas/indonesia", line: "Bali rice terraces and temple days." },
    ],
  },
];

export function atlasFor(road: RoadOrNone): AtlasChapter[] {
  if (road === "discover") return [ATLAS[1], ATLAS[2], ATLAS[0]];
  if (road === "unwind") return [ATLAS[0], ATLAS[1], ATLAS[2]];
  return ATLAS;
}

export const REGIONS = [
  "Caribbean and Atlantic",
  "Mexico and Latin America",
  "USA and Canada",
  "Europe",
  "Asia and Pacific",
  "Africa and Middle East",
  "Polar",
  "Cruise routes",
] as const;
export type Region = (typeof REGIONS)[number];

export type Destination = { name: string; image: ImageId; region: Region; road: Leaning };

/** The full destination list from the original site's dropdown. */
export const DESTINATIONS: Destination[] = [
  { name: "Africa", image: "atlas/africa", region: "Africa and Middle East", road: "discover" },
  { name: "Alaska", image: "atlas/alaska", region: "USA and Canada", road: "discover" },
  { name: "Antarctica", image: "destinations/antarctica", region: "Polar", road: "discover" },
  { name: "Arctic", image: "destinations/arctic", region: "Polar", road: "discover" },
  { name: "Aruba", image: "destinations/aruba", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Asia", image: "destinations/asia", region: "Asia and Pacific", road: "discover" },
  { name: "Australia", image: "destinations/australia", region: "Asia and Pacific", road: "both" },
  { name: "Bahamas", image: "destinations/bahamas", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Baltic", image: "destinations/baltic", region: "Europe", road: "discover" },
  { name: "Bermuda", image: "destinations/bermuda", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Britain and Ireland", image: "destinations/britain-ireland", region: "Europe", road: "discover" },
  { name: "California", image: "destinations/california", region: "USA and Canada", road: "both" },
  { name: "Canada and New England", image: "destinations/canada-new-england", region: "USA and Canada", road: "both" },
  { name: "Western Canada", image: "destinations/western-canada", region: "USA and Canada", road: "discover" },
  { name: "Cancun", image: "destinations/cancun", region: "Mexico and Latin America", road: "unwind" },
  { name: "Caribbean (Eastern)", image: "destinations/caribbean-eastern", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Caribbean (Western)", image: "destinations/caribbean-western", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Caribbean (Southern)", image: "destinations/caribbean-southern", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Central America", image: "destinations/central-america", region: "Mexico and Latin America", road: "discover" },
  { name: "Europe", image: "destinations/europe", region: "Europe", road: "discover" },
  { name: "Florida", image: "destinations/florida", region: "USA and Canada", road: "unwind" },
  { name: "Hawaii", image: "atlas/hawaii", region: "Asia and Pacific", road: "unwind" },
  { name: "Jamaica", image: "destinations/jamaica", region: "Caribbean and Atlantic", road: "unwind" },
  { name: "Las Vegas", image: "destinations/las-vegas", region: "USA and Canada", road: "both" },
  { name: "Mediterranean", image: "destinations/mediterranean", region: "Europe", road: "both" },
  { name: "Mexican Riviera", image: "destinations/mexican-riviera", region: "Mexico and Latin America", road: "unwind" },
  { name: "Mexico", image: "atlas/mexico", region: "Mexico and Latin America", road: "unwind" },
  { name: "Middle East", image: "destinations/middle-east", region: "Africa and Middle East", road: "discover" },
  { name: "New Zealand", image: "destinations/new-zealand", region: "Asia and Pacific", road: "discover" },
  { name: "Northern Europe", image: "destinations/northern-europe", region: "Europe", road: "discover" },
  { name: "Panama Canal", image: "destinations/panama-canal", region: "Cruise routes", road: "discover" },
  { name: "South America", image: "atlas/south-america", region: "Mexico and Latin America", road: "discover" },
  { name: "South Pacific", image: "atlas/south-pacific", region: "Asia and Pacific", road: "unwind" },
  { name: "Transatlantic", image: "destinations/transatlantic", region: "Cruise routes", road: "unwind" },
  { name: "USA (Eastern)", image: "destinations/usa-eastern", region: "USA and Canada", road: "both" },
  { name: "USA (Western)", image: "destinations/usa-western", region: "USA and Canada", road: "discover" },
];
