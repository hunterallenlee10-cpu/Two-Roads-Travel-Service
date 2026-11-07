import type { ImageId } from "@/lib/images";

export const TRUST_ITEMS = [
  "A mother and daughter team",
  "Virtuoso affiliated",
  "Uniglobe Travel Center network",
  "Personal advisor from first idea to final flight home",
];

export type Step = { n: string; title: string; heading: string; body: string; image: ImageId };

/** "How we get you", built from the client's own words. */
export const STEPS: Step[] = [
  {
    n: "01",
    title: "Listen",
    heading: "We learn you until we get you.",
    body: "We start with you, not a brochure. Your pace, your people, the trip you keep almost booking. We take the time to understand your travel interests until we get you.",
    image: "how/listen",
  },
  {
    n: "02",
    title: "Design",
    heading: "We build it around you.",
    body: "First-hand experience and real partner relationships turn a wish list into a plan. The right package, cruise, shore excursions and restaurants, chosen for you.",
    image: "how/design",
  },
  {
    n: "03",
    title: "Advocate",
    heading: "We have your back.",
    body: "Before, during and after the trip, you have a personal travel advocate. From getting you on the flight to getting you home. When plans change, you call us.",
    image: "how/advocate",
  },
];

export const COMPARISON = [
  { alone: "Hours of open tabs", us: "One conversation" },
  { alone: "Fine print and surprise fees", us: "Everything explained before you book" },
  { alone: "On your own when a flight is cancelled", us: "Someone working on it with you" },
  { alone: "Reviews from strangers", us: "First-hand experience and partner relationships" },
  { alone: "A confirmation email", us: "A personal travel advocate" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Does it cost more to use an advisor?",
    a: "Often it does not. Advisors are commonly paid by the cruise lines, resorts and tour companies they book, so the price is usually what you would pay booking direct. Some trips involve a planning fee. Ask your advisor, policies vary, and you will know before anything is booked.",
  },
  {
    q: "Can you help with a trip I already booked?",
    a: "Sometimes. It depends on how and where it was booked. An advisor may be able to take over a reservation or plan the pieces around it, like excursions, transfers or travel protection. Call and ask. It is a short conversation.",
  },
  {
    q: "Do you plan destination weddings and groups?",
    a: "Yes. Shannon specializes in destination weddings, honeymoons and family vacations, and Michelle plans group and solo travel. Ask how guest bookings and group details are handled for your trip.",
  },
  {
    q: "What happens if my flight is cancelled?",
    a: "Call us. As your travel advocate we help you understand your options and work on getting you moving again. What is possible depends on the airline, the fare and any travel protection you have, so ask your advisor about specifics before you go.",
  },
  {
    q: "How far ahead should I book a cruise?",
    a: "Earlier usually means more choice of ships, sailings and cabins, especially for holidays and river cruises, which use smaller ships. Good last-minute options exist too. Ask your advisor what makes sense for your dates.",
  },
  {
    q: "Do you handle travel insurance and documents?",
    a: "We can walk you through travel protection options and help you understand which documents your trip needs, like passports and any visas. Entry rules change, so always confirm with official government sources as well.",
  },
  {
    q: "How do we get started?",
    a: "Call 610-849-2302 or open the Trip Matchmaker. Tell us a little about you, and Michelle or Shannon will reach out within one business day.",
  },
];

/** Sample reviews. Replace with real client reviews before launch. */
export const REVIEWS = [
  {
    quote: "They asked questions no booking site ever asked. The trip felt like it was built for the two of us.",
    trip: "Trip type placeholder",
  },
  {
    quote: "Our flight was cancelled on the way home. One call, and someone was working on it while we found dinner.",
    trip: "Trip type placeholder",
  },
  {
    quote: "Forty guests, one beach, zero stress for us. We just showed up and got married.",
    trip: "Trip type placeholder",
  },
];
