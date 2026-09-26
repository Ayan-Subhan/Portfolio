# Muhammad Ayan — The Field Record

A static portfolio site built with Astro. It is designed as an editorial newspaper: bone paper, oxblood ink and Caslon/Times type. It ships with a strict CSP and no third-party requests.

## Commands

| Command           | What it does                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Local dev server at `localhost:4321`. Draft posts are visible.    |
| `npm run build`   | Production build to `dist/`. Draft posts are excluded.            |
| `npm run preview` | Serves the built site.                                            |
| `npm run redact`  | Re-generates the redacted JWPL screenshots from the originals in `../`. |

## Where things live

- `src/data/site.ts`: name, email, LinkedIn/GitHub URLs, CV path.
- `src/data/record.ts`: toolkit, CTF scoreboard, career ledger, "by the numbers", CVEs.
- `src/content/projects/*.md`: one case file per project. Frontmatter drives the home-page exhibit card; the body is the detail page.
- `src/content/posts/*.md`: Lab Report posts. Set `draft: false` to publish. Copy `_ctf-writeup-template.md` to start a writeup.
- `public/_headers`: security headers for Cloudflare Pages / Netlify.
- `public/.well-known/security.txt`: disclosure contact. Renew `Expires` every year.

## Before going live (TODO)

- [ ] Add `linkedin` and `github` URLs in `src/data/site.ts`. Both are hidden until set.
- [ ] Add a `repo:` URL to each project that has a public repo, and pin those repos on GitHub.
- [ ] Set the real domain in `astro.config.mjs` (`site`) and in `security.txt`.
- [ ] Fill in CTF placements, categories and strongest categories in `src/data/record.ts`.
- [ ] Add the year for EIAM and the IoT scanner, plus a screenshot for the scanner.
- [ ] Review the draft posts and publish them.
- [ ] Replace `public/cv/Muhammad_Ayan_CV.pdf` with a public version that leaves out your phone number.

## Deploying (Cloudflare Pages or Netlify)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION` = `22`
- Root directory: leave blank (this folder is the repo root)

`_headers` is picked up automatically. After deploying, check the site with [securityheaders.com](https://securityheaders.com) and [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory).

## Security notes

- The CSP allows only `'self'` for scripts, styles and fonts. Astro is configured never to inline stylesheets or assets, and Markdown uses Prism (class-based) instead of Shiki (inline styles). If you add a feature that needs inline code, the CSP will block it. That is intentional.
- The unredacted JWPL screenshots stay outside this repo, in the parent folder. Only the redacted WebP files in `src/assets/work/` are committed.
