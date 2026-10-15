'use client'

import { useRef, type ReactNode } from 'react'
import { ensureGsapRegistered, useGSAP } from '@/animations/gsap'
import { createParallax } from '@/animations/parallax'

export interface ParallaxProps {
  children: ReactNode
  yPx?: number
  scale?: number
  className?: string
}

/**
 * Reusable Scrubbed ScrollTrigger Parallax Component (§3 & §6D)
 * Automatically disabled on mobile and under prefers-reduced-motion.
 */
export function Parallax({
  children,
  yPx = 22,
  scale = 1.08,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      ensureGsapRegistered()
      const el = ref.current
      if (!el) return
      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(max-width: 640px)').matches
      ) {
        return
      }
      createParallax(el, { yPx, scale })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className ?? 'parallax-media-wrap'}>
      {children}
    </div>
  )
}
