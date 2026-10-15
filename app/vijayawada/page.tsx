import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  FileCheck2,
  Flame,
  Landmark,
  LockOpen,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import {
  BUSINESS_INFO,
  GOLD_CATEGORIES,
  REQUIRED_DOCUMENTS,
} from '@/lib/gold-calculator'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { SiteMotion, Split } from '@/components/SiteMotion'

export const metadata: Metadata = {
  title:
    'Gold Buyers & Pledged Gold Release in Gandhinagar, Vijayawada | Trust Gold Services',
  description:
    'Visit Trust Gold Services at First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada – 520003. Open-counter 22K/916 gold valuation, bank pledged gold loan release, 1% processing fee, and instant spot payout.',
  alternates: {
    canonical: '/vijayawada',
  },
  openGraph: {
    title:
      'Trust Gold Services — Gandhinagar, Vijayawada Branch | Sell Old Gold & Release Pledged Gold',
    description:
      'First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada – 520003. Open-counter testing, 0.01g scale, stones returned to you, and flat 1% processing fee.',
    url: 'https://trustgold-iota.vercel.app/vijayawada',
    images: ['/images/about-shop.png', '/images/owner-2.png'],
  },
}

const VIJAYAWADA_LANDMARKS = [
  {
    area: 'From Besant Road & Governorpet (5 Mins)',
    directions:
      'Located right in the heart of Gandhinagar at Vasisth Enclave (First Floor, Shop No. 5), a short 5-minute walk/drive from Besant Road and Governorpet commercial hub.',
  },
  {
    area: 'From Eluru Road & Ramavarappadu Route',
    directions:
      'Easily accessible via Eluru Road into Gandhinagar. Convenient parking and first-floor private consultation counter inside Vasisth Enclave.',
  },
  {
    area: 'From Vijayawada Railway Station & PNBS Bus Stand (8–10 Mins)',
    directions:
      'Direct auto or cab access from Vijayawada Junction Railway Station and Pandit Nehru Bus Station (PNBS) for customers visiting from Guntur, Mangalagiri, Tenali, Machilipatnam, and Eluru.',
  },
  {
    area: 'From Benz Circle, Labbipet & MG Road (Bandar Road)',
    directions:
      'Connect directly via MG Road (Bandar Road) toward Gandhinagar. Our representative can also accompany you from our office to any bank or NBFC branch across Vijayawada for pledged gold release.',
  },
]

export default function VijayawadaBranchPage() {
  const branchJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialService',
        '@id': 'https://trustgold-iota.vercel.app/vijayawada#branch',
        name: 'Trust Gold Services — Gandhinagar, Vijayawada Branch',
        description:
          'Transparent old gold buyers and bank pledged gold loan release specialists in Gandhinagar, Vijayawada. 1% processing fee and open-counter purity testing.',
        url: 'https://trustgold-iota.vercel.app/vijayawada',
        telephone: `+91-${BUSINESS_INFO.phone}`,
        email: BUSINESS_INFO.email,
        founder: {
          '@type': 'Person',
          name: BUSINESS_INFO.founderName,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar',
          addressLocality: 'Vijayawada',
          addressRegion: 'Andhra Pradesh',
          postalCode: '520003',
          addressCountry: 'IN',
        },
        areaServed: [
          'Gandhinagar, Vijayawada',
          'Governorpet, Vijayawada',
          'Benz Circle, Vijayawada',
          'Labbipet, Vijayawada',
          'Bhavanipuram, Vijayawada',
          'Patamata, Vijayawada',
          'Guntur',
          'Mangalagiri',
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '09:00',
            closes: '21:00',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustgold-iota.vercel.app/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gandhinagar, Vijayawada Branch',
            item: 'https://trustgold-iota.vercel.app/vijayawada',
          },
        ],
      },
    ],
  }

  const branchWhatsappUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(
    'Hi Trust Gold Services, I am viewing your Gandhinagar, Vijayawada branch page and would like to enquire about selling old gold / releasing pledged gold.'
  )}`

  return (
    <div>
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(branchJsonLd) }}
      />

      {/* Compact Branch Header */}
      <header className="site-header">
        <div className="nav-bar">
          <Link href="/" className="brand-lockup">
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
              <span className="brand-title-sub">
                Gandhinagar, Vijayawada · 520003
              </span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Branch Page Navigation">
            <Link href="/">← Back to Homepage</Link>
            <a href="#branch-services">Vijayawada Services</a>
            <a href="#branch-directions">Directions &amp; Landmarks</a>
            <a href="#branch-documents">Required Documents</a>
          </nav>

          <div className="nav-cta-group">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="nav-phone-pill tabular-nums"
            >
              <Phone size={15} style={{ color: '#e6b95c' }} />
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <a
              href={branchWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
            >
              <MessageCircle size={16} />
              WhatsApp Branch
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Branch Hero */}
        <section className="hero-vault" aria-labelledby="vja-branch-heading">
          <div className="container-shell">
            <div className="hero-grid">
              <div>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#e6b95c',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  <ArrowLeft size={15} /> Back to Trust Gold Services Home
                </Link>

                <div className="telugu-pill">
                  <span className="telugu-pill-dot" aria-hidden="true" />
                  <span>
                    VERIFIED BRANCH · VASISTH ENCLAVE, GANDHINAGAR, VIJAYAWADA
                  </span>
                </div>

                <h1 id="vja-branch-heading" className="hero-display">
                  Sell Old Gold &amp; Release Pledged Gold in{' '}
                  <span className="hero-display-gold">
                    Gandhinagar, Vijayawada.
                  </span>
                </h1>

                <p className="hero-lead">
                  Visit our open-counter branch at{' '}
                  <strong>
                    First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar,
                    Vijayawada – 520003
                  </strong>
                  . Founded by <strong>Manohar Reddy</strong>, we test purity on
                  a calibrated 0.01g scale in front of your eyes, return stones
                  to you, and settle payments on the spot with only a{' '}
                  <strong>1% processing fee</strong>.
                </p>

                <div className="hero-actions">
                  <a
                    href={branchWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Gandhinagar Counter
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="btn btn-outline-light tabular-nums"
                  >
                    <Phone size={17} style={{ color: '#e6b95c' }} />
                    Call +91 93934 94455
                  </a>
                </div>

                <div className="hero-metrics tabular-nums">
                  <div className="metric-item">
                    <strong>Shop No. 5</strong>
                    <span>First Floor, Vasisth Enclave, Gandhinagar</span>
                  </div>
                  <div className="metric-item">
                    <strong>9 AM – 9 PM</strong>
                    <span>Open Monday to Saturday</span>
                  </div>
                  <div className="metric-item">
                    <strong>1% Fee Only</strong>
                    <span>Direct Purchase or Melting Choice</span>
                  </div>
                </div>
              </div>

              {/* Branch Photo Card */}
              <div className="hero-showcase-stage">
                <div className="hero-stage-frame spotlight-card">
                  <div className="hero-stage-media">
                    <Image
                      src="/images/about-shop.png"
                      alt="Trust Gold Services Gandhinagar Vijayawada Branch Office Counter"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                    <div className="hero-stage-gradient" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Branch Services in Vijayawada */}
        <section
          id="branch-services"
          className="section-pad"
          aria-labelledby="vja-services-heading"
        >
          <div className="container-shell">
            <span className="section-tag">
              Services at Our Gandhinagar Counter · విజయవాడ సేవలు
            </span>
            <Split
              id="vja-services-heading"
              text="What we do at our Gandhinagar, Vijayawada branch."
              goldWords={['Gandhinagar,', 'Vijayawada']}
              className="section-heading"
            />

            <div
              data-reveal-group
              className="three-pillars-grid"
              style={{ marginTop: 32 }}
            >
              <article className="pillar-feature-card spotlight-card">
                <div className="pillar-feature-top">
                  <span className="pillar-feature-num">01</span>
                  <div className="pillar-feature-icon">
                    <Scale size={22} />
                  </div>
                </div>
                <h3>Old Gold Purchase (Hallmark 22K, 916 &amp; Unmarked)</h3>
                <span className="pillar-feature-sub">
                  పాత బంగారం కొనుగోలు — స్పాట్ పేమెంట్
                </span>
                <p>
                  Bring your Hallmark 22K (916 HUID), Only 916 Mark, or Unmarked
                  family gold ornaments. We remove stones carefully and hand
                  them back to you, weigh net gold on our 0.01g scale, and pay
                  99% market value (1% processing fee) via Cash, UPI, IMPS, or
                  RTGS.
                </p>
                <div className="pillar-feature-proof">
                  <BadgeCheck size={16} />
                  <span>Direct Valuation or Melting — 100% Your Choice</span>
                </div>
              </article>

              <article className="pillar-feature-card spotlight-card">
                <div className="pillar-feature-top">
                  <span className="pillar-feature-num">02</span>
                  <div className="pillar-feature-icon">
                    <LockOpen size={22} />
                  </div>
                </div>
                <h3>Bank &amp; NBFC Pledged Gold Loan Release</h3>
                <span className="pillar-feature-sub">
                  బ్యాంకు తాకట్టు బంగారం విడిపింపు
                </span>
                <p>
                  Have gold pledged in a bank, Muthoot, Manappuram, IIFL, or
                  financier anywhere in Vijayawada? Our representative
                  accompanies you to the branch, pays the loan closure amount at
                  the counter, tests the released gold openly at our office, and
                  transfers the remaining surplus balance to you immediately.
                </p>
                <div className="pillar-feature-proof">
                  <Landmark size={16} />
                  <span>We accompany you to any bank branch in Vijayawada</span>
                </div>
              </article>

              <article className="pillar-feature-card spotlight-card">
                <div className="pillar-feature-top">
                  <span className="pillar-feature-num">03</span>
                  <div className="pillar-feature-icon">
                    <Flame size={22} />
                  </div>
                </div>
                <h3>Free Open-Counter Purity &amp; Weight Check</h3>
                <span className="pillar-feature-sub">
                  ఉచిత నాణ్యత &amp; రాతపూర్వక కొటేషన్
                </span>
                <p>
                  Not sure of your ornament’s purity or today’s net payout? Walk
                  into our Vasisth Enclave office for a free open-counter check.
                  You receive a written weight and rate breakdown before making
                  any decision.
                </p>
                <div className="pillar-feature-proof">
                  <ShieldCheck size={16} />
                  <span>Zero obligation to sell until you approve</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Local Vijayawada Directions & Landmarks */}
        <section
          id="branch-directions"
          className="section-pad section-alabaster"
          aria-labelledby="vja-directions-heading"
        >
          <div className="container-shell">
            <div className="founder-grid">
              <div>
                <span className="section-tag">
                  Directions &amp; Landmarks · గాంధీనగర్ రూట్ గైడ్
                </span>
                <h2 id="vja-directions-heading" className="section-heading">
                  How to reach our Gandhinagar, Vijayawada office.
                </h2>
                <p className="section-sub" style={{ marginBottom: 24 }}>
                  <strong>Address:</strong> First Floor, Shop No. 5, Vasisth
                  Enclave, Gandhinagar, Vijayawada, Andhra Pradesh – 520003.
                </p>

                <div
                  style={{ display: 'grid', gap: 14, marginBottom: 24 }}
                >
                  {VIJAYAWADA_LANDMARKS.map((item) => (
                    <div
                      key={item.area}
                      style={{
                        background: '#ffffff',
                        padding: '16px 18px',
                        borderRadius: 12,
                        border: '1px solid var(--rule-light)',
                      }}
                    >
                      <strong
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          color: 'var(--vault-navy)',
                          fontSize: '0.94rem',
                          marginBottom: 4,
                        }}
                      >
                        <Navigation
                          size={15}
                          style={{ color: 'var(--bullion-gold)' }}
                        />
                        {item.area}
                      </strong>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.86rem',
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {item.directions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    background: 'var(--vault-navy)',
                    color: '#ffffff',
                    padding: 28,
                    borderRadius: 18,
                    border: '1px solid rgba(230, 185, 92, 0.35)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: '1.65rem',
                      margin: '0 0 14px',
                    }}
                  >
                    Gandhinagar Branch Details
                  </h3>

                  <div className="contact-detail-list">
                    <div className="contact-detail-item">
                      <div className="contact-icon-circle">
                        <Building2 size={18} />
                      </div>
                      <div className="contact-detail-text">
                        <strong>Office Address</strong>
                        <span>
                          First Floor, Shop No. 5, Vasisth Enclave,
                          <br />
                          Gandhinagar, Vijayawada – 520003
                        </span>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-circle">
                        <Clock size={18} />
                      </div>
                      <div className="contact-detail-text">
                        <strong>Working Hours</strong>
                        <span>Monday – Saturday: 9:00 AM – 9:00 PM</span>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-icon-circle">
                        <Phone size={18} />
                      </div>
                      <div className="contact-detail-text tabular-nums">
                        <strong>Direct Counter Phone &amp; WhatsApp</strong>
                        <span>+91 93934 94455</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="contact-map-frame"
                    style={{ height: 240, marginTop: 20 }}
                  >
                    <iframe
                      title="Trust Gold Services Vasisth Enclave Gandhinagar Vijayawada Map"
                      src="https://www.google.com/maps?q=Vasisth+Enclave+Gandhinagar+Vijayawada+520003&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <a
                      href={branchWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                    >
                      <MessageCircle size={17} />
                      WhatsApp for Directions / Rate
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Vasisth+Enclave+Gandhinagar+Vijayawada+520003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light"
                    >
                      <MapPin size={16} />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents & Categories Summary */}
        <section
          id="branch-documents"
          className="section-pad"
          aria-labelledby="vja-docs-heading"
        >
          <div className="container-shell">
            <span className="section-tag">
              Documents &amp; Gold Categories · అవసరమైన పత్రాలు
            </span>
            <h2 id="vja-docs-heading" className="section-heading">
              What to bring when visiting our Gandhinagar branch.
            </h2>

            <div
              data-reveal-group
              className="docs-grid"
              style={{ marginTop: 28 }}
            >
              {REQUIRED_DOCUMENTS.map((doc) => (
                <article key={doc.id} className="doc-card spotlight-card">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="category-icon-box">
                      <FileCheck2 size={20} />
                    </div>
                    <span
                      className={
                        doc.forPledgedReleaseOnly
                          ? 'doc-badge pledge-only'
                          : 'doc-badge'
                      }
                    >
                      {doc.forPledgedReleaseOnly
                        ? 'Pledged Release'
                        : doc.required
                          ? 'Mandatory KYC'
                          : 'If Available'}
                    </span>
                  </div>
                  <h3>{doc.title}</h3>
                  <small
                    style={{
                      fontWeight: 600,
                      color: 'var(--bullion-gold-deep)',
                    }}
                  >
                    {doc.teluguTitle}
                  </small>
                  <p>{doc.description}</p>
                </article>
              ))}
            </div>

            <div
              style={{
                marginTop: 36,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                padding: '24px 28px',
                borderRadius: 16,
                background: 'var(--vault-navy)',
                color: '#ffffff',
              }}
            >
              <div>
                <strong style={{ fontSize: '1.1rem', display: 'block' }}>
                  Ready to check today’s Vijayawada gold rate or release a bank
                  loan?
                </strong>
                <span
                  style={{
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.76)',
                  }}
                >
                  Speak directly with our Gandhinagar counter or return to the
                  full interactive homepage.
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <a
                  href={branchWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <MessageCircle size={17} /> WhatsApp Valuation
                </a>
                <Link href="/" className="btn btn-outline-light">
                  <ArrowLeft size={16} /> Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
    </div>
  )
}
