# Todo: Trust Gold Services Redesign

## Task 1: Gold Valuation & Pledged Loan Release Calculator Logic (TDD)
- [x] Write failing unit tests in `tests/gold-calculator.test.ts` for 3 jewellery tiers, 1% processing fee, pledged loan net payout, and WhatsApp message generation
- [x] Implement `lib/gold-calculator.ts` to pass all unit tests

## Checkpoint 1: Domain Logic Verified
- [x] All unit tests pass

## Task 2: Design System & Fluid Motion Styles (`app/globals.css`)
- [x] Implement color tokens, typography scale, `:active` scale feedback (`scale(0.97)`), custom cubic-bezier easings, translucent materials (`backdrop-filter`), and `@media (prefers-reduced-motion)` / `(hover: hover)` rules

## Task 3: Root Layout & SEO (`app/layout.tsx`)
- [x] Configure Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`, `JetBrains Mono`), OpenGraph metadata, and JSON-LD `FinancialService` schema for Vijayawada

## Task 4: Complete Redesigned Experience (`app/page.tsx`)
- [x] Build Hero with live interactive Gold & Pledged Release Calculator
- [x] Build 3 Gold Jewellery Categories section (`Hallmark 22K`, `916 Mark`, `Other / Unmarked`) + Customer's Choice (`Direct Purchase` vs `Melting in Your Presence`)
- [x] Build Core Services section (`Old Gold Purchase` & `Bank/NBFC Pledged Gold Release`)
- [x] Build Founder & Brand Story section featuring Manohar Reddy's portraits (`/images/owner-1.png`, `/images/owner-2.png`, `/images/owner-3.png`), Vision, Mission, and USP
- [x] Build Interactive KYC & Required Documents switcher (Direct Sale vs Bank Release)
- [x] Build 4-Step Transparent Process, Accordion FAQs, and WhatsApp Enquiry Form + Footer with updated social/map links

## Checkpoint 2: Build & Verification
- [x] `npm test` passes
- [x] `npm run build` succeeds with zero errors

## Task 5: GitHub & Vercel Deployment
- [x] Push to `https://github.com/Rayala484/trustgold`
- [x] Deploy to user's Vercel account (`rayalasai874-4182`) and verify live production URL
