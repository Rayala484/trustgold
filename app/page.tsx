'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Award,
  BadgePercent,
  Banknote,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck2,
  Flame,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react'
import {
  BUSINESS_INFO,
  GOLD_CATEGORIES,
  type EstimateMode,
} from '@/lib/gold-calculator'
import { triggerTrustGoldIntro } from '@/components/GoldOpening'
import { GoldTouchstoneAssay } from '@/components/GoldTouchstoneAssay'
import {
  Magnetic,
  PageMotion,
  Split,
} from '@/components/SiteMotion'

const HERO_RAYS = Array.from({ length: 40 }, (_, i) => (i * 360) / 40)

const MARQUEE_ITEMS = [
  'BIS 916 HUID Hallmarked Gold',
  'SBI · HDFC · ICICI Bank Gold Loan Release',
  'Muthoot · Manappuram · IIFL Pledge Release',
  'Direct Purchase or Melt in Your Presence',
  'Flat 1% Processing Fee · 99% Net Value',
  '0.01g Calibrated Open-Counter Weighing',
  'Instant Spot RTGS · IMPS · UPI · Cash Payout',
  'Canara · Union · Federal Bank Loan Closure',
] as const

const KYC_DOCS = {
  'direct-sale': [
    {
      title: 'Aadhaar Card & PAN Card',
      desc: 'Mandatory government identity and tax verification for every legal gold transaction.',
    },
    {
      title: 'Original Purchase Bills (If Available)',
      desc: 'Bring jewellery purchase invoices if available to speed up ownership verification.',
    },
    {
      title: 'Address / House Verification',
      desc: 'Simple residence verification for high-value settlements to keep every sale 100% compliant.',
    },
    {
      title: 'Bank Account / UPI Details',
      desc: 'Your active bank account or UPI details for instant RTGS / IMPS / NEFT / spot transfer.',
    },
  ],
  'pledged-release': [
    {
      title: 'Original Bank / NBFC Pledge Receipt',
      desc: 'Bring your gold loan token, pledge card, or outstanding loan statement from the bank or NBFC.',
    },
    {
      title: 'Aadhaar Card & PAN Card',
      desc: 'Primary KYC documents of the loan holder so our executive can accompany and assist you.',
    },
    {
      title: '2 Security Cheques (For Bank Release)',
      desc: 'Required as security protocol while we advance the funds to close your bank or NBFC gold loan.',
    },
    {
      title: 'House Verification, Bills & Bank Details',
      desc: 'Residence verification, any available bills, and bank details to transfer your remaining net balance.',
    },
  ],
} as const

const COMPARISON_ROWS = [
  {
    feature: 'Processing / Service Charge',
    trustGold: 'Flat 1% Only · Written Breakdown',
    corporate: '3% to 5% Service Fee + GST',
    pawnBroker: '8% to 15% Hidden Wastage Cuts',
  },
  {
    feature: 'Valuation & Melting Policy',
    trustGold: '100% Your Choice (Direct Buy or Melt in Presence)',
    corporate: 'Mandatory Melting Required',
    pawnBroker: 'Back-Room Acid Test / Rough Guess',
  },
  {
    feature: 'Stones, Beads & Gems',
    trustGold: 'Carefully Removed & Returned to You',
    corporate: 'Often Crushed During Forced Melting',
    pawnBroker: 'Heavy Arbitrary Weight Deductions',
  },
  {
    feature: 'Unmarked / Ancestral Gold',
    trustGold: 'Accepted at True Tested Purity Value',
    corporate: 'Frequently Rejected or Heavily Penalized',
    pawnBroker: 'Under-Valued by 15%–20%',
  },
  {
    feature: 'Bank / NBFC Loan Release',
    trustGold: 'Executive Escorts You & Advances Full Payoff',
    corporate: 'Long Approval & High Margin Charges',
    pawnBroker: 'High-Interest Bridge Loans',
  },
  {
    feature: 'Payout Speed & Mode',
    trustGold: '15-Min Instant Cash / RTGS / IMPS / UPI',
    corporate: 'T+1 Bank Processing Delays',
    pawnBroker: 'Delayed Partial Cash Notes',
  },
] as const

const PROCESS_TRACKS = {
  'direct-sale': [
    {
      step: 'STEP 01',
      title: 'Walk In or WhatsApp Estimate',
      desc: 'Visit Shop No. 5, Vasisth Enclave in Gandhinagar, or send ornament details on WhatsApp for an instant indicative quote.',
    },
    {
      step: 'STEP 02',
      title: 'Open-Counter Purity & Weighing',
      desc: 'Watch calibrated 0.01g digital weighing and purity testing right in front of your eyes. Choose direct purchase or melting.',
    },
    {
      step: 'STEP 03',
      title: 'Written 1% Fee Breakdown',
      desc: 'We write down today’s live gold rate, net weight after returning stones, and our flat 1% processing fee before you decide.',
    },
    {
      step: 'STEP 04',
      title: 'Instant Spot Settlement',
      desc: 'Walk out in 15 minutes with immediate payment via Cash, UPI, IMPS, or RTGS directly into your bank account.',
    },
  ],
  'pledged-release': [
    {
      step: 'STEP 01',
      title: 'Share Bank / NBFC Pledge Token',
      desc: 'Bring your original gold loan receipt from SBI, HDFC, ICICI, Muthoot, Manappuram, IIFL, or any bank/NBFC branch.',
    },
    {
      step: 'STEP 02',
      title: 'Quick KYC & Security Protocol',
      desc: 'Complete Aadhaar/PAN verification, simple residence check, and 2 security cheques so our team can advance the payoff funds.',
    },
    {
      step: 'STEP 03',
      title: 'We Accompany You & Close Loan',
      desc: 'Our executive travels with you to the bank or NBFC branch, pays off the full principal + interest, and releases your ornaments.',
    },
    {
      step: 'STEP 04',
      title: 'Open Assay & Net Balance Payout',
      desc: 'We value the released gold at today’s live market rate in your presence, deduct only the loan payoff + 1% fee, and pay your balance.',
    },
  ],
} as const

const FAQS = [
  {
    q: 'What types of gold jewellery do you buy?',
    a: 'We buy all 3 types of gold jewellery: (1) BIS Hallmarked 22K (916 HUID) jewellery, (2) Ornaments with only a 916 stamp, and (3) Other marked or unmarked old, ancestral, broken, or stone-studded gold jewellery.',
  },
  {
    q: 'Do you melt the gold, or do you buy it directly without melting?',
    a: 'It is 100% the customer’s choice ("Melting adithey melting chestam, ledu direct ga konamantey direct ga kontam"). If you want a direct purchase without melting, we test and buy directly. If you prefer melting for an exact net-purity assay, we melt it right in front of your eyes.',
  },
  {
    q: 'What is your processing fee structure?',
    a: 'We maintain complete clarity with a standard 1% processing fee on the total value. Before we proceed, we write down the day’s gold rate, purity reading, stone weight deduction (if any), and exact net payout so there are never hidden surprises.',
  },
  {
    q: 'How does Bank / NBFC Pledged Gold Release work?',
    a: 'If your gold is locked in a bank or NBFC loan, share your pledge receipt with us. After KYC, house verification, and 2 security cheques, our team settles the outstanding loan at the bank branch with you, releases the gold, evaluates it transparently in your presence, and pays you the remaining net value on the spot.',
  },
  {
    q: 'What documents are required to sell or release gold?',
    a: 'Please bring your Aadhaar Card, PAN Card, purchase bills (if available), and bank account details. For bank-pledged gold release, we also require your original loan pledge card, house verification, and 2 security cheques.',
  },
  {
    q: 'Where is your shop located and what are your timings?',
    a: 'We are located at First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada. We are open Monday to Saturday from 9:00 AM to 9:00 PM, serving families across Vijayawada, Andhra Pradesh, and Telangana.',
  },
] as const

export default function TrustGoldRedesignedPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // KYC Document Checklist Tab State
  const [kycTab, setKycTab] = useState<EstimateMode>('direct-sale')
  const [kycSwitching, setKycSwitching] = useState(false)

  // Two-Track Process Switcher State
  const [processTrack, setProcessTrack] = useState<EstimateMode>('direct-sale')

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    service: 'Direct Old Gold Purchase',
    jewelleryType: 'Hallmark 22K Jewellery',
    message: '',
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const defaultWhatsAppUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hi Trust Gold Services, I visited your website and would like a transparent gold valuation / pledged gold release consultation.'
  )}`

  function switchKycTab(nextTab: EstimateMode) {
    if (nextTab === kycTab) return
    setKycSwitching(true)
    setKycTab(nextTab)
    setTimeout(() => setKycSwitching(false), 180)
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.phone.trim()) return

    const text = [
      `Hi Trust Gold Services! I would like to enquire from your website:`,
      ``,
      `• *Name:* ${contactForm.name.trim()}`,
      `• *Phone:* ${contactForm.phone.trim()}`,
      `• *Service Needed:* ${contactForm.service}`,
      `• *Jewellery Type:* ${contactForm.jewelleryType}`,
      contactForm.message.trim()
        ? `• *Details:* ${contactForm.message.trim()}`
        : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(
      `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setContactSubmitted(true)
  }

  return (
    <div id="top">
      {/* Top Location & Hours Ribbon */}
      <div className="top-ribbon">
        <div className="top-ribbon-inner">
          <div className="ribbon-left">
            <span className="ribbon-badge">
              <Sparkles size={13} /> {BUSINESS_INFO.teluguTagline} — We Buy Gold
              at Live Market Rates
            </span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <MapPin size={13} /> {BUSINESS_INFO.addressShort}
            </a>
          </div>
          <div className="ribbon-right">
            <button
              type="button"
              onClick={triggerTrustGoldIntro}
              className="ribbon-replay-btn"
              title="Replay the Trust Gold 916 Assay & Shield Forging Opening"
            >
              <Sparkles size={12} /> Replay Gold Intro
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Clock size={13} /> {BUSINESS_INFO.hours}
            </span>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Mail size={13} /> {BUSINESS_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Translucent Navigation Header */}
      <header className="site-header">
        <span aria-hidden="true" className="scroll-progress" />
        <div className="nav-bar">
          <a
            href="#top"
            className="brand-lockup"
            aria-label="Trust Gold Services Home"
          >
            <Image
              src="/logo.png"
              alt="Trust Gold Services emblem"
              width={48}
              height={48}
              className="brand-emblem"
              priority
            />
            <div className="brand-title">
              <span className="brand-title-main">Trust Gold</span>
              <span className="brand-title-sub">Services · Vijayawada</span>
            </div>
          </a>

          <nav
            className={mobileMenuOpen ? 'nav-links open' : 'nav-links'}
            aria-label="Primary Navigation"
          >
            <a href="#gold-craft" onClick={() => setMobileMenuOpen(false)}>
              916 Assay
            </a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)}>
              3 Gold Tiers
            </a>
            <a href="#comparison" onClick={() => setMobileMenuOpen(false)}>
              1% Fee vs Others
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </a>
            <a href="#founder" onClick={() => setMobileMenuOpen(false)}>
              Our Story
            </a>
            <a href="#documents" onClick={() => setMobileMenuOpen(false)}>
              Documents
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="nav-cta-group">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="nav-phone-pill tabular-nums"
              aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
            >
              <Phone size={15} />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <Magnetic>
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                WhatsApp Quote <ArrowRight size={15} />
              </a>
            </Magnetic>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <PageMotion />

      <main>
        {/* ====================================================================
            LUXURY EDITORIAL HERO SECTION (NO CALCULATOR FORM IN OPENING)
            ==================================================================== */}
        <section className="hero-vault">
          {/* Slowly Rotating 40-Ray Sovereign Gold Sunburst Behind Hero */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            className="hero-sunburst"
          >
            {HERO_RAYS.map((angle) => (
              <line
                key={angle}
                x1="300"
                y1={angle % 18 ? 138 : 118}
                x2="300"
                y2="36"
                transform={`rotate(${angle} 300 300)`}
                stroke="#e6b95c"
                strokeOpacity={0.35}
                strokeWidth={angle % 18 ? 1.2 : 2.1}
                strokeLinecap="round"
              />
            ))}
            <circle
              cx="300"
              cy="300"
              r="148"
              fill="none"
              stroke="#e6b95c"
              strokeOpacity={0.18}
            />
          </svg>

          <div className="container-shell hero-grid">
            {/* Left Editorial Column */}
            <div className="hero-copy-col">
              <div
                className="telugu-pill rise"
                style={{ '--d': '40ms' } as React.CSSProperties}
              >
                <span className="telugu-pill-dot" />
                <span>
                  {BUSINESS_INFO.teluguTagline} · Gandhinagar, Vijayawada
                </span>
              </div>

              <Split
                as="h1"
                mode="load"
                text="Where Your Gold Meets Honest, Open-Counter Value."
                goldWords={['Gold', 'Open-Counter']}
                className="hero-display"
              />

              <p
                className="hero-lead rise"
                style={{ '--d': '260ms' } as React.CSSProperties}
              >
                Sell old gold jewellery or release bank &amp; NBFC pledged gold
                in Vijayawada with complete dignity. Watch every purity test on
                our calibrated scale right in front of your eyes, choose between
                direct purchase or melting, and keep{' '}
                <strong style={{ color: '#e6b95c' }}>
                  99% of your gold’s market value
                </strong>{' '}
                with our flat{' '}
                <strong style={{ color: '#e6b95c' }}>1% processing fee</strong>.
              </p>

              <div
                className="hero-actions rise"
                style={{ '--d': '380ms' } as React.CSSProperties}
              >
                <Magnetic>
                  <a
                    href={defaultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    <MessageCircle size={18} /> Get Free WhatsApp Valuation
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="btn btn-outline-light tabular-nums"
                  >
                    <Phone size={17} /> Call {BUSINESS_INFO.phoneDisplay}
                  </a>
                </Magnetic>
                <a href="#gold-craft" className="hero-estimator-link">
                  <Sparkles size={15} /> Inspect 916 Touchstone Assay ↓
                </a>
              </div>

              {/* 3 Institutional Bullion Trust Pillars */}
              <div
                className="hero-metrics rise"
                style={{ '--d': '520ms' } as React.CSSProperties}
              >
                <div className="metric-item">
                  <strong className="tabular-nums">99% Payout</strong>
                  <span>Flat 1% processing fee, zero hidden cuts</span>
                </div>
                <div className="metric-item">
                  <strong>Your Choice</strong>
                  <span>Direct spot purchase or melt in your presence</span>
                </div>
                <div className="metric-item">
                  <strong className="tabular-nums">15 Mins</strong>
                  <span>Instant Cash · RTGS · IMPS · UPI settlement</span>
                </div>
              </div>
            </div>

            {/* Right Column: Cinematic Luxury Gold Assay & Bullion Showcase Stage */}
            <div
              className="hero-showcase-stage rise"
              style={{ '--d': '200ms' } as React.CSSProperties}
            >
              {/* Floating Top-Left Card: 916 BIS & 3-Tier Purity Seal */}
              <div className="hero-float-card hero-float-top spotlight-card">
                <div className="hero-float-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="hero-float-eyebrow">
                    3 PURITY TIERS ACCEPTED
                  </span>
                  <strong>BIS 916 · 916 Stamp · Unmarked</strong>
                  <small>Stones carefully removed &amp; returned to you</small>
                </div>
              </div>

              {/* Floating Top-Right Badge: Live Calibrated Scale Telemetry */}
              <div className="hero-float-badge tabular-nums">
                <span className="telugu-pill-dot" />
                <span>OHAUS 0.01g Scale · 56.84g Live Assay</span>
              </div>

              {/* Main Architectural Gold-Bezel Showcase Frame */}
              <div className="hero-stage-frame spotlight-card">
                <div className="hero-stage-media">
                  <Image
                    src="/images/hero.png"
                    alt="Open-counter 22K gold bangle valuation on a calibrated 56.84g digital scale beside a black Basanite touchstone at Trust Gold Services, Vijayawada"
                    fill
                    sizes="(max-width: 1024px) 100vw, 580px"
                    priority
                  />
                  <div className="hero-stage-vignette" aria-hidden="true" />
                </div>

                {/* Editorial Caption Overlay Inside Bottom of Frame */}
                <div className="hero-stage-caption">
                  <div className="hero-stage-caption-top">
                    <span className="hero-stage-pill">
                      <Sparkles size={12} /> OPEN-COUNTER VALUATION · GANDHINAGAR
                    </span>
                    <span className="hero-stage-rate tabular-nums">
                      Flat 1% Fee Only
                    </span>
                  </div>
                  <p className="hero-stage-telugu">
                    “మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం, లేదు డైరెక్ట్‌గా
                    కొనమంటే డైరెక్ట్‌గా కొంటాం.”
                  </p>
                  <p className="hero-stage-sub">
                    Every digital weight reading, touchstone streak test, and
                    payout sheet happens right in front of your eyes—never in a
                    back room.
                  </p>
                </div>
              </div>

              {/* Floating Bottom-Right Card: Bank & NBFC Pledged Gold Release Escort */}
              <div className="hero-float-card hero-float-bottom spotlight-card">
                <div className="hero-float-icon">
                  <Landmark size={20} />
                </div>
                <div>
                  <span className="hero-float-eyebrow">
                    BANK &amp; NBFC LOAN RELEASE
                  </span>
                  <strong>SBI · HDFC · Muthoot · Manappuram</strong>
                  <small>
                    We escort you, settle the loan &amp; pay your balance
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            INFINITE BULLION & BANK GOLD LOAN RELEASE MARQUEE STRIP
            ==================================================================== */}
        <section
          aria-label="Supported banks, NBFCs and hallmark purities"
          className="gold-marquee-bar"
        >
          <div className="gold-marquee">
            <ul className="gold-marquee-track">
              {[0, 1].map((copy) =>
                MARQUEE_ITEMS.map((item) => (
                  <li
                    key={`${copy}-${item}`}
                    aria-hidden={copy === 1 ? 'true' : undefined}
                    className="gold-marquee-item"
                  >
                    <span>{item}</span>
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="gold-marquee-star"
                    >
                      <path
                        d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14l-1.6-5.4L0 7l5.4-1.6z"
                        fill="currentColor"
                      />
                    </svg>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* ====================================================================
            THE CRAFT OF GOLD VALUATION: BASANITE TOUCHSTONE & 916 ASSAY BENCH
            ==================================================================== */}
        <GoldTouchstoneAssay />

        {/* ====================================================================
            3 TYPES OF GOLD JEWELLERY + CUSTOMER'S CHOICE BANNER
            ==================================================================== */}
        <section id="categories" className="section-pad">
          <div className="container-shell">
            <span className="section-tag">3 Gold Categories We Buy</span>
            <Split
              text="Clear valuation for every mark, purity, and ornament."
              goldWords={['mark,', 'purity,']}
              className="section-heading"
            />
            <p data-reveal className="section-sub">
              Whether your ornaments carry a BIS 916 hallmark, a traditional 916
              stamp, or no mark at all, we evaluate every piece openly in your
              presence and explain the exact calculation before you decide.
            </p>

            <div data-reveal-group className="categories-grid">
              {GOLD_CATEGORIES.map((cat) => (
                <article key={cat.id} className="category-card spotlight-card">
                  <div>
                    <div className="category-card-top">
                      <span className="category-num">
                        CATEGORY {cat.number}
                      </span>
                      <span className="category-badge">{cat.badge}</span>
                    </div>
                    <h3>{cat.title}</h3>
                    <p className="category-telugu">{cat.teluguHint}</p>
                    <p className="category-desc">{cat.description}</p>
                    <ul className="category-list">
                      {cat.highlights.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/${
                      BUSINESS_INFO.whatsappNumber
                    }?text=${encodeURIComponent(
                      `Hi Trust Gold Services, I want to check today's rate for ${cat.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-navy"
                    style={{ width: '100%' }}
                  >
                    Enquire for {cat.title.replace(' Jewellery', '')}{' '}
                    <ArrowRight size={15} />
                  </a>
                </article>
              ))}
            </div>

            {/* Customer's Choice Banner: Direct Purchase vs Melting in Presence */}
            <div data-reveal className="choice-banner spotlight-card">
              <div>
                <span
                  className="section-tag"
                  style={{ color: 'var(--bullion-gold-bright)' }}
                >
                  Customer’s Choice Guarantee
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), Georgia, serif',
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)',
                    margin: '0 0 12px',
                    lineHeight: 1.12,
                  }}
                >
                  Direct Purchase or Melting in Your Presence—You Decide.
                </h3>
                <p
                  style={{
                    margin: '0 0 14px',
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: '0.94rem',
                  }}
                >
                  At Trust Gold Services, we never force a single method.
                  Customers choose the valuation process they are most
                  comfortable with—including purity testing, careful stone
                  removal, or melting right in front of their eyes.
                </p>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--bullion-gold-bright)',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                  }}
                >
                  “మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం, లేదు డైరెక్ట్‌గా
                  కొనమంటే డైరెక్ట్‌గా కొంటాం.”
                </p>
              </div>

              <div className="choice-cards">
                <div className="choice-option">
                  <Scale
                    size={22}
                    style={{
                      color: 'var(--bullion-gold-bright)',
                      marginBottom: 10,
                    }}
                  />
                  <h4>Direct Valuation &amp; Spot Buy</h4>
                  <small>No melting required</small>
                  <p>
                    We test purity and weigh your jewellery on our calibrated
                    scale in front of you, deduct stone weight transparently,
                    and pay you immediately.
                  </p>
                </div>

                <div className="choice-option">
                  <Flame
                    size={22}
                    style={{
                      color: 'var(--bullion-gold-bright)',
                      marginBottom: 10,
                    }}
                  />
                  <h4>Melting in Your Presence</h4>
                  <small>100% homogeneous purity assay</small>
                  <p>
                    Prefer melting for complete certainty? We remove stones so
                    you keep them, melt the gold in your presence, and settle
                    on the exact net reading.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            WHY FAMILIES CHOOSE US + TRANSPARENT SIDE-BY-SIDE COMPARISON MATRIX
            ==================================================================== */}
        <section id="comparison" className="section-pad section-vault">
          <div className="container-shell">
            <div className="comparison-header">
              <div>
                <span className="section-tag">Why Families Choose Us</span>
                <Split
                  text="Fair, fast, and stress-free gold valuation in Vijayawada."
                  goldWords={['Fair,', 'stress-free']}
                  className="section-heading"
                />
              </div>
              <p className="section-sub">
                From the first purity check to final settlement, every step at
                our Gandhinagar counter is built around clarity, dignity, and
                maximum value for your family’s ornaments.
              </p>
            </div>

            {/* 4-Pillar Trust Bento Grid (Upgraded from trustgoldservices.com) */}
            <div data-reveal-group className="trust-pillars-bento">
              <article className="trust-pillar-card spotlight-card">
                <div className="trust-pillar-top">
                  <span className="trust-pillar-index">01</span>
                  <div className="trust-pillar-icon">
                    <Scale size={20} />
                  </div>
                </div>
                <h3>Transparent Open-Counter Valuation</h3>
                <p>
                  Every purity check, weight reading on our calibrated 0.01g
                  scale, and stone deduction is explained openly in your
                  presence—never inside a closed room.
                </p>
              </article>

              <article className="trust-pillar-card spotlight-card">
                <div className="trust-pillar-top">
                  <span className="trust-pillar-index">02</span>
                  <div className="trust-pillar-icon">
                    <Banknote size={20} />
                  </div>
                </div>
                <h3>Instant Spot Payment</h3>
                <p>
                  Receive immediate settlement via spot cash, RTGS, NEFT, IMPS,
                  or UPI at the counter the moment you approve the final written
                  valuation sheet.
                </p>
              </article>

              <article className="trust-pillar-card spotlight-card">
                <div className="trust-pillar-top">
                  <span className="trust-pillar-index">03</span>
                  <div className="trust-pillar-icon">
                    <Sparkles size={20} />
                  </div>
                </div>
                <h3>Live Day’s Market Price</h3>
                <p>
                  Fair rates aligned directly to the live Vijayawada bullion
                  market for BIS 916 hallmarked, 916-stamped, and unmarked
                  family ornaments.
                </p>
              </article>

              <article className="trust-pillar-card spotlight-card">
                <div className="trust-pillar-top">
                  <span className="trust-pillar-index">04</span>
                  <div className="trust-pillar-icon">
                    <BadgePercent size={20} />
                  </div>
                </div>
                <h3>Flat 1% Processing Fee (99% Value)</h3>
                <p>
                  While corporate chains deduct 3%–5% and pawn brokers cut up to
                  15%, we charge a flat 1% processing fee so you keep 99% of
                  your gold’s value.
                </p>
              </article>
            </div>

            <div className="comparison-table-shell spotlight-card">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Valuation &amp; Settlement Factor</th>
                    <th scope="col" className="col-trustgold">
                      <span className="col-badge">RECOMMENDED · 99% VALUE</span>
                      <strong>Trust Gold Services</strong>
                      <small>Gandhinagar, Vijayawada</small>
                    </th>
                    <th scope="col">
                      <strong>Corporate Gold Chains</strong>
                      <small>Typical Franchise Buyers</small>
                    </th>
                    <th scope="col">
                      <strong>Local Pawn Brokers</strong>
                      <small>Unorganized Cash Buyers</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row">{row.feature}</th>
                      <td className="col-trustgold">
                        <span className="cell-trustgold-inner">
                          <CheckCircle2 size={16} />
                          <strong>{row.trustGold}</strong>
                        </span>
                      </td>
                      <td>{row.corporate}</td>
                      <td>{row.pawnBroker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CORE SERVICES: OLD GOLD PURCHASE & PLEDGED GOLD RELEASE
            ==================================================================== */}
        <section id="services" className="section-pad section-alabaster">
          <div className="container-shell">
            <span className="section-tag">Our Core Services</span>
            <Split
              text="Practical gold solutions for Vijayawada families."
              goldWords={['gold', 'solutions']}
              className="section-heading"
            />
            <p data-reveal className="section-sub">
              Whether you want to unlock cash from unused family ornaments or
              close a rising gold loan at a bank or NBFC, our team handles
              every step respectfully and quickly.
            </p>

            <div data-reveal-group className="services-showcase">
              <article className="service-feature-card spotlight-card">
                <div data-img-reveal className="service-media">
                  <div data-parallax className="parallax-media-wrap">
                    <Image
                      src="/images/old-gold-purchase.png"
                      alt="Old gold jewellery ready for transparent valuation at Trust Gold Services"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="service-body">
                  <span
                    className="category-num"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    01 / DIRECT OLD GOLD PURCHASE
                  </span>
                  <h3>Sell Old, Unused or Broken Gold Jewellery</h3>
                  <p>
                    Turn old, broken, ancestral, or stone-studded jewellery into
                    immediate funds at Vijayawada’s live market price. Every
                    step—from purity testing and stone separation to the 1%
                    processing fee and final payout—is explained before you
                    commit.
                  </p>
                  <ul className="category-list" style={{ marginTop: 'auto' }}>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>
                        We buy Hallmark 22K, 916 Mark &amp; unmarked ornaments
                      </span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>
                        Keep your stones/gems—only net gold weight is valued
                      </span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>
                        Instant spot payment via Cash / IMPS / RTGS / UPI
                      </span>
                    </li>
                  </ul>
                  <a
                    href={`https://wa.me/${
                      BUSINESS_INFO.whatsappNumber
                    }?text=${encodeURIComponent(
                      'Hi Trust Gold Services, I would like to enquire about selling old gold jewellery.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    Enquire About Selling Gold <ArrowRight size={16} />
                  </a>
                </div>
              </article>

              <article className="service-feature-card spotlight-card">
                <div data-img-reveal className="service-media">
                  <div data-parallax className="parallax-media-wrap">
                    <Image
                      src="/images/pledged-gold-release.png"
                      alt="Trust Gold Services executive assisting customer with bank pledged gold release"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="service-body">
                  <span
                    className="category-num"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    02 / BANK &amp; NBFC LOAN RELEASE
                  </span>
                  <h3>Release Pledged Gold &amp; Unlock Remaining Value</h3>
                  <p>
                    Is your jewellery locked in a gold loan at a bank or NBFC
                    with mounting interest? Instead of losing your gold to
                    auctions, we step in to settle the outstanding loan, release
                    your ornaments, and pay you the remaining market value.
                  </p>
                  <ul className="category-list" style={{ marginTop: 'auto' }}>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>
                        We accompany you to any Bank or NBFC across Vijayawada
                      </span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>
                        We pay off the principal + interest to release your
                        jewellery
                      </span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>
                        Transparent 1% processing fee &amp; immediate balance
                        settlement
                      </span>
                    </li>
                  </ul>
                  <a
                    href={`https://wa.me/${
                      BUSINESS_INFO.whatsappNumber
                    }?text=${encodeURIComponent(
                      'Hi Trust Gold Services, I need assistance releasing my pledged gold from a bank/NBFC.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    Ask About Pledged Gold Release <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ====================================================================
            FOUNDER SHOWCASE, STORY, VISION & MISSION (MANOHAR REDDY PORTRAITS)
            ==================================================================== */}
        <section id="founder" className="section-pad section-vault">
          <div className="container-shell founder-grid">
            {/* Left Column: Single Founder Portrait */}
            <div className="portrait-stage">
              <div data-img-reveal className="portrait-main-frame">
                <div data-parallax className="parallax-media-wrap">
                  <Image
                    src="/images/owner-2.png"
                    alt="Manohar Reddy — Founder, Trust Gold Services"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 16,
                    background: 'rgba(5, 16, 36, 0.86)',
                    backdropFilter: 'blur(14px)',
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: '1px solid rgba(230, 185, 92, 0.35)',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      color: '#ffffff',
                    }}
                  >
                    {BUSINESS_INFO.founderName} — Founder, Trust Gold Services
                  </strong>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--bullion-gold-bright)',
                    }}
                  >
                    Personal guidance at our Gandhinagar, Vijayawada branch
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Story, Vision & Mission from Client Brief */}
            <div data-reveal>
              <span className="section-tag">Our Story &amp; Leadership</span>
              <Split
                text="“Because gold carries value—but trust carries even more.”"
                goldWords={['gold', 'trust']}
                className="section-heading"
              />

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '0.98rem',
                  marginBottom: 16,
                }}
              >
                <strong>Trust Gold Services</strong> was born in Vijayawada from
                a simple belief: selling gold should never feel confusing,
                stressful, or unfair. We saw that many families who wanted to
                sell old gold—or release gold pledged with banks and
                NBFCs—often struggled to understand how their ornaments were
                valued, what deductions were being made, and whether they were
                receiving the right value.
              </p>

              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: '0.95rem',
                  marginBottom: 20,
                }}
              >
                Today, under the leadership of{' '}
                <strong style={{ color: 'var(--bullion-gold-bright)' }}>
                  {BUSINESS_INFO.founderName}
                </strong>
                , our approach remains simple: give customers clarity, choice,
                speed, and confidence. Whether it is hallmarked jewellery,
                non-hallmarked gold, jewellery with stones, or pledged gold, we
                explain every step openly—and for us, the relationship does not
                end after the transaction.
              </p>

              <div className="vision-mission-grid">
                <div className="vm-box">
                  <h4>Our Vision</h4>
                  <p>
                    To become the most trusted gold-buying and pledged-gold
                    assistance brand, starting from Vijayawada and expanding
                    across Andhra Pradesh and Telangana, by setting a new
                    standard for transparency, fair valuation, and customer
                    respect.
                  </p>
                </div>

                <div className="vm-box">
                  <h4>Our Mission</h4>
                  <p>
                    To help customers unlock the true value of their gold
                    through honest valuation, clear guidance, quick and secure
                    payment, and reliable assistance to release pledged gold
                    from banks and NBFCs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            INTERACTIVE KYC & REQUIRED DOCUMENTS CHECKLIST
            ==================================================================== */}
        <section id="documents" className="section-pad">
          <div className="container-shell kyc-container">
            <div data-reveal>
              <span className="section-tag">Compliance &amp; Checklist</span>
              <Split
                text="Know the exact documents before you visit our shop."
                goldWords={['exact', 'documents']}
                className="section-heading"
              />
              <p className="section-sub" style={{ marginBottom: 24 }}>
                To protect both you and our business, we follow a clean,
                documented verification process. Select your service below to
                see what to bring to our Gandhinagar office.
              </p>

              {/* Clip-Path Segmented Switcher for Documents */}
              <div
                className="segmented-control"
                role="tablist"
                aria-label="Document requirements by service"
                style={{ maxWidth: 420 }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={kycTab === 'direct-sale'}
                  className="segmented-btn"
                  onClick={() => switchKycTab('direct-sale')}
                >
                  Direct Gold Sale
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={kycTab === 'pledged-release'}
                  className="segmented-btn"
                  onClick={() => switchKycTab('pledged-release')}
                >
                  Bank Loan Release
                </button>
                <div
                  className="segmented-overlay"
                  aria-hidden="true"
                  style={{
                    clipPath:
                      kycTab === 'direct-sale'
                        ? 'inset(0 50% 0 0 round 7px)'
                        : 'inset(0 0% 0 50% round 7px)',
                  }}
                >
                  <span>Direct Gold Sale</span>
                  <span>Bank Loan Release</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  padding: '14px 16px',
                  borderRadius: 10,
                  background: 'var(--alabaster)',
                  border: '1px solid var(--rule-light)',
                  fontSize: '0.84rem',
                  color: 'var(--ink-muted)',
                }}
              >
                <strong style={{ color: 'var(--vault-navy)' }}>
                  Have a question about documents?
                </strong>{' '}
                Send us a photo of your pledge card or ornament on WhatsApp and
                we will guide you in 2 minutes.
              </div>
            </div>

            <div
              data-reveal-group
              className={
                kycSwitching ? 'doc-cards-grid switching' : 'doc-cards-grid'
              }
            >
              {KYC_DOCS[kycTab].map((doc, idx) => (
                <div key={doc.title} className="doc-card spotlight-card">
                  <div className="doc-icon">
                    {idx === 0 ? (
                      <UserCheck size={19} />
                    ) : idx === 1 ? (
                      <FileCheck2 size={19} />
                    ) : idx === 2 ? (
                      <Building2 size={19} />
                    ) : (
                      <Landmark size={19} />
                    )}
                  </div>
                  <div>
                    <h4>{doc.title}</h4>
                    <p>{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            INTERACTIVE 2-TRACK PROCESS + GANDHINAGAR BRANCH SHOWCASE
            ==================================================================== */}
        <section id="process" className="section-pad section-alabaster">
          <div className="container-shell">
            <div className="process-header-bar">
              <div>
                <span className="section-tag">How It Works</span>
                <Split
                  text="Four calm, visible steps from arrival to spot payout."
                  goldWords={['visible', 'spot', 'payout.']}
                  className="section-heading"
                />
                <p data-reveal className="section-sub">
                  Switch between our Direct Gold Sale flow and our Bank / NBFC
                  Pledged Gold Release flow below.
                </p>
              </div>

              {/* Interactive Two-Track Process Switcher */}
              <div
                className="segmented-control"
                role="tablist"
                aria-label="Select process workflow"
                style={{ minWidth: 340, marginBottom: 0 }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={processTrack === 'direct-sale'}
                  className="segmented-btn"
                  onClick={() => setProcessTrack('direct-sale')}
                >
                  Track 1: Sell Old Gold
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={processTrack === 'pledged-release'}
                  className="segmented-btn"
                  onClick={() => setProcessTrack('pledged-release')}
                >
                  Track 2: Release Pledged Gold
                </button>
                <div
                  className="segmented-overlay"
                  aria-hidden="true"
                  style={{
                    clipPath:
                      processTrack === 'direct-sale'
                        ? 'inset(0 50% 0 0 round 7px)'
                        : 'inset(0 0% 0 50% round 7px)',
                  }}
                >
                  <span>Track 1: Sell Old Gold</span>
                  <span>Track 2: Release Pledged Gold</span>
                </div>
              </div>
            </div>

            <div className="steps-timeline-wrap">
              <span
                aria-hidden="true"
                data-draw
                className="steps-golden-line"
              />
              <div data-reveal-group className="steps-grid">
                {PROCESS_TRACKS[processTrack].map((item) => (
                  <div key={item.title} className="step-card spotlight-card">
                    <span className="step-num">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authentic Gandhinagar Branch Open-Counter Showcase (/images/about-shop.png) */}
            <div className="branch-counter-banner spotlight-card">
              <div className="branch-counter-media">
                <Image
                  src="/images/about-shop.png"
                  alt="Trust Gold Services Gandhinagar Vijayawada branch consultation counter and digital gold weighing scale"
                  fill
                  sizes="(max-width: 900px) 100vw, 460px"
                />
              </div>
              <div className="branch-counter-copy">
                <span
                  className="section-tag"
                  style={{ color: 'var(--bullion-gold-bright)' }}
                >
                  Inside Our Gandhinagar Branch
                </span>
                <h3>
                  A Private, Respectful Consultation Counter Built for Families
                </h3>
                <p>
                  Unlike crowded street-side pawn shops, our First Floor office
                  at Shop No. 5, Vasisth Enclave in Gandhinagar offers air-conditioned
                  privacy, calibrated digital scales, and complete transparency
                  for women, senior citizens, and families across Vijayawada.
                </p>
                <div className="branch-counter-badges">
                  <span>
                    <ShieldCheck size={15} /> 100% Open-Counter Testing
                  </span>
                  <span>
                    <Award size={15} /> Stones Returned Intact
                  </span>
                  <span>
                    <Clock size={15} /> 15-Minute Spot Settlement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            FREQUENTLY ASKED QUESTIONS
            ==================================================================== */}
        <section id="faq" className="section-pad">
          <div className="container-shell faq-layout">
            <div data-reveal>
              <span className="section-tag">Questions, Answered</span>
              <Split
                text="Clarity before commitment."
                goldWords={['Clarity']}
                className="section-heading"
              />
              <p className="section-sub" style={{ marginBottom: 24 }}>
                We believe every customer should understand exactly how their
                gold is valued before stepping into our shop.
              </p>
              <Magnetic>
                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-navy"
                >
                  <MessageCircle size={17} /> Ask Us Directly on WhatsApp
                </a>
              </Magnetic>
            </div>

            <div data-reveal-group className="faq-accordion">
              {FAQS.map((item, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={item.q}
                    className={isOpen ? 'faq-row open' : 'faq-row'}
                  >
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown size={19} className="faq-chevron" />
                    </button>
                    {isOpen && <p className="faq-answer">{item.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CONTACT & WHATSAPP ENQUIRY SECTION
            ==================================================================== */}
        <section id="contact" className="section-pad section-vault">
          <div className="container-shell contact-layout">
            <div data-reveal>
              <span className="section-tag">Visit or Contact Us</span>
              <Split
                text="Ready for a transparent gold valuation in Vijayawada?"
                goldWords={['transparent', 'gold']}
                className="section-heading"
              />
              <p className="section-sub">
                Call us directly, message us on WhatsApp, or visit our
                Gandhinagar office. You will always receive honest guidance with
                zero obligation.
              </p>

              <div data-reveal-group className="contact-info-list">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="contact-info-card pressable spotlight-card"
                >
                  <Phone size={20} />
                  <div>
                    <small>Direct Phone &amp; WhatsApp</small>
                    <strong className="tabular-nums">
                      {BUSINESS_INFO.phoneFormatted}
                    </strong>
                  </div>
                </a>

                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card pressable spotlight-card"
                >
                  <MapPin size={20} />
                  <div>
                    <small>Vijayawada Branch Address (Tap for Google Maps)</small>
                    <strong>{BUSINESS_INFO.addressFull}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="contact-info-card pressable spotlight-card"
                >
                  <Mail size={20} />
                  <div>
                    <small>Official Email</small>
                    <strong>{BUSINESS_INFO.email}</strong>
                  </div>
                </a>

                <div className="contact-info-card spotlight-card">
                  <Clock size={20} />
                  <div>
                    <small>Working Hours</small>
                    <strong>{BUSINESS_INFO.hours}</strong>
                  </div>
                </div>
              </div>

              {/* Embedded Live Google Map for Gandhinagar, Vijayawada */}
              <div className="contact-map-frame">
                <iframe
                  title="Trust Gold Services — Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada Map"
                  src="https://www.google.com/maps?q=Vasisth+Enclave,+Gandhinagar,+Vijayawada,+Andhra+Pradesh+520003&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div data-reveal className="contact-form-card spotlight-card">
              {contactSubmitted ? (
                <div style={{ textAlign: 'center', padding: '28px 12px' }}>
                  <ShieldCheck
                    size={44}
                    style={{
                      color: 'var(--bullion-gold-deep)',
                      margin: '0 auto 14px',
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: '1.8rem',
                      margin: '0 0 8px',
                      color: 'var(--vault-navy)',
                    }}
                  >
                    WhatsApp Enquiry Ready
                  </h3>
                  <p
                    style={{
                      color: 'var(--ink-muted)',
                      fontSize: '0.92rem',
                      marginBottom: 20,
                    }}
                  >
                    We opened WhatsApp with your details. If it didn’t open
                    automatically, tap below to chat with us directly.
                  </p>
                  <a
                    href={defaultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ width: '100%', marginBottom: 12 }}
                  >
                    Open WhatsApp Now <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    style={{
                      background: 'none',
                      border: 0,
                      textDecoration: 'underline',
                      fontSize: '0.84rem',
                      color: 'var(--vault-navy)',
                    }}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: '1.65rem',
                      margin: '0 0 6px',
                      color: 'var(--vault-navy)',
                    }}
                  >
                    Request a Callback or WhatsApp Estimate
                  </h3>
                  <p
                    style={{
                      margin: '0 0 20px',
                      fontSize: '0.84rem',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    Your details go straight to our official WhatsApp (
                    {BUSINESS_INFO.phoneDisplay}).
                  </p>

                  <div className="form-field-grid">
                    <label className="form-field">
                      <span>Your Name *</span>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="form-field">
                      <span>Phone Number *</span>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="form-field-grid">
                    <label className="form-field">
                      <span>Service Needed</span>
                      <select
                        value={contactForm.service}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            service: e.target.value,
                          })
                        }
                      >
                        <option>Direct Old Gold Purchase</option>
                        <option>Bank / NBFC Pledged Gold Release</option>
                        <option>Free Gold Purity &amp; Value Check</option>
                      </select>
                    </label>

                    <label className="form-field">
                      <span>Jewellery Category</span>
                      <select
                        value={contactForm.jewelleryType}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            jewelleryType: e.target.value,
                          })
                        }
                      >
                        <option>Hallmark 22K Jewellery (916 BIS)</option>
                        <option>Only 916 Mark Jewellery</option>
                        <option>Other Marks / Unmarked Gold</option>
                      </select>
                    </label>
                  </div>

                  <label className="form-field">
                    <span>Approx. Weight or Bank Loan Details (Optional)</span>
                    <textarea
                      rows={3}
                      placeholder="E.g., 35g 916 necklace, or ₹1.8L gold loan at SBI Gandhinagar…"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </label>

                  <button
                    type="submit"
                    className="btn btn-gold"
                    style={{ width: '100%' }}
                  >
                    Send Enquiry on WhatsApp <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER WITH AUTHENTIC SOCIAL ICONS, MAPS & CONTACT LINKS
          ==================================================================== */}
      <footer className="site-footer">
        <div className="container-shell">
          <div className="footer-grid">
            <div>
              <div className="brand-lockup" style={{ marginBottom: 14 }}>
                <Image
                  src="/logo.png"
                  alt="Trust Gold Services logo"
                  width={48}
                  height={48}
                  className="brand-emblem"
                />
                <div className="brand-title">
                  <span className="brand-title-main">Trust Gold</span>
                  <span className="brand-title-sub">Services · Vijayawada</span>
                </div>
              </div>
              <p
                style={{
                  margin: '0 0 10px',
                  fontSize: '0.88rem',
                  maxWidth: '38ch',
                  color: 'rgba(255,255,255,0.72)',
                }}
              >
                {BUSINESS_INFO.uspHeadline} Serving families across Vijayawada,
                Andhra Pradesh, and Telangana.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.82rem',
                  color: 'var(--bullion-gold-bright)',
                  fontWeight: 600,
                }}
              >
                {BUSINESS_INFO.teluguTagline}
              </p>
            </div>

            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <div className="footer-links">
                <a href="#gold-craft">916 Touchstone Assay</a>
                <a href="#categories">3 Jewellery Categories</a>
                <a href="#comparison">Why Families Choose Us</a>
                <a href="#services">Pledged Gold Release</a>
                <a href="#founder">Founder &amp; Vision</a>
                <a href="#documents">Required Documents</a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">Direct Contact</h4>
              <div className="footer-links">
                <a href={`tel:${BUSINESS_INFO.phone}`} className="tabular-nums">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
                <a href={`mailto:${BUSINESS_INFO.email}`}>
                  {BUSINESS_INFO.email}
                </a>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">Follow Trust Gold</h4>
              <div className="social-pills">
                <Magnetic>
                  <a
                    href={BUSINESS_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn pressable"
                    aria-label="Follow Trust Gold Services on Instagram"
                    title="Instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={BUSINESS_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn pressable"
                    aria-label="Follow Trust Gold Services on Facebook"
                    title="Facebook"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.5 21v-7.5h2.55l.38-2.95H13.5V8.67c0-.85.24-1.43 1.46-1.43h1.56V4.6c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.91v2.16H8v2.95h2.44V21h3.06z" />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={BUSINESS_INFO.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn pressable"
                    aria-label="Subscribe to Trust Gold Services on YouTube"
                    title="YouTube"
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.92 4.78 12 4.78 12 4.78s-5.92 0-7.64.46A2.75 2.75 0 0 0 2.42 7.2C1.96 8.9 1.96 12 1.96 12s0 3.1.46 4.81a2.75 2.75 0 0 0 1.94 1.95c1.72.46 7.64.46 7.64.46s5.92 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95c.46-1.71.46-4.81.46-4.81s0-3.1-.46-4.81zM9.95 15.02V8.98L15.2 12l-5.25 3.02z" />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={defaultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn pressable"
                    aria-label="Chat with Trust Gold Services on WhatsApp"
                    title="WhatsApp"
                  >
                    <MessageCircle size={19} />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
              reserved.
            </span>
            <span>
              Founded by {BUSINESS_INFO.founderName} · Gandhinagar, Vijayawada
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Translucent Action Dock */}
      <div className="mobile-dock">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="btn btn-outline-light btn-sm tabular-nums"
        >
          <Phone size={15} /> Call Now
        </a>
        <a
          href={defaultWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold btn-sm"
        >
          <MessageCircle size={15} /> WhatsApp Quote
        </a>
      </div>
    </div>
  )
}
