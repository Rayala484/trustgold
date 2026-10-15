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
import { Split } from '@/components/SiteMotion'

export function GoldTouchstoneAssay() {
  const [selectedId, setSelectedId] = useState<string>(
    GOLD_TOUCHSTONE_MARKS[0].id
  )
  const [rubKey, setRubKey] = useState<number>(0)

  const activeMark =
    GOLD_TOUCHSTONE_MARKS.find((m) => m.id === selectedId) ??
    GOLD_TOUCHSTONE_MARKS[0]

  function handleSelectStreak(id: string) {
    setSelectedId(id)
    setRubKey((prev) => prev + 1)
  }

  const whatsappAssayUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(
    `Hi Trust Gold Services, I would like to check today's live Vijayawada gold rate for ${activeMark.title} (${activeMark.karat} / ${activeMark.fineness} Fineness).`
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
              The Craft of Honest Gold Valuation · గీటు రాయి &amp; 916 Assay
            </span>
            <Split
              id="touchstone-heading"
              text="Every honest valuation begins with how gold reads on the stone and the scale."
              goldWords={['gold', 'stone', 'scale']}
              className="section-heading"
            />
          </div>
          <p className="touchstone-lead">
            Before a single rupee is quoted, we test your ornament’s exact
            fineness in front of your eyes—from traditional Basanite touchstone
            streaks (<em>గీటు రాయి</em>) and BIS 916 HUID inspection to digital
            purity analysis or crucible melting at your choice. Tap any gold
            streak below to see how we verify its purity.
          </p>
        </div>

        <div className="touchstone-grid">
          {/* Left Column: Interactive Black Basanite Touchstone Slab */}
          <div className="basanite-slab spotlight-card">
            <div className="basanite-top-bar">
              <span className="basanite-badge">
                BLACK BASANITE TOUCHSTONE · గీటు రాయి పరీక్ష
              </span>
              <span className="basanite-hint">Tap a gold streak to inspect</span>
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
                      {mark.purePercent} Pure Gold · {mark.teluguLabel}
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="basanite-footer-pills">
              <span>
                <Scale size={14} /> 0.01g Calibrated Scale
              </span>
              <span>
                <ShieldCheck size={14} /> Zero Stone Weight Cuts on Gold
              </span>
              <span>
                <Flame size={14} /> Direct or Crucible Melt Choice
              </span>
            </div>
          </div>

          {/* Right Column: Live Open-Counter Assay Bench & Traditional Weight Standards */}
          <div className="assay-bench-card spotlight-card" aria-live="polite">
            <div className="assay-bench-top">
              <div>
                <span className="assay-bench-tag">
                  OPEN-COUNTER ASSAY BENCH · {activeMark.karat} (
                  {activeMark.fineness} FINENESS)
                </span>
                <h3>{activeMark.title}</h3>
                <p className="assay-bench-telugu">{activeMark.teluguLabel}</p>
              </div>
              <div className="assay-rate-badge tabular-nums">
                <small>Pure Gold Content</small>
                <strong>{activeMark.purePercent}</strong>
              </div>
            </div>

            <div className="assay-detail-boxes">
              <div className="assay-detail-item">
                <strong>How We Verify This Gold in Your Presence</strong>
                <p>{activeMark.assayMethod}</p>
              </div>
              <div className="assay-detail-item">
                <strong>Common Ornaments in This Purity</strong>
                <p>{activeMark.ornamentExamples}</p>
              </div>
            </div>

            {/* Traditional Telugu & South Indian Gold Weight Standards */}
            <div className="weight-benchmarks-label">
              <span>Traditional Telugu Weight Standards We Value</span>
              <span className="tabular-nums">Flat 1% Processing Fee Only</span>
            </div>

            <div className="weight-benchmarks-grid" style={{ marginBottom: 16 }}>
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
              <MessageCircle size={17} /> Check Today’s Live {activeMark.karat}{' '}
              Rate on WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

