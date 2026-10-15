'use client'

import { useRef, type ReactNode } from 'react'
import { ensureGsapRegistered, useGSAP } from '@/animations/gsap'
import {
  createImageMaskReveal,
  createScrollZoom,
  type ImageRevealDirection,
} from '@/animations/image'

export interface ImageRevealProps {
  children: ReactNode
  direction?: ImageRevealDirection
  scrollZoom?: boolean
  className?: string
}

/**
 * Reusable Premium Image Reveal Component (§3 & §6C)
 * Opens a container clip-path mask while scaling the inner image from 1.08 → 1.
 */
export function ImageReveal({
  children,
  direction = 'center',
  scrollZoom = false,
  className,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      ensureGsapRegistered()
      const el = ref.current
      if (!el) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      createImageMaskReveal(el, { direction })
      if (scrollZoom) {
        const img = el.querySelector<HTMLElement>('img')
        if (img) createScrollZoom(img)
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
