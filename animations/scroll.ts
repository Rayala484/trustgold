'use client'

import {
  ANIMATION_MEDIA_QUERIES,
  ensureGsapRegistered,
  gsap,
  ScrollTrigger,
} from './gsap'
import { createLenisSmoothScroll } from './lenis'
import { createFadeReveal, createStaggerReveal } from './reveals'
import { createHeroScrollChoreography, createTextMaskReveal } from './text'
import { createImageMaskReveal } from './image'
import { createParallax } from './parallax'
import { createBeamDraw } from './transitions'

/**
 * Central GSAP + ScrollTrigger + Lenis Page Choreography (§3, §4, §5, §10, §11, §12, §13)
 *
 * Uses `gsap.matchMedia()` so Desktop, Tablet, Mobile, and Reduced-Motion
 * receive intentionally tailored animation behavior:
 * - Desktop (>= 1025px): Full Lenis smooth scrolling, Hero depth parallax,
 *   masked word-by-word text reveals, staggered bento & card reveals,
 *   clip-path + 1.08→1 image reveals, scrubbed media parallax, and golden beam draw.
 * - Tablet (641px–1024px): Reduced transform distances and lighter parallax.
 * - Mobile (<= 640px): Fast, touch-friendly reveals without heavy parallax or cursor overhead.
 * - Reduced Motion: Disables transforms/parallax so all content is immediately static & readable.
 */
export function initPremiumScrollSystem(): () => void {
  if (typeof window === 'undefined') return () => {}

  ensureGsapRegistered()

  const lenisCtrl = createLenisSmoothScroll()

  const header = document.querySelector<HTMLElement>('.site-header')
  const progressEl = document.querySelector<HTMLElement>('.scroll-progress')

  // Top 24K Gold Scroll-Progress Bar + Sticky Header Elevation via ScrollTrigger
  const pageProgressTrigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      if (progressEl) {
        gsap.set(progressEl, { scaleX: Number(self.progress.toFixed(4)) })
      }
      if (header) {
        header.dataset.scrolled = String(self.scroll() > 32)
      }
    },
  })

  // Responsive GSAP MatchMedia Choreography (§10 & §11)
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: ANIMATION_MEDIA_QUERIES.isDesktop,
      isTablet: ANIMATION_MEDIA_QUERIES.isTablet,
      isMobile: ANIMATION_MEDIA_QUERIES.isMobile,
      reducedMotion: ANIMATION_MEDIA_QUERIES.reducedMotion,
    },
    (context) => {
      const { isDesktop, isTablet, isMobile, reducedMotion } =
        context.conditions as {
          isDesktop: boolean
          isTablet: boolean
          isMobile: boolean
          reducedMotion: boolean
        }

      if (reducedMotion) {
        // Respect prefers-reduced-motion (§11): ensure all elements are visible without transforms
        gsap.set(
          '[data-split-scroll] .w-scroll > i, [data-reveal], [data-reveal-group] > *, [data-img-reveal], [data-draw], .section-tag',
          {
            clearProps: 'all',
            autoAlpha: 1,
          }
        )
        return
      }

      const distance = isDesktop ? 36 : isTablet ? 24 : 16
      const stagger = isDesktop ? 0.09 : isTablet ? 0.07 : 0.05

      // 1. Hero Visual Stage Parallax (Desktop only — §10 & §17.1)
      const heroEl = document.querySelector<HTMLElement>('.hero-vault')
      if (heroEl && isDesktop) {
        createHeroScrollChoreography(heroEl, true)
      }

      // 2. Section Eyebrow Tags (.section-tag outside Hero)
      gsap.utils.toArray<HTMLElement>('.section-tag').forEach((tag) => {
        if (tag.closest('.hero-vault')) return
        createFadeReveal(tag, {
          variant: 'fade-left',
          distance: isMobile ? 10 : 18,
          duration: 0.55,
          start: 'top 91%',
        })
      })

      // 3. Masked Word-by-Word Section Headings ([data-split-scroll])
      gsap.utils
        .toArray<HTMLElement>('[data-split-scroll]')
        .forEach((heading) => {
          createTextMaskReveal(heading, {
            duration: isMobile ? 0.58 : 0.74,
            stagger: isMobile ? 0.018 : 0.026,
            start: 'top 90%',
          })
        })

      // 4. Single Content Blocks & Banners ([data-reveal])
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((block) => {
        createFadeReveal(block, {
          variant: 'fade-up',
          distance,
          duration: isMobile ? 0.6 : 0.78,
          start: 'top 89%',
        })
      })

      // 5. Staggered Multi-Card & Bento Grids ([data-reveal-group])
      gsap.utils
        .toArray<HTMLElement>('[data-reveal-group]')
        .forEach((group) => {
          createStaggerReveal(group, undefined, {
            distance,
            scaleFrom: isMobile ? 0.985 : 0.97,
            duration: isMobile ? 0.62 : 0.78,
            stagger,
            start: 'top 88%',
          })
        })

      // 6. Luxury Image Curtain Reveal + 1.08 → 1 Scale ([data-img-reveal])
      gsap.utils
        .toArray<HTMLElement>('[data-img-reveal]')
        .forEach((imgContainer) => {
          createImageMaskReveal(imgContainer, {
            direction: 'center',
            duration: isMobile ? 0.78 : 1.05,
            start: 'top 87%',
          })
        })

      // 7. Scrubbed Image Parallax ([data-parallax] — Desktop & Tablet only, disabled on Mobile per §10)
      if (isDesktop || isTablet) {
        gsap.utils
          .toArray<HTMLElement>('[data-parallax]')
          .forEach((parallaxEl) => {
            createParallax(parallaxEl, {
              yPx: isDesktop ? 24 : 12,
              scale: 1.09,
              scrub: 0.55,
            })
          })
      }

      // 8. Golden Process Timeline Beam Draw ([data-draw])
      gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((beamEl) => {
        createBeamDraw(beamEl, beamEl.parentElement)
      })
    }
  )

  // Observe dynamic tab switches in [data-reveal-group] (#documents, #process) and FAQ height changes
  const dynamicObserver = new MutationObserver((mutations) => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    mutations.forEach((m) => {
      if (m.type === 'childList' && m.addedNodes.length > 0) {
        const target = m.target as HTMLElement
        if (target.hasAttribute('data-reveal-group') && !prefersReduced) {
          gsap.fromTo(
            Array.from(target.children),
            { autoAlpha: 0, y: 16, scale: 0.985 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.44,
              stagger: 0.055,
              ease: 'power2.out',
              overwrite: 'auto',
            }
          )
        }
      }
    })

    ScrollTrigger.refresh()
  })

  document
    .querySelectorAll<HTMLElement>('[data-reveal-group], .faq-accordion')
    .forEach((el) =>
      dynamicObserver.observe(el, { childList: true, subtree: false })
    )

  // Refresh ScrollTrigger once fonts and images finish layout
  const refreshTimer = window.setTimeout(() => {
    ScrollTrigger.refresh()
  }, 350)

  return () => {
    window.clearTimeout(refreshTimer)
    dynamicObserver.disconnect()
    pageProgressTrigger.kill()
    mm.revert()
    if (lenisCtrl) {
      lenisCtrl.destroy()
    }
  }
}
