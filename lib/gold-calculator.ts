export type EstimateMode = 'direct-sale' | 'pledged-release'
export type GoldCategoryId = 'hallmark-22k' | 'mark-916' | 'other-unmarked'
export type GoldCategoryTier = GoldCategoryId
export type ValuationMethodId = 'direct' | 'melting'

export interface GoldCategory {
  id: GoldCategoryId
  number: string
  title: string
  name: string
  shortName: string
  teluguHint: string
  teluguName: string
  badge: string
  purityFactor: number
  purityDescription: string
  description: string
  valuationNote: string
  highlights: string[]
  examples: string[]
}

export const BUSINESS_INFO = {
  name: 'Trust Gold Services',
  shortName: 'Trust Gold',
  teluguTagline: 'మేము బంగారం కొంటాము',
  uspHeadline: 'Transparent Gold Buying. Customer’s Choice. Clear Value.',
  founderName: 'Manohar Reddy',
  founderRole: 'Founder & Managing Director',
  phone: '9393494455',
  phoneFormatted: '+91 93934 94455',
  phoneDisplay: '93934 94455',
  whatsappNumber: '919393494455',
  email: 'trustgoldservices@gmail.com',
  addressShort: 'First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada',
  addressFull:
    'First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada, Andhra Pradesh 520003',
  address: {
    line1: 'First Floor, Shop No. 5, Vasisth Enclave',
    line2: 'Gandhinagar',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    pin: '520003',
  },
  mapsUrl: 'https://maps.app.goo.gl/hkybjegfg9zumDPx6',
  hours: 'Monday – Saturday · 9:00 AM – 9:00 PM',
  regionServed: 'Vijayawada, Andhra Pradesh & Telangana',
  processingFeePercent: 1,
  socials: {
    instagram: 'https://www.instagram.com/trustgoldservices?utm_source=qr',
    facebook: 'https://www.facebook.com/share/1bgL24rnT9/?mibextid=wwXIfr',
    youtube: 'https://youtube.com/@trustgoldservices?si=hwW0_PeAESfY0t1x',
  },
} as const

export const GOLD_CATEGORIES: GoldCategory[] = [
  {
    id: 'hallmark-22k',
    number: '01',
    title: 'Hallmark 22K Jewellery',
    name: 'Hallmark 22K Jewellery (BIS 916 HUID)',
    shortName: 'Hallmark 22K',
    teluguHint: 'BIS 916 హాల్‌మార్క్ ఆభరణాలు',
    teluguName: 'హాల్‌మార్క్ 22K',
    badge: 'BIS 916 Certified',
    purityFactor: 1.0,
    purityDescription: '91.6% Fine Gold · Official BIS 916 & HUID Stamp',
    description:
      'Government BIS Hallmarked 22-Karat (916 HUID) ornaments. Verified in front of you for maximum benchmark rate.',
    valuationNote:
      'Government BIS Hallmarked 22-Karat (916 HUID) ornaments are verified on our open counter for the day’s Vijayawada 22K benchmark rate.',
    highlights: [
      'Instant BIS 916 hallmark & purity verification in your presence',
      '100% of live 22K market rate applied to net gold weight',
      'Zero hidden weight cuts — digital scale reading visible to you',
    ],
    examples: [
      'BIS 916 Hallmarked bridal necklaces, harams & bangles',
      'Modern 6-digit HUID laser-stamped 22K ornaments',
      '22K mangalsutra chains, rings & vaddanams (with or without bill)',
    ],
  },
  {
    id: 'mark-916',
    number: '02',
    title: 'Only 916 Mark Jewellery',
    name: 'Only 916 Mark Jewellery (KDM / Pre-HUID)',
    shortName: 'Only 916 Mark',
    teluguHint: '916 మార్క్ ఉన్న బంగారు ఆభరణాలు',
    teluguName: 'ఓన్లీ 916 మార్క్',
    badge: '916 Stamped',
    purityFactor: 1.0,
    purityDescription: 'Traditional 916 / KDM Stamp Without Modern HUID',
    description:
      'Jewellery carrying the traditional 916 stamp without HUID. Tested transparently on our precision analyzer right before your eyes.',
    valuationNote:
      'Pre-2021 ornaments carrying a 916 or KDM stamp are tested openly on our black Basanite touchstone and weighed after returning stones to you.',
    highlights: [
      'Open-counter purity verification with full calculation sheet',
      'Choose direct purchase or melting assay based on your comfort',
      'Stone or wax weight separated fairly with your approval',
    ],
    examples: [
      'Pre-HUID 916 stamped family jewellery & KDM ornaments',
      '916 rings, chains & earrings crafted by local jewellers',
      'Bank-pledged 916 ornaments released from gold loans',
    ],
  },
  {
    id: 'other-unmarked',
    number: '03',
    title: 'Other Marks or Unmarked Gold',
    name: 'Other Marks / Unmarked & Antique Gold',
    shortName: 'Other / Unmarked Gold',
    teluguHint: 'ఇతర మార్కులు / మార్క్ లేని పాత బంగారం',
    teluguName: 'అన్‌మార్క్డ్ / పాత బంగారం',
    badge: 'Custom Assay',
    purityFactor: 0.94,
    purityDescription: 'Ancestral, KDM, Broken, 18K–20K or Unmarked Gold',
    description:
      'Ancestral, KDM, broken, stone-studded, or unmarked gold ornaments. We test exact karat purity openly so you never guess its true worth.',
    valuationNote:
      'Unmarked or older family gold is tested in front of you (direct valuation or crucible melting at your choice) so you receive full value for its exact purity.',
    highlights: [
      'Exact karat reading explained in plain language before you decide',
      'Careful stone removal so you keep your stones and get full gold value',
      'Option to melt in your presence for 100% exact purity settlement',
    ],
    examples: [
      'Unmarked ancestral & heirloom family gold ornaments',
      'Broken gold pieces, single earrings & old sovereign kasulu',
      '18K, 20K, or worn-stamp gold jewellery',
    ],
  },
]

export const VALUATION_METHODS = [
  {
    id: 'direct' as ValuationMethodId,
    title: 'Direct Testing & Spot Purchase',
    teluguNote: 'నేరుగా కొనుగోలు (Direct Purchase)',
    summary:
      'Non-destructive purity testing and weighing in front of you. Best when you want an immediate quote and spot payment without melting.',
  },
  {
    id: 'melting' as ValuationMethodId,
    title: 'Melting in Your Presence',
    teluguNote: 'మీ సమక్షంలో మెల్టింగ్ (Melting Option)',
    summary:
      'If you ask for melting, we melt the ornament right in front of you and test the homogeneous bar for 100% exact net purity.',
  },
] as const

export interface EstimateInput {
  mode: EstimateMode
  categoryId: GoldCategoryId
  valuationMethod: ValuationMethodId
  weightGrams: number
  stoneWeightGrams: number
  ratePerGram22k: number
  loanPayoffAmount: number
}

export interface EstimateResult {
  mode: EstimateMode
  category: GoldCategory
  valuationMethod: ValuationMethodId
  valuationMethodLabel: string
  grossWeightGrams: number
  stoneWeightGrams: number
  netWeightGrams: number
  effectiveRatePerGram: number
  grossValue: number
  processingFeePercent: number
  processingFee: number
  valueAfterFee: number
  loanPayoffAmount: number
  netCustomerPayout: number
}

export function calculateGoldEstimate(input: EstimateInput): EstimateResult {
  const category =
    GOLD_CATEGORIES.find((c) => c.id === input.categoryId) ?? GOLD_CATEGORIES[0]

  const grossWeightGrams = Math.max(0, Number(input.weightGrams) || 0)
  const stoneWeightGrams = Math.min(
    grossWeightGrams,
    Math.max(0, Number(input.stoneWeightGrams) || 0)
  )
  const netWeightGrams = Number((grossWeightGrams - stoneWeightGrams).toFixed(2))

  const baseRate = Math.max(0, Number(input.ratePerGram22k) || 0)
  const effectiveRatePerGram = Math.round(baseRate * category.purityFactor)

  const grossValue = Math.round(netWeightGrams * effectiveRatePerGram)
  const processingFeePercent = BUSINESS_INFO.processingFeePercent
  const processingFee = Math.round(grossValue * (processingFeePercent / 100))
  const valueAfterFee = Math.max(0, grossValue - processingFee)

  const loanPayoffAmount =
    input.mode === 'pledged-release'
      ? Math.max(0, Math.round(Number(input.loanPayoffAmount) || 0))
      : 0

  const netCustomerPayout = valueAfterFee - loanPayoffAmount

  const valuationMethodLabel =
    input.valuationMethod === 'melting'
      ? 'Melting in Presence'
      : 'Direct Valuation & Purchase'

  return {
    mode: input.mode,
    category,
    valuationMethod: input.valuationMethod,
    valuationMethodLabel,
    grossWeightGrams,
    stoneWeightGrams,
    netWeightGrams,
    effectiveRatePerGram,
    grossValue,
    processingFeePercent,
    processingFee,
    valueAfterFee,
    loanPayoffAmount,
    netCustomerPayout,
  }
}

export function formatINR(value: number): string {
  const abs = Math.abs(Math.round(value))
  const formatted = abs.toLocaleString('en-IN')
  return value < 0 ? `-₹${formatted}` : `₹${formatted}`
}

export function buildEstimateWhatsAppUrl(result: EstimateResult): string {
  const modeLabel =
    result.mode === 'pledged-release'
      ? 'Bank / NBFC Pledged Gold Release'
      : 'Direct Old Gold Sale'

  const lines = [
    `Hi Trust Gold Services, I used the calculator on your website and would like an estimate:`,
    ``,
    `• *Service:* ${modeLabel}`,
    `• *Jewellery Type:* ${result.category.title}`,
    `• *Preferred Valuation:* ${result.valuationMethodLabel}`,
    `• *Gross Weight:* ${result.grossWeightGrams}g (Stone/Deduction: ${result.stoneWeightGrams}g → Net: ${result.netWeightGrams}g)`,
    `• *Indicative Gross Value:* ${formatINR(result.grossValue)}`,
    `• *Processing Fee (${result.processingFeePercent}%):* ${formatINR(result.processingFee)}`,
  ]

  if (result.mode === 'pledged-release' && result.loanPayoffAmount > 0) {
    lines.push(`• *Bank Loan Closure Amount:* ${formatINR(result.loanPayoffAmount)}`)
    lines.push(`• *Estimated Net Balance to Me:* ${formatINR(result.netCustomerPayout)}`)
  } else {
    lines.push(`• *Estimated Spot Payout:* ${formatINR(result.netCustomerPayout)}`)
  }

  lines.push(``, `Please confirm today's live Vijayawada market rate and guide me.`)

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    lines.join('\n')
  )}`
}

export interface TouchstoneMark {
  id: string
  karat: string
  fineness: number
  purePercent: string
  teluguLabel: string
  title: string
  streakColor: string
  svgPath: string
  linkedCategoryId: GoldCategoryId
  assayMethod: string
  ornamentExamples: string
}

export const GOLD_TOUCHSTONE_MARKS: TouchstoneMark[] = [
  {
    id: '22k-916',
    karat: '22K',
    fineness: 916,
    purePercent: '91.6%',
    teluguLabel: '22 క్యారెట్ల 916 బంగారం',
    title: 'BIS 916 & 916-Stamped Ornaments',
    streakColor: '#e8b94f',
    svgPath: 'M8 46 C 46 34, 78 36, 112 24 S 162 16, 192 10',
    linkedCategoryId: 'hallmark-22k',
    assayMethod:
      'Verified via BIS HUID / 916 stamp check & non-destructive XRF purity reading right in front of you.',
    ornamentExamples:
      'Bridal harams, vaddanam, kasulaperu, bangles, chains & hallmarked family jewellery.',
  },
  {
    id: '24k-999',
    karat: '24K',
    fineness: 999,
    purePercent: '99.9%',
    teluguLabel: '24 క్యారెట్ల మేలిమి బంగారం (999)',
    title: '24K Coins, Bars & Biscuit Bullion',
    streakColor: '#f6c844',
    svgPath: 'M8 44 C 42 28, 72 38, 106 20 S 160 12, 192 8',
    linkedCategoryId: 'hallmark-22k',
    assayMethod:
      'Assayed for 999.0 fine gold purity and weighed on our calibrated 0.01g precision bullion scale.',
    ornamentExamples:
      'Bank gold coins, 999 bullion bars, Lakshmi coins & pure melted gold buttons.',
  },
  {
    id: '20k-850',
    karat: '20K–21K',
    fineness: 860,
    purePercent: '86.0%',
    teluguLabel: 'పాత తరం / KDM బంగారు ఆభరణాలు',
    title: 'Traditional Soldered & Unmarked Gold',
    streakColor: '#d4a353',
    svgPath: 'M8 48 C 44 38, 82 32, 116 26 S 164 18, 192 12',
    linkedCategoryId: 'other-unmarked',
    assayMethod:
      'Tested on black Basanite touchstone (గీటు రాయి) + analyzer, or melted in your presence for 100% exact net purity.',
    ornamentExamples:
      'Ancestral jewellery, non-hallmarked old ornaments, broken pieces & traditional KDM items.',
  },
  {
    id: '18k-750',
    karat: '18K',
    fineness: 750,
    purePercent: '75.0%',
    teluguLabel: '18 క్యారెట్ల రాళ్ల ఆభరణాలు (750)',
    title: 'Stone-Studded & Designer 18K Gold',
    streakColor: '#c29963',
    svgPath: 'M8 46 C 38 36, 76 38, 104 28 S 158 20, 192 14',
    linkedCategoryId: 'other-unmarked',
    assayMethod:
      'Stones & beads are carefully removed and returned to you; you are paid for 100% of the exact net gold fineness.',
    ornamentExamples:
      'CZ/stone-studded necklaces, diamond-mount frames, lightweight modern 18K jewellery.',
  },
]

export interface TouchstoneBenchmarkResult {
  fineness: number
  effectiveRatePerGram: number
  oneGramNet: number
  oneSovereign8gNet: number
  oneTola10gNet: number
  threeSovereigns24gNet: number
}

export function calculateTouchstoneBenchmarks(
  ratePerGram22k: number,
  fineness: number
): TouchstoneBenchmarkResult {
  const safe22kRate = Math.max(0, Number(ratePerGram22k) || 0)
  const safeFineness = Math.max(0, Math.min(999, Number(fineness) || 916))
  // Scale rate proportionally against 916 fineness benchmark
  const effectiveRatePerGram = Math.round((safe22kRate * safeFineness) / 916)
  const feeFactor = 1 - BUSINESS_INFO.processingFeePercent / 100

  return {
    fineness: safeFineness,
    effectiveRatePerGram,
    oneGramNet: Math.round(effectiveRatePerGram * 1 * feeFactor),
    oneSovereign8gNet: Math.round(effectiveRatePerGram * 8 * feeFactor),
    oneTola10gNet: Math.round(effectiveRatePerGram * 10 * feeFactor),
    threeSovereigns24gNet: Math.round(effectiveRatePerGram * 24 * feeFactor),
  }
}

export interface RequiredDocumentItem {
  id: string
  title: string
  teluguTitle: string
  subtitle: string
  description: string
  required: boolean
  forPledgedReleaseOnly: boolean
}

export const REQUIRED_DOCUMENTS: RequiredDocumentItem[] = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card',
    teluguTitle: 'ఆధార్ కార్డు',
    subtitle: 'Government Identity Proof (Mandatory)',
    description:
      'Original Aadhaar card of the ornament owner for transparent identity verification at our Gandhinagar counter.',
    required: true,
    forPledgedReleaseOnly: false,
  },
  {
    id: 'pan',
    title: 'PAN Card',
    teluguTitle: 'పాన్ కార్డు',
    subtitle: 'Tax & Bank Transfer KYC (Mandatory)',
    description:
      'Required for compliant billing and instant IMPS / NEFT / RTGS settlement directly to your bank account.',
    required: true,
    forPledgedReleaseOnly: false,
  },
  {
    id: 'purchase-bills',
    title: 'Purchase Bills (If Available)',
    teluguTitle: 'బంగారం కొన్న బిల్లులు (అందుబాటులో ఉంటే)',
    subtitle: 'Original Jewellery Invoices or Receipts',
    description:
      'Bring original jewellery shop bills if available. If your ornaments are ancestral or gifted without bills, we can still proceed after KYC and house verification.',
    required: false,
    forPledgedReleaseOnly: false,
  },
  {
    id: 'house-verification',
    title: 'House Verification',
    teluguTitle: 'హౌస్ వెరిఫికేషన్',
    subtitle: 'Standard Residence Confirmation',
    description:
      'Standard residence verification ensures every transaction is 100% genuine, legal, and safe for both you and our branch.',
    required: true,
    forPledgedReleaseOnly: false,
  },
  {
    id: 'security-cheques',
    title: '2 Security Cheques',
    teluguTitle: '2 సెక్యూరిటీ చెక్కులు',
    subtitle: 'For Bank / NBFC Pledged Gold Release',
    description:
      'Required when our team advances the loan closure funds at your bank or finance branch to release your pledged ornaments.',
    required: true,
    forPledgedReleaseOnly: true,
  },
]

export function validateLeadInput(input: {
  name: string
  phone: string
  serviceType: string
  weightGrams?: string
  message?: string
}): {
  valid: boolean
  errors: { name?: string; phone?: string; weightGrams?: string }
} {
  const errors: { name?: string; phone?: string; weightGrams?: string } = {}

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name (minimum 2 characters).'
  }

  const cleanPhone = (input.phone || '').replace(/\D/g, '')
  const normalizedPhone =
    cleanPhone.length === 12 && cleanPhone.startsWith('91')
      ? cleanPhone.slice(2)
      : cleanPhone

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.'
  }

  if (input.weightGrams && input.weightGrams.trim() !== '') {
    const w = Number(input.weightGrams)
    if (!Number.isFinite(w) || w < 0.5 || w > 10000) {
      errors.weightGrams = 'Please enter a weight between 0.5g and 10,000g.'
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}


