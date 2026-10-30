# Serene — Fitness & Wellness Club, Jaipur

Single-page marketing site for **Serene**, Mansarovar, Jaipur. Built with Vite + React + TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText), Lenis smooth scroll and Motion.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the build
```

## Before going live

All contact details live in one place: `src/data/site.ts`.

- `whatsapp` — number in international format without `+` (e.g. `919876543210`). When set, every "Request a tour" CTA opens WhatsApp with the enquiry pre-filled; until then they fall back to Instagram.
- `phoneDisplay`, `email` — shown in the Visit section and footer when set.
- `hours` — opening hours shown in Visit and the footer. The current values are placeholders — confirm with the club.
- `address` — street address and the Google Maps query used for the embedded map.

## Content & media

- Copy for every section (spaces, programmes, recovery, technology, gallery, pillars) is in `src/data/site.ts`.
- Media lives in `public/media/` (`img/*.webp` with `*.tiny.webp` blur placeholders, `video/*.mp4` with `*.webp` posters). Clips are muted, looped, trimmed from the club's own Instagram footage and transcoded for the web.

## Structure

```
src/
  components/      Preloader, Cursor, Nav, Hero, Ticker, Philosophy, Spaces (pinned horizontal scroll),
                   Movement, Recovery, Technology, Gallery, Pillars, Membership, Visit, Footer
  components/ui/   Img (blur-up), Video (lazy autoplay), Button, Magnetic, Marquee, Reveal (SplitText)
  data/site.ts     brand, contact, and section content
  lib/             gsap setup, Lenis smooth-scroll provider
```

Animations respect `prefers-reduced-motion` and fall back to static layouts; the custom cursor is disabled on touch devices.
