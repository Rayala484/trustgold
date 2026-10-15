'use client'

import { useEffect, useRef, useState, type CSSProperties, type JSX } from 'react'
import { initPremiumScrollSystem } from '@/animations/scroll'
import { Magnetic } from '@/components/animations/Magnetic'

export { Magnetic }

/**
 * 1. Editorial Word-by-Word Masked Heading Reveal (<Split />)
 * - mode="load": Hero headline words rise out of their clip mask right after the Gold Opening Ceremony.
 * - mode="scroll" (default): Section headings rise word-by-word via GSAP ScrollTrigger (`createTextMaskReveal`).
 */
export function Split({
  text,
  as: Tag = 'h2',
  mode = 'scroll',
  className,
  id,
  goldWords = [],
}: {
  text: string
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'p'>
  mode?: 'load' | 'scroll'
  className?: string
  id?: string
  goldWords?: string[]
}) {
  const words = text.trim().split(/\s+/)
  const normalizedGold = new Set(
    goldWords.map((w) => w.toLowerCase().replace(/[^a-z0-9%₹]/gi, ''))
  )

  return (
    <Tag
      id={id}
      className={className}
      data-split-scroll={mode === 'scroll' ? '' : undefined}
    >
      {words.map((word, idx) => {
        const clean = word.toLowerCase().replace(/[^a-z0-9%₹]/gi, '')
        const isGold =
          normalizedGold.has(clean) || normalizedGold.has(word.toLowerCase())
        return (
          <span key={`${word}-${idx}`}>
            <span className={mode === 'load' ? 'w w-load' : 'w w-scroll'}>
              <i
                className={isGold ? 'w-gold-ink' : undefined}
                style={{ '--i': idx } as CSSProperties}
              >
                {word}
              </i>
            </span>
            {idx < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}

/**
 * 2. Smooth Interpolated INR Currency Readout (<AnimatedINR />)
 */
export function AnimatedINR({
  value,
  prefix = '',
}: {
  value: number
  prefix?: string
}) {
  const [displayVal, setDisplayVal] = useState(value)
  const currentRef = useRef(value)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      currentRef.current = value
      setDisplayVal(value)
      return
    }

    const from = currentRef.current
    const to = value
    if (from === to) return

    const duration = 260
    const t0 = performance.now()
    let raf = 0

    const step = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / duration))
      const eased = 1 - Math.pow(1 - p, 3)
      const next = Math.round(from + (to - from) * eased)
      currentRef.current = next
      setDisplayVal(next)
      if (p < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])

  const abs = Math.abs(Math.round(displayVal)).toLocaleString('en-IN')
  const formatted = displayVal < 0 ? `-₹${abs}` : `₹${abs}`

  return (
    <>
      {prefix}
      {formatted}
    </>
  )
}

/**
 * 3. PageMotion Orchestrator (<PageMotion />)
 * - Initializes the centralized Lenis + GSAP + ScrollTrigger system (`initPremiumScrollSystem`)
 * - Tracks mouse position on `.spotlight-card` for 24K brushed-gold surface glare
 */
export function PageMotion() {
  useEffect(() => {
    const cleanupScrollSystem = initPremiumScrollSystem()

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '.spotlight-card'
      )
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${(e.clientX - rect.left).toFixed(1)}px`)
      card.style.setProperty('--my', `${(e.clientY - rect.top).toFixed(1)}px`)
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cleanupScrollSystem()
      document.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return null
}

export { PageMotion as SiteMotion }

