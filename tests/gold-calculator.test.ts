import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateGoldEstimate,
  buildEstimateWhatsAppUrl,
  GOLD_CATEGORIES,
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
