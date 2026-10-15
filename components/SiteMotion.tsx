'use client'

import { useEffect, useRef, useState, type JSX } from 'react'

/**
 * 1. Editorial Heading Component (<Split />)
 * Renders crisp editorial display headings without fragile off-screen word clipping
 * or AI-template single-word random coloring.
 */
export function Split({
  text,
  as: Tag = 'h2',
  className,
  id,
}: {
  text: string
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'p'>
  mode?: 'load' | 'scroll'
  className?: string
  id?: string
  goldWords?: string[]
}) {
  return (
    <Tag id={id} className={className}>
      {text}
    </Tag>
  )
}

/**
 * 2. Spring-Physics Cursor Pull (<Magnetic />)
 * Gently pulls primary buttons toward the mouse cursor using a zero-dependency
 * damped harmonic oscillator (rAF spring) and springs back on leave.
 * Ignored on touch devices and under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    raf: 0,
  })

  useEffect(() => {
    const s = stateRef.current
    return () => cancelAnimationFrame(s.raf)
  }, [])

  function startSpring() {
    const s = stateRef.current
    if (s.raf) return

    const tick = () => {
      const el = ref.current
      if (!el) {
        s.raf = 0
        return
      }
      s.vx = (s.vx + (s.targetX - s.x) * 0.18) * 0.74
      s.vy = (s.vy + (s.targetY - s.y) * 0.18) * 0.74
      s.x += s.vx
      s.y += s.vy

      if (
        Math.abs(s.targetX - s.x) < 0.08 &&
        Math.abs(s.targetY - s.y) < 0.08 &&
        Math.abs(s.vx) < 0.08 &&
        Math.abs(s.vy) < 0.08
      ) {
        s.x = s.targetX
        s.y = s.targetY
        el.style.transform =
          s.x === 0 && s.y === 0
            ? ''
            : `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`
        s.raf = 0
        return
      }

      el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(
        2
      )}px, 0)`
      s.raf = requestAnimationFrame(tick)
    }

    s.raf = requestAnimationFrame(tick)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (
      e.pointerType !== 'mouse' ||
      !ref.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const r = ref.current.getBoundingClientRect()
    stateRef.current.targetX = (e.clientX - (r.left + r.width / 2)) * strength
    stateRef.current.targetY =
      (e.clientY - (r.top + r.height / 2)) * strength * 1.25
    startSpring()
  }

  function onPointerLeave() {
    stateRef.current.targetX = 0
    stateRef.current.targetY = 0
    startSpring()
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className ?? 'magnetic-wrap'}
    >
      {children}
    </div>
  )
}

/**
 * 3. Smooth Interpolated INR Currency Readout (<AnimatedINR />)
 * Smoothly glides between rupee amounts when calculator sliders or purity tabs change.
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
 * 4. PageMotion Orchestrator (<PageMotion />)
 * - Updates header scroll elevation & live gold scroll-progress hairline
 * - Tracks mouse position on .spotlight-card for 24K brushed-gold border & surface glare
 * - Never hides content with opacity:0 gates
 */
export function PageMotion() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    const progressEl = document.querySelector<HTMLElement>('.scroll-progress')

    let scrollRaf = 0
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf)
      scrollRaf = requestAnimationFrame(() => {
        const y = window.scrollY
        const curVh = window.innerHeight || 800

        if (header) {
          header.dataset.scrolled = String(y > 32)
        }

        if (progressEl) {
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - curVh
          )
          const ratio = Math.min(1, Math.max(0, y / maxScroll))
          progressEl.style.transform = `scaleX(${ratio.toFixed(4)})`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

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
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(scrollRaf)
    }
  }, [])

  return null
}


