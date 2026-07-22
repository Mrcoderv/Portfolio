---
name: Vercel portfolio migration
description: Key decisions and patterns from porting Raghav Panthi's Next.js portfolio to Replit pnpm_workspace.
---

# Vercel Portfolio Migration

## What was ported
Raghav Vian Panthi's AI/ML developer portfolio — Next.js 14 app router, Tailwind v4 (OKLCH colors), shadcn/ui, `@vercel/blob` for file uploads.

## Key decisions

**Blob storage → local Express routes**: The original app used `@vercel/blob` for CV/image uploads and a JSON blob for portfolio data. Replaced with:
- `artifacts/api-server/src/routes/portfolio.ts` — Express routes with multer for uploads, JSON file on disk at `data/portfolio-data.json` for portfolio data.
- Social links, contact info, CV URL all served from this endpoint with sensible defaults hardcoded.

**Geist font → Inter**: The original used `geist/font` (Next.js package). Replaced with Google Fonts Inter import in `artifacts/portfolio/index.html`.

**`next-themes` kept**: Used directly in Vite — works fine without Next.js, just needed `pnpm add next-themes`.

**OKLCH color theme**: The original globals.css used OKLCH colors directly. The scaffold's index.css used `red` placeholders for HSL vars. Replaced the entire `:root` and `.dark` blocks with the OKLCH values from the original — no conversion needed since Tailwind v4 supports OKLCH natively.

**Custom animations**: Added `animate-float`, `animate-fade-in-up`, `animate-slide-in-left`, `animate-slide-in-right`, `animate-scale-in` keyframes to `src/index.css` — these were in the original `app/globals.css`.

**Projects JSON**: Originally imported via `@/public/content/projects.json` (Next.js allows this). In Vite, copied to `src/data/projects.json` and imported as a module.

**Hidden page**: `/hidden_aagh` route added to wouter router, fetches `/hidden/aagh.json` from public dir.

**Why:** Next.js is not supported as an artifact type; must convert to react-vite.
