'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Flame,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { BUSINESS_INFO, GOLD_TOUCHSTONE_MARKS } from '@/lib/gold-calculator'
import { type Language, TRANSLATIONS } from '@/lib/i18n'
import { Split } from '@/components/SiteMotion'

const TELUGU_MARK_DETAILS: Record<
  string,
  { title: string; assayMethod: string; ornamentExamples: string }
> = {
  '24k-999': {
    title: '24K అపరంజి / కాయిన్స్ & బిస్కెట్లు',
    assayMethod:
      'నల్ల గీటు రాయి (Basanite) పై ప్రకాశవంతమైన బంగారు గీత + డిజిటల్ స్కేల్‌పై 999.9 ఫైన్‌నెస్ నిర్ధారణ.',
    ornamentExamples:
      'బ్యాంకు గోల్డ్ కాయిన్స్, MMTC-PAMP బిస్కెట్లు, 24K అపరంజి బంగారం కడ్డీలు.',
  },
  '22k-916': {
    title: '22K హాల్‌మార్క్ (916 HUID) ఆభరణాలు',
    assayMethod:
      'BIS 916 HUID లేజర్ ముద్ర పరిశీలన + మీ కళ్ళ ముందే గీటు రాయి పరీక్ష (డైరెక్ట్ కొనుగోలు లేదా మెల్టింగ్ మీ ఇష్టం).',
    ornamentExamples:
      'తాళిబొట్టు గొలుసులు, కాసుల పేరు, వడ్డాణాలు, గాజులు, నెక్లెస్‌లు మరియు 916 ఆభరణాలు.',
  },
  '20k-833': {
    title: '20K / KDM & పాత తరపు ఆభరణాలు',
    assayMethod:
      'గీటు రాయి నాణ్యత పోలిక + రాళ్ళు తీసి మీకు తిరిగి ఇచ్చి నికర బంగారం తూకం లేదా మీ ముందే మెల్టింగ్.',
    ornamentExamples:
      'పాత తరపు ఆభరణాలు, KDM టంకం నగలు, 916 ముద్ర లేని కుటుంబ బంగారు నగలు.',
  },
  '18k-750': {
    title: '18K (750) స్టోన్ & డిజైనర్ ఆభరణాలు',
    assayMethod:
      'రాళ్ళు, డైమండ్స్ లేదా పూసలను జాగ్రత్తగా తీసి మీ చేతికి తిరిగి ఇచ్చి, నికర 750 బంగారాన్ని మాత్రమే తూకం వేస్తాం.',
    ornamentExamples:
      'రాళ్ళ గాజులు, స్టడ్ ఇయర్ రింగ్స్, ఉంగరాలు, 750 ముద్ర గల ఆధునిక బంగారు నగలు.',
  },
}

export function GoldTouchstoneAssay({ lang = 'en' }: { lang?: Language }) {
  const [selectedId, setSelectedId] = useState<string>(
    GOLD_TOUCHSTONE_MARKS[0].id
  )
  const [rubKey, setRubKey] = useState<number>(0)

  const t = TRANSLATIONS[lang].touchstone

  const activeMark =
    GOLD_TOUCHSTONE_MARKS.find((m) => m.id === selectedId) ??
    GOLD_TOUCHSTONE_MARKS[0]

  const activeTelugu = TELUGU_MARK_DETAILS[activeMark.id]

  function handleSelectStreak(id: string) {
    setSelectedId(id)
    setRubKey((prev) => prev + 1)
  }

  const whatsappAssayUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(
    lang === 'te'
      ? `నమస్కారం Trust Gold Services, ${activeMark.karat} (${activeMark.fineness} Fineness) బంగారానికి ఈరోజు విజయవాడ మార్కెట్ రేటు తెలుసుకోవాలనుకుంటున్నాను.`
      : `Hi Trust Gold Services, I would like to check today's live Vijayawada gold rate for ${activeMark.title} (${activeMark.karat} / ${activeMark.fineness} Fineness).`
  )}`

  return (
    <section
      id="gold-craft"
      className="touchstone-section"
      aria-labelledby="touchstone-heading"
    >
      {/* Hidden SVG Grain Filter for Authentic Gold Streak Texture on Basanite Stone */}
      <svg width="0" height="0" className="sr-only" aria-hidden="true">
        <filter
          id="tg-streak-grain"
          x="-5%"
          y="-30%"
          width="110%"
          height="160%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78 0.14"
            numOctaves="2"
            seed="7"
          />
          <feDisplacementMap in="SourceGraphic" scale="6.5" />
        </filter>
      </svg>

      <div className="container-shell">
        <div className="touchstone-header">
          <div>
            <span className="section-tag" style={{ color: '#e6b95c' }}>
              <Sparkles
                size={13}
                style={{
                  display: 'inline',
                  verticalAlign: '-2px',
                  marginRight: 6,
                }}
              />
              {t.tag}
            </span>
            <Split
              key={`touchstone-head-${lang}`}
              id="touchstone-heading"
              text={t.heading}
              goldWords={t.goldWords}
              className="section-heading"
            />
          </div>
          <p data-reveal className="touchstone-lead">
            {t.lead}
          </p>
        </div>

        <div data-reveal-group className="touchstone-grid">
          {/* Left Column: Interactive Black Basanite Touchstone Slab */}
          <div className="basanite-slab spotlight-card">
            <div className="basanite-top-bar">
              <span className="basanite-badge">{t.slabBadge}</span>
              <span className="basanite-hint">{t.slabHint}</span>
            </div>

            <div
              className="streak-cards-grid"
              role="tablist"
              aria-label="Gold purity touchstone streaks"
            >
              {GOLD_TOUCHSTONE_MARKS.map((mark) => {
                const isSelected = mark.id === activeMark.id
                return (
                  <button
                    key={mark.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectStreak(mark.id)}
                    className={
                      isSelected
                        ? 'streak-card pressable active'
                        : 'streak-card pressable'
                    }
                  >
                    <div className="streak-canvas-wrap">
                      <svg
                        viewBox="0 0 200 56"
                        className="streak-svg"
                        aria-hidden="true"
                      >
                        <path
                          d={mark.svgPath}
                          fill="none"
                          stroke={mark.streakColor}
                          strokeWidth={10}
                          strokeLinecap="round"
                          filter="url(#tg-streak-grain)"
                        />
                      </svg>
                      <span
                        key={isSelected ? `rub-${rubKey}` : 'idle'}
                        aria-hidden="true"
                        className={
                          isSelected
                            ? 'streak-rub-cover animate-rub'
                            : 'streak-rub-cover'
                        }
                      />
                    </div>

                    <div className="streak-meta-row">
                      <span className="streak-karat tabular-nums">
                        {mark.karat}
                      </span>
                      <span className="streak-fineness tabular-nums">
                        {mark.fineness} Fineness
                      </span>
                    </div>
                    <p className="streak-pure tabular-nums">
                      {mark.purePercent} · {mark.teluguLabel}
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="basanite-footer-pills">
              <span>
                <Scale size={14} /> {t.footerScale}
              </span>
              <span>
                <ShieldCheck size={14} /> {t.footerStone}
              </span>
              <span>
                <Flame size={14} /> {t.footerChoice}
              </span>
            </div>
          </div>

          {/* Right Column: Live Open-Counter Assay Bench & Traditional Weight Standards */}
          <div className="assay-bench-card spotlight-card" aria-live="polite">
            <div className="assay-bench-top">
              <div>
                <span className="assay-bench-tag">
                  {t.benchPrefix} · {activeMark.karat} ({activeMark.fineness}{' '}
                  FINENESS)
                </span>
                <h3>
                  {lang === 'te' && activeTelugu
                    ? activeTelugu.title
                    : activeMark.title}
                </h3>
                <p className="assay-bench-telugu">{activeMark.teluguLabel}</p>
              </div>
              <div className="assay-rate-badge tabular-nums">
                <small>{t.pureContentLabel}</small>
                <strong>{activeMark.purePercent}</strong>
              </div>
            </div>

            <div className="assay-detail-boxes">
              <div className="assay-detail-item">
                <strong>{t.howWeVerifyLabel}</strong>
                <p>
                  {lang === 'te' && activeTelugu
                    ? activeTelugu.assayMethod
                    : activeMark.assayMethod}
                </p>
              </div>
              <div className="assay-detail-item">
                <strong>{t.commonOrnamentsLabel}</strong>
                <p>
                  {lang === 'te' && activeTelugu
                    ? activeTelugu.ornamentExamples
                    : activeMark.ornamentExamples}
                </p>
              </div>
            </div>

            {/* Traditional Telugu & South Indian Gold Weight Standards */}
            <div className="weight-benchmarks-label">
              <span>{t.weightStandardsTitle}</span>
              <span className="tabular-nums">{t.weightStandardsFee}</span>
            </div>

            <div
              className="weight-benchmarks-grid"
              style={{ marginBottom: 16 }}
            >
              <div className="weight-benchmark-box">
                <span className="wb-unit">1 Gram · 1 గ్రాము</span>
                <strong className="wb-val tabular-nums">1.00 g Net</strong>
              </div>

              <div className="weight-benchmark-box highlight">
                <span className="wb-unit">1 Kasu (Sovereign) · 1 కాసు</span>
                <strong className="wb-val tabular-nums">8.00 Grams</strong>
              </div>

              <div className="weight-benchmark-box highlight">
                <span className="wb-unit">1 Tulam (Tola) · 1 తులం</span>
                <strong className="wb-val tabular-nums">10.00 Grams</strong>
              </div>

              <div className="weight-benchmark-box">
                <span className="wb-unit">3 Kasulu · 3 కాసులు</span>
                <strong className="wb-val tabular-nums">24.00 Grams</strong>
              </div>
            </div>

            <a
              href={whatsappAssayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ width: '100%' }}
            >
              <MessageCircle size={17} /> {t.whatsappBtnPrefix}{' '}
              {activeMark.karat} {t.whatsappBtnSuffix} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
