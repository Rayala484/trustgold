'use client'

import {
  ANIMATION_DURATIONS,
  ANIMATION_EASES,
  ensureGsapRegistered,
  gsap,
} from './gsap'

export type ImageRevealDirection = 'center' | 'bottom' | 'left' | 'right'

export interface ImageRevealOptions {
  direction?: ImageRevealDirection
  duration?: number
  start?: string
  once?: boolean
}

/**
 * C. Premium Image Reveal (§6C)
 * Section enters viewport → Container clip-path mask opens → Image reveals
 * while subtly scaling from 1.08 → 1.
 */
export function createImageMaskReveal(
  containerEl: HTMLElement,
  options: ImageRevealOptions = {}
): gsap.core.Timeline {
  ensureGsapRegistered()

  const {
    direction = 'center',
    duration = ANIMATION_DURATIONS.cinematic,
    start = 'top 87%',
    once = false,
  } = options

  const clipStartMap: Record<ImageRevealDirection, string> = {
    center: 'inset(12% 4% 12% 4% round 14px)',
    bottom: 'inset(22% 0% 0% 0% round 14px)',
    left: 'inset(0% 22% 0% 0% round 14px)',
    right: 'inset(0% 0% 0% 22% round 14px)',
  }

  const innerImg = containerEl.querySelector<HTMLElement>('img')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerEl,
      start,
      toggleActions: once
        ? 'play none none none'
        : 'play none none reverse',
    },
  })

  tl.fromTo(
    containerEl,
    {
      clipPath: clipStartMap[direction],
      autoAlpha: 0.25,
    },
    {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      autoAlpha: 1,
      duration,
      ease: ANIMATION_EASES.expoOut,
    },
    0
  )

  if (innerImg) {
    tl.fromTo(
      innerImg,
      {
        scale: 1.08,
      },
      {
        scale: 1,
        duration: duration * 1.15,
        ease: ANIMATION_EASES.smoothOut,
      },
      0
    )
  }

  return tl
}

/**
 * E. Scroll Zoom (§6E)
 * Subtly zooms an image or media wrapper based on scrubbed scroll progress (1 → 1.12).
 */
export function createScrollZoom(
  mediaEl: HTMLElement,
  options: {
    fromScale?: number
    toScale?: number
    scrub?: number | boolean
  } = {}
): gsap.core.Tween {
  ensureGsapRegistered()

  const { fromScale = 1.0, toScale = 1.12, scrub = 0.65 } = options

  return gsap.fromTo(
    mediaEl,
    { scale: fromScale },
    {
      scale: toScale,
      ease: 'none',
      scrollTrigger: {
        trigger: mediaEl.parentElement ?? mediaEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    }
  )
}
