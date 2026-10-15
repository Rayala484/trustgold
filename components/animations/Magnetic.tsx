'use client'

import { useRef, type ReactNode } from 'react'
import { ensureGsapRegistered, gsap, useGSAP } from '@/animations/gsap'

export interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * I. Reusable GSAP Magnetic Button Wrapper (§3 & §6I)
 * - Uses GSAP `quickTo` for ultra-smooth 60fps cursor tracking on desktop
 * - Automatically disabled on touch devices and under `prefers-reduced-motion`
 * - Small, restrained movement so clicking is never hindered
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      ensureGsapRegistered()
      const el = ref.current
      if (!el) return

      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(hover: hover) and (pointer: fine)').matches
      ) {
        return
      }

      const xTo = gsap.quickTo(el, 'x', {
        duration: 0.42,
        ease: 'power3.out',
      })
      const yTo = gsap.quickTo(el, 'y', {
        duration: 0.42,
        ease: 'power3.out',
      })

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        const rect = el.getBoundingClientRect()
        const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
        const dy = (e.clientY - (rect.top + rect.height / 2)) * strength * 1.15
        xTo(dx)
        yTo(dy)
      }

      const onPointerLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('pointermove', onPointerMove)
      el.addEventListener('pointerleave', onPointerLeave)

      return () => {
        el.removeEventListener('pointermove', onPointerMove)
        el.removeEventListener('pointerleave', onPointerLeave)
      }
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className ?? 'magnetic-wrap'}>
      {children}
    </div>
  )
}
