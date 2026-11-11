# CLAUDE.md: The Elite Atelier

Paris luxury fashion / haute couture brand: collections, personal styling, VIP member club.

- Live domain: eliteatelier.com (found in code; confirm)
- Host: ❓ not set up (no deploy workflow)
- Design and audience: see `brand-dna.md`. Placeholders: `PLACEHOLDERS.md` (create it when you find one).

## Studio rules (Jacques' web studio: apply to every task)
- This site must look custom-made for this client, never like a template. Never reuse another client's palette, font pairing, layout rhythm or signature element. No generic AI layout (centered hero + 3 icon cards + testimonial slider + CTA band) unless Jacques asks for it.
- Read `brand-dna.md` in this repo before any design or content change. Items marked ❓ are not confirmed: ask, don't invent.
- Real copy and real photos only. Never invent reviews, testimonials, statistics, people or partner logos. Every placeholder goes in `PLACEHOLDERS.md`.
- Done means: `npm ci && npm run build` passes, you checked desktop and mobile yourself, alt text, AA contrast, page titles/descriptions, compressed images.
- Push to the deploy branch only after the build passes and the change is verified (pushing deploys the live site). Never commit secrets.
- Report to Jacques in plain language, no jargon, with the live link. Anything he must do himself (secrets, DNS, accounts): click-by-click steps.
- Studio stack (zero recurring cost): client's own host via GitHub Actions FTP deploy; Cloudflare free in front; images in Cloudinary or the repo; video on YouTube or Mux (store the public Playback ID, never the Asset ID); forms via Web3Forms; editing via Pages CMS + Sveltia at `/admin`. No Vercel Hobby or Netlify for client sites.

## Stack and build
- Originally a Readdy export: Vite + React + TypeScript + Tailwind + React Router, i18next installed.
- Install and build: `npm ci && npm run build` → output in `out/`.
- Dev preview: `npm run dev`.
- Routes: `/`, `/checkout`, `/contact`, `/lookbook`, `/member-club`, `/shop`.

## Deploy
- No deploy workflow. Add the studio FTP workflow (copy `jacquesmofa/SANKOFA/.github/workflows/deploy.yml`) once the host is known.

## Where things live
- Pages: `src/pages/<page>/` (one folder per page, sections in `components/`). Routes: `src/router/`.
- Text, images and links are mostly hard-coded inside the page components (`src/pages/<page>/components/*.tsx`) and in `src/mocks/`.
- Next studio step for this site: move client-facing content into `src/content/*.json` and wire up both editors (Pages CMS + Sveltia at `/admin`), exactly like `jacquesmofa/CAWAP` (see its CLAUDE.md and `scripts/studio-tools/` for `extract.mjs`, `snapshot.mjs`, `compare.mjs`). Verify with before/after snapshots that visitors see no change.

## Known issues (found 10 Nov 2026)
- 153 Readdy AI placeholder image URLs (`readdy.ai/api/search-image`) are still in the code. Replace them with real photos and track the rest in `PLACEHOLDERS.md`.
- Some forms post to Readdy's form service (`readdy.ai/api/form`). Move them to Web3Forms with the client's email (studio standard) and test that a message actually arrives.
- Stripe/checkout code exists: check whether it is actually connected before telling anyone that payments work.
- Shop/checkout pages are front-end only: there is no real payment flow unless one is added.
- 153 Readdy placeholder image URLs: a luxury brand cannot launch on stock images.
- Design overlap with other clients: Black + gold is also Jacques' portfolio and Sankofa. Push towards a signature that is only this house's.
