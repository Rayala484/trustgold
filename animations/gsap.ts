'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

let isRegistered = false

/**
 * Centrally registers GSAP plugins once on the client.
 * Safe to call multiple times; no-ops during SSR.
 */
export function ensureGsapRegistered(): void {
  if (typeof window === 'undefined' || isRegistered) return
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  ScrollTrigger.config({
    ignoreMobileResize: true,
  })
  isRegistered = true
}

ensureGsapRegistered()

/**
 * Scroll Animation Design System Tokens (§8)
 */
export const ANIMATION_DURATIONS = {
  micro: 0.28,
  fast: 0.52,
  reveal: 0.78,
  cinematic: 1.15,
} as const

export const ANIMATION_EASES = {
  smoothOut: 'power3.out',
  snappyOut: 'power2.out',
  dramaticOut: 'power4.out',
  expoOut: 'expo.out',
  scrub: 'none',
} as const

export const ANIMATION_STAGGERS = {
  word: 0.026,
  tight: 0.06,
  cards: 0.095,
  section: 0.12,
} as const

export const ANIMATION_MEDIA_QUERIES = {
  isDesktop: '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
  isTablet:
    '(min-width: 641px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)',
  isMobile: '(max-width: 640px) and (prefers-reduced-motion: no-preference)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const

export { gsap, ScrollTrigger, useGSAP }
