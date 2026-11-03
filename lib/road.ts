export type Road = "unwind" | "discover";
export type RoadOrNone = Road | null;

export const ROADS: Record<Road, { label: string; title: string; line: string; cta: string }> = {
  unwind: {
    label: "Unwind",
    title: "The road to Unwind",
    line: "Warm water, slow mornings, someone else handling every detail.",
    cta: "Plan my escape",
  },
  discover: {
    label: "Discover",
    title: "The road to Discover",
    line: "Old towns, wild places, rivers through history. See more of the world.",
    cta: "Plan my adventure",
  },
};

export function ctaLabel(road: RoadOrNone) {
  return road ? ROADS[road].cta : "Plan My Trip";
}

/** Items carry a lean toward a road. Chosen road floats its items first, stable otherwise. */
export type Leaning = Road | "both";

export function orderByRoad<T extends { road: Leaning }>(items: T[], road: RoadOrNone): T[] {
  if (!road) return items;
  const score = (l: Leaning) => (l === road ? 0 : l === "both" ? 1 : 2);
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => score(a.item.road) - score(b.item.road) || a.i - b.i)
    .map(({ item }) => item);
}

/** Copy that changes with the road. */
export function pick<T>(road: RoadOrNone, options: { unwind: T; discover: T; none: T }): T {
  return road ? options[road] : options.none;
}
