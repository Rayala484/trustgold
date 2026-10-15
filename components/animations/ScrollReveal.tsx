'use client'

import { useRef, type ReactNode } from 'react'
import { ensureGsapRegistered, useGSAP } from '@/animations/gsap'
import {
  createFadeReveal,
  createStaggerReveal,
  type RevealVariant,
} from '@/animations/reveals'

export interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  staggerChildren?: boolean
  stagger?: number
  distance?: number
  delay?: number
  duration?: number
  className?: string
}

/**
 * Reusable GSAP ScrollTrigger Reveal Component (§3 & §6A)
 * Supports single-element fade/slide/scale reveals or staggered child reveals.
 */
export function ScrollReveal({
  children,
  variant = 'fade-up',
  staggerChildren = false,
  stagger = 0.09,
  distance = 34,
  delay = 0,
  duration = 0.78,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      ensureGsapRegistered()
      const el = ref.current
      if (!el) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      if (staggerChildren) {
        createStaggerReveal(el, undefined, {
          distance,
          stagger,
          duration,
        })
      } else {
        createFadeReveal(el, {
          variant,
          distance,
          delay,
          duration,
        })
      }
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
