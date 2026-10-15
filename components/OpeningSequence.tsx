'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { ensureGsapRegistered, gsap } from '@/animations/gsap'

declare global {
  interface Window {
    triggerTrustGoldIntro?: () => void
  }
}

// Full opening, strictly 1.5s: gold -> evaluation -> ring -> logo -> sweep -> homepage.
const RING_CIRCUMFERENCE = 2 * Math.PI * 100
const TICKS = Array.from({ length: 9 }, (_, i) => 160 + i * 20)

// Plays once per full page load; client-side returns to "/" go straight to the page.
let playedThisLoad = false

const hideHtmlIntroClass = () =>
  document.documentElement.classList.remove('intro')

export function OpeningSequence() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const finish = useCallback(() => {
    const tl = tlRef.current
    if (tl) tl.progress(1)
    const root = rootRef.current
    if (root) gsap.set(root, { autoAlpha: 0, display: 'none' })
    playedThisLoad = true
    hideHtmlIntroClass()
  }, [])

  const play = useCallback(
    (force: boolean) => {
      const root = rootRef.current
      if (!root) {
        hideHtmlIntroClass()
        return
      }

      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const skipParam = /[?&]nointro/.test(window.location.search)
      const restored = !force && window.scrollY > 220

      if (!force && (reduced || skipParam || restored || playedThisLoad)) {
        gsap.set(root, { autoAlpha: 0, display: 'none' })
        hideHtmlIntroClass()
        return
      }
      ensureGsapRegistered()
      tlRef.current?.kill()

      const q = <T extends Element>(sel: string) =>
        root.querySelector<T>(sel) as T
      const ingot = q('.tg-open-ingot')
      const beam = q('.tg-open-beam')
      const ticks = root.querySelectorAll('.tg-open-tick')
      const sheen = q('.tg-open-sheen')
      const ring = q('.tg-open-ring')
      const logo = q('.tg-open-logo')
      const sweep = q('.tg-open-sweep')

      document.documentElement.classList.add('intro')
      root.style.animation = 'none' // cancel the CSS failsafe while we drive it
      gsap.set(root, { display: 'grid', autoAlpha: 1 })
      gsap.set(ingot, { autoAlpha: 0, y: 8, scale: 0.97, transformOrigin: '50% 100%' })
      gsap.set(beam, { scaleX: 0, autoAlpha: 1, transformOrigin: '50% 50%' })
      gsap.set(ticks, { autoAlpha: 0 })
      gsap.set(sheen, { x: -170 })
      gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE, autoAlpha: 0 })
      gsap.set(logo, { autoAlpha: 0, scale: 0.94 })
      gsap.set(sweep, { xPercent: -140 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          playedThisLoad = true
          gsap.set(root, { display: 'none' })
          hideHtmlIntroClass()
        },
      })
      tlRef.current = tl

      // 0.00–0.25  Gold appears
      tl.to(ingot, { autoAlpha: 1, y: 0, scale: 1, duration: 0.25 }, 0)

      // 0.25–0.55  Evaluation cue: precision scale draws in, gold settles onto it and catches a highlight
      tl.to(beam, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, 0.25)
      tl.to(
        ticks,
        { autoAlpha: 1, duration: 0.16, stagger: { each: 0.018, from: 'center' } },
        0.3
      )
      tl.to(ingot, { y: 14, duration: 0.28, ease: 'power2.inOut' }, 0.26)
      tl.to(sheen, { x: 260, duration: 0.3, ease: 'power2.inOut' }, 0.27)

      // 0.55–0.85  Transformation: the bar folds away while a precise ring draws itself
      tl.set(ring, { autoAlpha: 1 }, 0.55)
      tl.to(
        ring,
        { strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' },
        0.55
      )
      tl.to(
        ingot,
        { scale: 0.42, y: -8, autoAlpha: 0, duration: 0.26, ease: 'power2.in' },
        0.55
      )
      tl.to(beam, { autoAlpha: 0, scaleX: 0.55, duration: 0.2 }, 0.55)
      tl.to(ticks, { autoAlpha: 0, duration: 0.15 }, 0.55)

      // 0.85–1.15  Logo reveal (the supplied logo file, untouched)
      tl.to(
        logo,
        { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out' },
        0.85
      )
      tl.to(ring, { autoAlpha: 0, duration: 0.15, ease: 'none' }, 1.0)

      // 1.15–1.50  Light sweep, then straight into the homepage
      tl.to(sweep, { xPercent: 140, duration: 0.3, ease: 'power2.inOut' }, 1.1)
      tl.to(root, { autoAlpha: 0, duration: 0.3, ease: 'power1.inOut' }, 1.2)
    },
    []
  )

  useEffect(() => {
    play(false)

    window.triggerTrustGoldIntro = () => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      window.requestAnimationFrame(() => play(true))
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tlRef.current?.isActive()) finish()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      tlRef.current?.kill()
      delete window.triggerTrustGoldIntro
    }
  }, [play, finish])

  return (
    <div
      ref={rootRef}
      className="tg-open"
      role="dialog"
      aria-label="Trust Gold Services opening animation"
      onClick={finish}
    >
      <div className="tg-open-stage">
        <svg
          className="tg-open-svg"
          viewBox="0 0 480 300"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tgoTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff3c9" />
              <stop offset="0.5" stopColor="#ecc86f" />
              <stop offset="1" stopColor="#c9972f" />
            </linearGradient>
            <linearGradient id="tgoFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e2b550" />
              <stop offset="0.38" stopColor="#f3d583" />
              <stop offset="0.62" stopColor="#c8962c" />
              <stop offset="1" stopColor="#8f600e" />
            </linearGradient>
            <linearGradient id="tgoRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff0b8" />
              <stop offset="0.35" stopColor="#e8bd55" />
              <stop offset="0.7" stopColor="#b98219" />
              <stop offset="1" stopColor="#f4d27a" />
            </linearGradient>
            <linearGradient id="tgoBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#e6b95c" stopOpacity="0" />
              <stop offset="0.5" stopColor="#f4d27a" stopOpacity="0.95" />
              <stop offset="1" stopColor="#e6b95c" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tgoSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fffbe8" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="tgoIngotClip">
              <path d="M196 132 H284 L300 150 H180 Z M180 150 H300 L292 176 H188 Z" />
            </clipPath>
          </defs>

          {/* Precision scale cue */}
          <g className="tg-open-scale">
            <line
              className="tg-open-beam"
              x1="140"
              y1="190"
              x2="340"
              y2="190"
              stroke="url(#tgoBeam)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {TICKS.map((x) => (
              <line
                key={x}
                className="tg-open-tick"
                x1={x}
                y1="196"
                x2={x}
                y2={x === 240 ? 205 : 200}
                stroke="#e6b95c"
                strokeOpacity="0.75"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Polished gold bar */}
          <g className="tg-open-ingot">
            <path d="M196 132 H284 L300 150 H180 Z" fill="url(#tgoTop)" />
            <path d="M180 150 H300 L292 176 H188 Z" fill="url(#tgoFront)" />
            <path
              d="M196 132 H284 L300 150 L292 176 H188 L180 150 Z"
              stroke="#fff4cf"
              strokeOpacity="0.55"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <g clipPath="url(#tgoIngotClip)">
              <rect
                className="tg-open-sheen"
                x="0"
                y="120"
                width="46"
                height="66"
                fill="url(#tgoSheen)"
                transform="skewX(-20)"
              />
            </g>
          </g>

          {/* Precise ring that hands over to the logo's own rim */}
          <circle
            className="tg-open-ring"
            cx="240"
            cy="150"
            r="100"
            stroke="url(#tgoRing)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE}
            transform="rotate(-90 240 150)"
          />
        </svg>

        <div className="tg-open-logo">
          <Image
            src="/logo.png"
            alt="Trust Gold Services"
            width={600}
            height={600}
            sizes="(max-width: 640px) 220px, 300px"
            priority
            className="tg-open-logo-img"
          />
          <span className="tg-open-sweep" aria-hidden="true" />
        </div>
      </div>

      <button
        type="button"
        className="tg-open-skip"
        aria-label="Skip opening animation"
        onClick={(e) => {
          e.stopPropagation()
          finish()
        }}
      >
        Skip
      </button>
    </div>
  )
}
