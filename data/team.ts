import type { ImageId } from "@/lib/images";
import type { Road } from "@/lib/road";

/**
 * The people behind Two Roads.
 * Facts here come from the client: Michelle owns the agency, her daughter Shannon is a travel advisor,
 * and each has her own specialties. Bios are drafts for the client to review and personalize.
 */
export type Advisor = {
  key: "michelle" | "shannon";
  name: string;
  role: string;
  /** How she fits in the family, shown as a small line under the name. */
  relation: string;
  specialties: string[];
  short: string;
  bio: string[];
  portrait: ImageId;
  /** The road her specialties lean toward. Highlights her card when a visitor picks that road. */
  road: Road;
};

export const TEAM: Advisor[] = [
  {
    key: "michelle",
    name: "Michelle",
    role: "Owner and travel advisor",
    relation: "The mom",
    specialties: ["Cruises", "European travel", "Luxury experiences", "Solo travel", "Group travel"],
    short: "Cruises, Europe, luxury, and trips for solo travelers and groups.",
    bio: [
      "Michelle owns Two Roads. Her focus is cruises, travel through Europe, luxury experiences, and trips for solo travelers and groups.",
      "Whether you are taking your first trip on your own or bringing a group of friends along, she builds the trip around the people on it, and she stays in your corner until you are home.",
    ],
    portrait: "team/michelle",
    road: "discover",
  },
  {
    key: "shannon",
    name: "Shannon",
    role: "Travel advisor",
    relation: "The daughter",
    specialties: ["Family vacations", "Honeymoons", "Destination weddings"],
    short: "Family vacations, honeymoons and destination weddings.",
    bio: [
      "Shannon plans the trips people talk about for years: family vacations, honeymoons and destination weddings.",
      "She takes care of the moving parts, so you can be fully present for the moments that matter, whether that is your kids' first look at the ocean or your first dance as a married couple.",
    ],
    portrait: "team/shannon",
    road: "unwind",
  },
];

/** Why planning with the two of us is different from booking on your own. */
export const WHY_US = [
  {
    title: "You know who you are talking to.",
    body: "Not a call center, not a chatbot. Michelle or Shannon, by name, from the first idea to the flight home.",
  },
  {
    title: "Two specialists, one family.",
    body: "Between us we cover honeymoons and river cruises, family beach weeks and European tours. If your trip crosses into the other's specialty, you get both of us.",
  },
  {
    title: "We plan it like it is our own.",
    body: "We travel too, and we bring what we learn on the road into every trip we plan for you.",
  },
  {
    title: "Someone in your corner.",
    body: "Before, during and after the trip. When plans change, you call us, not a hold line.",
  },
];

/** Candid photos from the team's own travels. Captions stay general on purpose. */
export const OFF_THE_CLOCK: { image: ImageId; caption: string }[] = [
  { image: "team/summit", caption: "Earning the view" },
  { image: "team/toast", caption: "A toast to the trip" },
  { image: "team/workshop", caption: "Always learning something new" },
];
