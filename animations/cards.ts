'use client'

import { ANIMATION_EASES, ensureGsapRegistered, gsap, ScrollTrigger } from './gsap'

/**
 * H. Stacking Cards Interaction (§6H)
 * Subtly scales and elevates sequential cards as the user scrolls through a list or grid.
 */
export function createStackingCards(
  containerEl: HTMLElement,
  cardSelector = ':scope > *'
): ScrollTrigger[] {
  ensureGsapRegistered()

  const cards = Array.from(
    containerEl.querySelectorAll<HTMLElement>(cardSelector)
  )
  const triggers: ScrollTrigger[] = []

  cards.forEach((card, index) => {
    if (index === cards.length - 1) return
    const nextCard = cards[index + 1]
    const tween = gsap.to(card, {
      scale: 0.975,
      opacity: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: nextCard,
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
      },
    })
    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger)
    }
  })

  return triggers
}

/**
 * F. Pinned Storytelling Section (§6F)
 * Pins a section while an internal timeline progresses, then releases cleanly.
 */
export function createPinnedSection(
  sectionEl: HTMLElement,
  buildTimeline: (tl: gsap.core.Timeline) => void,
  pinDistance = '+=100%'
): gsap.core.Timeline {
  ensureGsapRegistered()

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top top',
      end: pinDistance,
      pin: true,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  buildTimeline(tl)
  return tl
}

/**
 * G. Horizontal Scroll Storytelling Track (§6G)
 * Translates a horizontal track inside a pinned section based on vertical scroll.
 */
export function createHorizontalScrollSection(
  sectionEl: HTMLElement,
  trackEl: HTMLElement
): gsap.core.Tween {
  ensureGsapRegistered()

  const getScrollAmount = () =>
    -(trackEl.scrollWidth - document.documentElement.clientWidth)

  return gsap.to(trackEl, {
    x: getScrollAmount,
    ease: ANIMATION_EASES.scrub,
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top top',
      end: () => `+=${Math.max(0, trackEl.scrollWidth - window.innerWidth)}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  })
}
