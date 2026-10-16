'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  X,
} from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/gold-calculator'
import { type Language } from '@/lib/i18n'
import { HOME_COPY } from '@/lib/home-copy'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { SiteMotion, Split } from '@/components/SiteMotion'
import { TrustGold3DStage } from '@/components/TrustGold3DStage'
import { OpeningSequence } from '@/components/OpeningSequence'

const waLink = (text: string) =>
  `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`

export default function TrustGoldHomePage() {
  const [lang, setLang] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(-1)

  // Restore the visitor's language choice
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('trustgold_lang')
      if (saved === 'te' || saved === 'en') {
        setLang(saved)
        document.documentElement.lang = saved
      }
    } catch {
      // storage blocked: stay in English
    }
  }, [])

  // Mobile dock: hide it while the hero buttons or the visit card are on screen, so the same
  // Call / WhatsApp actions are never shown twice at once.
  useEffect(() => {
    const dock = document.querySelector<HTMLElement>('.mobile-dock')
    const targets = document.querySelectorAll('.hero-actions, #visit')
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

  function switchLanguage(next: Language) {
    setLang(next)
    try {
      window.localStorage.setItem('trustgold_lang', next)
      document.documentElement.lang = next
    } catch {
      // storage blocked: switch for this visit only
    }
  }

  const c = HOME_COPY[lang]
  const generalWa = waLink(c.whatsappPrefill)
  const tel = `tel:${BUSINESS_INFO.phone}`
  const navLinks = [
    { href: '#services', label: c.nav.services },
    { href: '#how-it-works', label: c.nav.how },
    { href: '#faq', label: c.nav.faq },
    { href: '#visit', label: c.nav.visit },
  ]

  return (
    <div className={lang === 'te' ? 'lang-te-root' : 'lang-en-root'}>
      <SiteMotion />
      <OpeningSequence />

      {/* Header */}
      <header className="site-header">
        <div className="nav-bar">
          <a href="#top" className="brand-lockup" aria-label="Trust Gold Services home">
            <Image
              src="/logo.png"
              alt=""
              width={46}
              height={46}
              className="brand-emblem"
              priority
            />
            <div className="brand-title">
              <span className="brand-title-main">Trust Gold Services</span>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-cta-group">
            <div className="lang-switcher" role="group" aria-label="Language / భాష">
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                aria-pressed={lang === 'en'}
                className={lang === 'en' ? 'lang-pill-btn active' : 'lang-pill-btn'}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('te')}
                aria-pressed={lang === 'te'}
                className={lang === 'te' ? 'lang-pill-btn active' : 'lang-pill-btn'}
              >
                తెలుగు
              </button>
            </div>
            <a
              href={tel}
              className="nav-phone-pill tabular-nums"
              aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
            >
              <Phone size={15} style={{ color: '#e6b95c' }} />
              <span className="nav-phone-text">{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              href={generalWa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
            >
              <MessageCircle size={16} />
              {c.hero.whatsapp}
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div id="mobile-nav-drawer" className={menuOpen ? 'mobile-drawer open' : 'mobile-drawer'}>
          <div className="mobile-drawer-inner">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="drawer-actions">
              <a href={tel} className="btn btn-outline-light btn-sm" onClick={() => setMenuOpen(false)}>
                <Phone size={15} /> {c.visit.call}
              </a>
              <a
                href={generalWa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle size={15} /> {c.visit.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        {/* 1. Hero: one promise, two actions, three facts */}
        <section className="hero-vault" aria-labelledby="hero-heading">
          <div className="container-shell">
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="hero-eyebrow rise d1">
                  <MapPin size={14} aria-hidden="true" />
                  {c.hero.eyebrow}
                </span>
                <h1 id="hero-heading" className="hero-display" key={`h1-${lang}`}>
                  <span className="w-load d1">
                    <i>{c.hero.titleA}</i>
                  </span>{' '}
                  <span className="w-load d2">
                    <i className="hero-display-gold">{c.hero.titleGold}</i>
                  </span>
                </h1>
                <p className="hero-lead rise d3">{c.hero.lead}</p>

                <div className="hero-actions rise d4">
                  <a href={generalWa} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                    <MessageCircle size={18} />
                    {c.hero.whatsapp}
                    <ArrowRight size={16} />
                  </a>
                  <a href={tel} className="btn btn-outline-light tabular-nums">
                    <Phone size={17} style={{ color: '#e6b95c' }} />
                    {c.hero.call}
                  </a>
                </div>

                <ul className="hero-chips rise d5">
                  {c.hero.chips.map((chip) => (
                    <li key={chip}>
                      <Check size={14} aria-hidden="true" />
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hero-showcase-stage">
                <TrustGold3DStage />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Services */}
        <section id="services" className="section-pad section-alabaster" aria-labelledby="services-heading">
          <div className="container-shell">
            <div className="section-head">
              <span className="section-tag">{c.services.tag}</span>
              <Split
                key={`services-${lang}`}
                id="services-heading"
                text={c.services.heading}
                className="section-heading"
              />
            </div>

            <div data-reveal-group className="services-split">
              {[
                { s: c.services.sell, img: '/images/old-gold-purchase.png' },
                { s: c.services.release, img: '/images/pledged-gold-release.png' },
              ].map(({ s, img }) => (
                <article key={s.title} className="service-panel">
                  <div className="service-media">
                    <Image src={img} alt="" fill sizes="(max-width: 1024px) 100vw, 580px" />
                    <div className="service-media-overlay" />
                    <div className="service-media-caption">
                      <h3>{s.title}</h3>
                    </div>
                  </div>
                  <div className="service-body">
                    <p className="service-text">{s.text}</p>
                    <a
                      href={waLink(s.prefill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-navy"
                    >
                      <MessageCircle size={16} />
                      {s.cta}
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <section id="how-it-works" className="section-pad" aria-labelledby="how-heading">
          <div className="container-shell">
            <div className="section-head">
              <span className="section-tag">{c.how.tag}</span>
              <Split key={`how-${lang}`} id="how-heading" text={c.how.heading} className="section-heading" />
            </div>
            <ol data-reveal-group className="mini-steps">
              {c.how.steps.map((step, i) => (
                <li key={step.title} className="mini-step">
                  <span className="mini-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. FAQ */}
        <section id="faq" className="section-pad section-alabaster" aria-labelledby="faq-heading">
          <div className="container-shell container-narrow">
            <div className="section-head">
              <span className="section-tag">{c.faq.tag}</span>
              <Split key={`faq-${lang}`} id="faq-heading" text={c.faq.heading} className="section-heading" />
            </div>
            <div data-reveal-group className="faq-list">
              {c.faq.items.map((item, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div key={item.q} className="faq-item">
                    <button
                      id={`faq-btn-${idx}`}
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    >
                      <span>{item.q}</span>
                      <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
                    </button>
                    <div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className={isOpen ? 'faq-answer-shell open' : 'faq-answer-shell'}
                    >
                      <div className="faq-answer-inner">
                        <div className="faq-answer">{item.a}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5. Visit us: owner, address, hours, actions */}
        <section id="visit" className="section-pad" aria-labelledby="visit-heading">
          <div className="container-shell container-narrow">
            <div className="section-head">
              <span className="section-tag">{c.visit.tag}</span>
              <Split key={`visit-${lang}`} id="visit-heading" text={c.visit.heading} className="section-heading" />
            </div>

            <div data-reveal className="visit-card">
              <div className="visit-owner">
                <div className="visit-owner-photo">
                  <Image src="/images/owner-2.png" alt="Manohar Reddy" fill sizes="96px" />
                </div>
                <div>
                  <strong>{BUSINESS_INFO.founderName}</strong>
                  <span>{c.visit.founderRole}</span>
                </div>
              </div>

              <dl className="visit-facts">
                <div>
                  <dt>
                    <MapPin size={16} aria-hidden="true" />
                    {c.visit.addressLabel}
                  </dt>
                  <dd>{BUSINESS_INFO.addressFull}</dd>
                </div>
                <div>
                  <dt>
                    <Clock size={16} aria-hidden="true" />
                    {c.visit.hoursLabel}
                  </dt>
                  <dd>{c.visit.hours}</dd>
                </div>
              </dl>

              <div className="visit-actions">
                <a href={generalWa} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  <MessageCircle size={17} />
                  {c.visit.whatsapp}
                </a>
                <a href={tel} className="btn btn-navy tabular-nums">
                  <Phone size={16} />
                  {c.visit.call} {BUSINESS_INFO.phoneDisplay}
                </a>
                <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                  <Navigation size={16} />
                  {c.visit.directions}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer site-footer-mini">
        <div className="container-shell footer-mini">
          <div className="brand-lockup">
            <Image src="/logo.png" alt="" width={40} height={40} className="brand-emblem" />
            <div className="brand-title">
              <span className="brand-title-main">Trust Gold Services</span>
            </div>
          </div>
          <p className="footer-usp">{c.footer.usp}</p>
          <div className="footer-links">
            <a href={tel} className="tabular-nums">
              {BUSINESS_INFO.phoneFormatted}
            </a>
            <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
            <a href={BUSINESS_INFO.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={BUSINESS_INFO.socials.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={BUSINESS_INFO.socials.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
          <p className="footer-rights">
            © {new Date().getFullYear()} Trust Gold Services, Vijayawada. {c.footer.rights}
          </p>
        </div>
      </footer>

      <FloatingWhatsApp lang={lang} />

      <div className="mobile-dock" role="region" aria-label="Call or WhatsApp">
        <div className="mobile-dock-inner">
          <a href={tel} className="btn btn-outline-light btn-sm">
            <Phone size={16} style={{ color: '#e6b95c' }} />
            {c.dock.call}
          </a>
          <a href={generalWa} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm">
            <MessageCircle size={16} />
            {c.dock.whatsapp}
          </a>
        </div>
      </div>
    </div>
  )
}
