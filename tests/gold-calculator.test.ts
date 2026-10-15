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

test('homepage implements the 11-step Competitor-Informed Conversion Hierarchy, Telugu toggle, and Vijayawada branch SEO page', async () => {
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

  // Social icons in footer:
  assert.ok(
    pageSource.includes('social-icon-btn'),
    'app/page.tsx must use .social-icon-btn for footer social icons'
  )
  assert.ok(
    pageSource.includes('aria-label="Follow Trust Gold Services on Instagram"'),
    'Instagram icon button must have accessible aria-label'
  )
  assert.ok(
    pageSource.includes('aria-label="Follow Trust Gold Services on Facebook"'),
    'Facebook icon button must have accessible aria-label'
  )
  assert.ok(
    pageSource.includes(
      'aria-label="Subscribe to Trust Gold Services on YouTube"'
    ),
    'YouTube icon button must have accessible aria-label'
  )
  assert.ok(
    pageSource.includes('aria-label="Chat with Trust Gold Services on WhatsApp"'),
    'WhatsApp icon button must have accessible aria-label'
  )

  // Calculator removed, Hero & 11-step structure present:
  assert.ok(
    pageSource.includes('hero-showcase-stage'),
    'Hero must feature the luxury .hero-showcase-stage centerpiece'
  )
  assert.ok(
    !pageSource.includes('calculator-shell'),
    'Page must NOT contain .calculator-shell anywhere'
  )
  assert.ok(
    !pageSource.includes('id="calculator"'),
    'Page must NOT contain #calculator section anywhere'
  )
  assert.ok(
    pageSource.includes('/images/hero.png'),
    'Hero & shop gallery must showcase authentic /images/hero.png scale & touchstone photo'
  )
  assert.ok(
    pageSource.includes('lang-switcher'),
    'Header must include the bilingual EN | తెలుగు language switcher'
  )
  assert.ok(
    pageSource.includes('id="trust-pillars"'),
    'Page must include #trust-pillars (Three Trust Pillars) right after Hero'
  )
  assert.ok(
    pageSource.includes('id="services"'),
    'Page must include #services (Sell Old Gold & Release Pledged Gold)'
  )
  assert.ok(
    pageSource.includes('id="how-it-works"'),
    'Page must include #how-it-works (4-Step Valuation & Settlement Process)'
  )
  assert.ok(
    pageSource.includes('id="shop-gallery"'),
    'Page must include #shop-gallery (Real Shop, Staff & Equipment Photography)'
  )
  assert.ok(
    pageSource.includes('id="why-trust-gold"'),
    'Page must include #why-trust-gold (Transparent 1% Fee & Worked Calculation Ledgers)'
  )
  assert.ok(
    pageSource.includes('worked-ledgers-grid'),
    'Page must include step-by-step worked calculation ledgers'
  )
  assert.ok(
    pageSource.includes('id="reviews"'),
    'Page must include #reviews (Customer Reviews)'
  )
  assert.ok(
    pageSource.includes('id="founder"'),
    'Page must include #founder (Founder Manohar Reddy single portrait & story)'
  )
  assert.ok(
    pageSource.includes('id="documents"'),
    'Page must include #documents (Required Documents)'
  )
  assert.ok(
    pageSource.includes('id="faq"'),
    'Page must include #faq (Frequently Asked Questions)'
  )
  assert.ok(
    pageSource.includes('id="contact"'),
    'Page must include #contact (Enquiry Form & Google Map)'
  )
  assert.ok(
    vjaSource.includes('Vasisth Enclave, Gandhinagar'),
    '/vijayawada branch page must include verified Gandhinagar address and local landmarks'
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

  assert.ok(css.includes('.three-pillars-grid'), 'globals.css must style .three-pillars-grid')
  assert.ok(css.includes('.worked-ledgers-grid'), 'globals.css must style .worked-ledgers-grid')
  assert.ok(css.includes('.reviews-grid'), 'globals.css must style .reviews-grid')
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
    '../components/GoldTouchstoneAssay.tsx',
    '../components/FloatingWhatsApp.tsx',
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

