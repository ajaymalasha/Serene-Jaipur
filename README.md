# Serene — Fitness & Wellness Club, Jaipur

Single-page marketing site for **Serene**, Mansarovar, Jaipur. Built with Vite + React + TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText), Lenis smooth scroll and Motion.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the build
npm run preview:pages   # preview exactly as on GitHub Pages
```

## Publish on GitHub Pages (personal account)

**Do not drag-and-drop `node_modules` or raw source onto GitHub.** That is why you saw a white screen: Pages was serving the wrong folder, and Vite needs a `/Serene-Jaipur/` base path for project URLs like `username.github.io/Serene-Jaipur/`.

### Recommended: push source once, GitHub builds for you

1. On your Mac, sign in to **personal** GitHub in the CLI (separate from office):

   ```bash
   gh auth login
   # GitHub.com → HTTPS → Login with browser → pick ajaymalasha
   ```

   If you already use `gh` for work: `gh auth switch` and choose your personal account before pushing this repo.

2. From this project folder:

   ```bash
   cd "/Users/ajaymalasha/Documents/Ajay Folder/Serene Gym"
   git remote add origin https://github.com/ajaymalasha/Serene-Jaipur.git   # skip if already set
   git add .
   git commit -m "Serene gym website"
   git push -u origin main
   ```

   Only tracked files go up (`node_modules` and `dist` are in `.gitignore`).

3. On GitHub: **Serene-Jaipur → Settings → Pages → Build and deployment → Source: GitHub Actions** (not “Deploy from branch / root”).

4. After the “Deploy to GitHub Pages” workflow finishes (Actions tab), the site should load at:

   **https://ajaymalasha.github.io/Serene-Jaipur/**

### If CLI must stay on office GitHub

Use a **Personal Access Token** only for this repo (GitHub → Settings → Developer settings → Fine-grained or classic token, repo scope):

```bash
git remote set-url origin https://github.com/ajaymalasha/Serene-Jaipur.git
git push -u origin main
# Username: ajaymalasha
# Password: paste the token (not your GitHub password)
```

Or use **SSH** with a personal key and `git@github.com:ajaymalasha/Serene-Jaipur.git`.

### Clean up a bad manual upload

If `main` already has a messy mix of `src/`, root `index.html`, and partial `dist/`, replace it with a normal repo: clone fresh or force-push after the commit above so `main` matches this folder (source + `.github/workflows`, no `node_modules`).

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
