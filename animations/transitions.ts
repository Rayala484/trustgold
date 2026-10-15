'use client'

import { ANIMATION_EASES, ensureGsapRegistered, gsap } from './gsap'

/**
 * Golden Timeline Beam Draw (§3 & §6)
 * Scrubs or animates the golden connecting line across the 4-Step Process section.
 */
export function createBeamDraw(
  beamEl: HTMLElement,
  triggerEl?: HTMLElement | null
): gsap.core.Tween {
  ensureGsapRegistered()

  return gsap.fromTo(
    beamEl,
    {
      scaleX: 0,
      autoAlpha: 0.25,
      transformOrigin: '0% 50%',
    },
    {
      scaleX: 1,
      autoAlpha: 1,
      duration: 1.15,
      ease: ANIMATION_EASES.expoOut,
      scrollTrigger: {
        trigger: triggerEl ?? beamEl,
        start: 'top 84%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Clip-Path Section / Banner Reveal (§3)
 */
export function createClipTransition(
  element: HTMLElement,
  options: { start?: string; duration?: number } = {}
): gsap.core.Tween {
  ensureGsapRegistered()
  const { start = 'top 88%', duration = 0.95 } = options

  return gsap.fromTo(
    element,
    {
      clipPath: 'inset(6% 3% 6% 3% round 20px)',
      y: 26,
      autoAlpha: 0,
    },
    {
      clipPath: 'inset(0% 0% 0% 0% round 20px)',
      y: 0,
      autoAlpha: 1,
      duration,
      ease: ANIMATION_EASES.smoothOut,
      clearProps: 'clipPath,transform,opacity,visibility',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}
