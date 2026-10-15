'use client'

import {
  ANIMATION_DURATIONS,
  ANIMATION_EASES,
  ANIMATION_STAGGERS,
  ensureGsapRegistered,
  gsap,
} from './gsap'

export type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'fade-scale'

export interface RevealOptions {
  variant?: RevealVariant
  distance?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
  once?: boolean
}

/**
 * A. Fade / Slide / Scale Reveal (§6A)
 * Smoothly reveals an element when entering the viewport via GSAP ScrollTrigger.
 */
export function createFadeReveal(
  element: HTMLElement,
  options: RevealOptions = {}
): gsap.core.Tween {
  ensureGsapRegistered()

  const {
    variant = 'fade-up',
    distance = 34,
    duration = ANIMATION_DURATIONS.reveal,
    delay = 0,
    ease = ANIMATION_EASES.smoothOut,
    start = 'top 89%',
    once = false,
  } = options

  const fromVars: gsap.TweenVars = {
    autoAlpha: 0,
    y: variant === 'fade-up' ? distance : 0,
    x:
      variant === 'fade-left'
        ? -distance
        : variant === 'fade-right'
          ? distance
          : 0,
    scale: variant === 'fade-scale' ? 0.965 : 1,
  }

  return gsap.fromTo(
    element,
    fromVars,
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease,
      overwrite: 'auto',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once
          ? 'play none none none'
          : 'play none none reverse',
      },
    }
  )
}

export interface StaggerRevealOptions {
  distance?: number
  scaleFrom?: number
  duration?: number
  stagger?: number
  ease?: string
  start?: string
  once?: boolean
}

/**
 * Staggered Multi-Card / Bento Reveal (§6A & §9)
 * Reveals direct children (or matching selector) sequentially when the container enters view.
 */
export function createStaggerReveal(
  container: HTMLElement,
  children?: HTMLElement[] | NodeListOf<Element>,
  options: StaggerRevealOptions = {}
): gsap.core.Tween | null {
  ensureGsapRegistered()

  const targets = children
    ? Array.from(children)
    : Array.from(container.children)
  if (!targets.length) return null

  const {
    distance = 38,
    scaleFrom = 0.972,
    duration = ANIMATION_DURATIONS.reveal,
    stagger = ANIMATION_STAGGERS.cards,
    ease = ANIMATION_EASES.smoothOut,
    start = 'top 88%',
    once = false,
  } = options

  return gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      y: distance,
      scale: scaleFrom,
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
      overwrite: 'auto',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: once
          ? 'play none none none'
          : 'play none none reverse',
      },
    }
  )
}

/**
 * Counter Animation (§3)
 * Animates a numeric counter smoothly when entering the viewport.
 */
export function createCounterAnimation(
  element: HTMLElement,
  endValue: number,
  options: {
    prefix?: string
    suffix?: string
    decimals?: number
    duration?: number
  } = {}
): gsap.core.Tween {
  ensureGsapRegistered()
  const {
    prefix = '',
    suffix = '',
    decimals = 0,
    duration = 1.1,
  } = options

  const state = { val: 0 }
  return gsap.to(state, {
    val: endValue,
    duration,
    ease: ANIMATION_EASES.smoothOut,
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    onUpdate: () => {
      const formatted =
        decimals > 0
          ? state.val.toFixed(decimals)
          : Math.round(state.val).toLocaleString('en-IN')
      element.textContent = `${prefix}${formatted}${suffix}`
    },
  })
}
