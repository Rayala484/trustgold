# Implementation Plan: Trust Gold Services Redesign

## Overview
Complete ground-up redesign of **Trust Gold Services** (`trustgold`) following `apple-design`, `emil-design-eng`, and `frontend-design` principles, incorporating all client assets from `Downloads\Mano` (owner portraits, 3 gold jewellery tiers, 1% processing fee, customer's choice of melting vs. direct purchase, KYC/pledge release checklist, Vision/Mission/Story, and authentic social/map links), pushed to `Rayala484/trustgold` and deployed on the user's Vercel account (`rayalasai874-4182`).

## Architecture & Design Decisions
- **Aesthetic Direction ("Sovereign Bullion Atelier"):** Deep Sovereign Vault Navy (`#061226`), Warm Bullion Parchment (`#FAF6EE`), Alabaster Surface (`#F2ECE1`), Burnished 24K Gold (`#C5922B`), and Deep Obsidian Ink (`#0B1626`).
- **Apple Design & Emil Kowalski Craft Details:**
  - Instant pointer-down press feedback (`transform: scale(0.97)` on `:active` with `140ms cubic-bezier(0.23, 1, 0.32, 1)`).
  - Translucent floating header & mobile action bar (`backdrop-filter: blur(20px) saturate(180%)`) with `@media (prefers-reduced-transparency: reduce)` fallback.
  - Interactive **Live Gold Valuation & Pledged Loan Release Calculator** with 1:1 slider tracking, `tabular-nums`, blur-masked state crossfade (`filter: blur(2px)`), and a `clip-path` segmented control.
  - Size-specific optical typography tracking (`letter-spacing: -0.025em` on display headings, `0` on body, `+0.08em` on micro-labels).
  - Gated hover states (`@media (hover: hover) and (pointer: fine)`).

## Task List

### Phase 1: Core Domain Logic & TDD (`lib/gold-calculator.ts`)
- [ ] Task 1: Implement and test gold valuation & pledged release calculator + WhatsApp formatter

### Checkpoint: Foundation
- [ ] Unit tests pass (`npm test`)

### Phase 2: Complete UI Redesign (`app/globals.css`, `app/layout.tsx`, `app/page.tsx`)
- [ ] Task 2: Implement Sovereign Bullion Atelier token system, fluid motion rules, and translucent materials in `app/globals.css`
- [ ] Task 3: Configure typography, metadata, and LocalBusiness structured data in `app/layout.tsx`
- [ ] Task 4: Build complete redesigned `app/page.tsx` (Hero with interactive estimator, 3 Gold Categories & Customer Choice of Melting vs. Direct, Services, Founder Showcase with Manohar Reddy portraits + Story/Vision/Mission, Interactive KYC Document Checklist, FAQs, and WhatsApp Contact section)

### Checkpoint: Core Features & Build
- [ ] `npm test` and `npm run build` succeed cleanly

### Phase 3: GitHub Push & Vercel Production Deployment
- [ ] Task 5: Commit redesigned codebase, push to `Rayala484/trustgold`, and deploy to production on Vercel (`rayalasai874-4182`)
