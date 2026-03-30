# Raghav Vian Panthi — Portfolio

A personal portfolio website built with [Next.js](https://nextjs.org/), Tailwind CSS, and shadcn/ui.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

| Path | Description |
|------|-------------|
| `app/` | Next.js App Router pages and API routes |
| `components/` | React components (hero, about, projects, etc.) |
| `public/` | Static assets served at the root URL |
| `public/cv/` | CV/Resume PDF file |
| `cv/` | Source copy of the CV (mirrors `public/cv/`) |

## CV / Resume

The CV PDF is located at **`public/cv/raghav_panthi_cv.pdf`** and is served statically at `/cv/raghav_panthi_cv.pdf`.

The "Download CV" button in the hero section links directly to this file using an `<a href="/cv/raghav_panthi_cv.pdf" download>` element, so it works reliably in all modern browsers and on static hosting providers (GitHub Pages, Netlify, Vercel, etc.).

### How to update the CV

1. Replace `public/cv/raghav_panthi_cv.pdf` with the new PDF (keep the same filename, or update the path in `components/hero-section.tsx` and `app/api/portfolio-data/route.ts`).
2. Optionally update the source copy at `cv/raghav_panthi_cv.pdf` to keep both in sync.
3. Commit and push — the new file will be served automatically.

## Build

```bash
pnpm build
pnpm start
```
