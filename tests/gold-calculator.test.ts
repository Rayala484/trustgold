import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateGoldEstimate,
  buildEstimateWhatsAppUrl,
  GOLD_CATEGORIES,
  GOLD_TOUCHSTONE_MARKS,
  calculateTouchstoneBenchmarks,
} from '../lib/gold-calculator.ts'
import { TRANSLATIONS } from '../lib/i18n.ts'

test('GOLD_CATEGORIES defines all 3 client jewellery categories from brief', () => {
  assert.equal(GOLD_CATEGORIES.length, 3)
  assert.deepEqual(
    GOLD_CATEGORIES.map((c) => c.id),
    ['hallmark-22k', 'mark-916', 'other-unmarked']
  )
})

test('calculateGoldEstimate calculates Direct Old Gold Purchase with 1% processing fee', () => {
  const result = calculateGoldEstimate({
    mode: 'direct-sale',
    categoryId: 'hallmark-22k',
    valuationMethod: 'direct',
    weightGrams: 20,
    stoneWeightGrams: 2,
    ratePerGram22k: 7200,
    loanPayoffAmount: 0,
  })

  // Net gold weight = 20 - 2 = 18g
  assert.equal(result.netWeightGrams, 18)
  // Gross value = 18 * 7200 = 129,600
  assert.equal(result.grossValue, 129600)
  // Processing fee = 1% of gross value = 1,296
  assert.equal(result.processingFee, 1296)
  // Net payout = 129,600 - 1,296 = 128,304
  assert.equal(result.netCustomerPayout, 128304)
})

test('calculateGoldEstimate calculates Pledged Gold Release net payout after settling bank loan', () => {
  const result = calculateGoldEstimate({
    mode: 'pledged-release',
    categoryId: 'mark-916',
    valuationMethod: 'melting',
    weightGrams: 50,
    stoneWeightGrams: 0,
    ratePerGram22k: 7200,
    loanPayoffAmount: 240000,
  })

  // Gross = 50 * 7200 = 360,000
  assert.equal(result.grossValue, 360000)
  // 1% fee = 3,600
  assert.equal(result.processingFee, 3600)
  // Net after fee = 356,400; minus bank loan 240,000 = 116,400 spot payout to customer
  assert.equal(result.loanPayoffAmount, 240000)
  assert.equal(result.netCustomerPayout, 116400)
})

test('buildEstimateWhatsAppUrl formats structured WhatsApp enquiry link for 919393494455', () => {
  const estimate = calculateGoldEstimate({
    mode: 'pledged-release',
    categoryId: 'hallmark-22k',
    valuationMethod: 'melting',
    weightGrams: 30,
    stoneWeightGrams: 1,
    ratePerGram22k: 7200,
    loanPayoffAmount: 140000,
  })

  const url = buildEstimateWhatsAppUrl(estimate)
  assert.ok(url.startsWith('https://wa.me/919393494455?text='))
  const decoded = decodeURIComponent(url.split('text=')[1])
  assert.ok(decoded.includes('Pledged Gold Release'))
  assert.ok(decoded.includes('29g'))
  assert.ok(decoded.includes('Melting in Presence'))
})

test('navbar links, phone pill, and buttons enforce white-space: nowrap to prevent multi-line wrapping', async () => {
  const fs = await import('node:fs/promises')
  const css = await fs.readFile(
    new URL('../app/globals.css', import.meta.url),
    'utf8'
  )

  const navLinksMatch = css.match(/\.nav-links\s+a\s*\{[^}]*\}/)
  assert.ok(
    navLinksMatch && navLinksMatch[0].includes('white-space: nowrap'),
    '.nav-links a must include white-space: nowrap'
  )

  const phonePillMatch = css.match(/\.nav-phone-pill\s*\{[^}]*\}/)
  assert.ok(
    phonePillMatch && phonePillMatch[0].includes('white-space: nowrap'),
    '.nav-phone-pill must include white-space: nowrap'
  )

  const btnMatch = css.match(/\.btn\s*\{[^}]*\}/)
  assert.ok(
    btnMatch && btnMatch[0].includes('white-space: nowrap'),
    '.btn must include white-space: nowrap'
  )
})

test('calculateTouchstoneBenchmarks computes accurate 1g, 1 Kasu (8g), 1 Tulam (10g), and 24g net payouts after 1% fee', () => {
  assert.equal(GOLD_TOUCHSTONE_MARKS.length, 4)

  const b916 = calculateTouchstoneBenchmarks(7350, 916)
  assert.equal(b916.effectiveRatePerGram, 7350)
  assert.equal(b916.oneGramNet, Math.round(7350 * 0.99))
  assert.equal(b916.oneSovereign8gNet, Math.round(7350 * 8 * 0.99))
  assert.equal(b916.oneTola10gNet, Math.round(7350 * 10 * 0.99))
  assert.equal(b916.threeSovereigns24gNet, Math.round(7350 * 24 * 0.99))
})

test('bilingual TRANSLATIONS dictionary provides complete English and Telugu content and worked 1% fee calculations', () => {
  assert.equal(TRANSLATIONS.en.trustPillars.items.length, 3)
  assert.equal(TRANSLATIONS.te.trustPillars.items.length, 3)

  assert.equal(TRANSLATIONS.en.howItWorks.sellSteps.length, 4)
  assert.equal(TRANSLATIONS.te.howItWorks.sellSteps.length, 4)
  assert.equal(TRANSLATIONS.en.howItWorks.releaseSteps.length, 4)
  assert.equal(TRANSLATIONS.te.howItWorks.releaseSteps.length, 4)

  // Worked 1% fee examples verify exact arithmetic:
  // Example 1: 20g net * 7,000 = 1,40,000 - 1,400 (1% fee) = 1,38,600
  const ex1En = TRANSLATIONS.en.whyTrustGold.examples[0]
  assert.equal(ex1En.finalValue, '₹1,38,600')
  assert.equal(TRANSLATIONS.te.whyTrustGold.examples[0].finalValue, '₹1,38,600')

  // Example 2: 40g net * 7,000 = 2,80,000 - 2,800 (1% fee) = 2,77,200 - 1,95,000 loan = 82,200
  const ex2En = TRANSLATIONS.en.whyTrustGold.examples[1]
  assert.equal(ex2En.finalValue, '₹82,200')
  assert.equal(TRANSLATIONS.te.whyTrustGold.examples[1].finalValue, '₹82,200')
})

test('minimal homepage: 5 sections, real facts only, full Telugu parity', async () => {
  const fs = await import('node:fs/promises')
  const pageSource = await fs.readFile(
    new URL('../app/page.tsx', import.meta.url),
    'utf8'
  )
  const vjaSource = await fs.readFile(
    new URL('../app/vijayawada/page.tsx', import.meta.url),
    'utf8'
  )
  const css = await fs.readFile(
    new URL('../app/globals.css', import.meta.url),
    'utf8'
  )
  const copySource = await fs.readFile(
    new URL('../lib/home-copy.ts', import.meta.url),
    'utf8'
  )
  const { HOME_COPY } = await import('../lib/home-copy.ts')

  for (const id of ['services', 'how-it-works', 'faq', 'visit']) {
    assert.ok(pageSource.includes(`id="${id}"`), `homepage must keep #${id}`)
  }
  for (const id of ['trust-pillars', 'shop-gallery', 'why-trust-gold', 'reviews', 'documents', 'contact', 'calculator']) {
    assert.ok(!pageSource.includes(`id="${id}"`), `homepage must stay minimal: #${id} was removed on purpose`)
  }
  assert.ok(!pageSource.includes('<form'), 'homepage has no enquiry form; WhatsApp and call are the actions')
  assert.ok(pageSource.includes('lang-switcher'), 'header keeps the EN | తెలుగు switcher')
  assert.ok(pageSource.includes('hero-showcase-stage'), 'desktop hero keeps the medallion stage')
  assert.ok(pageSource.includes('BUSINESS_INFO.mapsUrl'), 'visit card links to the real Google Maps location')

  // The old site invented customer reviews. Never again.
  for (const fake of ['Ramesh K.', 'Lakshmi P.', 'Suresh M.']) {
    assert.ok(!pageSource.includes(fake) && !copySource.includes(fake), `no fabricated review (${fake}) on the homepage`)
  }

  // Every English string has a non-empty Telugu counterpart in the same place.
  const shape = (o: unknown, path = ''): string[] =>
    typeof o === 'string'
      ? [path]
      : Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => shape(v, `${path}.${k}`))
  assert.deepEqual(shape(HOME_COPY.te), shape(HOME_COPY.en), 'Telugu copy must mirror English copy key-for-key')
  const empty = (o: unknown): boolean =>
    typeof o === 'string' ? o.trim() === '' : Object.values(o as object).some(empty)
  assert.ok(!empty(HOME_COPY.en) && !empty(HOME_COPY.te), 'no empty copy strings')

  assert.ok(
    vjaSource.includes('Vasisth Enclave, Gandhinagar'),
    '/vijayawada branch page must include the real Gandhinagar address'
  )

  const siteMotion = await fs.readFile(
    new URL('../components/SiteMotion.tsx', import.meta.url),
    'utf8'
  )
  const gsapSetup = await fs.readFile(
    new URL('../animations/gsap.ts', import.meta.url),
    'utf8'
  )
  const lenisSetup = await fs.readFile(
    new URL('../animations/lenis.ts', import.meta.url),
    'utf8'
  )
  const scrollOrchestrator = await fs.readFile(
    new URL('../animations/scroll.ts', import.meta.url),
    'utf8'
  )

  assert.ok(css.includes('.mini-steps'), 'globals.css must style .mini-steps')
  assert.ok(css.includes('.visit-card'), 'globals.css must style .visit-card')
  assert.ok(css.includes('.lang-switcher'), 'globals.css must style .lang-switcher')
  assert.ok(css.includes('.floating-whatsapp-btn'), 'globals.css must style .floating-whatsapp-btn')
  assert.ok(pageSource.includes('<FloatingWhatsApp'), 'app/page.tsx must render FloatingWhatsApp button')
  assert.ok(vjaSource.includes('<FloatingWhatsApp'), 'app/vijayawada/page.tsx must render FloatingWhatsApp button')
  assert.ok(
    gsapSetup.includes('gsap.registerPlugin(ScrollTrigger, useGSAP)'),
    'animations/gsap.ts must register ScrollTrigger and useGSAP once'
  )
  assert.ok(
    lenisSetup.includes("lenis.on('scroll', ScrollTrigger.update)"),
    'animations/lenis.ts must sync Lenis with ScrollTrigger.update'
  )
  assert.ok(
    scrollOrchestrator.includes('gsap.matchMedia()'),
    'animations/scroll.ts must use gsap.matchMedia()'
  )
  assert.ok(
    siteMotion.includes('initPremiumScrollSystem'),
    'SiteMotion.tsx must initialize initPremiumScrollSystem'
  )

  // Verify every single CSS class used across pages/components is defined in globals.css:
  const filesToAudit = [
    '../app/page.tsx',
    '../app/vijayawada/page.tsx',
    '../components/FloatingWhatsApp.tsx',
    '../components/TrustGold3DStage.tsx',
  ]
  const utilityExempt = new Set([
    'sr-only',
    'open',
    'active',
    'highlight',
    'pledge-only',
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'lang-en-root',
    'w-scroll',
  ])

  for (const relPath of filesToAudit) {
    const src = await fs.readFile(new URL(relPath, import.meta.url), 'utf8')
    const classMatches = [...src.matchAll(/className=["']([^"']+)["']/g)]
    for (const m of classMatches) {
      for (const cls of m[1].split(/\s+/)) {
        if (!cls || utilityExempt.has(cls)) continue
        assert.ok(
          css.includes(`.${cls}`),
          `Class .${cls} used in ${relPath} must be defined in app/globals.css`
        )
      }
    }
  }
})

test('Coded 3D Trust Gold Medallion Stage & Single-Layer Segmented Control Verification', async () => {
  const fs = await import('node:fs/promises')
  const stageSource = await fs.readFile(
    new URL('../components/TrustGold3DStage.tsx', import.meta.url),
    'utf8'
  )
  const pageSource = await fs.readFile(
    new URL('../app/page.tsx', import.meta.url),
    'utf8'
  )
  const css = await fs.readFile(
    new URL('../app/globals.css', import.meta.url),
    'utf8'
  )

  assert.ok(
    pageSource.includes('<TrustGold3DStage') &&
      !pageSource.includes('<video'),
    'Homepage Hero must render the coded <TrustGold3DStage /> rather than a raw <video> tag'
  )
  assert.ok(
    stageSource.includes('EXTRUSION_SLICES') &&
      stageSource.includes('WAVE_RIBBON_PATHS'),
    'TrustGold3DStage must implement the 3D extruded gold ring and wave ribbons'
  )
  assert.ok(
    stageSource.includes('handleSpinMedallion') && !stageSource.includes('tg-3d-stage-topbar'),
    'TrustGold3DStage stays decoration: click-to-spin, no extra control bar'
  )
})

test('Opening sequence: 1.5s storyboard, exact logo, skippable, reduced-motion safe', async () => {
  const fs = await import('node:fs/promises')
  const openSource = await fs.readFile(
    new URL('../components/OpeningSequence.tsx', import.meta.url),
    'utf8'
  )
  const pageSource = await fs.readFile(
    new URL('../app/page.tsx', import.meta.url),
    'utf8'
  )
  const css = await fs.readFile(
    new URL('../app/globals.css', import.meta.url),
    'utf8'
  )

  assert.ok(pageSource.includes('<OpeningSequence />'), 'Homepage must mount <OpeningSequence />')
  assert.ok(openSource.includes('src="/logo.png"'), 'Opening must reveal the supplied /logo.png, not a redrawn mark')
  assert.ok(openSource.includes('Skip opening animation'), 'Opening must have an accessible Skip control')
  assert.ok(openSource.includes('prefers-reduced-motion: reduce'), 'Opening must respect reduced motion in JS')
  assert.ok(css.includes('tg-open-failsafe'), 'Opening must have a CSS failsafe so it can never stay on screen')

  // Every tween must end by 1.5s: position + duration of each tl.to(...) call
  const ends = [...openSource.matchAll(/duration: ([\d.]+)[^}]*}[^)]*?,\s*([\d.]+)\s*\)/g)].map(
    ([, dur, at]) => Number(dur) + Number(at)
  )
  assert.ok(ends.length >= 10, `expected the storyboard tweens to be parsed, got ${ends.length}`)
  assert.ok(
    Math.max(...ends) <= 1.5 + 1e-9,
    `opening must finish within 1.5s, last tween ends at ${Math.max(...ends)}s`
  )
  assert.ok(
    css.includes('.tg-3d-medallion-rotor') &&
      css.includes('transform-style: preserve-3d'),
    'globals.css must style .tg-3d-medallion-rotor with transform-style: preserve-3d'
  )
  assert.ok(
    !pageSource.includes('segmented-overlay') &&
      css.includes(".segmented-btn[aria-selected='true']"),
    'Segmented control must use single-layer .segmented-btn[aria-selected="true"] without clipping .segmented-overlay'
  )
})



