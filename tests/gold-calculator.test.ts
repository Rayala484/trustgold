import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateGoldEstimate,
  buildEstimateWhatsAppUrl,
  GOLD_CATEGORIES,
  GOLD_TOUCHSTONE_MARKS,
  calculateTouchstoneBenchmarks,
} from '../lib/gold-calculator.ts'

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
  const css = await fs.readFile(new URL('../app/globals.css', import.meta.url), 'utf8')

  const navLinksMatch = css.match(/\.nav-links\s+a\s*\{[^}]*\}/)
  assert.ok(navLinksMatch && navLinksMatch[0].includes('white-space: nowrap'), '.nav-links a must include white-space: nowrap')

  const phonePillMatch = css.match(/\.nav-phone-pill\s*\{[^}]*\}/)
  assert.ok(phonePillMatch && phonePillMatch[0].includes('white-space: nowrap'), '.nav-phone-pill must include white-space: nowrap')

  const btnMatch = css.match(/\.btn\s*\{[^}]*\}/)
  assert.ok(btnMatch && btnMatch[0].includes('white-space: nowrap'), '.btn must include white-space: nowrap')
})

test('calculateTouchstoneBenchmarks computes accurate 1g, 1 Kasu (8g), 1 Tulam (10g), and 24g net payouts after 1% fee', () => {
  assert.equal(GOLD_TOUCHSTONE_MARKS.length, 4)

  // At ₹7,350/g for 22K (916 fineness), 99% net after 1% fee:
  const b916 = calculateTouchstoneBenchmarks(7350, 916)
  assert.equal(b916.effectiveRatePerGram, 7350)
  assert.equal(b916.oneGramNet, Math.round(7350 * 0.99))
  assert.equal(b916.oneSovereign8gNet, Math.round(7350 * 8 * 0.99))
  assert.equal(b916.oneTola10gNet, Math.round(7350 * 10 * 0.99))
  assert.equal(b916.threeSovereigns24gNet, Math.round(7350 * 24 * 0.99))
})

test('footer Follow Trust Gold section renders accessible SVG icon buttons and competitive visual upgrades', async () => {
  const fs = await import('node:fs/promises')
  const pageSource = await fs.readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
  const css = await fs.readFile(new URL('../app/globals.css', import.meta.url), 'utf8')

  assert.ok(pageSource.includes('social-icon-btn'), 'app/page.tsx must use .social-icon-btn for footer social icons')
  assert.ok(pageSource.includes('aria-label="Follow Trust Gold Services on Instagram"'), 'Instagram icon button must have accessible aria-label')
  assert.ok(pageSource.includes('aria-label="Follow Trust Gold Services on Facebook"'), 'Facebook icon button must have accessible aria-label')
  assert.ok(pageSource.includes('aria-label="Subscribe to Trust Gold Services on YouTube"'), 'YouTube icon button must have accessible aria-label')
  assert.ok(pageSource.includes('aria-label="Chat with Trust Gold Services on WhatsApp"'), 'WhatsApp icon button must have accessible aria-label')

  // Competitive web design upgrades & complete calculator removal rule:
  assert.ok(pageSource.includes('hero-showcase-stage'), 'Hero must feature the luxury .hero-showcase-stage centerpiece')
  assert.ok(!pageSource.includes('calculator-shell'), 'Page must NOT contain .calculator-shell anywhere')
  assert.ok(!pageSource.includes('id="calculator"'), 'Page must NOT contain #calculator section anywhere')
  const heroSectionBlock = pageSource.split('<section className="hero-vault">')[1]?.split('</section>')[0] ?? ''
  assert.ok(heroSectionBlock.includes('/images/hero.png'), 'Hero must showcase authentic /images/hero.png scale & touchstone photo')
  assert.ok(pageSource.includes('id="comparison"'), 'Page must include the #comparison section')
  assert.ok(pageSource.includes('trust-pillars-bento'), 'Page must include the 4-pillar .trust-pillars-bento grid in #comparison')
  assert.ok(pageSource.includes('PROCESS_TRACKS'), 'Process section must support 2-track switching (Direct Sale vs Pledged Release)')
  assert.ok(pageSource.includes('/images/about-shop.png'), 'Process section must showcase /images/about-shop.png branch interior')
  assert.ok(pageSource.includes('contact-map-frame'), 'Contact section must include embedded Google Map')

  assert.ok(css.includes('.social-icon-btn'), 'globals.css must style .social-icon-btn')
  assert.ok(css.includes('.scroll-progress'), 'globals.css must style .scroll-progress')
  assert.ok(css.includes('.gold-marquee-bar'), 'globals.css must style .gold-marquee-bar')
  assert.ok(css.includes('.spotlight-card'), 'globals.css must style .spotlight-card')
  assert.ok(css.includes('.parallax-media-wrap'), 'globals.css must style .parallax-media-wrap with absolute inset:0')
  assert.ok(css.includes('.comparison-table'), 'globals.css must style .comparison-table')
  assert.ok(css.includes('.trust-pillars-bento'), 'globals.css must style .trust-pillars-bento')
  assert.ok(css.includes('.hero-showcase-stage'), 'globals.css must style .hero-showcase-stage')
  assert.ok(!css.includes('html.motion-ok [data-reveal]'), 'globals.css must not hide sections at opacity:0 waiting for scroll')
})


