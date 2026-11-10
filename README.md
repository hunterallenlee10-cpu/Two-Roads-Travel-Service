# Two Roads Travel Service

A concept redesign for Two Roads Travel Service, built around one idea: **Choose your road.**

The homepage forks into **Unwind** and **Discover**. The visitor's choice re-orders and re-voices the rest of the site (travel styles, the destination atlas, featured journeys and every call to action). Every CTA opens the **Trip Matchmaker**, a seven-step planner that ends in a printable Trip Dossier.

Front end only. No backend, no database, no API keys.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Other scripts:

```bash
npm run images       # re-optimize photos from source-images/ (sharp: warm grade, AVIF + WebP, blur placeholders)
npm run og           # re-render public/og-image.png
python3 scripts/make-logo.py  # re-cut the logo (source-images/brand/) into public/brand/*, app/icon.png and app/apple-icon.png
npm run lint
```

## Stack

Next.js 16 (App Router, TypeScript), Tailwind CSS 4, Framer Motion, GSAP + ScrollTrigger (code-split), Lenis, sharp, lucide-react. Fonts: Fraunces (display) and Manrope (UI), self-hosted via `next/font`.

## Where things live

| What | Where |
|---|---|
| Homepage sections | `components/home/*` |
| Trip Matchmaker (code-split) | `components/matchmaker/*` |
| Where leads are sent | `lib/submit.ts` → `submitTripRequest()` |
| Road state + localStorage | `components/providers/RoadProvider.tsx`, `lib/road.ts` |
| Inner page template | `components/pages/StylePage.tsx` + `data/pages.ts` |
| Site info, phone, legal line, nav | `data/site.ts` |
| Travel styles, destinations, journeys | `data/styles.ts`, `data/destinations.ts`, `data/journeys.ts` |
| Steps, comparison, FAQ, reviews | `data/content.ts` |
| Team bios, specialties, "why us", candid photos | `data/team.ts` (homepage section `components/home/MeetTheTeam.tsx`, page `/about`) |
| Travel resources copy | `data/resources.ts` |
| Image manifest (generated) | `data/images.generated.json` |
| Photo credits | `CREDITS.md`, and `/credits` on the site |

## Before launch: placeholders to replace

1. **Reviews** (`data/content.ts`, `REVIEWS` and `REVIEW_SOURCE`): the section shows the verified Virtuoso rating (100% recommended, 13 reviews) and links to the profile. Four reviews from the profile are on the page. Virtuoso blocks automated copying, so add more by pasting review text into `REVIEWS` word for word (quote, name as signed, optional trip) and the cards appear. Update `REVIEW_SOURCE.count` if the number changes.
2. **Office hours** (`app/contact/page.tsx`): "Office hours: add hours here".
3. **Lead delivery** (`lib/submit.ts`): `submitTripRequest()` logs the payload and shows the success state. Wire it to a webhook (n8n, Zapier, CRM). The TODO shows how.
4. **Site URL**: set `NEXT_PUBLIC_SITE_URL` to the live domain so canonical and Open Graph URLs are absolute.
5. **Search indexing**: the site ships with `robots: noindex, nofollow` because it is a concept preview of a real business. Remove it in `app/layout.tsx` when the client approves launch.
6. **Featured journey prices** (`data/journeys.ts`): as listed on the client's current site. Confirm before launch.
7. **Team bios** (`data/team.ts`): drafted from what the client shared (Michele owns the agency; her daughter Sarah is an advisor; their specialties). Have Michele and Sarah read and personalize them. Team photos live in `source-images/team/` (committed) and are listed in `source-images/g6.json`. Michele's portrait and both round avatars use the headshots the owner sent. Sarah's headshot arrived at 200x200, so her large About-page photo is still cropped from the group photo: ask for a larger version (at least 1000px wide) and add it as her `portrait` entry in `g6.json`.
8. **Logos**: Virtuoso and Uniglobe are mentioned in text only. Add official logos only with the client's permission and brand guidelines.

## Notes

- Prices carry the disclaimer "As listed, subject to change. Confirm with your advisor."
- Old page names redirect: `/customer-service`, `/travel-resources`, `/why-use-a-travel-advisor`, `/sporting-and-active`.
- Everything respects `prefers-reduced-motion`: Lenis is off, the Atlas becomes a native swipe gallery, and transforms are instant.
