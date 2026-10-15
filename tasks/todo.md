# Todo: Trust Gold Services Redesign

## Task 1: Gold Valuation & Pledged Loan Release Calculator Logic (TDD)
- [x] Write failing unit tests in `tests/gold-calculator.test.ts` for 3 jewellery tiers, 1% processing fee, pledged loan net payout, WhatsApp message generation, and Basanite Touchstone Kasu/Tulam benchmarks
- [x] Implement `lib/gold-calculator.ts` to pass all unit tests

## Checkpoint 1: Domain Logic Verified
- [x] All 6 unit tests pass

## Task 2: Design System & Fluid Motion Styles (`app/globals.css`)
- [x] Implement color tokens, typography scale, `:active` scale feedback (`scale(0.97)`), custom cubic-bezier easings, translucent materials (`backdrop-filter`), and `@media (prefers-reduced-motion)` / `(hover: hover)` rules
- [x] Implement CSS choreography for the Sovereign Shield, 916 Assay & Checkmark Forging Opening (`@property --iris`) and Interactive Basanite Touchstone section

## Task 3: Root Layout, First-Paint Intro & SEO (`app/layout.tsx`)
- [x] Configure Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`, `JetBrains Mono`), OpenGraph metadata, JSON-LD `FinancialService` schema, and first-paint `<GoldOpening />` sequence

## Task 4: Complete Redesigned Experience (`app/page.tsx`, `components/GoldOpening.tsx`, `components/GoldTouchstoneAssay.tsx`)
- [x] Build signature **Gold Forging & 916 Assay Opening Sequence** (`components/GoldOpening.tsx`) with live digital scale calibration (`0.00g` → `24.00g`), molten gold shield & twin assay rings, goldsmith hammer strike & 2D canvas sparks, and Vault Iris reveal + 1-click Replay trigger
- [x] Build Hero with live interactive Gold & Pledged Release Calculator
- [x] Build Interactive **Black Basanite Touchstone & 916 Assay Bench** (`components/GoldTouchstoneAssay.tsx`) with 4 karat streaks (`22K · 916`, `24K · 999`, `20K–21K · 860`, `18K · 750`) and live payouts in `1g`, `1 Kasu (8g)`, `1 Tulam (10g)`, and `24g`
- [x] Build 3 Gold Jewellery Categories section (`Hallmark 22K`, `916 Mark`, `Other / Unmarked`) + Customer's Choice (`Direct Purchase` vs `Melting in Your Presence`)
- [x] Build Core Services section (`Old Gold Purchase` & `Bank/NBFC Pledged Gold Release`)
- [x] Build Founder & Brand Story section featuring Manohar Reddy's single portrait (`/images/owner-2.png`), Vision, Mission, and USP
- [x] Build Interactive KYC & Required Documents switcher (Direct Sale vs Bank Release)
- [x] Build 4-Step Transparent Process, Accordion FAQs, and WhatsApp Enquiry Form + Footer with updated social/map links

## Checkpoint 2: Build & Verification
- [x] `npm test` passes (6/6)
- [x] `pnpm run build` succeeds with zero errors

## Task 5: GitHub & Vercel Deployment
- [x] Push to `https://github.com/Rayala484/trustgold`
- [x] Deploy to user's Vercel account (`rayalasai874-4182`) and verify live production URL
