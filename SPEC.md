# Spec: Trust Gold Services — Complete Ground-Up Redesign

## Objective
Redesign **Trust Gold Services** (`trustgold`) completely from scratch as an authoritative, tactile, high-trust bullion & pledged-gold release web experience for families in Vijayawada, Andhra Pradesh & Telangana.
- **Business Name:** Trust Gold Services (*"Transparent Gold. Instant Trust."* / *"మేము బంగారం కొంటాము"*)
- **Founder / Owner:** Manohar Reddy (featuring real studio portraits `/images/owner-1.png`, `/images/owner-2.png`, `/images/owner-3.png`)
- **Phone & WhatsApp:** `+91 93934 94455` (`93934 94455`)
- **Email:** `trustgoldservices@gmail.com`
- **Shop Location:** First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada, Andhra Pradesh ([Google Maps](https://maps.app.goo.gl/hkybjegfg9zumDPx6))
- **Hours:** Monday–Saturday · 9:00 AM – 9:00 PM
- **Socials:**
  - Instagram: `https://www.instagram.com/trustgoldservices?utm_source=qr`
  - Facebook: `https://www.facebook.com/share/1bgL24rnT9/?mibextid=wwXIfr`
  - YouTube: `https://youtube.com/@trustgoldservices?si=hwW0_PeAESfY0t1x`

## Core Capabilities & Business Logic (from Client Brief)
1. **Interactive Gold Value & Pledged Loan Release Estimator:**
   - Dual-mode calculator (`Direct Old Gold Sale` vs `Bank / NBFC Pledged Gold Release`) with a seamless `clip-path` active-tab indicator.
   - Supports the **3 Gold Jewellery Categories**:
     1. **Hallmark 22K (916 BIS Hallmarked)**
     2. **916 Mark Jewellery (Standard 916 Stamp)**
     3. **Other Marks / Unmarked / Stone-Studded Jewellery**
   - Supports **Customer's Choice of Valuation Method**:
     - **Direct Testing & Purchase** (XRF/purity check in front of customer, no melting required)
     - **Melting in Presence** (Customer-requested melt & exact net purity assay in their presence)
   - Transparently displays the calculation breakdown including the **1% processing fee** and (in Pledged Release mode) outstanding bank loan payoff vs. net cash paid to the customer on the spot, with one-tap WhatsApp quote dispatch.
2. **Two Core Services & 3 Jewellery Tiers:**
   - **Old Gold Purchase** (Direct sale of old, broken, or unused ornaments)
   - **Pledged Gold Release** (Settling active gold loans at banks/NBFCs and unlocking remaining equity)
3. **Transparent Verification & KYC Requirements Guide:**
   - Interactive/filterable checklist showing exactly what to bring:
     - **Direct Gold Sale:** Aadhaar Card, PAN Card, Purchase Bills (if available), Bank Account / UPI Details
     - **Bank / NBFC Pledged Gold Release:** Original Pledge Card / Loan Receipt, Aadhaar & PAN Card, 2 Security Cheques, House Verification (for high-value releases), Bank Details
4. **Founder Story, Vision, Mission & USP Showcase:**
   - Features Manohar Reddy's portraits (`/images/owner-1.png`, `/images/owner-2.png`, `/images/owner-3.png`) alongside the authentic Vijayawada founding story, Vision (expanding across AP & Telangana), Mission, and USP (*"Transparent Gold Buying. Customer’s Choice. Clear Value."*).
5. **Direct WhatsApp & Phone Conversion Architecture:**
   - Pre-filled structured WhatsApp messages for calculator quotes, service enquiries, and the contact form.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4 + custom design tokens and fluid physics/motion utilities (`apple-design` + `emil-design-eng` principles)
- **Icons:** `lucide-react`
- **Testing:** Node.js built-in test runner (`node --test`) for pure calculation & WhatsApp payload unit tests

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Test:** `npm test`
- **Typecheck:** `npx tsc --noEmit`

## Project Structure
```
app/
  layout.tsx        → Root layout, Cormorant Garamond + Plus Jakarta Sans + JetBrains Mono fonts, SEO & JSON-LD LocalBusiness schema
  page.tsx          → Main interactive experience
  globals.css       → Design tokens, translucent material layers, custom easing curves, responsive layout
lib/
  gold-calculator.ts → Pure calculation logic for 3 gold tiers, 1% processing fee, pledged loan release net payout, and WhatsApp URL builder
tests/
  gold-calculator.test.ts → Unit tests verifying calculator math and WhatsApp message formatting
public/
  logo.png          → Official Trust Gold Services emblem
  images/           → Owner portraits (owner-1..3.png) and documentary shop visuals
```

## Boundaries
- **Always:** Keep all interactive controls keyboard-accessible, respect `prefers-reduced-motion` and `prefers-reduced-transparency`, use `tabular-nums` on dynamic figures, run tests and `next build` before deployment.
- **Ask first:** Changing business phone number, address, or fee percentages.
- **Never:** Commit secrets or break direct WhatsApp/tel links.

## Success Criteria
- [ ] All business facts from `trustgoldservices@gmail.com.txt` and owner photos from `Downloads\Mano` are integrated accurately.
- [ ] Interactive estimator accurately computes gross value, 1% processing fee, loan settlement balance, and net spot payout with `tabular-nums`.
- [ ] Unit tests (`npm test`) and production build (`npm run build`) pass with zero errors.
- [ ] Pushed to `Rayala484/trustgold` on GitHub and deployed to production on the user's primary Vercel account (`rayalasai874-4182`).
