'use client'

import Image from 'next/image'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ensureGsapRegistered, gsap } from '@/animations/gsap'

declare global {
  interface Window {
    triggerTrustGoldIntro?: () => void
  }
}

export interface TrustGold3DStageProps {
  /** Localized caption for the authentic branch verification strip below the 3D stage */
  captionTitle: string
  captionSub: string
  purityBadge: string
  choiceBadge: string
}

// 24 solid metallic gold Z-slices (-14px to +14px) create a thick, unbroken 3D gold bullion cylinder rim when viewed edge-on
const EXTRUSION_SLICES = Array.from({ length: 24 }, (_, idx) => {
  return Number((-14 + idx * (28 / 23)).toFixed(2))
})

// 12 flowing silk wave strands matching the blue & gold wave ribbons in 00:02-00:03 of the reference video
const WAVE_RIBBON_PATHS = [
  {
    d: 'M -40 165 C 120 95, 290 215, 460 135 C 610 65, 720 155, 840 110',
    stroke: 'url(#tgWaveGold)',
    width: 2.4,
    opacity: 0.94,
  },
  {
    d: 'M -40 178 C 135 108, 305 225, 475 145 C 625 75, 730 165, 840 122',
    stroke: 'url(#tgWaveGold)',
    width: 1.6,
    opacity: 0.74,
  },
  {
    d: 'M -40 192 C 150 122, 320 235, 490 155 C 640 85, 740 175, 840 134',
    stroke: 'url(#tgWaveBlue)',
    width: 2.8,
    opacity: 0.9,
  },
  {
    d: 'M -40 205 C 165 135, 335 245, 505 165 C 655 95, 750 185, 840 146',
    stroke: 'url(#tgWaveBlue)',
    width: 1.9,
    opacity: 0.78,
  },
  {
    d: 'M -40 218 C 180 148, 350 255, 520 175 C 670 105, 760 195, 840 158',
    stroke: 'url(#tgWaveBlue)',
    width: 1.4,
    opacity: 0.64,
  },
  {
    d: 'M -40 230 C 195 160, 365 262, 535 185 C 685 115, 770 205, 840 170',
    stroke: 'url(#tgWaveCyan)',
    width: 1.6,
    opacity: 0.7,
  },
  {
    d: 'M -40 152 C 110 188, 280 88, 450 168 C 600 228, 715 118, 840 152',
    stroke: 'url(#tgWaveBlue)',
    width: 2.1,
    opacity: 0.82,
  },
  {
    d: 'M -40 164 C 125 198, 295 98, 465 178 C 615 238, 725 128, 840 164',
    stroke: 'url(#tgWaveCyan)',
    width: 1.5,
    opacity: 0.66,
  },
  {
    d: 'M -40 176 C 140 208, 310 108, 480 188 C 630 248, 735 138, 840 176',
    stroke: 'url(#tgWaveGold)',
    width: 1.9,
    opacity: 0.84,
  },
  {
    d: 'M -40 188 C 155 218, 325 118, 495 198 C 645 255, 745 148, 840 188',
    stroke: 'url(#tgWaveGold)',
    width: 1.3,
    opacity: 0.6,
  },
]

/**
 * Coded 3D Trust Gold Medallion, Shield & Wave Stage.
 *
 * Recreates the exact visual story from the reference animation directly in code:
 * 1. Act I (0.0s – 1.25s): Full-screen warm champagne studio stage where the 3D extruded
 *    24K gold medallion starts edge-on (`rotateY(86deg)`) with real 28px cylinder depth and
 *    3D-extruded shield/typography, rotating smoothly to `rotateY(0deg)` to reveal the
 *    Trust Gold Services emblem and deep royal-blue & gold wave crest.
 * 2. Act II (1.25s – 2.25s): The 3D Gold Medallion smoothly glides and docks directly into
 *    the right-hand Hero Showcase Stage while the studio curtain dissolves and the wide
 *    royal-blue & 24K-gold silk wave ribbons unfurl across the Hero stage.
 * 3. Act III (Live Interactive Hero Centerpiece): Remains permanently in the Hero section with
 *    interactive 3D pointer tilt, click-to-spin 360° physics, and a "Replay Intro" trigger.
 */
export function TrustGold3DStage({
  captionTitle,
  captionSub,
  purityBadge,
  choiceBadge,
}: TrustGold3DStageProps) {
  const uid = useId().replace(/:/g, '')
  const stageCardRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const rigRef = useRef<HTMLDivElement | null>(null)
  const rotorRef = useRef<HTMLDivElement | null>(null)
  const shadowRef = useRef<HTMLDivElement | null>(null)
  const studioCurtainRef = useRef<HTMLDivElement | null>(null)
  const ribbonsRef = useRef<SVGSVGElement | null>(null)
  const glintRef = useRef<SVGRectElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const [isIntroActive, setIsIntroActive] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)

  // Fast-forward/skip the opening dock transition immediately if clicked
  const skipToDockedHero = useCallback(() => {
    const tl = tlRef.current
    if (tl && tl.isActive()) {
      tl.progress(1)
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('intro')
    }
    setIsIntroActive(false)
  }, [])

  // Run the full 3D Studio Spin -> Hero Dock choreography
  const playOpeningToHeroChoreography = useCallback((forceFullIntro = false) => {
    if (typeof window === 'undefined') return

    ensureGsapRegistered()

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const hasNoIntroParam = /[?&]nointro/.test(window.location.search)

    const anchor = anchorRef.current
    const rig = rigRef.current
    const rotor = rotorRef.current
    const shadow = shadowRef.current
    const curtain = studioCurtainRef.current
    const ribbons = ribbonsRef.current
    const glint = glintRef.current

    if (!anchor || !rig || !rotor || !curtain) {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('intro')
      }
      return
    }

    if (tlRef.current) {
      tlRef.current.kill()
    }

    // If reduced motion, ?nointro, or user reloaded while scrolled far down the page (and not forced),
    // skip the full-screen curtain so we never cover a scrolled viewport unexpectedly.
    const isScrolledDown = !forceFullIntro && window.scrollY > 220

    if (prefersReducedMotion || hasNoIntroParam || isScrolledDown) {
      document.documentElement.classList.remove('intro')
      gsap.set([rig, rotor], { clearProps: 'all' })
      gsap.set(curtain, { autoAlpha: 0, pointerEvents: 'none' })
      if (ribbons) gsap.set(ribbons, { autoAlpha: 1, scaleX: 1 })
      setIsIntroActive(false)
      return
    }

    // Measure where the Hero anchor sits relative to the viewport center for FLIP docking
    gsap.set(rig, { clearProps: 'x,y,scale,zIndex' })
    const rect = anchor.getBoundingClientRect()
    const anchorCenterX = rect.left + rect.width / 2
    const anchorCenterY = rect.top + rect.height / 2
    const viewportCenterX = window.innerWidth / 2
    const viewportCenterY = window.innerHeight * 0.46

    const deltaX = viewportCenterX - anchorCenterX
    const deltaY = viewportCenterY - anchorCenterY
    const startScale = window.innerWidth < 640 ? 1.08 : 1.26

    setIsIntroActive(true)
    document.documentElement.classList.remove('intro')

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setIsIntroActive(false)
        gsap.set(rig, { clearProps: 'x,y,scale,zIndex' })
        gsap.set(curtain, { autoAlpha: 0, pointerEvents: 'none' })
      },
    })
    tlRef.current = tl

    // Initial state at Frame 00:00: Medallion centered in studio viewport, rotated edge-on (86deg)
    gsap.set(curtain, { autoAlpha: 1, pointerEvents: 'auto' })
    gsap.set(rig, {
      x: deltaX,
      y: deltaY,
      scale: startScale,
      zIndex: 135,
    })
    gsap.set(rotor, {
      rotationY: 86,
      rotationX: 6,
      rotationZ: -2,
      transformPerspective: 1200,
    })
    if (shadow) {
      gsap.set(shadow, { scaleX: 0.36, autoAlpha: 0.65 })
    }
    if (ribbons) {
      gsap.set(ribbons, { autoAlpha: 0, scaleX: 0.72, transformOrigin: '50% 50%' })
    }
    if (glint) {
      gsap.set(glint, { attr: { x: -260 } })
    }

    // ACT I (0.0s -> 1.18s): 3D Extruded Gold Ring rotates from edge-on (86deg) to front-facing (0deg)
    tl.to(
      rotor,
      {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        duration: 1.18,
        ease: 'back.out(1.32)',
      },
      0.04
    )

    if (shadow) {
      tl.to(
        shadow,
        {
          scaleX: 1,
          autoAlpha: 0.88,
          duration: 1.12,
          ease: 'power3.out',
        },
        0.04
      )
    }

    if (glint) {
      tl.to(
        glint,
        {
          attr: { x: 420 },
          duration: 0.85,
          ease: 'power2.inOut',
        },
        0.45
      )
    }

    // ACT II (1.26s -> 2.2s): Medallion glides & docks into the Hero Stage while studio curtain reveals the page
    tl.addLabel('dockToHero', 1.26)

    tl.to(
      rig,
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.94,
        ease: 'expo.inOut',
      },
      'dockToHero'
    )

    tl.to(
      curtain,
      {
        autoAlpha: 0,
        pointerEvents: 'none',
        duration: 0.7,
        ease: 'power2.inOut',
      },
      'dockToHero+=0.14'
    )

    if (ribbons) {
      tl.to(
        ribbons,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.84,
          ease: 'power3.out',
        },
        'dockToHero+=0.2'
      )
    }
  }, [])

  // Interactive 360° 3D spin right inside the Hero stage when user clicks the medallion
  const handleSpinMedallion = useCallback(() => {
    if (isIntroActive) {
      skipToDockedHero()
      return
    }
    const rotor = rotorRef.current
    const glint = glintRef.current
    if (!rotor || isSpinning) return

    ensureGsapRegistered()
    setIsSpinning(true)

    const spinTl = gsap.timeline({
      onComplete: () => setIsSpinning(false),
    })

    if (glint) {
      gsap.set(glint, { attr: { x: -260 } })
    }

    spinTl.to(rotor, {
      rotationY: '+=360',
      duration: 1.15,
      ease: 'power3.inOut',
    })

    if (glint) {
      spinTl.to(
        glint,
        {
          attr: { x: 420 },
          duration: 0.78,
          ease: 'power2.inOut',
        },
        0.25
      )
    }
  }, [isIntroActive, isSpinning, skipToDockedHero])

  useEffect(() => {
    playOpeningToHeroChoreography(false)

    window.triggerTrustGoldIntro = () => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      window.requestAnimationFrame(() => {
        playOpeningToHeroChoreography(true)
      })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isIntroActive) {
        skipToDockedHero()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (tlRef.current) {
        tlRef.current.kill()
      }
      delete window.triggerTrustGoldIntro
    }
  }, [playOpeningToHeroChoreography])

  // Interactive 3D pointer tilt on hover-capable desktop devices
  useEffect(() => {
    const card = stageCardRef.current
    const rotor = rotorRef.current
    if (!card || !rotor || typeof window === 'undefined') return

    const canHover = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    ).matches
    if (!canHover) return

    ensureGsapRegistered()
    const xTo = gsap.quickTo(rotor, 'rotationY', {
      duration: 0.42,
      ease: 'power3.out',
    })
    const yTo = gsap.quickTo(rotor, 'rotationX', {
      duration: 0.42,
      ease: 'power3.out',
    })

    const onPointerMove = (e: PointerEvent) => {
      if (tlRef.current?.isActive() || isSpinning) return
      const rect = card.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      xTo(nx * 24)
      yTo(-ny * 16)
    }

    const onPointerLeave = () => {
      if (tlRef.current?.isActive() || isSpinning) return
      xTo(0)
      yTo(0)
    }

    card.addEventListener('pointermove', onPointerMove)
    card.addEventListener('pointerleave', onPointerLeave)
    return () => {
      card.removeEventListener('pointermove', onPointerMove)
      card.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [isSpinning])

  return (
    <div
      ref={stageCardRef}
      className="tg-3d-hero-card spotlight-card"
      data-intro-active={isIntroActive ? 'true' : 'false'}
    >
      {/* Full-Viewport Warm Champagne Studio Curtain during the 2.1s Opening Spin-and-Dock */}
      <div
        ref={studioCurtainRef}
        className="tg-studio-curtain"
        aria-hidden="true"
        onClick={skipToDockedHero}
      >
        <div className="tg-studio-cyclorama-arcs" />
        <div className="tg-studio-floor-horizon" />
        {isIntroActive && (
          <button
            type="button"
            className="tg-intro-skip"
            onClick={(e) => {
              e.stopPropagation()
              skipToDockedHero()
            }}
            aria-label="Skip opening animation"
          >
            <span>Skip Intro</span>
            <span className="tg-intro-skip-arrow" aria-hidden="true">
              →
            </span>
          </button>
        )}
      </div>

      {/* Top Controls Bar Inside the Hero 3D Stage */}
      <div className="tg-3d-stage-topbar">
        <span className="tg-3d-stage-pill">
          <span className="tg-3d-stage-dot" aria-hidden="true" />
          {purityBadge}
        </span>

        <div className="tg-3d-stage-actions">
          <button
            type="button"
            className="tg-3d-action-btn"
            onClick={handleSpinMedallion}
            title="Spin the 3D Gold Medallion"
          >
            ↻ Spin 3D
          </button>
          <button
            type="button"
            className="tg-3d-action-btn"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
              window.requestAnimationFrame(() => {
                playOpeningToHeroChoreography(true)
              })
            }}
            title="Replay full-screen 3D opening transition"
          >
            ▶ Replay Intro
          </button>
        </div>
      </div>

      {/* Main Studio Stage with Architectural Light Arcs, Flowing Wave Ribbons & 3D Extruded Medallion */}
      <div className="tg-3d-stage-viewport">
        {/* Background Flowing Royal-Blue & 24K-Gold Silk Wave Ribbons (Frame 00:02-00:03) */}
        <svg
          ref={ribbonsRef}
          className="tg-3d-wave-ribbons"
          viewBox="0 0 800 320"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tgWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8922a" stopOpacity="0.08" />
              <stop offset="28%" stopColor="#e6b95c" stopOpacity="0.88" />
              <stop offset="55%" stopColor="#b57e18" stopOpacity="0.95" />
              <stop offset="82%" stopColor="#e6b95c" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c8922a" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="tgWaveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#072146" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#0d3b78" stopOpacity="0.82" />
              <stop offset="52%" stopColor="#1b5fa8" stopOpacity="0.92" />
              <stop offset="78%" stopColor="#0a2e5c" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#072146" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="tgWaveCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e6bb8" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#388fe0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#1e6bb8" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {WAVE_RIBBON_PATHS.map((wave, idx) => (
            <path
              key={idx}
              d={wave.d}
              stroke={wave.stroke}
              strokeWidth={wave.width}
              strokeOpacity={wave.opacity}
              strokeLinecap="round"
              className="tg-wave-filament"
              style={{ animationDelay: `${idx * -0.45}s` }}
            />
          ))}
        </svg>

        {/* Anchor Box in the Hero Stage where the 3D Medallion Docks */}
        <div ref={anchorRef} className="tg-3d-medallion-anchor">
          <div
            ref={rigRef}
            className="tg-3d-medallion-rig"
            onClick={handleSpinMedallion}
            role="button"
            tabIndex={0}
            aria-label="Trust Gold Services 3D Gold Medallion — click to spin in 3D"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSpinMedallion()
              }
            }}
          >
            {/* 3D Preserve-3D Rotor */}
            <div ref={rotorRef} className="tg-3d-medallion-rotor">
              {/* 24 Stacked Solid Metallic Gold Discs -> Forms an unbroken 28px-thick 3D gold cylinder rim when viewed edge-on */}
              {EXTRUSION_SLICES.map((z, idx) => (
                <div
                  key={idx}
                  className="tg-3d-rim-slice"
                  style={{
                    transform: `translateZ(${z}px)`,
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Back Bullion Hallmark Face (visible during 360° spin) */}
              <div className="tg-3d-medallion-back" aria-hidden="true">
                <div className="tg-3d-back-inner">
                  <span className="tg-3d-back-karat">916 • 22K / 24K</span>
                  <strong className="tg-3d-back-title">TRUST GOLD</strong>
                  <span className="tg-3d-back-sub">VIJAYAWADA • AP</span>
                </div>
              </div>

              {/* Front Medallion Face (translateZ(15px) — Frame 00:01 & 00:02 Emblem) */}
              <div className="tg-3d-medallion-front">
                {/* Base Medallion Disc + Bezel + Clipped Bottom Royal-Blue & Gold Wave Crest */}
                <svg
                  viewBox="0 0 360 360"
                  className="tg-3d-emblem-svg"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient
                      id={`discBg-${uid}`}
                      cx="50%"
                      cy="38%"
                      r="65%"
                    >
                      <stop offset="0%" stopColor="#fdfbf6" />
                      <stop offset="62%" stopColor="#eee9dd" />
                      <stop offset="100%" stopColor="#dcd5c6" />
                    </radialGradient>

                    <linearGradient
                      id={`goldBezel-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fff4c2" />
                      <stop offset="22%" stopColor="#e5b856" />
                      <stop offset="48%" stopColor="#b07915" />
                      <stop offset="74%" stopColor="#f4d279" />
                      <stop offset="100%" stopColor="#7a4f06" />
                    </linearGradient>

                    <linearGradient
                      id={`waveDeep-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#031126" />
                      <stop offset="50%" stopColor="#0a2f60" />
                      <stop offset="100%" stopColor="#051a38" />
                    </linearGradient>
                    <linearGradient
                      id={`waveMid-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#0b356b" />
                      <stop offset="52%" stopColor="#1c64b0" />
                      <stop offset="100%" stopColor="#092954" />
                    </linearGradient>

                    <clipPath id={`innerCircleClip-${uid}`}>
                      <circle cx="180" cy="180" r="158" />
                    </clipPath>
                  </defs>

                  <g clipPath={`url(#innerCircleClip-${uid})`}>
                    <circle
                      cx="180"
                      cy="180"
                      r="160"
                      fill={`url(#discBg-${uid})`}
                    />

                    {/* Deep Royal Blue & Sapphire Wave Crest in Lower Arc (Frame 00:01) */}
                    <path
                      d="M 10 278 C 85 246, 155 292, 235 270 C 288 255, 328 242, 355 256 L 355 355 L 10 355 Z"
                      fill={`url(#waveDeep-${uid})`}
                    />
                    <path
                      d="M 10 292 C 95 266, 175 312, 255 282 C 302 264, 332 258, 355 268 L 355 355 L 10 355 Z"
                      fill={`url(#waveMid-${uid})`}
                      opacity="0.88"
                    />
                    <path
                      d="M 14 276 C 88 244, 158 290, 236 268 C 288 253, 326 240, 352 254"
                      stroke={`url(#goldBezel-${uid})`}
                      strokeWidth="2.8"
                      fill="none"
                    />
                    <path
                      d="M 18 286 C 96 258, 168 302, 246 276 C 296 260, 328 250, 350 262"
                      stroke="#63b3ff"
                      strokeWidth="1.3"
                      strokeOpacity="0.68"
                      fill="none"
                    />
                    <path
                      d="M 22 296 C 102 270, 176 314, 254 286 C 302 270, 330 262, 348 272"
                      stroke={`url(#goldBezel-${uid})`}
                      strokeWidth="1.5"
                      strokeOpacity="0.82"
                      fill="none"
                    />
                  </g>

                  {/* Outer 3D Beveled 24K Gold Ring */}
                  <circle
                    cx="180"
                    cy="180"
                    r="166"
                    fill="none"
                    stroke={`url(#goldBezel-${uid})`}
                    strokeWidth="14"
                  />
                  <circle
                    cx="180"
                    cy="180"
                    r="158"
                    fill="none"
                    stroke="#fff6cc"
                    strokeWidth="1.6"
                    strokeOpacity="0.88"
                  />
                  <circle
                    cx="180"
                    cy="180"
                    r="172"
                    fill="none"
                    stroke="#7a4f06"
                    strokeWidth="1.6"
                    strokeOpacity="0.68"
                  />
                </svg>

                {/* Elevated 3D Faceted Gold Shield Layer (translateZ(18px) for true 3D relief during spin) */}
                <svg
                  viewBox="0 0 360 360"
                  className="tg-3d-shield-layer"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id={`shieldBevel-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fff4c2" />
                      <stop offset="30%" stopColor="#e5b856" />
                      <stop offset="70%" stopColor="#9c680e" />
                      <stop offset="100%" stopColor="#6e4604" />
                    </linearGradient>
                    <linearGradient
                      id={`shieldLeft-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fff8d6" />
                      <stop offset="45%" stopColor="#e8bc59" />
                      <stop offset="100%" stopColor="#b67f1a" />
                    </linearGradient>
                    <linearGradient
                      id={`shieldRight-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ddb04c" />
                      <stop offset="55%" stopColor="#b37b16" />
                      <stop offset="100%" stopColor="#7e5307" />
                    </linearGradient>
                    <linearGradient
                      id={`glintGrad-${uid}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                      <stop
                        offset="50%"
                        stopColor="#fffbe6"
                        stopOpacity="0.78"
                      />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id={`shieldClip-${uid}`}>
                      <path d="M180 50 L242 71 V134 C242 179 213 211 180 226 C147 211 118 179 118 134 V71 Z" />
                    </clipPath>
                    <filter
                      id={`shieldShadow-${uid}`}
                      x="-20%"
                      y="-15%"
                      width="140%"
                      height="140%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="7"
                        floodColor="#3b2806"
                        floodOpacity="0.32"
                      />
                    </filter>
                  </defs>

                  <g filter={`url(#shieldShadow-${uid})`}>
                    <path
                      d="M180 50 L242 71 V134 C242 179 213 211 180 226 C147 211 118 179 118 134 V71 Z"
                      fill={`url(#shieldBevel-${uid})`}
                    />
                    <path
                      d="M180 56 L180 218 C151 204 125 175 125 134 V76 Z"
                      fill={`url(#shieldLeft-${uid})`}
                    />
                    <path
                      d="M180 56 L235 76 V134 C235 175 209 204 180 218 Z"
                      fill={`url(#shieldRight-${uid})`}
                    />
                    <path
                      d="M180 65 L226 82 V133 C226 168 204 193 180 206 C156 193 134 168 134 133 V82 Z"
                      fill="none"
                      stroke="#fff7d6"
                      strokeWidth="1.9"
                      strokeOpacity="0.85"
                    />
                    <path
                      d="M154 136 L173 155 L211 111"
                      fill="none"
                      stroke="#784e07"
                      strokeWidth="13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(0, 3)"
                      opacity="0.45"
                    />
                    <path
                      d="M154 136 L173 155 L211 111"
                      fill="none"
                      stroke="#fff8dc"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <g clipPath={`url(#shieldClip-${uid})`}>
                    <rect
                      ref={glintRef}
                      x="-260"
                      y="30"
                      width="95"
                      height="220"
                      fill={`url(#glintGrad-${uid})`}
                      transform="skewX(-24)"
                    />
                  </g>
                </svg>

                {/* 3D Pop-Out Typography Lockup (translateZ(14px) for true 3D parallax during rotation) */}
                <div className="tg-3d-brand-lockup">
                  <div className="tg-3d-brand-main">
                    <span className="tg-3d-word-trust">TRUST</span>{' '}
                    <span className="tg-3d-word-gold">GOLD</span>
                  </div>
                  <div className="tg-3d-brand-sub">
                    <span className="tg-3d-sub-line" />
                    <span className="tg-3d-sub-text">SERVICES</span>
                    <span className="tg-3d-sub-line" />
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Floor Contact Shadow Underneath the 3D Medallion */}
            <div ref={shadowRef} className="tg-3d-floor-shadow" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Authentic Shop & Open-Counter Verification Strip at the Base of the Hero Stage */}
      <div className="tg-3d-verification-bar">
        <div className="tg-3d-verif-thumb">
          <Image
            src="/images/hero.png"
            alt="Calibrated digital weighing scale and basanite touchstone at Trust Gold Services Vijayawada"
            width={64}
            height={48}
            className="tg-3d-verif-img"
          />
        </div>
        <div className="tg-3d-verif-copy">
          <div className="tg-3d-verif-badges">
            <span className="tg-3d-verif-tag">{choiceBadge}</span>
          </div>
          <strong>{captionTitle}</strong>
          <p>{captionSub}</p>
        </div>
      </div>
    </div>
  )
}
