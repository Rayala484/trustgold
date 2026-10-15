'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Award,
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
  VALUATION_METHODS,
  buildEstimateWhatsAppUrl,
  calculateGoldEstimate,
  formatINR,
  type EstimateMode,
  type GoldCategoryId,
  type ValuationMethodId,
} from '@/lib/gold-calculator'
import { triggerTrustGoldIntro } from '@/components/GoldOpening'
import { GoldTouchstoneAssay } from '@/components/GoldTouchstoneAssay'

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

  // Interactive Calculator State
  const [mode, setMode] = useState<EstimateMode>('direct-sale')
  const [categoryId, setCategoryId] = useState<GoldCategoryId>('hallmark-22k')
  const [valuationMethod, setValuationMethod] =
    useState<ValuationMethodId>('direct')
  const [weightGrams, setWeightGrams] = useState<number>(24)
  const [stoneWeightGrams, setStoneWeightGrams] = useState<number>(1)
  const [ratePerGram22k, setRatePerGram22k] = useState<number>(7350)
  const [loanPayoffAmount, setLoanPayoffAmount] = useState<number>(110000)
  const [receiptTransitioning, setReceiptTransitioning] = useState(false)

  // KYC Document Checklist Tab State
  const [kycTab, setKycTab] = useState<EstimateMode>('direct-sale')
  const [kycSwitching, setKycSwitching] = useState(false)

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

  const estimate = calculateGoldEstimate({
    mode,
    categoryId,
    valuationMethod,
    weightGrams,
    stoneWeightGrams,
    ratePerGram22k,
    loanPayoffAmount,
  })

  const estimateWhatsAppUrl = buildEstimateWhatsAppUrl(estimate)
  const defaultWhatsAppUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hi Trust Gold Services, I visited your website and would like a transparent gold valuation / pledged gold release consultation.'
  )}`

  function switchCalculatorMode(nextMode: EstimateMode) {
    if (nextMode === mode) return
    setReceiptTransitioning(true)
    setMode(nextMode)
    setTimeout(() => setReceiptTransitioning(false), 180)
  }

  function switchKycTab(nextTab: EstimateMode) {
    if (nextTab === kycTab) return
    setKycSwitching(true)
    setKycTab(nextTab)
    setTimeout(() => setKycSwitching(false), 180)
  }

  function handleSelectFromTouchstone(
    nextCategory: GoldCategoryId,
    nextWeight: number
  ) {
    setReceiptTransitioning(true)
    setCategoryId(nextCategory)
    setWeightGrams(nextWeight)
    setStoneWeightGrams(0)
    setTimeout(() => setReceiptTransitioning(false), 180)
    const calcEl = document.getElementById('calculator')
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
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
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>
              Live Estimator
            </a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)}>
              3 Gold Tiers
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
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQs
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
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
            >
              WhatsApp Quote <ArrowRight size={15} />
            </a>
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

      <main>
        {/* ====================================================================
            HERO + INTERACTIVE GOLD & PLEDGED RELEASE CALCULATOR
            ==================================================================== */}
        <section className="hero-vault">
          <div className="container-shell hero-grid">
            {/* Left Editorial Column */}
            <div>
              <div className="telugu-pill">
                <span className="telugu-pill-dot" />
                <span>
                  {BUSINESS_INFO.teluguTagline} · Gandhinagar, Vijayawada
                </span>
              </div>

              <h1 className="hero-display">
                Transparent Gold Buying.{' '}
                <span className="hero-display-gold">Customer’s Choice.</span>{' '}
                Clear Value.
              </h1>

              <p className="hero-lead">
                Sell old gold or release bank &amp; NBFC pledged gold in
                Vijayawada with complete dignity. We clearly explain today’s
                gold rate, purity, stone deductions, and our flat{' '}
                <strong style={{ color: '#e6b95c' }}>1% processing fee</strong>{' '}
                before proceeding—and let you choose between direct purchase or
                melting in your presence.
              </p>

              <div className="hero-actions">
                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <MessageCircle size={18} /> Get Free WhatsApp Valuation
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="btn btn-outline-light tabular-nums"
                >
                  <Phone size={17} /> Call {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              {/* Founder Personal Guarantee Strip */}
              <div className="hero-founder-strip">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(200, 146, 42, 0.16)',
                    border: '1px solid rgba(230, 185, 92, 0.4)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--bullion-gold-bright)',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={24} />
                </div>
                <div className="hero-founder-meta">
                  <strong>Open-Counter Assay Promise</strong>
                  <span>
                     Gandhinagar, Vijayawada · Serving AP &amp; Telangana
                  </span>
                  <p>
                    “Selling gold should never feel confusing or unfair. Every
                    purity test and calculation happens right in front of your
                    eyes.”
                  </p>
                </div>
              </div>

              <div className="hero-metrics">
                <div className="metric-item">
                  <strong className="tabular-nums">3 Types</strong>
                  <span>Hallmark 22K · 916 Mark · Unmarked Gold</span>
                </div>
                <div className="metric-item">
                  <strong className="tabular-nums">1% Fee</strong>
                  <span>Transparent processing fee, zero hidden cuts</span>
                </div>
                <div className="metric-item">
                  <strong>Your Choice</strong>
                  <span>Direct purchase or melt in your presence</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Assay & Loan Release Estimator */}
            <div id="calculator" className="calculator-shell">
              <div className="calc-header">
                <div className="calc-title-block">
                  <h2>Live Value &amp; Release Estimator</h2>
                  <p>
                    Check your indicative payout or pledged loan release balance
                  </p>
                </div>
                <span className="live-assay-pill">
                  <Scale size={13} /> 1% Fee Applied
                </span>
              </div>

              {/* Emil Kowalski Clip-Path Segmented Control */}
              <div
                className="segmented-control"
                role="tablist"
                aria-label="Select estimation type"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'direct-sale'}
                  className="segmented-btn"
                  onClick={() => switchCalculatorMode('direct-sale')}
                >
                  Direct Old Gold Sale
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'pledged-release'}
                  className="segmented-btn"
                  onClick={() => switchCalculatorMode('pledged-release')}
                >
                  Pledged Gold Release
                </button>
                <div
                  className="segmented-overlay"
                  aria-hidden="true"
                  style={{
                    clipPath:
                      mode === 'direct-sale'
                        ? 'inset(0 50% 0 0 round 7px)'
                        : 'inset(0 0% 0 50% round 7px)',
                  }}
                >
                  <span>Direct Old Gold Sale</span>
                  <span>Pledged Gold Release</span>
                </div>
              </div>

              {/* 1. Select Jewellery Category (3 Types from Client Brief) */}
              <div className="calc-field-group">
                <div className="calc-label-row">
                  <span>1. Select Gold Jewellery Type</span>
                  <span style={{ color: 'var(--bullion-gold-deep)' }}>
                    {estimate.category.badge}
                  </span>
                </div>
                <div className="tier-selector-grid">
                  {GOLD_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={
                        categoryId === cat.id
                          ? 'tier-chip pressable active'
                          : 'tier-chip pressable'
                      }
                      onClick={() => setCategoryId(cat.id)}
                    >
                      <strong>{cat.title.replace(' Jewellery', '')}</strong>
                      <small>{cat.badge}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Customer's Choice of Valuation Method */}
              <div className="calc-field-group">
                <div className="calc-label-row">
                  <span>2. Preferred Valuation Method (Your Choice)</span>
                </div>
                <div className="method-toggle-grid">
                  {VALUATION_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={
                        valuationMethod === m.id
                          ? 'method-chip pressable active'
                          : 'method-chip pressable'
                      }
                      onClick={() => setValuationMethod(m.id)}
                    >
                      <span>{m.title}</span>
                      <CheckCircle2 size={15} />
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Weight & Stone Weight Sliders */}
              <div className="calc-field-group">
                <div className="calc-label-row">
                  <label htmlFor="gross-weight-slider">
                    3. Gross Ornament Weight
                  </label>
                  <span className="tabular-nums">{weightGrams} grams</span>
                </div>
                <input
                  id="gross-weight-slider"
                  type="range"
                  min={1}
                  max={250}
                  step={1}
                  value={weightGrams}
                  onChange={(e) => {
                    const nextW = Number(e.target.value)
                    setWeightGrams(nextW)
                    if (stoneWeightGrams > nextW) setStoneWeightGrams(nextW)
                  }}
                  className="range-slider"
                />
              </div>

              <div className="calc-inline-inputs">
                <div>
                  <div className="calc-label-row">
                    <label htmlFor="stone-weight-input">
                      Stone / Beads Weight
                    </label>
                  </div>
                  <div className="number-input-box">
                    <input
                      id="stone-weight-input"
                      type="number"
                      min={0}
                      max={weightGrams}
                      step={0.5}
                      value={stoneWeightGrams}
                      onChange={(e) =>
                        setStoneWeightGrams(
                          Math.min(
                            weightGrams,
                            Math.max(0, Number(e.target.value) || 0)
                          )
                        )
                      }
                      className="tabular-nums"
                    />
                    <span>g</span>
                  </div>
                </div>

                <div>
                  <div className="calc-label-row">
                    <label htmlFor="gold-rate-input">
                      22K Market Rate / Gram
                    </label>
                  </div>
                  <div className="number-input-box">
                    <input
                      id="gold-rate-input"
                      type="number"
                      min={4000}
                      max={15000}
                      step={50}
                      value={ratePerGram22k}
                      onChange={(e) =>
                        setRatePerGram22k(
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      }
                      className="tabular-nums"
                    />
                    <span>₹/g</span>
                  </div>
                </div>
              </div>

              {/* Conditional Loan Payoff Slider when in Pledged Release Mode */}
              {mode === 'pledged-release' && (
                <div className="calc-field-group">
                  <div className="calc-label-row">
                    <label htmlFor="loan-payoff-slider">
                      4. Bank / NBFC Loan Closure Amount
                    </label>
                    <span className="tabular-nums">
                      {formatINR(loanPayoffAmount)}
                    </span>
                  </div>
                  <input
                    id="loan-payoff-slider"
                    type="range"
                    min={10000}
                    max={1500000}
                    step={5000}
                    value={loanPayoffAmount}
                    onChange={(e) =>
                      setLoanPayoffAmount(Number(e.target.value))
                    }
                    className="range-slider"
                  />
                </div>
              )}

              {/* Live Assay Receipt Card */}
              <div
                className={
                  receiptTransitioning
                    ? 'assay-receipt transitioning'
                    : 'assay-receipt'
                }
                aria-live="polite"
              >
                <div className="receipt-row">
                  <span>
                    Net Gold Weight ({estimate.grossWeightGrams}g −{' '}
                    {estimate.stoneWeightGrams}g stone)
                  </span>
                  <strong className="tabular-nums">
                    {estimate.netWeightGrams} g
                  </strong>
                </div>
                <div className="receipt-row">
                  <span>
                    Indicative Gross Value (@{' '}
                    {formatINR(estimate.effectiveRatePerGram)}/g)
                  </span>
                  <strong className="tabular-nums">
                    {formatINR(estimate.grossValue)}
                  </strong>
                </div>
                <div className="receipt-row">
                  <span>
                    Processing Fee ({estimate.processingFeePercent}% of total
                    value)
                  </span>
                  <strong className="tabular-nums">
                    − {formatINR(estimate.processingFee)}
                  </strong>
                </div>
                {mode === 'pledged-release' && (
                  <div className="receipt-row">
                    <span>Less: Bank / NBFC Loan Closure Settlement</span>
                    <strong className="tabular-nums">
                      − {formatINR(estimate.loanPayoffAmount)}
                    </strong>
                  </div>
                )}
                <div className="receipt-divider" />
                <div className="receipt-total">
                  <span className="receipt-total-label">
                    {mode === 'pledged-release'
                      ? 'Estimated Net Balance Paid to You'
                      : 'Estimated Spot Payout to You'}
                  </span>
                  <span className="receipt-total-value tabular-nums">
                    {formatINR(estimate.netCustomerPayout)}
                  </span>
                </div>
              </div>

              <a
                href={estimateWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                Send This Estimate to WhatsApp <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================================
            THE CRAFT OF GOLD VALUATION: BASANITE TOUCHSTONE & 916 ASSAY BENCH
            ==================================================================== */}
        <GoldTouchstoneAssay
          ratePerGram22k={ratePerGram22k}
          onSelectForCalculator={handleSelectFromTouchstone}
        />

        {/* ====================================================================
            3 TYPES OF GOLD JEWELLERY + CUSTOMER'S CHOICE BANNER
            ==================================================================== */}
        <section id="categories" className="section-pad">
          <div className="container-shell">
            <span className="section-tag">3 Gold Categories We Buy</span>
            <h2 className="section-heading">
              Clear valuation for every mark, purity, and ornament.
            </h2>
            <p className="section-sub">
              Whether your ornaments carry a BIS 916 hallmark, a traditional 916
              stamp, or no mark at all, we evaluate every piece openly in your
              presence and explain the exact calculation before you decide.
            </p>

            <div className="categories-grid">
              {GOLD_CATEGORIES.map((cat) => (
                <article key={cat.id} className="category-card">
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
            <div className="choice-banner">
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
            CORE SERVICES: OLD GOLD PURCHASE & PLEDGED GOLD RELEASE
            ==================================================================== */}
        <section id="services" className="section-pad section-alabaster">
          <div className="container-shell">
            <span className="section-tag">Our Core Services</span>
            <h2 className="section-heading">
              Practical gold solutions for Vijayawada families.
            </h2>
            <p className="section-sub">
              Whether you want to unlock cash from unused family ornaments or
              close a rising gold loan at a bank or NBFC, our team handles
              every step respectfully and quickly.
            </p>

            <div className="services-showcase">
              <article className="service-feature-card">
                <div className="service-media">
                  <Image
                    src="/images/old-gold-purchase.png"
                    alt="Old gold jewellery ready for transparent valuation at Trust Gold Services"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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

              <article className="service-feature-card">
                <div className="service-media">
                  <Image
                    src="/images/pledged-gold-release.png"
                    alt="Trust Gold Services executive assisting customer with bank pledged gold release"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
              <div className="portrait-main-frame">
                <Image
                  src="/images/owner-2.png"
                  alt="Manohar Reddy — Founder, Trust Gold Services"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
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
            <div>
              <span className="section-tag">Our Story &amp; Leadership</span>
              <h2 className="section-heading">
                “Because gold carries value—but trust carries even more.”
              </h2>

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
            <div>
              <span className="section-tag">Compliance &amp; Checklist</span>
              <h2 className="section-heading">
                Know the exact documents before you visit our shop.
              </h2>
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
              className={
                kycSwitching ? 'doc-cards-grid switching' : 'doc-cards-grid'
              }
            >
              {KYC_DOCS[kycTab].map((doc, idx) => (
                <div key={doc.title} className="doc-card">
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
            4-STEP TRANSPARENT PROCESS
            ==================================================================== */}
        <section id="process" className="section-pad section-alabaster">
          <div className="container-shell">
            <span className="section-tag">How It Works</span>
            <h2 className="section-heading">
              Four calm, visible steps from arrival to spot payout.
            </h2>
            <p className="section-sub">
              No back-room testing and no rushed pressure. Everything happens at
              our front counter in Gandhinagar, Vijayawada.
            </p>

            <div className="steps-grid">
              <div className="step-card">
                <span className="step-num">STEP 01</span>
                <h3>Share Details or Walk In</h3>
                <p>
                  Visit Shop No. 5, Vasisth Enclave in Gandhinagar, or send
                  your ornament / bank loan details on WhatsApp for a free
                  initial estimate.
                </p>
              </div>

              <div className="step-card">
                <span className="step-num">STEP 02</span>
                <h3>Choose Your Assay Method</h3>
                <p>
                  Watch purity testing and digital weighing in front of you.
                  Choose direct valuation or request melting in your presence.
                </p>
              </div>

              <div className="step-card">
                <span className="step-num">STEP 03</span>
                <h3>Review Clear Breakdown</h3>
                <p>
                  We show the live day’s rate, purity, stone weight, and flat
                  1% processing fee on paper before you make your decision.
                </p>
              </div>

              <div className="step-card">
                <span className="step-num">STEP 04</span>
                <h3>Instant Spot Settlement</h3>
                <p>
                  Receive immediate payment via Cash, UPI, IMPS, or RTGS—or let
                  our team close your bank loan and hand over your balance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            FREQUENTLY ASKED QUESTIONS
            ==================================================================== */}
        <section id="faq" className="section-pad">
          <div className="container-shell faq-layout">
            <div>
              <span className="section-tag">Questions, Answered</span>
              <h2 className="section-heading">Clarity before commitment.</h2>
              <p className="section-sub" style={{ marginBottom: 24 }}>
                We believe every customer should understand exactly how their
                gold is valued before stepping into our shop.
              </p>
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy"
              >
                <MessageCircle size={17} /> Ask Us Directly on WhatsApp
              </a>
            </div>

            <div className="faq-accordion">
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
            <div>
              <span className="section-tag">Visit or Contact Us</span>
              <h2 className="section-heading">
                Ready for a transparent gold valuation in Vijayawada?
              </h2>
              <p className="section-sub">
                Call us directly, message us on WhatsApp, or visit our
                Gandhinagar office. You will always receive honest guidance with
                zero obligation.
              </p>

              <div className="contact-info-list">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="contact-info-card pressable"
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
                  className="contact-info-card pressable"
                >
                  <MapPin size={20} />
                  <div>
                    <small>Vijayawada Branch Address (Tap for Google Maps)</small>
                    <strong>{BUSINESS_INFO.addressFull}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="contact-info-card pressable"
                >
                  <Mail size={20} />
                  <div>
                    <small>Official Email</small>
                    <strong>{BUSINESS_INFO.email}</strong>
                  </div>
                </a>

                <div className="contact-info-card">
                  <Clock size={20} />
                  <div>
                    <small>Working Hours</small>
                    <strong>{BUSINESS_INFO.hours}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
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
          FOOTER WITH AUTHENTIC SOCIALS, MAPS & CONTACT LINKS
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
                <a href="#calculator">Live Gold Estimator</a>
                <a href="#categories">3 Jewellery Categories</a>
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
                <a
                  href={BUSINESS_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill pressable"
                >
                  Instagram
                </a>
                <a
                  href={BUSINESS_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill pressable"
                >
                  Facebook
                </a>
                <a
                  href={BUSINESS_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill pressable"
                >
                  YouTube
                </a>
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
