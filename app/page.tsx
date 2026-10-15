'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Eye,
  FileCheck2,
  FileText,
  Flame,
  Gem,
  Globe,
  HandCoins,
  HelpCircle,
  Home,
  Landmark,
  LockOpen,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  X,
} from 'lucide-react'
import {
  BUSINESS_INFO,
  GOLD_CATEGORIES,
  REQUIRED_DOCUMENTS,
  validateLeadInput,
  type GoldCategoryTier,
} from '@/lib/gold-calculator'
import { type Language, TRANSLATIONS } from '@/lib/i18n'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { GoldTouchstoneAssay } from '@/components/GoldTouchstoneAssay'
import { SiteMotion, Split } from '@/components/SiteMotion'
import { TrustGold3DStage } from '@/components/TrustGold3DStage'
import { ImageReveal } from '@/components/animations/ImageReveal'
import { Magnetic } from '@/components/animations/Magnetic'
import { Parallax } from '@/components/animations/Parallax'

const TELUGU_CATEGORIES: Record<
  GoldCategoryTier,
  {
    name: string
    badge: string
    purityDescription: string
    valuationNote: string
    examples: string[]
  }
> = {
  'hallmark-22k': {
    name: 'హాల్‌మార్క్ 22K బంగారం (BIS 916 HUID)',
    badge: 'BIS 916 హాల్‌మార్క్ · అత్యధిక విలువ',
    purityDescription: '91.6% స్వచ్ఛమైన బంగారం · అధికారిక BIS హాల్‌మార్క్ & HUID ముద్ర',
    valuationNote:
      'మీ ఆభరణాలపై ఉన్న హాల్‌మార్క్ ముద్రను మీ ముందే పరిశీలించి, కరిగించకుండానే నేరుగా 22K మార్కెట్ రేటు అందిస్తాం (లేదా మీ కోరిక మేరకు మెల్టింగ్ చేస్తాం).',
    examples: [
      'BIS 916 హాల్‌మార్క్ గల నెక్లెస్‌లు, హారాలు & గాజులు',
      '6-అంకెల HUID లేజర్ కోడ్ గల ఆధునిక బంగారు నగలు',
      'బిల్లు ఉన్న లేదా బిల్లు లేని 916 తాళిబొట్టు గొలుసులు & వడ్డాణాలు',
    ],
  },
  'mark-916': {
    name: 'ఓన్లీ 916 మార్క్ (KDM / పాత 916 ముద్ర)',
    badge: '916 KDM ముద్ర · మీ సమక్షంలో పరీక్ష',
    purityDescription: 'HUID లేకుండా 916 / KDM ముద్ర మాత్రమే ఉన్న బంగారు ఆభరణాలు',
    valuationNote:
      '2021 కి ముందు తయారైన 916 ఆభరణాలను మీ కళ్ళ ముందే గీటు రాయి (Touchstone) పై పరీక్షించి, రాళ్ళు తీసి మీకే తిరిగి ఇచ్చి నికర బంగారానికి పూర్తి విలువ ఇస్తాం.',
    examples: [
      'పాత 916 ముద్ర గల కుటుంబ ఆభరణాలు & KDM నగలు',
      'స్థానిక జ్యువెలరీ షాపులలో చేయించిన 916 ముద్ర గల ఉంగరాలు, గొలుసులు',
      'బ్యాంకు లోన్ నుండి విడిపించిన పాత 916 బంగారు ఆభరణాలు',
    ],
  },
  'other-unmarked': {
    name: 'ఇతర మార్కులు / అన్‌మార్క్డ్ బంగారం',
    badge: 'అన్ని రకాల పాత & విరిగిన బంగారం కొంటాము',
    purityDescription: 'హాల్‌మార్క్ ముద్ర లేని పాత తరపు, విరిగిన లేదా ఇతర క్యారెట్ ఆభరణాలు',
    valuationNote:
      'ముద్ర లేని లేదా పాత తరపు ఆభరణాలను మీ కళ్ళ ముందే పరీక్షించి (మీ కోరిక మేరకు డైరెక్ట్‌గా లేదా మెల్టింగ్ చేసి), ఉన్న కచ్చితమైన స్వచ్ఛత ఆధారంగా న్యాయమైన ధర చెల్లిస్తాం.',
    examples: [
      'ముద్ర లేని తాతముత్తాతల కాలం నాటి పాత బంగారు ఆభరణాలు',
      'విరిగిన బంగారు ముక్కలు, సింగిల్ ఇయర్ రింగ్స్, పాత కాసులు',
      '18K, 20K లేదా అరిగిపోయిన ముద్రలు గల బంగారు నగలు',
    ],
  },
}

const TELUGU_DOCUMENTS: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  aadhaar: {
    title: 'ఆధార్ కార్డు (Aadhaar Card)',
    subtitle: 'ప్రభుత్వ గుర్తింపు కార్డు (తప్పనిసరి)',
    description:
      'బంగారం యజమాని యొక్క ఒరిజినల్ ఆధార్ కార్డు వెరిఫికేషన్ కోసం తీసుకురావాలి.',
  },
  pan: {
    title: 'పాన్ కార్డు (PAN Card)',
    subtitle: 'ఆదాయపు పన్ను & బ్యాంక్ బదిలీ KYC (తప్పనిసరి)',
    description:
      'చట్టబద్ధమైన బిల్లింగ్ మరియు వేగవంతమైన IMPS / NEFT / RTGS బ్యాంక్ బదిలీ కోసం పాన్ కార్డు అవసరం.',
  },
  'purchase-bills': {
    title: 'బంగారం కొన్న బిల్లులు (Purchase Bills)',
    subtitle: 'అందుబాటులో ఉంటే తీసుకురండి',
    description:
      'ఆభరణాలు కొన్న అసలు జ్యువెలరీ బిల్లులు లేదా పాత రసీదులు ఉంటే వెరిఫికేషన్ మరింత వేగంగా పూర్తవుతుంది.',
  },
  'house-verification': {
    title: 'హౌస్ వెరిఫికేషన్ (House Verification)',
    subtitle: 'నివాస చిరునామా నిర్ధారణ',
    description:
      'ప్రతి లావాదేవీ 100% సురక్షితంగా మరియు పారదర్శకంగా ఉండేందుకు ప్రామాణిక నివాస చిరునామా నిర్ధారణ చేస్తాము.',
  },
  'security-cheques': {
    title: '2 సెక్యూరిటీ చెక్కులు (2 Security Cheques)',
    subtitle: 'తాకట్టు బంగారం విడిపింపుకు అవసరం',
    description:
      'బ్యాంకు లేదా ఫైనాన్స్ సంస్థలో మీ లోన్ బకాయిని మేము ముందుగా చెల్లించి బంగారం విడిపించే ప్రక్రియ కోసం 2 సెక్యూరిటీ చెక్కులు అవసరం.',
  },
}

export default function TrustGoldHomePage() {
  const [lang, setLang] = useState<Language>('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Process Track State: 'sell' vs 'release'
  const [processTrack, setProcessTrack] = useState<'sell' | 'release'>('sell')

  // Document Checklist Filter State
  const [docFilter, setDocFilter] = useState<'all' | 'direct' | 'pledge'>('all')

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)

  // Lead Enquiry Form State
  const [leadName, setLeadName] = useState<string>('')
  const [leadPhone, setLeadPhone] = useState<string>('')
  const [leadService, setLeadService] = useState<
    'sell_old_gold' | 'release_pledged_gold' | 'rate_check'
  >('sell_old_gold')
  const [leadCategory, setLeadCategory] =
    useState<GoldCategoryTier>('hallmark-22k')
  const [leadWeight, setLeadWeight] = useState<string>('')
  const [leadMessage, setLeadMessage] = useState<string>('')
  const [leadErrors, setLeadErrors] = useState<{
    name?: string
    phone?: string
    weightGrams?: string
  }>({})
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false)

  // Hydrate persisted language preference from localStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('trustgold_lang')
      if (saved === 'te' || saved === 'en') {
        setLang(saved)
        document.documentElement.lang = saved
      }
    } catch {
      // Ignore storage access errors
    }
  }, [])

  // Mobile dock: hide it while the hero buttons or the contact form are on screen, so the same
  // Call / WhatsApp actions are never shown twice at once.
  useEffect(() => {
    const dock = document.querySelector<HTMLElement>('.mobile-dock')
    const targets = document.querySelectorAll('.hero-actions, #contact')
    if (!dock || !targets.length || !('IntersectionObserver' in window)) return
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      dock.dataset.hidden = visible.size > 0 ? 'true' : 'false'
    })
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  function handleLanguageSwitch(nextLang: Language) {
    setLang(nextLang)
    try {
      window.localStorage.setItem('trustgold_lang', nextLang)
      document.documentElement.lang = nextLang
    } catch {
      // Ignore storage access errors
    }
  }

  const t = TRANSLATIONS[lang]

  const generalWhatsappUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(
    lang === 'te'
      ? 'నమస్కారం Trust Gold Services (విజయవాడ), పాత బంగారం అమ్మకం / తాకట్టు బంగారం విడిపింపు మరియు ఈరోజు గ్రాము రేటు వివరాలు తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hi Trust Gold Services (Vijayawada), I would like a free valuation enquiry for my gold ornaments and today’s per-gram rate.'
  )}`

  const sellGoldWhatsappUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(t.services.sellGold.whatsappPrefill)}`

  const releaseGoldWhatsappUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(t.services.releaseGold.whatsappPrefill)}`

  const filteredDocuments = REQUIRED_DOCUMENTS.filter((doc) => {
    if (docFilter === 'all') return true
    if (docFilter === 'direct') return !doc.forPledgedReleaseOnly
    return true
  })

  function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validation = validateLeadInput({
      name: leadName,
      phone: leadPhone,
      serviceType: leadService,
      weightGrams: leadWeight,
      message: leadMessage,
    })

    if (!validation.valid) {
      setLeadErrors({
        name: validation.errors.name ? t.contact.errors.name : undefined,
        phone: validation.errors.phone ? t.contact.errors.phone : undefined,
        weightGrams: validation.errors.weightGrams
          ? t.contact.errors.weight
          : undefined,
      })
      return
    }

    setLeadErrors({})
    setLeadSubmitted(true)
  }

  const selectedCategoryObj =
    GOLD_CATEGORIES.find((c) => c.id === leadCategory) ?? GOLD_CATEGORIES[0]

  const serviceLabelText =
    leadService === 'sell_old_gold'
      ? t.contact.serviceOptions.sell
      : leadService === 'release_pledged_gold'
        ? t.contact.serviceOptions.release
        : t.contact.serviceOptions.rateCheck

  const leadWhatsappUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(
    `Hi Trust Gold Services (Gandhinagar, Vijayawada),\n` +
      `• Name: ${leadName.trim()}\n` +
      `• Phone: ${leadPhone.trim()}\n` +
      `• Service: ${serviceLabelText}\n` +
      `• Gold Category: ${selectedCategoryObj.shortName}\n` +
      (leadWeight.trim() ? `• Approx Weight: ${leadWeight.trim()}g\n` : '') +
      (leadMessage.trim() ? `• Note: ${leadMessage.trim()}` : '')
  )}`

  const activeSteps =
    processTrack === 'sell'
      ? t.howItWorks.sellSteps
      : t.howItWorks.releaseSteps

  return (
    <div className={lang === 'te' ? 'lang-te-root' : 'lang-en-root'}>
      <SiteMotion />

      {/* Top Credibility & Language Ribbon */}
      <div className="top-ribbon">
        <div className="top-ribbon-inner">
          <div className="ribbon-left">
            <span className="ribbon-badge">
              <ShieldCheck size={14} />
              {t.meta.topRibbonChoice}
            </span>
            <span>
              <MapPin
                size={13}
                style={{
                  display: 'inline',
                  marginRight: 5,
                  verticalAlign: '-2px',
                }}
              />
              {t.meta.topRibbonLocation}
            </span>
          </div>
          <div className="ribbon-right">
            <span>
              <Clock
                size={13}
                style={{
                  display: 'inline',
                  marginRight: 5,
                  verticalAlign: '-2px',
                }}
              />
              {t.meta.topRibbonHours}
            </span>
            <Link
              href="/vijayawada"
              style={{
                color: '#e6b95c',
                fontWeight: 600,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {t.meta.branchPageLink} →
            </Link>
          </div>
        </div>
      </div>

      {/* 1. Compact Sticky Navigation (Services, How It Works, Why Trust Gold, Reviews, Contact + Language Toggle) */}
      <header className="site-header">
        <div className="nav-bar">
          <a
            href="#top"
            className="brand-lockup"
            aria-label="Trust Gold Services Home"
          >
            <Image
              src="/logo.png"
              alt="Trust Gold Services Vijayawada Logo"
              width={46}
              height={46}
              className="brand-emblem"
              priority
            />
            <div className="brand-title">
              <span className="brand-title-main">Trust Gold Services</span>
              <span className="brand-title-sub">{t.nav.brandSub}</span>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary Navigation">
            <a href="#services">{t.nav.services}</a>
            <a href="#how-it-works">{t.nav.howItWorks}</a>
            <a href="#why-trust-gold">{t.nav.whyTrustGold}</a>
            <a href="#reviews">{t.nav.reviews}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="nav-cta-group">
            {/* Bilingual English / Telugu Segmented Switcher */}
            <div
              className="lang-switcher"
              role="group"
              aria-label="Select Language / భాషను ఎంచుకోండి"
            >
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-pressed={lang === 'en'}
                className={
                  lang === 'en' ? 'lang-pill-btn active' : 'lang-pill-btn'
                }
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('te')}
                aria-pressed={lang === 'te'}
                className={
                  lang === 'te' ? 'lang-pill-btn active' : 'lang-pill-btn'
                }
              >
                తెలుగు
              </button>
            </div>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="nav-phone-pill tabular-nums"
              aria-label={`Call Trust Gold Services at ${BUSINESS_INFO.phoneDisplay}`}
            >
              <Phone size={15} style={{ color: '#e6b95c' }} />
              <span className="nav-phone-text">{t.nav.callNow}</span>
            </a>

            <Magnetic strength={0.22}>
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                <MessageCircle size={16} />
                {t.nav.whatsappCta}
              </a>
            </Magnetic>

            <button
              type="button"
              className="menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-nav-drawer"
          className={mobileMenuOpen ? 'mobile-drawer open' : 'mobile-drawer'}
        >
          <div className="mobile-drawer-inner">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 10,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#e6b95c' }}>
                <Globe
                  size={14}
                  style={{
                    display: 'inline',
                    verticalAlign: '-2px',
                    marginRight: 6,
                  }}
                />
                Language / భాష:
              </span>
              <div className="lang-switcher">
                <button
                  type="button"
                  onClick={() => handleLanguageSwitch('en')}
                  className={
                    lang === 'en' ? 'lang-pill-btn active' : 'lang-pill-btn'
                  }
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageSwitch('te')}
                  className={
                    lang === 'te' ? 'lang-pill-btn active' : 'lang-pill-btn'
                  }
                >
                  తెలుగు
                </button>
              </div>
            </div>

            <a href="#services" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.services}
            </a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.howItWorks}
            </a>
            <a href="#why-trust-gold" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.whyTrustGold}
            </a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.reviews}
            </a>
            <a href="#documents" onClick={() => setMobileMenuOpen(false)}>
              {t.documents.tag}
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              {t.faq.tag}
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.contact}
            </a>
            <Link href="/vijayawada" onClick={() => setMobileMenuOpen(false)}>
              {t.meta.branchPageLink} →
            </Link>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 8,
              }}
            >
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="btn btn-outline-light btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={15} /> {t.nav.callNow}
              </a>
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        {/* =================================================================
            2. HERO SECTION (Clear Benefit Headline, WhatsApp Valuation + Call Now)
           ================================================================= */}
        <section className="hero-vault" aria-labelledby="hero-heading">
          <div className="hero-sunburst" aria-hidden="true" />
          <div className="container-shell">
            <div className="hero-grid">
              {/* Left Column: Customer-Benefit Headline, Supporting Copy & Direct CTAs */}
              <div>
                <div className="telugu-pill rise d1">
                  <span className="telugu-pill-dot" aria-hidden="true" />
                  <span>{t.hero.badge}</span>
                </div>

                <h1 id="hero-heading" className="hero-display">
                  <span className="w-load d1">
                    <i>{t.hero.headlineStart}</i>
                  </span>{' '}
                  <span className="w-load d2">
                    <i className="hero-display-gold">{t.hero.headlineGold}</i>
                  </span>{' '}
                  <span className="w-load d3">
                    <i>{t.hero.headlineEnd}</i>
                  </span>
                </h1>

                <p className="hero-lead rise d4">{t.hero.lead}</p>

                <div className="hero-actions rise d5">
                  <Magnetic strength={0.25}>
                    <a
                      href={generalWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                    >
                      <MessageCircle size={18} />
                      {t.hero.whatsappCta}
                      <ArrowRight size={16} />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="btn btn-outline-light tabular-nums"
                    >
                      <Phone size={17} style={{ color: '#e6b95c' }} />
                      {t.hero.callCta}
                    </a>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={() =>
                      handleLanguageSwitch(lang === 'en' ? 'te' : 'en')
                    }
                    className="btn btn-outline-light btn-sm"
                    style={{ borderColor: 'rgba(230, 185, 92, 0.4)' }}
                  >
                    <Globe size={15} style={{ color: '#e6b95c' }} />
                    {t.meta.switchLabel}
                  </button>
                </div>

                <p className="hero-reassurance-line rise d5">
                  <CheckCircle2
                    size={15}
                    style={{ color: '#e6b95c', flexShrink: 0 }}
                  />
                  <span>{t.hero.reassurance}</span>
                </p>

                {/* Founder Manohar Reddy Direct Assurance Strip */}
                <div className="hero-founder-strip rise d6">
                  <div className="hero-founder-avatar">
                    <Image
                      src="/images/owner-2.png"
                      alt="Manohar Reddy — Founder of Trust Gold Services Vijayawada"
                      fill
                      sizes="64px"
                    />
                  </div>
                  <div className="hero-founder-meta">
                    <strong>{BUSINESS_INFO.founderName}</strong>
                    <span>{t.hero.founderRole}</span>
                    <p>{t.hero.founderQuote}</p>
                  </div>
                </div>

                {/* Key Credibility Metrics */}
                <div className="hero-metrics tabular-nums">
                  {t.hero.metrics.map((m) => (
                    <div key={m.value} className="metric-item">
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Coded 3D Extruded Gold Medallion, Shield & Wave Stage */}
              <div className="hero-showcase-stage">
                <TrustGold3DStage
                  captionTitle={t.hero.stageBottomTitle}
                  captionSub={t.hero.stageBottomText}
                  purityBadge={t.hero.stageTopBadge}
                  choiceBadge="Hallmark 22K · 916 Mark · Unmarked Gold"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. THREE TRUST PILLARS (#trust-pillars — Transparent Testing, Weighing & Pricing)
           ================================================================= */}
        <section
          id="trust-pillars"
          className="section-pad"
          aria-labelledby="trust-pillars-heading"
          style={{ paddingBottom: 48 }}
        >
          <div className="container-shell">
            <div style={{ marginBottom: 40 }}>
              <span className="section-tag">{t.trustPillars.tag}</span>
              <Split
                key={`pillars-head-${lang}`}
                id="trust-pillars-heading"
                text={t.trustPillars.heading}
                goldWords={t.trustPillars.goldWords}
                className="section-heading"
              />
              <p data-reveal className="section-sub">
                {t.trustPillars.sub}
              </p>
            </div>

            <div data-reveal-group className="three-pillars-grid">
              {t.trustPillars.items.map((pillar, idx) => (
                <article
                  key={pillar.index}
                  className="pillar-feature-card spotlight-card"
                >
                  <div className="pillar-feature-top">
                    <span className="pillar-feature-num tabular-nums">
                      {pillar.index}
                    </span>
                    <div className="pillar-feature-icon" aria-hidden="true">
                      {idx === 0 ? (
                        <Eye size={22} />
                      ) : idx === 1 ? (
                        <Scale size={22} />
                      ) : (
                        <HandCoins size={22} />
                      )}
                    </div>
                  </div>
                  <h3>{pillar.title}</h3>
                  <span className="pillar-feature-sub">{pillar.subtitle}</span>
                  <p>{pillar.description}</p>
                  <div className="pillar-feature-proof">
                    <BadgeCheck size={16} />
                    <span>{pillar.proof}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            4. TWO PROMINENT SERVICES + 3 GOLD CATEGORIES (#services)
           ================================================================= */}
        <section
          id="services"
          className="section-pad section-alabaster"
          aria-labelledby="services-heading"
        >
          <div className="container-shell">
            <div style={{ marginBottom: 44 }}>
              <span className="section-tag">{t.services.tag}</span>
              <Split
                key={`services-head-${lang}`}
                id="services-heading"
                text={t.services.heading}
                goldWords={t.services.goldWords}
                className="section-heading"
              />
              <p data-reveal className="section-sub">
                {t.services.sub}
              </p>
            </div>

            {/* Two Primary Service Cards: Sell Old Gold & Release Pledged Gold */}
            <div data-reveal-group className="services-split">
              {/* Service 1: Sell Old Gold */}
              <article className="service-panel spotlight-card">
                <div className="service-media">
                  <Image
                    src="/images/old-gold-purchase.png"
                    alt="Sell Old Gold in Vijayawada — Open-counter purity testing and instant spot payment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 580px"
                  />
                  <div className="service-media-overlay" />
                  <div className="service-media-caption">
                    <span>{t.services.sellGold.badge}</span>
                    <h3>{t.services.sellGold.title}</h3>
                  </div>
                </div>

                <div className="service-body">
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--bullion-gold-deep)',
                    }}
                  >
                    {t.services.sellGold.teluguSub}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.94rem',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {t.services.sellGold.lead}
                  </p>

                  <div className="service-bullet-list">
                    {t.services.sellGold.points.map((pt) => (
                      <div key={pt} className="service-bullet">
                        <CheckCircle2 size={18} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 12,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <a
                      href={sellGoldWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-navy"
                    >
                      <MessageCircle size={16} />
                      {t.services.sellGold.whatsappCta}
                      <ArrowRight size={15} />
                    </a>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="btn"
                      style={{
                        border: '1px solid var(--rule-strong)',
                        background: '#ffffff',
                      }}
                    >
                      <Phone size={16} />
                      {t.services.sellGold.callCta}
                    </a>
                  </div>
                </div>
              </article>

              {/* Service 2: Release Pledged Gold */}
              <article className="service-panel spotlight-card">
                <div className="service-media">
                  <Image
                    src="/images/pledged-gold-release.png"
                    alt="Release Pledged Gold from Banks and Financiers in Vijayawada"
                    fill
                    sizes="(max-width: 1024px) 100vw, 580px"
                  />
                  <div className="service-media-overlay" />
                  <div className="service-media-caption">
                    <span>{t.services.releaseGold.badge}</span>
                    <h3>{t.services.releaseGold.title}</h3>
                  </div>
                </div>

                <div className="service-body">
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--bullion-gold-deep)',
                    }}
                  >
                    {t.services.releaseGold.teluguSub}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.94rem',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {t.services.releaseGold.lead}
                  </p>

                  <div className="service-bullet-list">
                    {t.services.releaseGold.points.map((pt) => (
                      <div key={pt} className="service-bullet">
                        <Landmark size={18} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 12,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <a
                      href={releaseGoldWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                    >
                      <LockOpen size={16} />
                      {t.services.releaseGold.whatsappCta}
                      <ArrowRight size={15} />
                    </a>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="btn"
                      style={{
                        border: '1px solid var(--rule-strong)',
                        background: '#ffffff',
                      }}
                    >
                      <Phone size={16} />
                      {t.services.releaseGold.callCta}
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* 3 Gold Jewellery Categories Accepted (Integrated inside #services) */}
            <div style={{ marginTop: 64 }}>
              <div style={{ marginBottom: 32 }}>
                <span className="section-tag">{t.services.categoriesTag}</span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), Georgia, serif',
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.45rem)',
                    fontWeight: 600,
                    margin: '0 0 10px',
                    color: 'var(--vault-navy)',
                  }}
                >
                  {t.services.categoriesHeading}
                </h3>
                <p className="section-sub">{t.services.categoriesSub}</p>
              </div>

              <div data-reveal-group className="categories-grid">
                {GOLD_CATEGORIES.map((category, idx) => {
                  const teCat = TELUGU_CATEGORIES[category.id]
                  const displayName =
                    lang === 'te' ? teCat.name : category.name
                  const displayBadge =
                    lang === 'te' ? teCat.badge : category.badge
                  const displayPurity =
                    lang === 'te'
                      ? teCat.purityDescription
                      : category.purityDescription
                  const displayNote =
                    lang === 'te' ? teCat.valuationNote : category.valuationNote
                  const displayExamples =
                    lang === 'te' ? teCat.examples : category.examples

                  const categoryWaUrl = `https://wa.me/${
                    BUSINESS_INFO.whatsappNumber
                  }?text=${encodeURIComponent(
                    lang === 'te'
                      ? `నమస్కారం Trust Gold Services, నా దగ్గర ${category.shortName} ఆభరణాలు ఉన్నాయి. ఈరోజు విజయవాడ గ్రాము రేటు తెలుపగలరు.`
                      : `Hi Trust Gold Services, I have ${category.name} ornaments and want to check today's per-gram rate in Vijayawada.`
                  )}`

                  return (
                    <article
                      key={category.id}
                      className="category-card spotlight-card"
                    >
                      <div className="category-top">
                        <div className="category-icon-box" aria-hidden="true">
                          {idx === 0 ? (
                            <Award size={22} />
                          ) : idx === 1 ? (
                            <BadgeCheck size={22} />
                          ) : (
                            <Gem size={22} />
                          )}
                        </div>
                        <span className="category-badge">{displayBadge}</span>
                      </div>

                      <div>
                        <h4>{displayName}</h4>
                        <span className="category-telugu">
                          {category.teluguName} · {displayPurity}
                        </span>
                      </div>

                      <p>{displayNote}</p>

                      <ul className="category-examples">
                        {displayExamples.map((example) => (
                          <li key={example}>
                            <CheckCircle2
                              size={15}
                              style={{
                                color: 'var(--bullion-gold)',
                                flexShrink: 0,
                                marginTop: 3,
                              }}
                            />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>

                      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                        <a
                          href={categoryWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm"
                          style={{
                            width: '100%',
                            background: 'var(--alabaster)',
                            color: 'var(--vault-navy)',
                            borderColor: 'var(--rule-strong)',
                          }}
                        >
                          <MessageCircle size={15} />
                          {t.services.categoriesCta}
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            5. FOUR-STEP VALUATION & SETTLEMENT PROCESS (#how-it-works)
           ================================================================= */}
        <section
          id="how-it-works"
          className="section-pad"
          aria-labelledby="process-heading"
        >
          <div className="container-shell">
            <div className="process-header-bar">
              <div>
                <span className="section-tag">{t.howItWorks.tag}</span>
                <Split
                  key={`process-head-${lang}`}
                  id="process-heading"
                  text={t.howItWorks.heading}
                  goldWords={t.howItWorks.goldWords}
                  className="section-heading"
                />
                <p data-reveal className="section-sub">
                  {t.howItWorks.sub}
                </p>
              </div>

              {/* 2-Track Process Switcher */}
              <div
                className="segmented-control"
                role="tablist"
                aria-label="Choose process track"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={processTrack === 'sell'}
                  className="segmented-btn"
                  onClick={() => setProcessTrack('sell')}
                >
                  {t.howItWorks.trackSellBtn}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={processTrack === 'release'}
                  className="segmented-btn"
                  onClick={() => setProcessTrack('release')}
                >
                  {t.howItWorks.trackReleaseBtn}
                </button>
              </div>
            </div>

            <div className="steps-timeline-wrap">
              <div
                data-draw-line
                className="steps-golden-line"
                aria-hidden="true"
              />
              <div
                key={`steps-${processTrack}-${lang}`}
                data-reveal-group
                className="steps-grid"
              >
                {activeSteps.map((step) => (
                  <div key={step.step} className="step-card spotlight-card">
                    <span className="step-num tabular-nums">
                      STEP {step.step}
                    </span>
                    <h3>{step.title}</h3>
                    <span className="step-telugu">{step.telugu}</span>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            6. REAL SHOP, STAFF & EQUIPMENT PHOTOGRAPHY + TOUCHSTONE ASSAY (#shop-gallery & #gold-craft)
           ================================================================= */}
        <section
          id="shop-gallery"
          className="section-pad section-alabaster"
          aria-labelledby="shop-gallery-heading"
          style={{ paddingTop: 72, paddingBottom: 72 }}
        >
          <div className="container-shell">
            <div style={{ marginBottom: 32 }}>
              <span className="section-tag">{t.shopGallery.tag}</span>
              <h2 id="shop-gallery-heading" className="section-heading">
                {t.shopGallery.heading}
              </h2>
              <p className="section-sub">{t.shopGallery.lead}</p>
            </div>

            <div data-reveal-group className="shop-gallery-grid">
              <figure className="shop-photo-card spotlight-card">
                <div className="shop-photo-media">
                  <Image
                    src="/images/about-shop.png"
                    alt="Trust Gold Services Gandhinagar Vijayawada Branch Consultation Counter"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
                <figcaption className="shop-photo-caption">
                  <Building2 size={16} style={{ color: 'var(--bullion-gold)' }} />
                  <span>{t.shopGallery.counterPhotoCaption}</span>
                </figcaption>
              </figure>

              <figure className="shop-photo-card spotlight-card">
                <div className="shop-photo-media">
                  <Image
                    src="/images/hero.png"
                    alt="Calibrated 0.01g digital gold weighing scale and black Basanite touchstone at Trust Gold Services"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
                <figcaption className="shop-photo-caption">
                  <Scale size={16} style={{ color: 'var(--bullion-gold)' }} />
                  <span>{t.shopGallery.scalePhotoCaption}</span>
                </figcaption>
              </figure>
            </div>

            <div
              className="branch-counter-badges"
              style={{ marginTop: 22 }}
            >
              {t.shopGallery.badges.map((b) => (
                <span
                  key={b}
                  style={{
                    background: 'var(--vault-navy)',
                    color: '#e6b95c',
                  }}
                >
                  <ShieldCheck size={14} /> {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Black Basanite Touchstone & 916 Purity Assay Bench */}
        <GoldTouchstoneAssay lang={lang} />

        {/* =================================================================
            7. TRANSPARENT 1% FEE EXPLANATION, CUSTOMER'S CHOICE & WORKED CALCULATIONS (#why-trust-gold)
           ================================================================= */}
        <section
          id="why-trust-gold"
          className="section-pad section-vault"
          aria-labelledby="why-trust-heading"
        >
          <div className="container-shell">
            <div style={{ marginBottom: 44 }}>
              <span className="section-tag">{t.whyTrustGold.tag}</span>
              <Split
                key={`why-head-${lang}`}
                id="why-trust-heading"
                text={t.whyTrustGold.heading}
                goldWords={t.whyTrustGold.goldWords}
                className="section-heading"
              />
              <p data-reveal className="section-sub">
                {t.whyTrustGold.sub}
              </p>
            </div>

            {/* Part A: Customer's Choice Guarantee + What the 1% Fee is Calculated Against */}
            <div data-reveal-group className="fee-methodology-grid">
              {/* Customer's Choice Card */}
              <div className="choice-guarantee-card spotlight-card">
                <span className="choice-badge-pill">
                  <Flame size={14} />
                  {t.whyTrustGold.choiceBadge}
                </span>
                <h3>{t.whyTrustGold.choiceTitle}</h3>
                <p className="choice-telugu-quote">
                  {t.whyTrustGold.choiceTelugu}
                </p>
                <p className="choice-body-text">{t.whyTrustGold.choiceBody}</p>

                <div className="choice-options-split">
                  <div className="choice-option-box">
                    <strong>
                      <ShieldCheck size={16} />
                      {t.whyTrustGold.choiceDirectTitle}
                    </strong>
                    <p>{t.whyTrustGold.choiceDirectDesc}</p>
                  </div>
                  <div className="choice-option-box">
                    <strong>
                      <Flame size={16} />
                      {t.whyTrustGold.choiceMeltTitle}
                    </strong>
                    <p>{t.whyTrustGold.choiceMeltDesc}</p>
                  </div>
                </div>
              </div>

              {/* 1% Fee Formula Card */}
              <div className="fee-formula-card spotlight-card">
                <h3>{t.whyTrustGold.feeExplainTitle}</h3>
                <p className="fee-formula-lead">
                  {t.whyTrustGold.feeExplainLead}
                </p>
                <div className="fee-steps-list">
                  {t.whyTrustGold.feeFormulaSteps.map((step) => (
                    <div key={step.label} className="fee-step-item">
                      <strong>{step.label}</strong>
                      <p>{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part B: Two Worked Calculation Ledgers (Direct Gold Sale & Bank Pledged Gold Release) */}
            <div style={{ marginTop: 48 }}>
              <div className="worked-examples-header">
                <h3>{t.whyTrustGold.workedExamplesTitle}</h3>
                <p className="worked-disclaimer">
                  <Sparkles
                    size={15}
                    style={{ color: '#e6b95c', flexShrink: 0, marginTop: 2 }}
                  />
                  <span>{t.whyTrustGold.workedExamplesDisclaimer}</span>
                </p>
              </div>

              <div data-reveal-group className="worked-ledgers-grid">
                {t.whyTrustGold.examples.map((ex) => (
                  <article
                    key={ex.id}
                    className="worked-ledger-card spotlight-card"
                  >
                    <div className="worked-ledger-top">
                      <span className="worked-ledger-badge">{ex.badge}</span>
                      <h4>{ex.title}</h4>
                      <p>{ex.scenario}</p>
                    </div>

                    <div className="worked-ledger-rows tabular-nums">
                      {ex.rows.map((row) => (
                        <div
                          key={row.label}
                          className={
                            row.highlight
                              ? 'worked-row highlight'
                              : 'worked-row'
                          }
                        >
                          <div>
                            <span className="worked-row-label">
                              {row.label}
                            </span>
                            {row.note && (
                              <small className="worked-row-note">
                                {row.note}
                              </small>
                            )}
                          </div>
                          <strong className="worked-row-val">
                            {row.value}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="worked-ledger-total tabular-nums">
                      <div>
                        <span>{ex.finalLabel}</span>
                        <small>{ex.footnote}</small>
                      </div>
                      <strong>{ex.finalValue}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Part C: 4 Factual Customer Commitments Table */}
            <div style={{ marginTop: 48 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontSize: '1.65rem',
                  color: '#ffffff',
                  marginBottom: 18,
                }}
              >
                {t.whyTrustGold.comparisonTitle}
              </h3>
              <div data-reveal className="comparison-table-shell">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th scope="col">Evaluation Stage</th>
                      <th scope="col" className="col-trustgold">
                        <span className="col-badge">OUR COMMITMENT</span>
                        <strong>Trust Gold Services (Vijayawada)</strong>
                      </th>
                      <th scope="col">
                        <strong>Why It Protects You</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.whyTrustGold.comparisonRows.map((row) => (
                      <tr key={row.feature}>
                        <th scope="row">{row.feature}</th>
                        <td className="col-trustgold">
                          <div className="cell-trustgold-inner">
                            <CheckCircle2 size={17} />
                            <span>{row.trustGold}</span>
                          </div>
                        </td>
                        <td>{row.whyItMatters}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            8. CUSTOMER REVIEWS (#reviews — Verified Feedback from trustgoldservices.com)
           ================================================================= */}
        <section
          id="reviews"
          className="section-pad"
          aria-labelledby="reviews-heading"
        >
          <div className="container-shell">
            <div style={{ marginBottom: 36 }}>
              <span className="section-tag">{t.reviews.tag}</span>
              <Split
                key={`reviews-head-${lang}`}
                id="reviews-heading"
                text={t.reviews.heading}
                goldWords={t.reviews.goldWords}
                className="section-heading"
              />
              <p data-reveal className="section-sub">
                {t.reviews.sub}
              </p>
            </div>

            <div data-reveal-group className="reviews-grid">
              {t.reviews.items.map((rev) => (
                <article
                  key={rev.name}
                  className="review-card spotlight-card"
                >
                  <div className="review-card-top">
                    <Quote
                      size={24}
                      style={{ color: 'var(--bullion-gold)' }}
                      aria-hidden="true"
                    />
                    <span className="review-service-tag">{rev.serviceTag}</span>
                  </div>
                  <blockquote className="review-quote">{rev.quote}</blockquote>
                  <footer className="review-author">
                    <div className="review-avatar" aria-hidden="true">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{rev.name}</strong>
                      <span>{rev.location}</span>
                    </div>
                  </footer>
                </article>
              ))}
            </div>

            <div className="reviews-footnote-bar">
              <p>
                <ShieldCheck
                  size={16}
                  style={{ color: 'var(--bullion-gold-deep)', flexShrink: 0 }}
                />
                <span>{t.reviews.transparencyNote}</span>
              </p>
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy btn-sm"
              >
                <MessageCircle size={15} />
                {t.reviews.ctaButton}
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            9. FOUNDER, LOCATION, BUSINESS HOURS & MAP (#founder)
           ================================================================= */}
        <section
          id="founder"
          className="section-pad section-alabaster"
          aria-labelledby="founder-heading"
        >
          <div className="container-shell">
            <div className="founder-grid">
              {/* Single Curated Portrait of Founder Manohar Reddy */}
              <ImageReveal
                direction="up"
                className="founder-portrait-stage"
              >
                <div className="founder-main-frame">
                  <Parallax yPx={18} scale={1.06}>
                    <Image
                      src="/images/owner-2.png"
                      alt="Manohar Reddy — Founder of Trust Gold Services, Gandhinagar, Vijayawada"
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                  </Parallax>
                  <div className="founder-caption-bar">
                    <span className="founder-verified-pill">
                      <UserCheck size={13} />
                      {t.founder.portraitBadge}
                    </span>
                    <strong>{BUSINESS_INFO.founderName}</strong>
                    <span>{t.founder.portraitRole}</span>
                  </div>
                </div>
              </ImageReveal>

              {/* Right Column: Story, Vision, Mission & Branch Details */}
              <div className="founder-story-content">
                <span className="section-tag">{t.founder.tag}</span>
                <Split
                  key={`founder-head-${lang}`}
                  id="founder-heading"
                  text={t.founder.heading}
                  goldWords={t.founder.goldWords}
                  className="section-heading"
                />

                <blockquote className="founder-quote">
                  {t.founder.quote}
                </blockquote>

                <p className="founder-paragraph">{t.founder.storyP1}</p>
                <p className="founder-paragraph">{t.founder.storyP2}</p>

                <div className="vision-mission-grid">
                  <div className="vm-card">
                    <span className="vm-label">
                      <Compass
                        size={14}
                        style={{
                          display: 'inline',
                          marginRight: 5,
                          verticalAlign: '-2px',
                        }}
                      />
                      {t.founder.visionLabel}
                    </span>
                    <h3>{t.founder.visionTitle}</h3>
                    <p>{t.founder.visionText}</p>
                  </div>

                  <div className="vm-card">
                    <span className="vm-label">
                      <Target
                        size={14}
                        style={{
                          display: 'inline',
                          marginRight: 5,
                          verticalAlign: '-2px',
                        }}
                      />
                      {t.founder.missionLabel}
                    </span>
                    <h3>{t.founder.missionTitle}</h3>
                    <ul className="mission-list">
                      {t.founder.missionPoints.map((point) => (
                        <li key={point}>
                          <CheckCircle2
                            size={15}
                            style={{
                              color: 'var(--bullion-gold)',
                              flexShrink: 0,
                              marginTop: 3,
                            }}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            10. REQUIRED DOCUMENTS CHECKLIST & FAQs (#documents & #faq)
           ================================================================= */}
        <section
          id="documents"
          className="section-pad"
          aria-labelledby="documents-heading"
        >
          <div className="container-shell">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 20,
                marginBottom: 32,
              }}
            >
              <div>
                <span className="section-tag">{t.documents.tag}</span>
                <Split
                  key={`docs-head-${lang}`}
                  id="documents-heading"
                  text={t.documents.heading}
                  goldWords={t.documents.goldWords}
                  className="section-heading"
                />
                <p data-reveal className="section-sub">
                  {t.documents.sub}
                </p>
              </div>

              <div
                className="docs-filter-bar"
                role="tablist"
                aria-label="Filter required documents by service"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={docFilter === 'all'}
                  className={
                    docFilter === 'all'
                      ? 'doc-filter-btn active'
                      : 'doc-filter-btn'
                  }
                  onClick={() => setDocFilter('all')}
                >
                  {t.documents.filterAll}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={docFilter === 'direct'}
                  className={
                    docFilter === 'direct'
                      ? 'doc-filter-btn active'
                      : 'doc-filter-btn'
                  }
                  onClick={() => setDocFilter('direct')}
                >
                  {t.documents.filterDirect}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={docFilter === 'pledge'}
                  className={
                    docFilter === 'pledge'
                      ? 'doc-filter-btn active'
                      : 'doc-filter-btn'
                  }
                  onClick={() => setDocFilter('pledge')}
                >
                  {t.documents.filterPledge}
                </button>
              </div>
            </div>

            <div data-reveal-group className="docs-grid">
              {filteredDocuments.map((doc) => {
                const teDoc = TELUGU_DOCUMENTS[doc.id]
                return (
                  <article key={doc.id} className="doc-card spotlight-card">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <div className="category-icon-box" aria-hidden="true">
                        {doc.id === 'aadhaar' || doc.id === 'pan' ? (
                          <FileCheck2 size={20} />
                        ) : doc.id === 'house-verification' ? (
                          <Home size={20} />
                        ) : (
                          <FileText size={20} />
                        )}
                      </div>
                      <span
                        className={
                          doc.forPledgedReleaseOnly
                            ? 'doc-badge pledge-only'
                            : 'doc-badge'
                        }
                      >
                        {doc.forPledgedReleaseOnly
                          ? t.documents.pledgeOnlyBadge
                          : doc.required
                            ? t.documents.requiredBadge
                            : t.documents.recommendedBadge}
                      </span>
                    </div>
                    <h3>
                      {lang === 'te' && teDoc ? teDoc.title : doc.title}
                    </h3>
                    <small
                      style={{
                        fontWeight: 600,
                        color: 'var(--bullion-gold-deep)',
                      }}
                    >
                      {lang === 'te' && teDoc ? teDoc.subtitle : doc.subtitle}
                    </small>
                    <p>
                      {lang === 'te' && teDoc
                        ? teDoc.description
                        : doc.description}
                    </p>
                  </article>
                )
              })}
            </div>

            {/* Reassurance Banner for Customers Without Original Bills */}
            <div className="docs-reassurance-banner">
              <div>
                <strong>{t.documents.ReassuranceTitle}</strong>
                <p>{t.documents.ReassuranceBody}</p>
              </div>
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                <MessageCircle size={16} />
                {t.documents.ReassuranceCta}
              </a>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (#faq) */}
        <section
          id="faq"
          className="section-pad section-alabaster"
          aria-labelledby="faq-heading"
        >
          <div className="container-shell">
            <div style={{ marginBottom: 36 }}>
              <span className="section-tag">{t.faq.tag}</span>
              <Split
                key={`faq-head-${lang}`}
                id="faq-heading"
                text={t.faq.heading}
                goldWords={t.faq.goldWords}
                className="section-heading"
              />
              <p data-reveal className="section-sub">
                {t.faq.sub}
              </p>
            </div>

            <div data-reveal-group className="faq-list">
              {t.faq.items.map((item, idx) => {
                const isOpen = openFaqIndex === idx
                const panelId = `faq-panel-${idx}`
                const btnId = `faq-btn-${idx}`

                return (
                  <div key={item.question} className="faq-item">
                    <button
                      id={btnId}
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <HelpCircle
                          size={18}
                          style={{
                            color: 'var(--bullion-gold)',
                            flexShrink: 0,
                          }}
                        />
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className="faq-chevron"
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={
                        isOpen ? 'faq-answer-shell open' : 'faq-answer-shell'
                      }
                    >
                      <div className="faq-answer-inner">
                        <div className="faq-answer">{item.answer}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =================================================================
            11. CONTACT, SHORT ENQUIRY FORM, LOCATION & EMBEDDED MAP (#contact)
           ================================================================= */}
        <section
          id="contact"
          className="section-pad"
          aria-labelledby="contact-heading"
        >
          <div className="container-shell">
            <div data-reveal className="contact-shell">
              {/* Left Column: Branch Address, Working Hours, Direct Call/WhatsApp & Live Map */}
              <div className="contact-info-pane">
                <span className="section-tag" style={{ color: '#e6b95c' }}>
                  {t.contact.tag}
                </span>
                <Split
                  key={`contact-head-${lang}`}
                  id="contact-heading"
                  text={t.contact.heading}
                  goldWords={t.contact.goldWords}
                  className="section-heading"
                />
                <p
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    margin: '0 0 8px',
                    fontSize: '0.95rem',
                  }}
                >
                  {t.contact.lead}
                </p>

                <div className="contact-detail-list">
                  <div className="contact-detail-item">
                    <div className="contact-icon-circle" aria-hidden="true">
                      <MapPin size={19} />
                    </div>
                    <div className="contact-detail-text">
                      <strong>{t.contact.addressTitle}</strong>
                      <span>
                        {BUSINESS_INFO.address.line1}
                        <br />
                        {BUSINESS_INFO.address.line2},{' '}
                        {BUSINESS_INFO.address.city} –{' '}
                        {BUSINESS_INFO.address.pin}
                      </span>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon-circle" aria-hidden="true">
                      <Phone size={19} />
                    </div>
                    <div className="contact-detail-text tabular-nums">
                      <strong>{t.contact.phoneTitle}</strong>
                      <span>
                        <a
                          href={`tel:${BUSINESS_INFO.phone}`}
                          style={{
                            color: '#e6b95c',
                            fontWeight: 700,
                            fontSize: '1.08rem',
                          }}
                        >
                          +91 {BUSINESS_INFO.phoneDisplay}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon-circle" aria-hidden="true">
                      <Clock size={19} />
                    </div>
                    <div className="contact-detail-text">
                      <strong>{t.contact.hoursTitle}</strong>
                      <span>{t.meta.topRibbonHours}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 22,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    <MessageCircle size={17} />
                    {t.contact.whatsappDirectBtn}
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="btn btn-outline-light tabular-nums"
                  >
                    <Phone size={16} />
                    {t.contact.callDirectBtn}
                  </a>
                </div>

                {/* Live Embedded Google Map */}
                <div className="contact-map-frame">
                  <iframe
                    title="Trust Gold Services Gandhinagar Vijayawada Location Map"
                    src="https://www.google.com/maps?q=Vasisth+Enclave+Gandhinagar+Vijayawada+520003&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Right Column: Short, Explicit Service Enquiry Form */}
              <div className="contact-form-pane">
                <h3>{t.contact.formTitle}</h3>
                <p>{t.contact.formSub}</p>

                <div className="form-reassurance-strip">
                  <ShieldCheck size={16} />
                  <span>{t.contact.noObligationNote}</span>
                </div>

                {leadSubmitted ? (
                  <div
                    role="status"
                    aria-live="polite"
                    style={{
                      padding: 24,
                      borderRadius: 14,
                      background: 'var(--alabaster)',
                      border: '1px solid var(--bullion-gold)',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: 'var(--bullion-gold-deep)',
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      <CheckCircle2 size={20} />
                      {t.contact.successTitle}
                    </div>
                    <p
                      style={{
                        margin: '0 0 18px',
                        fontSize: '0.9rem',
                        color: 'var(--ink-muted)',
                      }}
                    >
                      {t.contact.successBody}
                    </p>
                    <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
                    >
                      <a
                        href={leadWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold"
                      >
                        <MessageCircle size={17} />
                        {t.contact.openWhatsappBtn}
                        <ArrowRight size={16} />
                      </a>
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{
                          background: '#ffffff',
                          borderColor: 'var(--rule-strong)',
                        }}
                        onClick={() => setLeadSubmitted(false)}
                      >
                        {t.contact.resetBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} noValidate>
                    <div className="form-grid-2">
                      <div className="form-field">
                        <label htmlFor="lead-name">{t.contact.nameLabel}</label>
                        <input
                          id="lead-name"
                          type="text"
                          className="form-input"
                          placeholder={t.contact.namePlaceholder}
                          value={leadName}
                          aria-invalid={Boolean(leadErrors.name)}
                          aria-describedby={
                            leadErrors.name ? 'lead-name-error' : undefined
                          }
                          onChange={(e) => setLeadName(e.target.value)}
                          required
                        />
                        {leadErrors.name && (
                          <span
                            id="lead-name-error"
                            role="alert"
                            className="field-error"
                          >
                            {leadErrors.name}
                          </span>
                        )}
                      </div>

                      <div className="form-field">
                        <label htmlFor="lead-phone">
                          {t.contact.phoneLabel}
                        </label>
                        <input
                          id="lead-phone"
                          type="tel"
                          inputMode="numeric"
                          className="form-input tabular-nums"
                          placeholder={t.contact.phonePlaceholder}
                          value={leadPhone}
                          aria-invalid={Boolean(leadErrors.phone)}
                          aria-describedby={
                            leadErrors.phone ? 'lead-phone-error' : undefined
                          }
                          onChange={(e) => setLeadPhone(e.target.value)}
                          required
                        />
                        {leadErrors.phone && (
                          <span
                            id="lead-phone-error"
                            role="alert"
                            className="field-error"
                          >
                            {leadErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label htmlFor="lead-service">
                          {t.contact.serviceLabel}
                        </label>
                        <select
                          id="lead-service"
                          className="form-select"
                          value={leadService}
                          onChange={(e) =>
                            setLeadService(
                              e.target.value as
                                | 'sell_old_gold'
                                | 'release_pledged_gold'
                                | 'rate_check'
                            )
                          }
                        >
                          <option value="sell_old_gold">
                            {t.contact.serviceOptions.sell}
                          </option>
                          <option value="release_pledged_gold">
                            {t.contact.serviceOptions.release}
                          </option>
                          <option value="rate_check">
                            {t.contact.serviceOptions.rateCheck}
                          </option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="lead-category">
                          {t.contact.goldTypeLabel}
                        </label>
                        <select
                          id="lead-category"
                          className="form-select"
                          value={leadCategory}
                          onChange={(e) =>
                            setLeadCategory(e.target.value as GoldCategoryTier)
                          }
                        >
                          {GOLD_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.shortName} ({cat.teluguName})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label htmlFor="lead-weight">
                          {t.contact.weightLabel}
                        </label>
                        <input
                          id="lead-weight"
                          type="number"
                          min={0.5}
                          max={10000}
                          step={0.5}
                          className="form-input tabular-nums"
                          placeholder={t.contact.weightPlaceholder}
                          value={leadWeight}
                          aria-invalid={Boolean(leadErrors.weightGrams)}
                          aria-describedby={
                            leadErrors.weightGrams
                              ? 'lead-weight-error'
                              : undefined
                          }
                          onChange={(e) => setLeadWeight(e.target.value)}
                        />
                        {leadErrors.weightGrams && (
                          <span
                            id="lead-weight-error"
                            role="alert"
                            className="field-error"
                          >
                            {leadErrors.weightGrams}
                          </span>
                        )}
                      </div>

                      <div className="form-field">
                        <label htmlFor="lead-message">
                          {t.contact.messageLabel}
                        </label>
                        <input
                          id="lead-message"
                          type="text"
                          className="form-input"
                          placeholder={t.contact.messagePlaceholder}
                          value={leadMessage}
                          onChange={(e) => setLeadMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        marginTop: 10,
                      }}
                    >
                      <button type="submit" className="btn btn-gold">
                        <MessageCircle size={17} />
                        {t.contact.submitBtn}
                        <ArrowRight size={16} />
                      </button>

                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {t.contact.orCallText}{' '}
                        <a
                          href={`tel:${BUSINESS_INFO.phone}`}
                          className="tabular-nums"
                          style={{
                            fontWeight: 700,
                            color: 'var(--vault-navy)',
                          }}
                        >
                          93934 94455
                        </a>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================================
          FOOTER (SVG Social Icons + Local Vijayawada Branch SEO Link)
         ================================================================= */}
      <footer className="site-footer">
        <div className="container-shell">
          <div className="footer-grid">
            <div>
              <div className="brand-lockup" style={{ marginBottom: 14 }}>
                <Image
                  src="/logo.png"
                  alt="Trust Gold Services Logo"
                  width={44}
                  height={44}
                  className="brand-emblem"
                />
                <div className="brand-title">
                  <span className="brand-title-main">Trust Gold Services</span>
                  <span className="brand-title-sub">{t.nav.brandSub}</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  maxWidth: '46ch',
                  margin: '0 0 18px',
                  lineHeight: 1.65,
                }}
              >
                {t.footer.description}
              </p>

              <span
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: 10,
                }}
              >
                {t.footer.followLabel}
              </span>
              <div className="social-pills">
                <a
                  href={BUSINESS_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn pressable"
                  aria-label="Follow Trust Gold Services on Instagram"
                  title="Instagram (@trustgoldservices)"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href={BUSINESS_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn pressable"
                  aria-label="Follow Trust Gold Services on Facebook"
                  title="Facebook (Trust Gold Services)"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href={BUSINESS_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn pressable"
                  aria-label="Subscribe to Trust Gold Services on YouTube"
                  title="YouTube (@TrustGoldservices)"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3v6Z" />
                  </svg>
                </a>
                <a
                  href={generalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn pressable"
                  aria-label="Chat with Trust Gold Services on WhatsApp"
                  title="WhatsApp (+91 93934 94455)"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>{t.footer.navHeading}</h4>
              <ul>
                <li>
                  <a href="#services">{t.nav.services}</a>
                </li>
                <li>
                  <a href="#how-it-works">{t.nav.howItWorks}</a>
                </li>
                <li>
                  <a href="#why-trust-gold">{t.nav.whyTrustGold}</a>
                </li>
                <li>
                  <a href="#reviews">{t.nav.reviews}</a>
                </li>
                <li>
                  <a href="#documents">{t.documents.tag}</a>
                </li>
                <li>
                  <a href="#faq">{t.faq.tag}</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.footer.servicesHeading}</h4>
              <ul>
                <li>
                  <a href="#services">{t.services.sellGold.title}</a>
                </li>
                <li>
                  <a href="#services">{t.services.releaseGold.title}</a>
                </li>
                <li>
                  <a href="#gold-craft">Hallmark 22K (916 HUID)</a>
                </li>
                <li>
                  <a href="#gold-craft">Only 916 Mark &amp; Unmarked Gold</a>
                </li>
                <li>
                  <Link
                    href="/vijayawada"
                    style={{ color: '#e6b95c', fontWeight: 600 }}
                  >
                    {t.footer.vijayawadaBranchLink}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.footer.officeHeading}</h4>
              <ul>
                <li>{BUSINESS_INFO.address.line1}</li>
                <li>
                  {BUSINESS_INFO.address.line2}, {BUSINESS_INFO.address.city} –{' '}
                  {BUSINESS_INFO.address.pin}
                </li>
                <li className="tabular-nums">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    style={{ color: '#e6b95c', fontWeight: 700 }}
                  >
                    +91 {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BUSINESS_INFO.email}`}>
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li>{t.meta.topRibbonHours}</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {t.footer.copyright}
            </span>
            <span>{t.footer.tagline}</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp lang={lang} />

      {/* Non-Obscuring Sticky Mobile Conversion Bar */}
      <div
        className="mobile-dock"
        role="region"
        aria-label="Quick Call and WhatsApp Actions"
      >
        <div className="mobile-dock-inner">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="btn btn-outline-light btn-sm tabular-nums"
          >
            <Phone size={16} style={{ color: '#e6b95c' }} />
            {t.mobileBar.callLabel}
          </a>
          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-sm"
          >
            <MessageCircle size={16} />
            {t.mobileBar.whatsappLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
