'use client'

import { useEffect } from 'react'

// Opening sequence tailored for Trust Gold Services ("మేము బంగారం కొంటాము"):
// 1. Crucible forge glow & live digital scale calibration (0.00s - 0.90s):
//    Molten 22K/24K gold pours into and traces the Sovereign Shield and Twin Assay Rings from the Trust Gold logo,
//    while the Digital Assay Telemetry bar ticks from 0.00g -> 24.00g (916 Hallmark · 99% Net Value).
// 2. Goldsmith's Assay Hammer & Forged 916 Checkmark Strike (0.85s - 1.45s):
//    Two precision strikes stamp the signature Gold Checkmark through the navy bullion disc,
//    releasing molten gold sparks, anvil shockwaves, and rising crucible embers on a 2D canvas.
// 3. Mirror-burnished 24K cooling & specular diamond sweep (1.50s - 2.35s):
//    Heat aura cools into mirror-polished bullion, 48 sovereign rays unfurl, and "TRUST GOLD SERVICES" rises.
// 4. Vault Iris Reveal (2.55s - 3.30s):
//    Opens radially from the center of the forged checkmark into the live website.

const R_OUTER = 92
const R_INNER = 74
const CX = 300
const CY = 250

const circlePath = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 ${-2 * r}`

// Sovereign Shield silhouette matching the Trust Gold Services emblem
const SHIELD_PATH =
  'M 300 104 C 342 126 382 136 420 140 L 420 246 C 420 326 366 378 300 412 C 234 378 180 326 180 246 L 180 140 C 218 136 258 126 300 104 Z'

// Forged Checkmark piercing the assay ring (matching /logo.png)
const CHECK_PATH = 'M 244 252 L 286 294 L 388 184'

const RAYS = Array.from({ length: 48 }, (_, i) => (i * 360) / 48)
const TRUST_LETTERS = 'TRUST'.split('')
const GOLD_LETTERS = 'GOLD'.split('')

declare global {
  interface Window {
    __replayTrustGoldIntro?: () => void
  }
}

export function triggerTrustGoldIntro() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const doc = document.documentElement
  doc.classList.remove('intro')
  // Force style recalc so CSS keyframe animations and canvas loop restart cleanly
  void doc.offsetWidth
  doc.classList.add('intro')
  window.dispatchEvent(new CustomEvent('trustgold:intro-start'))
}

export function GoldOpening() {
  useEffect(() => {
    const doc = document.documentElement

    const endIntro = () => {
      doc.classList.remove('intro')
    }

    let rafId = 0
    let doneTimer: ReturnType<typeof setTimeout> | null = null

    const runSequence = () => {
      if (!doc.classList.contains('intro')) return

      if (doneTimer) clearTimeout(doneTimer)
      doneTimer = setTimeout(endIntro, 3300)

      const canvas = document.getElementById(
        'tg-intro-fx'
      ) as HTMLCanvasElement | null
      const weightEl = document.getElementById('tg-assay-weight')
      const purityEl = document.getElementById('tg-assay-purity')
      const statusEl = document.getElementById('tg-assay-status')

      const ctx = canvas?.getContext('2d')
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(2, 2)
        ctx.lineCap = 'round'
      }

      const t0 = performance.now()
      const sparks: Array<{
        x: number
        y: number
        vx: number
        vy: number
        l: number
        a: number
      }> = []
      const embers: Array<{
        x: number
        y: number
        vx: number
        vy: number
        l: number
        a: number
        r: number
      }> = []
      const hits = [880, 1180]
      const fired = [false, false]

      const burst = (originX: number, originY: number, count: number) => {
        for (let i = 0; i < count; i++) {
          const angle = Math.PI * (0.85 + Math.random() * 1.3)
          const speed = 2.8 + Math.random() * 7.8
          sparks.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.4,
            l: 26 + Math.random() * 32,
            a: 0,
          })
        }
      }

      const frame = () => {
        const t = performance.now() - t0
        if (t > 3350 || !doc.classList.contains('intro')) {
          if (ctx) ctx.clearRect(0, 0, 600, 600)
          return
        }

        // Live Digital Scale & 916 Purity Readout Calibration
        if (weightEl) {
          const progress = Math.min(1, Math.max(0, (t - 120) / 1050))
          const eased = 1 - Math.pow(1 - progress, 3)
          const grams = (24 * eased).toFixed(2).padStart(5, '0')
          weightEl.textContent = `${grams} g`
        }
        if (purityEl) {
          if (t < 450) {
            purityEl.textContent = 'ASSAYING...'
          } else if (t < 880) {
            purityEl.textContent = '22K · 916 KDM'
          } else {
            purityEl.textContent = '22K · 916 HUID ✓'
          }
        }
        if (statusEl) {
          if (t < 880) {
            statusEl.textContent = 'CALIBRATING SCALE'
          } else if (t < 1200) {
            statusEl.textContent = 'STAMPING 916 SEAL'
          } else {
            statusEl.textContent = '99.0% NET VALUE READY'
          }
        }

        if (ctx) {
          ctx.clearRect(0, 0, 600, 600)
          ctx.globalCompositeOperation = 'lighter'

          if (!fired[0] && t >= hits[0]) {
            fired[0] = true
            burst(286, 288, 40)
          }
          if (!fired[1] && t >= hits[1]) {
            fired[1] = true
            burst(348, 224, 48)
          }

          if (t < 2450 && Math.random() < 0.58) {
            embers.push({
              x: 140 + Math.random() * 320,
              y: 590,
              vx: (Math.random() - 0.5) * 0.65,
              vy: -(0.65 + Math.random() * 1.45),
              l: 110 + Math.random() * 90,
              a: 0,
              r: 0.8 + Math.random() * 1.65,
            })
          }

          for (let i = sparks.length - 1; i >= 0; i--) {
            const p = sparks[i]
            p.a++
            if (p.a > p.l) {
              sparks.splice(i, 1)
              continue
            }
            const k = 1 - p.a / p.l
            const px = p.x
            const py = p.y
            p.vy += 0.31
            p.vx *= 0.985
            p.x += p.vx
            p.y += p.vy
            ctx.strokeStyle = `rgba(255,${(205 + 50 * k) | 0},${
              (125 * k) | 0
            },${k})`
            ctx.lineWidth = 1.7 * k + 0.45
            ctx.beginPath()
            ctx.moveTo(px - p.vx * 1.6, py - p.vy * 1.6)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }

          for (let j = embers.length - 1; j >= 0; j--) {
            const e = embers[j]
            e.a++
            if (e.a > e.l) {
              embers.splice(j, 1)
              continue
            }
            const q = Math.sin((Math.PI * e.a) / e.l)
            e.x += e.vx + Math.sin((t + j * 90) / 400) * 0.25
            e.y += e.vy
            ctx.fillStyle = `rgba(255,${(155 + 65 * q) | 0},60,${q * 0.78})`
            ctx.beginPath()
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        rafId = requestAnimationFrame(frame)
      }

      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(frame)
    }

    window.__replayTrustGoldIntro = triggerTrustGoldIntro

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') endIntro()
    }

    const onReplay = () => {
      runSequence()
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('trustgold:intro-start', onReplay)

    if (doc.classList.contains('intro')) {
      runSequence()
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('trustgold:intro-start', onReplay)
      cancelAnimationFrame(rafId)
      if (doneTimer) clearTimeout(doneTimer)
    }
  }, [])

  const skipIntro = () => {
    document.documentElement.classList.remove('intro')
  }

  return (
    <div
      className="tg-intro-overlay"
      role="region"
      aria-label="Trust Gold Services opening sequence"
    >
      <div className="tg-intro-stage" aria-hidden="true">
        {/* Live Precision Scale & 916 Assay Telemetry Pill */}
        <div className="tg-assay-hud tabular-nums">
          <div className="tg-hud-cell">
            <span className="tg-hud-label">DIGITAL SCALE</span>
            <strong id="tg-assay-weight" className="tg-hud-val">
              24.00 g
            </strong>
          </div>
          <span className="tg-hud-sep" />
          <div className="tg-hud-cell">
            <span className="tg-hud-label">PURITY ASSAY</span>
            <strong id="tg-assay-purity" className="tg-hud-val tg-hud-gold">
              22K · 916 HUID ✓
            </strong>
          </div>
          <span className="tg-hud-sep tg-hud-hide-sm" />
          <div className="tg-hud-cell tg-hud-hide-sm">
            <span className="tg-hud-label">VALUATION STATUS</span>
            <strong id="tg-assay-status" className="tg-hud-val">
              99.0% NET VALUE READY
            </strong>
          </div>
        </div>

        {/* Central Forging & Assay Stage */}
        <div className="tg-intro-art">
          <svg viewBox="0 0 600 600" className="tg-intro-svg">
            <defs>
              <linearGradient
                id="tg-gold-bevel"
                x1="140"
                y1="100"
                x2="460"
                y2="420"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#8a5a12" />
                <stop offset="0.2" stopColor="#f5ce70" />
                <stop offset="0.38" stopColor="#fff4ce" />
                <stop offset="0.54" stopColor="#d9a130" />
                <stop offset="0.76" stopColor="#946210" />
                <stop offset="0.92" stopColor="#f2c960" />
                <stop offset="1" stopColor="#a67218" />
              </linearGradient>

              <radialGradient
                id="tg-navy-disc"
                cx="300"
                cy="242"
                r="88"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#123163" />
                <stop offset="0.62" stopColor="#081a38" />
                <stop offset="1" stopColor="#040d1e" />
              </radialGradient>

              <linearGradient
                id="tg-wood"
                x1="0"
                y1="-6"
                x2="0"
                y2="6"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#e0ad74" />
                <stop offset="0.45" stopColor="#a86d35" />
                <stop offset="1" stopColor="#5a3615" />
              </linearGradient>

              <linearGradient
                id="tg-steel-cyl"
                x1="-15"
                y1="0"
                x2="15"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2d333a" />
                <stop offset="0.22" stopColor="#7f8994" />
                <stop offset="0.4" stopColor="#f6f8fa" />
                <stop offset="0.55" stopColor="#bcc5ce" />
                <stop offset="0.8" stopColor="#5b636d" />
                <stop offset="1" stopColor="#23282e" />
              </linearGradient>

              <linearGradient id="tg-glint" x1="0" x2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <radialGradient id="tg-molten-tip">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.35" stopColor="#fff2b0" />
                <stop offset="1" stopColor="#ff8a1e" stopOpacity="0" />
              </radialGradient>

              <mask id="tg-metal-mask">
                <path
                  d={SHIELD_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="20"
                  strokeLinejoin="round"
                />
                <path
                  d={circlePath(CX, CY, R_OUTER)}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="12"
                />
                <path
                  d={CHECK_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="26"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
            </defs>

            {/* 48-Ray Sovereign Bullion Sunburst */}
            <g className="tg-rays" stroke="#e6b95c" strokeLinecap="round">
              {RAYS.map((angle) => (
                <line
                  key={angle}
                  x1="300"
                  y1={angle % 15 ? 74 : 66}
                  x2="300"
                  y2={angle % 15 ? 52 : 34}
                  strokeWidth={angle % 15 ? 1.4 : 2.5}
                  transform={`rotate(${angle} 300 250)`}
                />
              ))}
            </g>

            <g className="tg-shake">
              {/* Deep Sovereign Navy Bullion Core Disc */}
              <circle
                cx={CX}
                cy={CY}
                r={R_INNER + 4}
                fill="url(#tg-navy-disc)"
                className="tg-disc-core"
              />

              {/* 1. Molten 24K Gold Shield Frame */}
              <g className="tg-shield-group">
                <path
                  d={SHIELD_PATH}
                  pathLength={1}
                  className="tg-wire-edge"
                  fill="none"
                  stroke="#4a2f06"
                  strokeWidth="22"
                  strokeLinejoin="round"
                />
                <path
                  d={SHIELD_PATH}
                  pathLength={1}
                  className="tg-wire-metal"
                  fill="none"
                  stroke="url(#tg-gold-bevel)"
                  strokeWidth="16"
                  strokeLinejoin="round"
                />
                <path
                  d={SHIELD_PATH}
                  pathLength={1}
                  className="tg-wire-shine"
                  fill="none"
                  stroke="#fff6d8"
                  strokeOpacity="0.6"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Layered heat glow (GPU friendly, zero blur filter) */}
                <path
                  d={SHIELD_PATH}
                  pathLength={1}
                  className="tg-wire-hot"
                  fill="none"
                  stroke="#ff7a18"
                  strokeOpacity="0.2"
                  strokeWidth="38"
                  strokeLinejoin="round"
                />
                <path
                  d={SHIELD_PATH}
                  pathLength={1}
                  className="tg-wire-hot"
                  fill="none"
                  stroke="#ff8c2a"
                  strokeOpacity="0.38"
                  strokeWidth="24"
                  strokeLinejoin="round"
                />
                <circle r="20" fill="url(#tg-molten-tip)" opacity="0">
                  <animateMotion
                    path={SHIELD_PATH}
                    begin="0.1s"
                    dur="0.82s"
                    fill="freeze"
                    calcMode="spline"
                    keyTimes="0;1"
                    keySplines="0.65 0 0.35 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.08;0.9;1"
                    begin="0.1s"
                    dur="0.86s"
                    fill="freeze"
                  />
                </circle>
              </g>

              {/* 2. Twin Concentric Assay Rings around the Bullion Disc */}
              <g className="tg-ring-group">
                <path
                  d={circlePath(CX, CY, R_OUTER)}
                  pathLength={1}
                  className="tg-ring-edge"
                  fill="none"
                  stroke="#4a2f06"
                  strokeWidth="13"
                />
                <path
                  d={circlePath(CX, CY, R_OUTER)}
                  pathLength={1}
                  className="tg-ring-metal"
                  fill="none"
                  stroke="url(#tg-gold-bevel)"
                  strokeWidth="9.5"
                />
                <path
                  d={circlePath(CX, CY, R_INNER)}
                  pathLength={1}
                  className="tg-ring-metal"
                  fill="none"
                  stroke="url(#tg-gold-bevel)"
                  strokeWidth="4.5"
                />
                <path
                  d={circlePath(CX, CY, R_OUTER)}
                  pathLength={1}
                  className="tg-ring-hot"
                  fill="none"
                  stroke="#ff7a18"
                  strokeOpacity="0.32"
                  strokeWidth="22"
                />
              </g>

              {/* 3. Forged 24K Gold Checkmark of Verified Purity (Stamped on Hammer Hits) */}
              <g className="tg-check-group">
                <path
                  d={CHECK_PATH}
                  pathLength={1}
                  className="tg-check-shadow"
                  fill="none"
                  stroke="#3b2404"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={CHECK_PATH}
                  pathLength={1}
                  className="tg-check-metal"
                  fill="none"
                  stroke="url(#tg-gold-bevel)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={CHECK_PATH}
                  pathLength={1}
                  className="tg-check-shine"
                  fill="none"
                  stroke="#fff8df"
                  strokeOpacity="0.82"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-1.5 -2)"
                />
                <path
                  d={CHECK_PATH}
                  pathLength={1}
                  className="tg-check-hot"
                  fill="none"
                  stroke="#ff8c2a"
                  strokeOpacity="0.45"
                  strokeWidth="34"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* 916 Assay Stamp Pill Inside Shield Base */}
              <g className="tg-hallmark-stamp">
                <rect
                  x="252"
                  y="346"
                  width="96"
                  height="24"
                  rx="12"
                  fill="#071630"
                  stroke="url(#tg-gold-bevel)"
                  strokeWidth="1.8"
                />
                <text
                  x="300"
                  y="362"
                  textAnchor="middle"
                  fill="#f5ce70"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="2.2"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  BIS 916 · 22K
                </text>
              </g>

              {/* Specular Glint Sweep Across Shield & Checkmark */}
              <g mask="url(#tg-metal-mask)">
                <rect
                  className="tg-glint"
                  x="40"
                  y="90"
                  width="64"
                  height="350"
                  fill="url(#tg-glint)"
                />
              </g>

              {/* Diamond Star Twinkle at Checkmark Tip */}
              <path
                className="tg-twinkle"
                d="M388 162l5 17 17 5-17 5-5 17-5-17-17-5 17-5z"
                fill="#ffffff"
              />

              {/* Anvil Strike Shockwaves & White-Hot Flashes */}
              <circle
                className="tg-wave tg-wave-1"
                cx="286"
                cy="288"
                r="12"
                fill="none"
                stroke="#fff3cf"
                strokeWidth="3"
              />
              <circle
                className="tg-wave tg-wave-2"
                cx="348"
                cy="224"
                r="12"
                fill="none"
                stroke="#fff3cf"
                strokeWidth="3"
              />
              <circle
                className="tg-flash tg-flash-1"
                cx="286"
                cy="288"
                r="46"
                fill="url(#tg-molten-tip)"
              />
              <circle
                className="tg-flash tg-flash-2"
                cx="348"
                cy="224"
                r="48"
                fill="url(#tg-molten-tip)"
              />
            </g>

            {/* Goldsmith's Chasing & Hallmarking Hammer */}
            <g className="tg-hammer">
              <g transform="translate(310 245) rotate(-12) scale(1.55) translate(0 -29)">
                <path
                  d="M11 -1.8 L120 -3.4 Q200 -4.6 230 -6.2 Q242 -6.4 242 0 Q242 6.4 230 6.2 Q200 4.6 120 3.4 L11 4.8 Z"
                  fill="url(#tg-wood)"
                />
                <path
                  d="M30 -0.6 Q130 -2 228 -3.2"
                  stroke="#4a2c10"
                  strokeOpacity="0.35"
                  strokeWidth="0.7"
                  fill="none"
                />
                <path
                  d="M40 2.2 Q140 1.6 226 2.6"
                  stroke="#f1c48f"
                  strokeOpacity="0.35"
                  strokeWidth="0.7"
                  fill="none"
                />
                <rect
                  x="10"
                  y="-3.4"
                  width="7"
                  height="9.6"
                  rx="1.5"
                  fill="#7b838d"
                />
                <path
                  d="M-15 28 Q0 32 15 28 L15 22 Q11 20 11 14 L11 -8 Q11 -14 6 -22 Q5 -30 0 -31 Q-5 -30 -6 -22 Q-11 -14 -11 -8 L-11 14 Q-11 20 -15 22 Z"
                  fill="url(#tg-steel-cyl)"
                />
                <path
                  d="M-11 -8 H11 M-11 14 H11"
                  stroke="#2b3138"
                  strokeOpacity="0.45"
                  strokeWidth="0.8"
                />
                <ellipse cx="0" cy="28.4" rx="15" ry="2.4" fill="#e4e9ee" />
                <path
                  d="M-3.5 -26 Q-6 -10 -5 18"
                  stroke="#ffffff"
                  strokeOpacity="0.75"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
          <canvas
            id="tg-intro-fx"
            width={1200}
            height={1200}
            className="tg-intro-fx"
          />
        </div>

        {/* Brand Lockup: TRUST GOLD — SERVICES — & Telugu Promise */}
        <div className="tg-intro-brand">
          <p className="tg-intro-name">
            <span className="tg-word-group">
              {TRUST_LETTERS.map((ch, i) => (
                <span
                  key={`t-${i}`}
                  className="tg-intro-letter tg-letter-platinum"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span className="tg-word-spacer" />
            <span className="tg-word-group">
              {GOLD_LETTERS.map((ch, i) => (
                <span
                  key={`g-${i}`}
                  className="tg-intro-letter tg-letter-gold"
                  style={{ '--i': i + 5 } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
          </p>

          <div className="tg-intro-subbar">
            <span className="tg-subbar-line" />
            <span className="tg-subbar-text">S E R V I C E S · V I J A Y A W A D A</span>
            <span className="tg-subbar-line" />
          </div>

          <p className="tg-intro-telugu">
            మేము బంగారం కొంటాము · Direct Buy · Melt in Presence · Bank Pledge Release
          </p>
        </div>
      </div>

      <button type="button" onClick={skipIntro} className="tg-intro-skip">
        Skip Opening · Enter Shop →
      </button>
    </div>
  )
}
