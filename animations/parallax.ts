'use client'

import { ensureGsapRegistered, gsap } from './gsap'

export interface ParallaxOptions {
  yPercent?: number
  yPx?: number
  scale?: number
  scrub?: number | boolean
  trigger?: HTMLElement | null
}

/**
 * D. Scrubbed ScrollTrigger Parallax (§6D)
 * Smoothly shifts image wrappers, background layers, or decorative elements
 * relative to scroll progress while keeping movement restrained.
 */
export function createParallax(
  element: HTMLElement,
  options: ParallaxOptions = {}
): gsap.core.Tween {
  ensureGsapRegistered()

  const {
    yPercent,
    yPx = 22,
    scale = 1.08,
    scrub = 0.55,
    trigger,
  } = options

  const triggerEl = trigger ?? element.parentElement ?? element

  if (typeof yPercent === 'number') {
    return gsap.fromTo(
      element,
      { yPercent: -yPercent, scale },
      {
        yPercent,
        scale,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      }
    )
  }

  return gsap.fromTo(
    element,
    { y: -yPx, scale },
    {
      y: yPx,
      scale,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    }
  )
}
