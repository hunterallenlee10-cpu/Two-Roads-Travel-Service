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
    a: "Yes. Sarah specializes in destination weddings, honeymoons and family vacations, and Michele plans group and solo travel. Ask how guest bookings and group details are handled for your trip.",
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
    a: "Call 610-849-2302 or open the Trip Matchmaker. Tell us a little about you, and Michele or Sarah will reach out within one business day.",
  },
];

/** Where the agency's verified client reviews live. Figures as shown on the public profile. */
export const REVIEW_SOURCE = {
  name: "Virtuoso",
  url: "https://www.virtuoso.com/advisor/michshan75909/travel/advisors/16175909",
  recommended: "100%",
  count: 13,
  note: "All reviews are from confirmed guests.",
};

export type Review = {
  quote: string;
  /** Name exactly as the reviewer signed it, e.g. "Jen M." */
  name: string;
  /** Optional: where or how they traveled, e.g. "Honeymoon in St. Lucia". */
  trip?: string;
  /** Date shown on the review, e.g. "June 2026". */
  date?: string;
};

/**
 * Real client reviews, copied word for word from the Virtuoso profile above, newest first.
 * If this list is empty, the section shows only the verified rating and a link.
 */
export const REVIEWS: Review[] = [
  {
    quote:
      "Our stay at the Fairmont Pacific Rim was absolutely exceptional and exceeded every expectation. Michele Shannon recommended this hotel, and it was the perfect choice for our visit to Vancouver. The property is stunning—beautifully designed, luxurious, and perfectly located. One of our favorite perks was the courtesy car service, which made getting around the city so convenient and added an extra touch of VIP treatment. The Virtuoso amenities were wonderful, especially the delicious breakfast, which was a fantastic way to start each day. The staff was warm, attentive, and provided impeccable service throughout our stay. From the elegant accommodations to the thoughtful amenities and outstanding service, the Fairmont Pacific Rim delivered an unforgettable experience. We are so grateful to Michele Shannon for her excellent recommendation and would highly recommend both this hotel and booking through her expertise.",
    name: "Des",
    trip: "Fairmont Pacific Rim, Vancouver",
    date: "June 2026",
  },
  {
    // The reviewer opened with "⭐️⭐️⭐️⭐️⭐️ Review for Michele Shannon, Two Roads Travel Service". That heading is left off here.
    quote:
      "Michele is absolutely incredible! She goes above and beyond every single time to make sure my trips are seamless and stress-free. From flights and hotels to unique experiences, everything is perfectly planned down to the smallest detail. Her knowledge, professionalism, and personal touch make every journey unforgettable. I never have to worry because Michele anticipates my needs and delivers exceptional service. If you want a travel advisor who truly cares and consistently exceeds expectations, Michele is the one",
    name: "Biagio",
    trip: "Always above and beyond",
    date: "November 2025",
  },
  {
    quote:
      "I had an amazing experience working with Michele Shannon from Two Roads Travel Service! She found me the perfect hotel — The Crawford Hotel, located right inside Denver’s Union Station. The location couldn't have been more convenient, especially arriving by train. The hotel was stunning, comfortable, and full of charm, with great amenities and easy access to everything downtown. Michele really listened to what I was looking for and made the whole process seamless. Her attention to detail and knowledge of the area made all the difference. I highly recommend Michele and Two Roads Travel Service for anyone looking for expert, personalized travel planning!",
    name: "Ray D",
    trip: "The Crawford Hotel, Denver",
    date: "May 2025",
  },
  {
    quote:
      "Michele was excellent to work with and promptly answered any questions. She was also very knowledgeable about Oceania and provided helpful insights.",
    name: "Ray D",
    trip: "Oceania cruise",
    date: "December 2024",
  },
];
