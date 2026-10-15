'use client'

import Lenis from 'lenis'
import { ensureGsapRegistered, gsap, ScrollTrigger } from './gsap'

export interface LenisController {
  lenis: Lenis
  destroy: () => void
}

/**
 * Initializes Lenis smooth scrolling and synchronizes it with GSAP's ticker
 * and ScrollTrigger (§4).
 *
 * - Smooth, responsive wheel scrolling (duration: 1.0, lerp: 0.11 — never floaty or sluggish)
 * - Preserves natural native touch scrolling on mobile/tablet (syncTouch: false)
 * - Intercepts in-page #anchor links for smooth scrolling without breaking history
 */
export function createLenisSmoothScroll(): LenisController | null {
  if (typeof window === 'undefined') return null

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (prefersReducedMotion) return null

  ensureGsapRegistered()

  const lenis = new Lenis({
    duration: 1.0,
    lerp: 0.11,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    autoRaf: false,
    prevent: () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('intro'),
  })

  // Keep ScrollTrigger in lockstep with Lenis scroll position
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis from GSAP's unified requestAnimationFrame ticker
  const updateLenis = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(updateLenis)
  gsap.ticker.lagSmoothing(0)

  // Smooth anchor-link scrolling (#gold-craft, #categories, #comparison, etc.)
  const onAnchorClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
    const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
      'a[href^="#"]'
    )
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href || href === '#') return

    const targetEl = document.querySelector<HTMLElement>(href)
    if (!targetEl) return

    e.preventDefault()
    lenis.scrollTo(targetEl, {
      offset: -74,
      duration: 1.05,
    })
    if (history.pushState) {
      history.pushState(null, '', href)
    }
  }

  document.addEventListener('click', onAnchorClick)

  return {
    lenis,
    destroy: () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    },
  }
}
