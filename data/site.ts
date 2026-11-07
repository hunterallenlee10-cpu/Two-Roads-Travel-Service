export const SITE = {
  name: "Two Roads Travel Service",
  shortName: "Two Roads",
  phone: "610-849-2302",
  phoneHref: "tel:+16108492302",
  signature: "We get you and we get you there.",
  tagline: "Travel better with a personalized travel experience.",
  network: "Part of the Uniglobe Travel Center network. Virtuoso affiliated.",
  legal: "Florida Seller of Travel Reg. No. ST32940, CST 2055333-40",
  credit: {
    prefix: "Built and operated by",
    name: "Lee Enterprises Unlimited",
    url: "https://www.leeenterprisesunlimited.com/",
  },
  // PLACEHOLDER: set NEXT_PUBLIC_SITE_URL to the live domain when deployed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Two Roads Travel Service plans cruises, river cruises, all-inclusives, destination weddings and tours with a personal advisor who takes the time to get you. We get you and we get you there.",
} as const;

export type NavLink = { label: string; href: string };

export const PRIMARY_NAV: NavLink[] = [
  { label: "Ways to Travel", href: "/#ways" },
  { label: "Destinations", href: "/destinations" },
  { label: "Journeys", href: "/#journeys" },
  { label: "Why an Advisor", href: "/why-an-advisor" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Every page from the original site's navigation lives here. */
export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Ways to travel",
    links: [
      { label: "Vacations", href: "/vacations" },
      { label: "Cruises", href: "/cruises" },
      { label: "River Cruises", href: "/river-cruises" },
      { label: "All-Inclusives", href: "/all-inclusives" },
      { label: "Destination Weddings", href: "/destination-weddings" },
      { label: "Tours", href: "/tours" },
      { label: "Luxury Escapes", href: "/luxury-escapes" },
      { label: "Resort Packages", href: "/resort-packages" },
      { label: "Short Stays", href: "/short-stays" },
      { label: "Sporting and Active", href: "/sporting-active" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Hot Deals", href: "/hot-deals" },
      { label: "New Destinations", href: "/new-destinations" },
      { label: "Featured Journeys", href: "/#journeys" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Meet Our Team", href: "/about" },
      { label: "Travel Resources", href: "/resources" },
      { label: "Customer Service", href: "/contact#customer-service" },
      { label: "Why Use a Travel Advisor", href: "/why-an-advisor" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
