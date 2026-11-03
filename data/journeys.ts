import type { ImageId } from "@/lib/images";
import type { RoadOrNone } from "@/lib/road";

export type Journey = {
  key: string;
  title: string;
  line: string;
  operator: string;
  nights: number;
  fromPrice: string;
  image: ImageId;
  description: string;
};

export const PRICE_DISCLAIMER = "As listed, subject to change. Confirm with your advisor.";

/** Featured specials as listed on the client's current site. */
export const JOURNEYS: Journey[] = [
  {
    key: "prague-markets",
    title: "Prague and Christmas Markets of Europe",
    line: "Emerald Cruises",
    operator: "Emerald Cruises",
    nights: 17,
    fromPrice: "$6,386",
    image: "journeys/prague",
    description: "Lantern-lit squares, mulled wine and a river carrying you between some of Europe's most storied holiday markets.",
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
  },
];

export function journeysFor(road: RoadOrNone) {
  return road === "discover" ? [JOURNEYS[1], JOURNEYS[0]] : JOURNEYS;
}
