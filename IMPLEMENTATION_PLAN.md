# Two Roads Travel Service: Implementation Plan

Concept: **Choose your road.** The homepage forks into Unwind and Discover. The chosen road re-orders and re-voices the rest of the site. One conversion goal: **Plan My Trip**, which opens the Trip Matchmaker.

Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, framer-motion, gsap + ScrollTrigger, lenis, sharp, lucide-react. Front end only.

## 0. Setup
- [x] Scaffold Next.js 16.4 + TS + Tailwind 4
- [x] Install framer-motion, gsap, lenis, lucide-react, sharp
- [x] Fonts via next/font: Fraunces (display, opsz axis) + Manrope (UI/body)
- [x] Design tokens: sand #F4EFE6, ink #0E2A33, terracotta #D2683A, plus neutrals; 8px grid; clamp() type scale
- [x] Film grain overlay on dark sections only

## 1. Photography
- [x] Source Pexels (free license) photos for every brief via parallel search agents, visually verify each
- [x] Originals in `/source-images/<section>/` (gitignored, reproducible from `source-images/*.json`)
- [x] `scripts/optimize-images.mjs`: sharp, warm cinematic grade, AVIF + WebP (hero 2400px, large 1600px, cards 1200px), blur placeholders, typed manifest
- [x] `next/image` everywhere, `preload` on hero only, lazy elsewhere, blur placeholders
- [x] `CREDITS.md` with section, photographer, source URL, license
- [x] Zero broken images (script check)

## 2. Personalization (the road)
- [x] `RoadProvider`: React state + localStorage (try/catch), `data-road` on root
- [x] Nav pill "Your road: Unwind · switch", crossfade on switch
- [x] Road-aware: travel style order, atlas chapter order, journey order, CTA copy, section intros
- [x] Balanced default when no road chosen

## 3. Trip Matchmaker (code-split)
- [x] Full-screen overlay, 7 steps + dossier, Framer Motion transitions
- [x] Progress bar, back buttons, Esc closes, focus trap, aria-live step announcements, keyboard complete
- [x] Steps: road, travelers, destinations (photo tiles, multi + Surprise me), when + length, budget, unforgettable chips + free text, contact
- [x] Client-side validation; `submitTripRequest()` with TODO webhook
- [x] "Your Trip Dossier" card, tap-to-call 610-849-2302, Download (window.print + print stylesheet)
- [x] Presets: road, "Hot Deals"
- [x] Perfect at 375px

## 4. Homepage
- [x] Nav: wordmark + SVG forked-path glyph, links, tel, road pill, Plan My Trip; transparent then blurred bar; mobile full-screen menu with staggered serif links
- [x] The Fork hero: split screen, glowing seam, hover/tap expand to ~70%, Ken Burns, rising labels, click sets road
- [x] Trust strip (small caps, no logos, no numbers)
- [x] How we get you: Listen / Design / Advocate, sticky image swapping with scroll (ScrollTrigger)
- [x] Ways to Travel: 8 tall editorial cards, hover scale + description, road order
- [x] The Atlas: pinned horizontal scroll (GSAP), outlined chapter titles Sun / Culture / Wild; native snap-scroll on mobile
- [x] Featured Journeys: Emerald + Avalon cards, disclaimer, "See all current deals" opens Matchmaker preset Hot Deals
- [x] Why an Advisor comparison
- [x] Matchmaker teaser (inline step 1)
- [x] Reviews: 3 sample cards with "Sample review" tag and "Client name" placeholders
- [x] FAQ accordion (7)
- [x] Final CTA: golden-hour fork, Frost line, parallax
- [x] Footer: wordmark, phone, all original pages, Seller of Travel line, "Built and operated by Lee Enterprises Unlimited" credit linking to leeenterprisesunlimited.com

## 5. Inner pages
- [x] Travel style template (`/[slug]`): cruises, river-cruises, all-inclusives, destination-weddings, vacations, tours, luxury-escapes, resort-packages, short-stays, sporting-active, hot-deals, new-destinations
- [x] /destinations filterable grid (full list from old dropdown)
- [x] /why-an-advisor, /resources, /contact (incl. customer service), `/customer-service` redirect
- [x] Custom 404: "You took a wrong turn. Both roads lead home."

## 6. Quality
- [x] Metadata: title, description, canonical, OG, Twitter large image, robots noindex/nofollow
- [x] Designed 1200x630 og-image.png, SVG favicon, Apple touch icon
- [x] JSON-LD TravelAgency (name + phone only)
- [x] Semantic landmarks, alt text, focus states, AA contrast, 44px targets
- [x] prefers-reduced-motion: Lenis off, GSAP pin off, static reveals
- [x] Responsive 375 / 768 / 1024 / 1440 / 1920, no horizontal scroll
- [x] `npm run build` clean; lint clean
- [x] Screenshot review at 375px and desktop for every page
- [x] Copy audit: no em dashes or "--" in visible copy, no "Apex", no invented claims
- [x] Git commit + push

## Results (verified in this build)
- `npm run build`: clean, 22 static routes. `npm run lint`: clean. TypeScript: clean.
- No horizontal scroll on any of 19 routes at 375, 768, 1024, 1440 and 1920. No broken images. Every image has alt text.
- Lighthouse (production build, local sandbox):
  - Desktop: Performance 98 to 100, Accessibility 100, Best Practices 100.
  - Mobile (simulated slow 4G): Performance 87 to 89 on the homepage (78 to 93 across pages, noisy sandbox CPU), Accessibility 100, Best Practices 100, CLS 0. Measured paint of the LCP element is 0.25 to 1.3 s.
  - SEO 66 everywhere is only the intentional `noindex, nofollow` for the concept preview. Remove it at launch.
- Interaction tests: road choice reorders styles, atlas and journeys; persists across reload; pill switches roads. Matchmaker validates every step, auto-advances on taps, completes at 375px, prints the dossier, closes on Esc and returns focus. Touch: first tap opens a road, second takes it, third continues.

## Deliberately skipped
- Optional hero video: skipped to protect mobile performance. The still photos carry the split.
