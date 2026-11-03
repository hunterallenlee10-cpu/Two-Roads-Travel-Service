import type { Road } from "@/lib/road";

export type RoadAnswer = Road | "both";

export type TripAnswers = {
  road: RoadAnswer | null;
  travelers: string | null;
  places: string[];
  when: string | null; // "Flexible" or "Month YYYY"
  length: string | null;
  budget: string | null;
  extras: string[];
  notes: string;
  name: string;
  email: string;
  phone: string;
  callTime: string | null;
  /** Where the visitor started, e.g. "Current hot deals" or a journey name. */
  interest: string | null;
};

export const EMPTY_ANSWERS: TripAnswers = {
  road: null,
  travelers: null,
  places: [],
  when: null,
  length: null,
  budget: null,
  extras: [],
  notes: "",
  name: "",
  email: "",
  phone: "",
  callTime: null,
  interest: null,
};

export const STEP_TITLES = [
  "Your road",
  "Who is traveling",
  "Where your heart is pulling",
  "When, and for how long",
  "Budget per person",
  "What would make it unforgettable",
  "How to reach you",
] as const;

export const ROAD_OPTIONS: { value: RoadAnswer; label: string; line: string }[] = [
  { value: "unwind", label: "Unwind", line: "Beaches, cruises, spa, all-inclusive calm." },
  { value: "discover", label: "Discover", line: "Culture, river cruises, safaris, the wild." },
  { value: "both", label: "A little of both", line: "Some days to explore, some to do nothing." },
];

export const TRAVELER_OPTIONS = ["Solo", "Couple", "Family", "Friends", "Wedding or group"];

export const SURPRISE = "Surprise me";

export const LENGTH_OPTIONS = ["A weekend", "A week", "10 to 14 nights", "Longer"];

export const BUDGET_OPTIONS = ["Under $1,000", "$1,000 to $2,000", "$2,000 to $3,000", "$3,000+", "Help me decide"];

export const EXTRA_OPTIONS = [
  "Private tours",
  "Food and wine",
  "Adults only",
  "Spa",
  "Adventure",
  "Celebrations",
  "Accessibility needs",
];

export const CALL_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];

export type MatchmakerPreset = {
  road?: RoadAnswer | null;
  interest?: string;
  startStep?: number;
};
