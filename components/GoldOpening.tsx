'use client'

import { useCallback, useEffect, useRef } from 'react'
import { ensureGsapRegistered, gsap, ScrollTrigger } from '@/animations/gsap'

export const INTRO_SESSION_KEY = 'trustgold_intro_seen'
export const INTRO_VIDEO_SRC = '/videos/trust-gold-opening.mp4'

declare global {
  interface Window {
    triggerTrustGoldIntro?: () => void
  }
}

/**
 * Full-screen Opening Video Experience for Trust Gold Services.
 *
 * - Plays the exact pre-rendered opening animation (`/videos/trust-gold-opening.mp4`, 1280x720, 4.01s)
 *   on initial homepage visit once per browser session (`sessionStorage`).
 * - Preserves the video's native 16:9 aspect ratio (`object-fit: contain`) over a studio-matched
 *   warm ivory backdrop (`#ded9ce`) so the emblem is never cropped or stretched and no white/black
 *   flashes occur before frame 1 paints.
 * - Provides an accessible "Skip Intro" button (click, tap, Enter/Space, or Escape key).
 * - Smoothly transitions into the homepage with GSAP when `onEnded` fires and restores normal
 *   Lenis + native scrolling immediately without leaving any invisible click-blocking overlay.
 * - Immediately reveals the homepage if autoplay is blocked, the video fails to load, or
 *   `prefers-reduced-motion: reduce` is active.
 */
export function GoldOpening() {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const dismissingRef = useRef(false)
  const fallbackTimerRef = useRef<number | null>(null)

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
  }, [])

  const finalizeCleanup = useCallback(() => {
    clearFallbackTimer()
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('intro')
    }
    const overlay = overlayRef.current
    if (overlay) {
      delete overlay.dataset.fading
      gsap.set(overlay, { clearProps: 'all' })
    }
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }
  }, [clearFallbackTimer])

  const dismissIntro = useCallback(
    (immediate = false) => {
      if (dismissingRef.current) return
      dismissingRef.current = true
      clearFallbackTimer()

      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, '1')
      } catch {
        // Ignore storage errors in private/restricted contexts
      }

      const video = videoRef.current
      if (video && !video.paused) {
        try {
          video.pause()
        } catch {
          // Ignore pause errors
        }
      }

      const overlay = overlayRef.current
      if (!overlay || immediate) {
        finalizeCleanup()
        return
      }

      ensureGsapRegistered()
      overlay.dataset.fading = 'true'
      overlay.style.pointerEvents = 'none'

      // Unlock scrolling and hero entrance immediately while the overlay dissolves
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('intro')
      }

      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.52,
        ease: 'power2.inOut',
        overwrite: true,
        onComplete: () => {
          finalizeCleanup()
        },
      })
    },
    [clearFallbackTimer, finalizeCleanup]
  )

  const startIntroPlayback = useCallback(
    (forceReplay = false) => {
      if (typeof window === 'undefined') return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const hasNoIntroParam = /[?&]nointro/.test(window.location.search)

      if (prefersReducedMotion || hasNoIntroParam) {
        dismissIntro(true)
        return
      }

      if (!forceReplay) {
        const isHomepage = window.location.pathname === '/'
        // Note: introBootScript in app/layout.tsx adds `html.intro` before first paint
        // when sessionStorage didn't have `trustgold_intro_seen`.
        const bootedWithIntro =
          document.documentElement.classList.contains('intro')
        let alreadySeen = false
        try {
          alreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === '1'
        } catch {
          alreadySeen = false
        }

        if (!isHomepage || (alreadySeen && !bootedWithIntro)) {
          try {
            sessionStorage.setItem(INTRO_SESSION_KEY, '1')
          } catch {
            // Ignore
          }
          dismissIntro(true)
          return
        }
      }

      // Mark session seen immediately once playback begins so internal route changes
      // or re-renders never replay the opening video.
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, '1')
      } catch {
        // Ignore
      }

      dismissingRef.current = false
      document.documentElement.classList.add('intro')

      const overlay = overlayRef.current
      if (overlay) {
        delete overlay.dataset.fading
        gsap.killTweensOf(overlay)
        gsap.set(overlay, { autoAlpha: 1, clearProps: 'pointerEvents' })
      }

      clearFallbackTimer()
      // Safety watchdog: video is 4.011s; ensure overlay never hangs past 5.4s
      fallbackTimerRef.current = window.setTimeout(() => {
        dismissIntro(false)
      }, 5400)

      const video = videoRef.current
      if (!video) {
        dismissIntro(true)
        return
      }

      try {
        video.currentTime = 0
        video.muted = true
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Autoplay blocked by browser policy or Low Power Mode -> reveal homepage immediately
            dismissIntro(true)
          })
        }
      } catch {
        dismissIntro(true)
      }
    },
    [clearFallbackTimer, dismissIntro]
  )

  useEffect(() => {
    startIntroPlayback(false)

    window.triggerTrustGoldIntro = () => {
      startIntroPlayback(true)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        document.documentElement.classList.contains('intro')
      ) {
        e.preventDefault()
        dismissIntro(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      clearFallbackTimer()
      window.removeEventListener('keydown', onKeyDown)
      delete window.triggerTrustGoldIntro
    }
  }, [clearFallbackTimer, dismissIntro, startIntroPlayback])

  return (
    <div
      ref={overlayRef}
      className="tg-intro-overlay"
      role="region"
      aria-label="Trust Gold Services opening animation"
    >
      <div className="tg-intro-video-stage">
        <video
          ref={videoRef}
          className="tg-intro-video"
          src={INTRO_VIDEO_SRC}
          width={1280}
          height={720}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => dismissIntro(false)}
          onError={() => dismissIntro(true)}
        />
      </div>

      <button
        type="button"
        className="tg-intro-skip"
        onClick={() => dismissIntro(false)}
        aria-label="Skip opening animation and go to website"
      >
        <span>Skip Intro</span>
        <span className="tg-intro-skip-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </div>
  )
}
