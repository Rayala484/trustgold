'use client'

import { useEffect, useRef, useState, type CSSProperties, type JSX } from 'react'

/**
 * 1. Editorial Word-by-Word Masked Heading Reveal (<Split />)
 * - mode="load": Hero headline words rise out of their clip mask right after the Gold Opening Ceremony.
 * - mode="scroll" (default): Section headings rise word-by-word with a 28ms stagger as you scroll into each section.
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
        const isGold = normalizedGold.has(clean) || normalizedGold.has(word.toLowerCase())
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
 * - Choreographs scroll-triggered reveals across every section:
 *   • Word-by-word masked section headings ([data-split-scroll])
 *   • Staggered card & bento cascades ([data-reveal-group] > *)
 *   • Smooth editorial block reveals ([data-reveal])
 *   • Luxury curtain-wipe + scale-out image unveils ([data-img-reveal])
 *   • Continuous 60fps scroll-linked vertical parallax ([data-parallax])
 *   • Scroll-drawn golden timeline beam ([data-draw])
 *   • Top 24K gold scroll-progress bar (.scroll-progress)
 */
export function PageMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const root = document.documentElement
    if (!reducedMotion) {
      root.classList.add('motion-ok')
    } else {
      root.classList.remove('motion-ok')
    }

    const header = document.querySelector<HTMLElement>('.site-header')
    const progressEl = document.querySelector<HTMLElement>('.scroll-progress')

    // Assign stagger index --i to all children inside [data-reveal-group]
    const assignGroupIndices = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal-group]')
        .forEach((group) => {
          Array.from(group.children).forEach((child, idx) => {
            ;(child as HTMLElement).style.setProperty('--i', String(idx))
          })
        })
    }
    assignGroupIndices()

    const groupObserver = new MutationObserver(() => {
      assignGroupIndices()
    })
    document
      .querySelectorAll<HTMLElement>('[data-reveal-group]')
      .forEach((group) =>
        groupObserver.observe(group, { childList: true })
      )

    const animatedSelector =
      '[data-split-scroll], [data-reveal], [data-reveal-group], [data-img-reveal], [data-draw], .section-tag'

    const syncScrollAnimations = () => {
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

      // 1. Trigger .is-in on all scroll-reveal elements entering the viewport,
      // and reset .is-in when scrolled back above them so scrolling down replays smoothly
      const targets = document.querySelectorAll<HTMLElement>(animatedSelector)
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const enterLine = curVh * 0.91
        const resetLine = curVh * 1.03

        if (rect.top <= enterLine && rect.bottom >= -40) {
          if (!el.classList.contains('is-in')) {
            el.classList.add('is-in')
          }
        } else if (rect.top > resetLine) {
          if (el.classList.contains('is-in')) {
            el.classList.remove('is-in')
          }
        }
      })

      // 2. Continuous 60fps scroll-linked vertical parallax on [data-parallax] media frames
      if (!reducedMotion) {
        const parallaxEls =
          document.querySelectorAll<HTMLElement>('[data-parallax]')
        parallaxEls.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.bottom < -120 || rect.top > curVh + 120) return
          const centerOffset =
            (rect.top + rect.height / 2 - curVh / 2) / (curVh / 2)
          const clamped = Math.max(-1, Math.min(1, centerOffset))
          const shiftPx = clamped * -22
          el.style.setProperty('--py', `${shiftPx.toFixed(1)}px`)
        })
      }
    }

    let scrollRaf = 0
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf)
      scrollRaf = requestAnimationFrame(syncScrollAnimations)
    }

    // IntersectionObserver as secondary trigger for instant viewport entry detection
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add('is-in')
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            el.classList.remove('is-in')
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -7% 0px',
      }
    )

    document
      .querySelectorAll<HTMLElement>(animatedSelector)
      .forEach((el) => io.observe(el))

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    syncScrollAnimations()

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
      groupObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(scrollRaf)
    }
  }, [])

  return null
}
