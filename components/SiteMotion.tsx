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
      data-split={mode === 'scroll' ? 'scroll' : 'load'}
    >
      {words.map((w, i) => {
        const cleanWord = w.replace(/[.,—–!?’'“”]/g, '').toLowerCase()
        const isGold =
          goldSet.has(w.toLowerCase()) || goldSet.has(cleanWord)
        const spanClass = [
          'w',
          mode === 'load' ? 'w-load' : '',
          isGold ? 'w-gold-ink' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <Fragment key={i}>
            <span
              aria-hidden="true"
              className={spanClass}
              style={{ '--i': i } as React.CSSProperties}
            >
              <i className={isGold ? 'w-gold-ink' : undefined}>{w}</i>
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
 * - Assigns --stagger indices on [data-reveal-group] direct children
 * - Updates header scroll elevation & progress hairline
 * - Updates [data-parallax] subtle vertical offset
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

    const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]')
    groups.forEach((group) => {
      Array.from(group.children).forEach((child, idx) => {
        ;(child as HTMLElement).style.setProperty('--stagger', String(idx))
      })
    })

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-split], [data-reveal], [data-reveal-group], [data-img-reveal], [data-draw]'
      )
    )

    const revealElement = (el: HTMLElement) => {
      el.classList.add('in', 'is-in')
    }

    // Synchronously mark elements already in or above the viewport before enabling motion-ok
    const vh = window.innerHeight || 800
    targets.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top <= vh * 0.94) {
        revealElement(el)
      }
    })

    html.classList.add('motion-ok')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          revealElement(el)
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.02 }
    )

    targets.forEach((el) => {
      if (!el.classList.contains('in')) {
        io.observe(el)
      }
    })

    const header = document.querySelector<HTMLElement>('.site-header')
    const progressEl = document.querySelector<HTMLElement>('.scroll-progress')
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    )

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

        // Scroll fallback reveal so fast scrolling or anchor jumps never leave an element hidden
        for (const el of targets) {
          if (!el.classList.contains('in')) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= curVh * 0.94) {
              revealElement(el)
              io.unobserve(el)
            }
          }
        }

        // Subtle vertical parallax on [data-parallax] media wrappers
        for (const pel of parallaxEls) {
          const rect = pel.getBoundingClientRect()
          if (rect.bottom >= -100 && rect.top <= curVh + 100) {
            const centerOffset =
              (rect.top + rect.height / 2 - curVh / 2) / curVh
            const py = Math.max(-14, Math.min(14, -centerOffset * 18))
            pel.style.setProperty('--py', `${py.toFixed(1)}px`)
          }
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

