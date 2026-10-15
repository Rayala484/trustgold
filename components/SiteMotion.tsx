'use client'

import { Fragment, useEffect, useRef, useState, type JSX } from 'react'

/**
 * 1. Masked Word-by-Word Reveal (<Split />)
 * Wraps each word in a clipping mask (.w > span) so it rises smoothly into view.
 * - mode="load": animates on initial paint (and syncs with the GoldOpening iris reveal when html.intro is present)
 * - mode="scroll": triggered by <PageMotion /> IntersectionObserver when scrolled into view
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
  const words = text.split(' ')
  const goldSet = new Set(goldWords.map((w) => w.toLowerCase()))

  return (
    <Tag
      id={id}
      className={className}
      aria-label={text}
      data-split={mode === 'scroll' ? '' : undefined}
    >
      {words.map((w, i) => {
        const cleanWord = w.replace(/[.,—–!?’']/g, '').toLowerCase()
        const isGold =
          goldSet.has(w.toLowerCase()) || goldSet.has(cleanWord)
        return (
          <Fragment key={i}>
            <span
              aria-hidden="true"
              className={mode === 'load' ? 'w w-load' : 'w'}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className={isGold ? 'w-gold-ink' : undefined}>{w}</span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
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
  strength = 0.24,
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
      // Spring constants: stiffness = 0.18, damping = 0.74
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
 * - Enables scroll-triggered reveals ([data-split], [data-reveal], [data-reveal-group], [data-img-reveal], [data-draw])
 * - Runs smooth count-up on [data-count]
 * - Updates header scroll elevation & progress hairline fallback
 * - Tracks mouse position on .spotlight-card for 24K brushed-gold border & surface glare
 */
export function PageMotion() {
  useEffect(() => {
    const html = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      html.classList.remove('motion-ok')
      return
    }

    ;(window as unknown as { __tgMotion?: boolean }).__tgMotion = true
    html.classList.add('motion-ok')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    )

    const targets = document.querySelectorAll(
      '[data-split], [data-reveal], [data-reveal-group], [data-img-reveal], [data-draw]'
    )
    targets.forEach((el) => io.observe(el))

    // Smart Header scroll elevation + fallback scroll progress bar
    const header = document.querySelector<HTMLElement>('.site-header')
    const progressEl = document.querySelector<HTMLElement>('.scroll-progress')
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports('animation-timeline: scroll()')

    let scrollRaf = 0
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf)
      scrollRaf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (header) {
          header.dataset.scrolled = String(y > 32)
        }
        if (progressEl && !supportsScrollTimeline) {
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          )
          const ratio = Math.min(1, Math.max(0, y / maxScroll))
          progressEl.style.transform = `scaleX(${ratio.toFixed(4)})`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Delegated 24K Brushed-Gold Spotlight on cards (.spotlight-card)
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
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(scrollRaf)
    }
  }, [])

  return null
}
