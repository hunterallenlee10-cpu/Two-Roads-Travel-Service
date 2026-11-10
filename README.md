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
| Where leads are sent | `lib/submit.ts` → `/api/lead` → n8n → Michele's email |
| Road state + localStorage | `components/providers/RoadProvider.tsx`, `lib/road.ts` |
| Inner page template | `components/pages/StylePage.tsx` + `data/pages.ts` |
| Site info, phone, legal line, nav | `data/site.ts` |
| Travel styles, destinations, journeys | `data/styles.ts`, `data/destinations.ts`, `data/journeys.ts` |
| Steps, comparison, FAQ, reviews | `data/content.ts` |
| Team bios, specialties, "why us", candid photos | `data/team.ts` (homepage section `components/home/MeetTheTeam.tsx`, page `/about`) |
| Travel resources copy | `data/resources.ts` |
| Image manifest (generated) | `data/images.generated.json` |
| Photo credits | `CREDITS.md`, and `/credits` on the site |

## Launch status

Live at https://tworoadstravelservice.com. Everything on the launch checklist is done.

1. **Reviews** (`data/content.ts`, `REVIEWS` and `REVIEW_SOURCE`): the verified Virtuoso rating (100% recommended, 13 reviews), a link to the profile, and four reviews copied word for word. Virtuoso and WeddingWire block automated copying, so add more by pasting review text into `REVIEWS` (quote, name as signed, optional trip and date) and the cards appear. Update `REVIEW_SOURCE.count` if the number changes. A wedding, honeymoon or family review would round out the set, since the current four are all about Michele's hotel and cruise bookings.
2. **Lead delivery**: Matchmaker and call-back requests post to `/api/lead` (`app/api/lead/route.ts`), which builds the email (`lib/lead-email.ts`) and forwards it to the n8n workflow "Two Roads: Website leads to Michele". n8n checks the site key and emails mshannon@tworoadstravelservice.com from the connected Gmail, with reply-to set to the traveler. Vercel production env: `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` (must match the key in the workflow's "Valid Site Key?" step). If sending fails, the form asks the visitor to call instead. Keep the workflow published and its Gmail credential connected.
3. **Site URL**: https://tworoadstravelservice.com (`NEXT_PUBLIC_SITE_URL` in Vercel, with the same default in `data/site.ts`).
4. **Search indexing**: open to search engines, with `app/robots.ts` and `app/sitemap.ts`. Submit `https://tworoadstravelservice.com/sitemap.xml` in Google Search Console to speed up indexing.
5. **Featured journey prices** (`data/journeys.ts`): approved by Michele. They keep the "As listed, subject to change" disclaimer.
6. **Team bios and photos** (`data/team.ts`): bios approved by Michele. Photos live in `source-images/team/` (committed) and are listed in `source-images/g6.json`. Michele's portrait and both round avatars use the headshots the owner sent. Sarah's large About-page photo is cropped from the group photo, because her headshot is only 200x200. If a larger one (at least 1000px wide) ever arrives, add it as her `portrait` entry in `g6.json` and run `npm run images`.
7. **Office hours**: none are published anywhere, so the site does not list any.
8. **Logos**: Virtuoso and Uniglobe are mentioned in text only. Add official logos only with the client's permission and brand guidelines.

## Notes

- Prices carry the disclaimer "As listed, subject to change. Confirm with your advisor."
- Old page names redirect: `/customer-service`, `/travel-resources`, `/why-use-a-travel-advisor`, `/sporting-and-active`.
- Everything respects `prefers-reduced-motion`: Lenis is off, the Atlas becomes a native swipe gallery, and transforms are instant.
