import type { ImageId } from "@/lib/images";
import { orderByRoad, type Leaning, type RoadOrNone } from "@/lib/road";

export type Journey = {
  key: string;
  title: string;
  line: string;
  operator: string;
  nights: number;
  fromPrice: string;
  /** Label above the price. Defaults to "From". */
  priceLabel?: string;
  /** Small text after the price. Defaults to "pp". */
  priceNote?: string;
  image: ImageId;
  description: string;
  road: Leaning;
  /** Shown first whatever road the visitor picks, e.g. a hosted group sailing. */
  lead?: boolean;
  /** Short tag on the photo, e.g. "Group cruise". */
  badge?: string;
  /** Extra facts listed under the price, e.g. ship, sail date, stateroom. */
  details?: { label: string; value: string }[];
  /** Ports of call in order. */
  ports?: string[];
};

export const PRICE_DISCLAIMER = "As listed, subject to change. Confirm with your advisor.";

/**
 * Featured journeys. Keep three or four at a time, with a mix of ocean cruises,
 * river cruises and land vacations. Order here is the default order on the page.
 */
export const JOURNEYS: Journey[] = [
  {
    key: "alaska-azamara",
    title: "Alaska Cruise: Juneau, Ketchikan and Valdez",
    line: "Azamara Cruises",
    operator: "Azamara Cruises",
    // 10 nights, Vancouver (Jul 5) to Whittier (Jul 15). Port order per three agency
    // listings of this sailing; azamara.com could not be checked. Confirm with the client.
    nights: 10,
    fromPrice: "$8,358",
    priceLabel: "Price",
    priceNote: "based on double occupancy",
    image: "journeys/alaska",
    description:
      "Sail with our group aboard Azamara Pursuit, from Vancouver up the Inside Passage to the ice of Hubbard Glacier and the fjords of Prince William Sound. A smaller ship, so you reach the smaller ports too.",
    road: "both",
    lead: true,
    badge: "Group cruise",
    details: [
      { label: "Ship", value: "Azamara Pursuit" },
      { label: "Sails", value: "July 5, 2027" },
      { label: "Route", value: "Vancouver to Whittier" },
      { label: "Stateroom", value: "Veranda (V3)" },
    ],
    ports: [
      "Vancouver",
      "Inside Passage (cruising)",
      "Ketchikan",
      "Klawock",
      "Juneau",
      "Skagway",
      "Icy Strait Point",
      "Hubbard Glacier (cruising)",
      "Valdez",
      "Seward",
      "Whittier",
    ],
  },
  {
    key: "prague-markets",
    title: "Prague and Christmas Markets of Europe",
    line: "Emerald Cruises",
    operator: "Emerald Cruises",
    nights: 17,
    fromPrice: "$6,386",
    image: "journeys/prague",
    description: "Lantern-lit squares, mulled wine and a river carrying you between some of Europe's most storied holiday markets.",
    road: "unwind",
  },
  {
    key: "danube-active",
    title: "Active and Discovery on the Danube (Westbound)",
    line: "Avalon Waterways",
    operator: "Avalon Waterways",
    nights: 7,
    fromPrice: "$5,251",
    image: "journeys/danube",
    description: "A river cruise with room to move. Explore the Danube's towns and valleys at your own pace, then return to your floating hotel.",
    road: "discover",
  },
];

/** Lead journeys first, then the rest ordered by the visitor's road. */
export function journeysFor(road: RoadOrNone) {
  return [...JOURNEYS.filter((j) => j.lead), ...orderByRoad(JOURNEYS.filter((j) => !j.lead), road)];
}
