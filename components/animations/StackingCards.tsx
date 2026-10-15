'use client'

import { useRef, type ReactNode } from 'react'
import { ensureGsapRegistered, useGSAP } from '@/animations/gsap'
import { createStackingCards } from '@/animations/cards'

export interface StackingCardsProps {
  children: ReactNode
  cardSelector?: string
  className?: string
}

/**
 * H. Reusable Stacking Cards Component (§3 & §6H)
 * Subtly scales and layers cards as the user scrolls through the container.
 */
export function StackingCards({
  children,
  cardSelector = ':scope > *',
  className,
}: StackingCardsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      ensureGsapRegistered()
      const el = ref.current
      if (!el) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      createStackingCards(el, cardSelector)
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
