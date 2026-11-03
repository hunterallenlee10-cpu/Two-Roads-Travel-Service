export type ResourceSection = {
  id: string;
  title: string;
  lede: string;
  groups: { heading: string; items: string[] }[];
};

/** General, evergreen guidance. Requirements change, so the page points to official sources. */
export const RESOURCES: ResourceSection[] = [
  {
    id: "checklist",
    title: "Travel checklist",
    lede: "A simple timeline. Start early and the last week stays calm.",
    groups: [
      {
        heading: "Three months or more",
        items: [
          "Check passport expiration dates. Many countries expect six months of validity beyond your return.",
          "Look up entry requirements and visas for every country, including stops along the way.",
          "Consider travel protection soon after your first deposit. Some benefits are time sensitive.",
          "See a doctor or travel clinic about any recommended vaccines or medicines, ideally a month or more before you go.",
        ],
      },
      {
        heading: "One month out",
        items: [
          "Confirm that names on every booking match your ID exactly.",
          "Tell your bank and card issuers your travel dates, and check foreign transaction fees.",
          "Arrange pet care, mail and house care.",
          "Refill prescriptions so you have enough for the trip plus a few extra days.",
        ],
      },
      {
        heading: "The week before",
        items: [
          "Save your itinerary and confirmations offline on your phone, and print a copy.",
          "Download airline and cruise line apps. Check baggage allowances.",
          "Check the weather and pack for it.",
          "Share your itinerary with someone at home.",
        ],
      },
      {
        heading: "The day before",
        items: [
          "Check in online when it opens.",
          "Charge everything. Pack chargers and an adapter in your carry-on.",
          "Put passports, IDs and travel documents in one place.",
          "Plan the drive or ride to the airport or port with time to spare.",
        ],
      },
    ],
  },
  {
    id: "documents",
    title: "Passport and documents",
    lede: "Most travel headaches start with paperwork. A few habits prevent nearly all of them.",
    groups: [
      {
        heading: "Passports",
        items: [
          "Apply or renew well ahead. Processing times change, so check current times at travel.state.gov.",
          "Some countries also require blank passport pages for entry stamps.",
          "Keep a photo of your passport stored securely and separately from the original.",
        ],
      },
      {
        heading: "Flying within the U.S.",
        items: [
          "Adults need a REAL ID compliant license or another acceptable ID, such as a passport, to fly domestically. See tsa.gov for the full list.",
        ],
      },
      {
        heading: "Cruises",
        items: [
          "Some closed-loop cruises from U.S. ports accept other proof of citizenship for U.S. citizens, but a passport is strongly recommended in case you need to fly home from a foreign port.",
        ],
      },
      {
        heading: "Families and good habits",
        items: [
          "Children traveling with one parent or with other adults may need a signed consent letter. Rules vary by country.",
          "U.S. citizens can enroll in the State Department's Smart Traveler Enrollment Program (STEP) for safety updates.",
        ],
      },
    ],
  },
  {
    id: "packing",
    title: "Packing list",
    lede: "Pack for the trip you planned, not every trip you might take.",
    groups: [
      {
        heading: "Always in your carry-on",
        items: [
          "Passport or ID, and printed and digital copies of your itinerary",
          "Medications in their original containers",
          "Phone, charger, power bank and plug adapter",
          "A change of clothes and basic toiletries, liquids in travel sizes per TSA rules",
          "Cards and a little local currency",
        ],
      },
      {
        heading: "Clothing",
        items: [
          "Layers, because planes, ships and evenings run cool",
          "Comfortable walking shoes you have already broken in",
          "One dressier outfit for nice dinners or cruise evenings",
          "Swimwear, a light rain jacket and a sun hat",
        ],
      },
      {
        heading: "Small things that help",
        items: [
          "Reusable water bottle",
          "Sunscreen, reef-safe where required",
          "A small first aid kit and any motion sickness remedies",
          "A tote for beach days and market finds",
        ],
      },
    ],
  },
  {
    id: "insurance",
    title: "Travel insurance basics",
    lede: "Travel protection is about the trip you have already paid for, and the health care you might need away from home.",
    groups: [
      {
        heading: "What policies commonly cover",
        items: [
          "Trip cancellation: reimbursement of prepaid, non-refundable costs if you cancel for a covered reason.",
          "Trip interruption: help if you have to cut a trip short for a covered reason.",
          "Medical care while traveling. Many domestic health plans, including Original Medicare, offer limited or no coverage abroad.",
          "Emergency medical evacuation, which can be very costly without coverage.",
          "Baggage loss and travel delays.",
        ],
      },
      {
        heading: "Worth knowing",
        items: [
          "Pre-existing condition waivers often require buying within a short window after your first trip deposit.",
          "Cancel For Any Reason upgrades exist on some plans. They usually reimburse part of your cost, not all of it, and must be bought early.",
          "Read what counts as a covered reason. Ask your advisor to help compare options.",
        ],
      },
    ],
  },
];

export const OFFICIAL_SOURCES = [
  { label: "U.S. passports and travel advisories", href: "https://travel.state.gov" },
  { label: "TSA: ID and security rules", href: "https://www.tsa.gov" },
  { label: "CDC Travelers' Health", href: "https://wwwnc.cdc.gov/travel" },
  { label: "Smart Traveler Enrollment Program", href: "https://step.state.gov" },
];
