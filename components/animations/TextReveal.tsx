'use client'

import { useRef, type CSSProperties, type JSX } from 'react'
import { ensureGsapRegistered, useGSAP } from '@/animations/gsap'
import { createTextMaskReveal } from '@/animations/text'

export interface TextRevealProps {
  text: string
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'p'>
  mode?: 'load' | 'scroll'
  className?: string
  id?: string
  goldWords?: string[]
}

/**
 * Reusable Masked Word / Line Text Reveal Component (§3 & §6B)
 * - mode="load": Uses CSS load-triggered word rise synchronized with the Gold Opening Ceremony.
 * - mode="scroll": Splits words into overflow-hidden masks and animates them via GSAP ScrollTrigger.
 */
export function TextReveal({
  text,
  as: Tag = 'h2',
  mode = 'scroll',
  className,
  id,
  goldWords = [],
}: TextRevealProps) {
  const headingRef = useRef<HTMLElement>(null)
  const words = text.trim().split(/\s+/)
  const normalizedGold = new Set(
    goldWords.map((w) => w.toLowerCase().replace(/[^a-z0-9%₹]/gi, ''))
  )

  useGSAP(
    () => {
      if (mode !== 'scroll') return
      ensureGsapRegistered()
      const el = headingRef.current
      if (!el) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      createTextMaskReveal(el)
    },
    { scope: headingRef }
  )

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={headingRef as any}
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
