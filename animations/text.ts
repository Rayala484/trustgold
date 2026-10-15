'use client'

import {
  ANIMATION_DURATIONS,
  ANIMATION_EASES,
  ANIMATION_STAGGERS,
  ensureGsapRegistered,
  gsap,
} from './gsap'

/**
 * B. Masked Word / Line Text Reveal (§6B)
 * Reveals words inside a heading (`[data-split-scroll] .w-scroll > i`) through
 * overflow-hidden line masks as the heading enters the viewport.
 */
export function createTextMaskReveal(
  headingEl: HTMLElement,
  options: {
    duration?: number
    stagger?: number
    start?: string
    once?: boolean
  } = {}
): gsap.core.Tween | null {
  ensureGsapRegistered()

  const words = headingEl.querySelectorAll<HTMLElement>('.w-scroll > i')
  if (!words.length) return null

  const {
    duration = 0.74,
    stagger = ANIMATION_STAGGERS.word,
    start = 'top 90%',
    once = false,
  } = options

  return gsap.fromTo(
    words,
    {
      yPercent: 112,
      rotateZ: 1.5,
      autoAlpha: 0,
    },
    {
      yPercent: 0,
      rotateZ: 0,
      autoAlpha: 1,
      duration,
      stagger,
      ease: ANIMATION_EASES.smoothOut,
      overwrite: 'auto',
      scrollTrigger: {
        trigger: headingEl,
        start,
        toggleActions: once
          ? 'play none none none'
          : 'play none none reverse',
      },
    }
  )
}

/**
 * Hero Section Entrance Choreography (§17.1)
 * Orchestrates the Hero showcase stage, floating telemetry cards, and subtle
 * scroll-linked parallax on the Hero visual stage.
 */
export function createHeroScrollChoreography(
  heroEl: HTMLElement,
  isDesktop: boolean
): gsap.core.Timeline | null {
  ensureGsapRegistered()

  const stageFrame = heroEl.querySelector<HTMLElement>('.hero-stage-frame')
  const floatTop = heroEl.querySelector<HTMLElement>('.hero-float-top')
  const floatBottom = heroEl.querySelector<HTMLElement>('.hero-float-bottom')
  const floatBadge = heroEl.querySelector<HTMLElement>('.hero-float-badge')
  const sunburst = heroEl.querySelector<HTMLElement>('.hero-sunburst')

  if (!stageFrame || !isDesktop) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
  })

  tl.to(
    stageFrame,
    {
      y: -26,
      ease: 'none',
    },
    0
  )

  if (floatTop) {
    tl.to(
      floatTop,
      {
        y: -44,
        ease: 'none',
      },
      0
    )
  }

  if (floatBottom) {
    tl.to(
      floatBottom,
      {
        y: -18,
        ease: 'none',
      },
      0
    )
  }

  if (floatBadge) {
    tl.to(
      floatBadge,
      {
        y: -34,
        ease: 'none',
      },
      0
    )
  }

  if (sunburst) {
    tl.to(
      sunburst,
      {
        y: 64,
        scale: 1.06,
        ease: 'none',
      },
      0
    )
  }

  return tl
}
