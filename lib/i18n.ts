export type Language = 'en' | 'te'

export interface WorkedLedgerRow {
  label: string
  value: string
  note?: string
  highlight?: boolean
}

export interface WorkedCalculationExample {
  id: string
  badge: string
  title: string
  scenario: string
  rows: WorkedLedgerRow[]
  finalLabel: string
  finalValue: string
  footnote: string
}

export interface TranslationContent {
  meta: {
    langName: string
    switchLabel: string
    topRibbonLocation: string
    topRibbonHours: string
    topRibbonChoice: string
    branchPageLink: string
  }
  nav: {
    services: string
    howItWorks: string
    whyTrustGold: string
    reviews: string
    contact: string
    callNow: string
    whatsappCta: string
    brandSub: string
  }
  hero: {
    badge: string
    headlineStart: string
    headlineGold: string
    headlineEnd: string
    lead: string
    whatsappCta: string
    callCta: string
    reassurance: string
    founderRole: string
    founderQuote: string
    metrics: Array<{ value: string; label: string }>
    stageTopBadge: string
    stageBottomTitle: string
    stageBottomText: string
  }
  trustPillars: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    items: Array<{
      index: string
      title: string
      subtitle: string
      description: string
      proof: string
    }>
  }
  services: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    sellGold: {
      badge: string
      title: string
      teluguSub: string
      lead: string
      points: string[]
      whatsappCta: string
      callCta: string
      whatsappPrefill: string
    }
    releaseGold: {
      badge: string
      title: string
      teluguSub: string
      lead: string
      points: string[]
      whatsappCta: string
      callCta: string
      whatsappPrefill: string
    }
    categoriesTag: string
    categoriesHeading: string
    categoriesSub: string
    categoriesCta: string
  }
  howItWorks: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    trackSellBtn: string
    trackReleaseBtn: string
    sellSteps: Array<{
      step: string
      title: string
      telugu: string
      description: string
    }>
    releaseSteps: Array<{
      step: string
      title: string
      telugu: string
      description: string
    }>
  }
  shopGallery: {
    tag: string
    heading: string
    lead: string
    badges: string[]
    counterPhotoCaption: string
    scalePhotoCaption: string
  }
  touchstone: {
    tag: string
    heading: string
    goldWords: string[]
    lead: string
    slabBadge: string
    slabHint: string
    footerScale: string
    footerStone: string
    footerChoice: string
    benchPrefix: string
    pureContentLabel: string
    howWeVerifyLabel: string
    commonOrnamentsLabel: string
    weightStandardsTitle: string
    weightStandardsFee: string
    whatsappBtnPrefix: string
    whatsappBtnSuffix: string
  }
  whyTrustGold: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    choiceBadge: string
    choiceTitle: string
    choiceTelugu: string
    choiceBody: string
    choiceDirectTitle: string
    choiceDirectDesc: string
    choiceMeltTitle: string
    choiceMeltDesc: string
    feeExplainTitle: string
    feeExplainLead: string
    feeFormulaSteps: Array<{
      label: string
      detail: string
    }>
    workedExamplesTitle: string
    workedExamplesDisclaimer: string
    examples: WorkedCalculationExample[]
    comparisonTitle: string
    comparisonRows: Array<{
      feature: string
      trustGold: string
      whyItMatters: string
    }>
  }
  reviews: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    transparencyNote: string
    items: Array<{
      name: string
      location: string
      serviceTag: string
      quote: string
    }>
    ctaPrompt: string
    ctaButton: string
  }
  founder: {
    tag: string
    heading: string
    goldWords: string[]
    portraitBadge: string
    portraitRole: string
    quote: string
    storyP1: string
    storyP2: string
    visionLabel: string
    visionTitle: string
    visionText: string
    missionLabel: string
    missionTitle: string
    missionPoints: string[]
    branchCardTitle: string
    addressLabel: string
    hoursLabel: string
    phoneLabel: string
    directionsBtn: string
  }
  documents: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    filterAll: string
    filterDirect: string
    filterPledge: string
    requiredBadge: string
    recommendedBadge: string
    pledgeOnlyBadge: string
    ReassuranceTitle: string
    ReassuranceBody: string
    ReassuranceCta: string
  }
  faq: {
    tag: string
    heading: string
    goldWords: string[]
    sub: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  contact: {
    tag: string
    heading: string
    goldWords: string[]
    lead: string
    addressTitle: string
    phoneTitle: string
    hoursTitle: string
    whatsappDirectBtn: string
    callDirectBtn: string
    formTitle: string
    formSub: string
    noObligationNote: string
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    serviceLabel: string
    serviceOptions: {
      sell: string
      release: string
      rateCheck: string
    }
    goldTypeLabel: string
    weightLabel: string
    weightPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitBtn: string
    submittingBtn: string
    orCallText: string
    errors: {
      name: string
      phone: string
      weight: string
    }
    successTitle: string
    successBody: string
    openWhatsappBtn: string
    resetBtn: string
  }
  footer: {
    description: string
    followLabel: string
    navHeading: string
    servicesHeading: string
    officeHeading: string
    vijayawadaBranchLink: string
    copyright: string
    tagline: string
  }
  mobileBar: {
    callLabel: string
    whatsappLabel: string
  }
}

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  en: {
    meta: {
      langName: 'English',
      switchLabel: 'తెలుగులో చదవండి',
      topRibbonLocation:
        'First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar, Vijayawada – 520003',
      topRibbonHours: 'Mon – Sat: 9:00 AM – 9:00 PM',
      topRibbonChoice: 'Direct Valuation or Melting — 100% Customer’s Choice',
      branchPageLink: 'Vijayawada Branch Guide',
    },
    nav: {
      services: 'Services',
      howItWorks: 'How It Works',
      whyTrustGold: 'Why Trust Gold',
      reviews: 'Reviews',
      contact: 'Contact',
      callNow: '93934 94455',
      whatsappCta: 'WhatsApp Valuation',
      brandSub: 'Vijayawada · 1% Processing Fee',
    },
    hero: {
      badge: 'GANDHINAGAR, VIJAYAWADA · OPEN-COUNTER GOLD BUYING & LOAN RELEASE',
      headlineStart: 'Sell Old Gold or Release Pledged Gold with',
      headlineGold: '99% Net Value',
      headlineEnd: 'in Your Presence.',
      lead: 'At Trust Gold Services, every ornament is tested and weighed on a calibrated 0.01g scale right in front of your eyes. Choose direct purchase or melting—we deduct only a transparent 1% processing fee and transfer your money on the spot.',
      whatsappCta: 'WhatsApp Valuation',
      callCta: 'Call 93934 94455',
      reassurance:
        'Free open-counter evaluation · Review our written offer before deciding · Zero obligation to sell',
      founderRole:
        'Founder, Trust Gold Services · Gandhinagar, Vijayawada',
      founderQuote:
        '“మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం.” Every gram is tested in front of you.',
      metrics: [
        {
          value: '1% Only',
          label: 'Transparent Processing Fee (Up to 99% Payout)',
        },
        {
          value: '100% Open',
          label: 'Touchstone & Weighing in Front of Your Eyes',
        },
        {
          value: 'Spot Pay',
          label: 'Instant Cash / UPI / IMPS / RTGS Settlement',
        },
      ],
      stageTopBadge: 'LIVE OPEN-COUNTER ASSAY · GANDHINAGAR',
      stageBottomTitle: 'Customer’s Choice: Direct Valuation or Melting',
      stageBottomText:
        'Stones and beads are carefully removed and returned to you before weighing net gold.',
    },
    trustPillars: {
      tag: 'Three Core Trust Pillars',
      heading: 'Why families in Vijayawada trust our counter before selling a single gram.',
      goldWords: ['trust', 'counter', 'gram.'],
      sub: 'No closed appraisal rooms, no arbitrary wastage cuts, and no pressure. You see every step of the purity test, scale reading, and rate calculation.',
      items: [
        {
          index: '01',
          title: 'Transparent Testing in Your Presence',
          subtitle: 'మీ కళ్ళ ముందే స్వచ్ఛత పరీక్ష',
          description:
            'We inspect BIS 916 HUID hallmarks and test purity on a black Basanite touchstone right across the counter. Whether you want direct valuation without melting or crucible melting in front of your eyes, the choice is 100% yours.',
          proof: 'Zero closed-room testing · Direct or Melting at your command',
        },
        {
          index: '02',
          title: 'Transparent Weighing & Stone Return',
          subtitle: 'రాళ్ళు తీసి మీకే తిరిగి ఇచ్చేస్తాం',
          description:
            'Non-gold stones, beads, wax, and threads are carefully removed and handed back to you first. Your pure gold is then weighed on a calibrated 0.01g digital scale angled directly toward you.',
          proof: '0.01g calibrated display · Removed stones returned to you',
        },
        {
          index: '03',
          title: 'Understandable Pricing & 1% Fee',
          subtitle: 'కేవలం 1% సర్వీస్ ఫీజు · 99% చెల్లింపు',
          description:
            'We multiply your verified net gold weight by the day’s Vijayawada market rate for its exact purity and deduct only a flat 1% processing fee. You receive a written breakdown before you decide to sell.',
          proof: 'Written payout calculation · Zero hidden wastage deductions',
        },
      ],
    },
    services: {
      tag: 'Two Core Services · సేవలు',
      heading: 'Whether your gold is in your hand or pledged in a bank, we make settlement simple.',
      goldWords: ['hand', 'bank,', 'simple.'],
      sub: 'Select the service you need below to message us directly on WhatsApp with a prefilled enquiry or speak to our Gandhinagar counter.',
      sellGold: {
        badge: 'SERVICE 01 · INSTANT SPOT SETTLEMENT',
        title: 'Sell Old Gold (Old Gold Purchase)',
        teluguSub: 'పాత బంగారం కొనుగోలు — మీ కళ్ళ ముందే పరీక్షించి తక్షణ పేమెంట్',
        lead: 'Turn old, broken, ancestral, or unused gold ornaments into immediate funds at today’s Vijayawada market rate with only a 1% processing fee.',
        points: [
          'We buy Hallmark 22K (916 HUID), Only 916 Mark, and Unmarked / Antique family gold.',
          'Direct valuation or melting in your presence—100% your choice.',
          'Stones & beads carefully removed and returned to you before net gold weighing.',
          'Instant payout via Cash (within statutory limits) or immediate Bank Transfer (UPI / IMPS / NEFT / RTGS).',
        ],
        whatsappCta: 'WhatsApp to Sell Old Gold',
        callCta: 'Call 93934 94455',
        whatsappPrefill:
          'Hi Trust Gold Services, I want to check today’s Vijayawada rate to Sell Old Gold. Please share the process and today’s per-gram rate.',
      },
      releaseGold: {
        badge: 'SERVICE 02 · BANK & NBFC LOAN SETTLEMENT',
        title: 'Release Pledged Gold & Pay the Balance',
        teluguSub: 'బ్యాంకు / ఫైనాన్స్‌లో తాకట్టు పెట్టిన బంగారం విడిపించి మిగులు చెల్లింపు',
        lead: 'Stop compounding interest or impending auctions. Our representative accompanies you to your bank or financier, settles the loan principal + interest, and pays you the surplus value.',
        points: [
          'We accompany you to any Bank, NBFC (Muthoot, Manappuram, IIFL, etc.) or authorised pawnbroker in Vijayawada.',
          'We pay the exact closure amount directly at the bank counter to release your ornaments.',
          'Your released gold is tested and weighed openly at our Gandhinagar office.',
          'Loan closure amount + 1% processing fee are deducted, and the remaining balance is transferred to you immediately.',
        ],
        whatsappCta: 'WhatsApp for Pledged Gold Release',
        callCta: 'Call for Loan Release Help',
        whatsappPrefill:
          'Hi Trust Gold Services, I need help releasing my Pledged Gold from a Bank / Finance company in Vijayawada and receiving the balance amount.',
      },
      categoriesTag: 'Accepted Gold Categories · మేము కొనుగోలు చేసే బంగారం రకాలు',
      categoriesHeading: 'We purchase all three categories of gold ornaments at fair purity-matched value.',
      categoriesSub:
        'Even if your jewellery is decades old, lacks a modern HUID stamp, or is slightly damaged, we evaluate its true karat fineness openly.',
      categoriesCta: 'Ask About This Category on WhatsApp',
    },
    howItWorks: {
      tag: '4-Step Valuation & Settlement Process',
      heading: 'From walking into our Gandhinagar counter to money in your account in 4 clear steps.',
      goldWords: ['Gandhinagar', '4', 'clear', 'steps.'],
      sub: 'Switch between our two tracks below to see exactly how a Direct Old Gold Sale or a Bank Pledged Gold Release works.',
      trackSellBtn: 'Track 1: Sell Old Gold (4 Steps)',
      trackReleaseBtn: 'Track 2: Release Pledged Gold (4 Steps)',
      sellSteps: [
        {
          step: '01',
          title: 'Walk-In & Open Inspection',
          telugu: 'బ్రాంచ్‌కు విచ్చేయండి',
          description:
            'Bring your gold ornaments and valid ID (Aadhaar & PAN) to our Gandhinagar, Vijayawada branch. We carefully remove any non-gold stones or beads and hand them back to you.',
        },
        {
          step: '02',
          title: 'Purity Testing in Your Presence',
          telugu: 'మీ కళ్ళ ముందే స్వచ్ఛత పరీక్ష',
          description:
            'We verify purity on our open counter using touchstone / hallmark verification. You choose whether you prefer direct valuation or crucible melting in front of your eyes.',
        },
        {
          step: '03',
          title: 'Written 99% Payout Offer',
          telugu: '1% ఫీజు మాత్రమే · రాతపూర్వక కొటేషన్',
          description:
            'We weigh the net gold on our 0.01g scale, multiply by the day’s Vijayawada market rate for that exact purity, and show you the written offer with only a 1% processing fee. Zero obligation until you approve.',
        },
        {
          step: '04',
          title: 'Instant Spot Payment & Receipt',
          telugu: 'తక్షణ పేమెంట్ (Cash / UPI / Bank)',
          description:
            'Once you accept the offer, we transfer your 99% net payout immediately via Cash, UPI, IMPS, NEFT, or RTGS and confirm it in your bank app before you leave.',
        },
      ],
      releaseSteps: [
        {
          step: '01',
          title: 'Bring Your Pledge Receipt / Loan Slip',
          telugu: 'తాకట్టు రసీదుతో సంప్రదించండి',
          description:
            'Visit our Gandhinagar office or WhatsApp your bank/NBFC gold loan receipt along with your Aadhaar, PAN, house verification details, and 2 security cheques.',
        },
        {
          step: '02',
          title: 'We Accompany You & Settle the Bank Loan',
          telugu: 'బ్యాంకు వద్ద లోన్ క్లియరెన్స్',
          description:
            'Our executive travels with you to your bank or finance branch in Vijayawada and pays the full principal + interest directly at the bank counter to release your pledged ornaments.',
        },
        {
          step: '03',
          title: 'Open Purity & Net Weight Assay',
          telugu: 'మీ సమక్షంలో తూకం & నాణ్యత నిర్ధారణ',
          description:
            'Back at our open counter, stones are returned to you and your released gold is weighed and tested in your presence (direct valuation or melting at your choice).',
        },
        {
          step: '04',
          title: 'Instant Surplus Balance Payout',
          telugu: 'మిగులు సొమ్ము తక్షణ చెల్లింపు',
          description:
            'From the 99% net gold value (after the 1% processing fee), we deduct the exact bank closure amount we paid on your behalf and transfer the entire remaining surplus to you on the spot.',
        },
      ],
    },
    shopGallery: {
      tag: 'Real Branch, Open Counter & Equipment · మా బ్రాంచ్ & పరికరాలు',
      heading: 'See our real Gandhinagar consultation counter and open weighing desk.',
      lead: 'We never take your ornaments behind a closed partition. Every touchstone test, stone removal, and 0.01g digital scale reading happens on the open desk directly in front of you and your family.',
      badges: [
        'Shop No. 5, First Floor, Vasisth Enclave, Gandhinagar',
        '0.01g Calibrated Digital Scale Facing Customer',
        '100% CCTV Monitored Open Desk',
      ],
      counterPhotoCaption:
        'Trust Gold Services consultation counter at Vasisth Enclave, Gandhinagar, Vijayawada.',
      scalePhotoCaption:
        'Open-counter calibrated digital weighing scale and traditional black Basanite touchstone (గీటు రాయి).',
    },
    touchstone: {
      tag: 'The Craft of Honest Gold Valuation · గీటు రాయి & 916 Assay',
      heading:
        'Every honest valuation begins with how gold reads on the stone and the scale.',
      goldWords: ['gold', 'stone', 'scale.'],
      lead: 'Before a single rupee is quoted, we test your ornament’s exact fineness in front of your eyes—from traditional Basanite touchstone streaks (గీటు రాయి) and BIS 916 HUID inspection to crucible melting at your choice. Tap any gold streak below to inspect how we verify each purity.',
      slabBadge: 'BLACK BASANITE TOUCHSTONE · గీటు రాయి పరీక్ష',
      slabHint: 'Tap a gold streak to inspect',
      footerScale: '0.01g Calibrated Scale',
      footerStone: 'Stones Returned to Customer',
      footerChoice: 'Direct or Crucible Melt Choice',
      benchPrefix: 'OPEN-COUNTER ASSAY BENCH',
      pureContentLabel: 'Pure Gold Content',
      howWeVerifyLabel: 'How We Verify This Gold in Your Presence',
      commonOrnamentsLabel: 'Common Ornaments in This Purity',
      weightStandardsTitle: 'Traditional Telugu Weight Standards We Value',
      weightStandardsFee: 'Flat 1% Processing Fee Only',
      whatsappBtnPrefix: 'Check Today’s Live',
      whatsappBtnSuffix: 'Rate on WhatsApp',
    },
    whyTrustGold: {
      tag: 'Why Trust Gold · Transparent 1% Fee & Worked Calculation',
      heading: 'How our 1% processing fee and 99% payout proposition actually work.',
      goldWords: ['1%', '99%', 'work.'],
      sub: 'Credibility comes from showing the exact math. Below is our Customer’s Choice guarantee and a step-by-step worked calculation for both selling old gold and releasing pledged gold.',
      choiceBadge: 'OUR SIGNATURE GUARANTEE · వినియోగదారుడి ఇష్టమే మా నిర్ణయం',
      choiceTitle: 'Direct Valuation or Melting — 100% Your Choice',
      choiceTelugu: '“మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం”',
      choiceBody:
        'Many families hesitate to sell gold because buyers force them to melt heirloom ornaments before quoting a price, leaving them unable to walk away. At Trust Gold Services, we never force melting.',
      choiceDirectTitle: 'Option A: Direct Purchase (No Melting)',
      choiceDirectDesc:
        'We inspect your hallmark / touchstone purity and purchase your ornaments directly without melting so you can review our written offer before any irreversible change.',
      choiceMeltTitle: 'Option B: Crucible Melting in Your Presence',
      choiceMeltDesc:
        'If you request melting for mixed or unmarked lots, we melt the gold right in front of your eyes and test the homogeneous bar openly.',
      feeExplainTitle: 'What is the 1% Fee Calculated Against?',
      feeExplainLead:
        'Our 1% processing fee is calculated strictly on the Gross Market Value of your verified net gold weight—with zero hidden wastage (తరుగు) or melting charges:',
      feeFormulaSteps: [
        {
          label: '1. Net Gold Weight',
          detail:
            'Gross ornament weight minus non-gold stones, beads, lac, or threads (which are carefully removed and returned to you).',
        },
        {
          label: '2. Gross Gold Value (100%)',
          detail:
            'Net Gold Weight × Today’s Vijayawada Market Rate for the verified purity (e.g., 22K / 916 or tested fineness).',
        },
        {
          label: '3. Less: 1% Processing Fee',
          detail:
            'Exactly 1% of the Gross Gold Value is deducted as our service and handling fee.',
        },
        {
          label: '4. Your Net Payout (99% Value)',
          detail:
            'You receive 99% of the Gross Gold Value directly (or 99% Net Value minus the exact bank loan closure amount for pledged gold releases).',
        },
      ],
      workedExamplesTitle: 'Worked Calculation Examples (Step-by-Step Math)',
      workedExamplesDisclaimer:
        'Illustrative Calculation Only: The examples below use a sample round rate of ₹7,000 per gram of 22K (916) gold so you can easily verify the 1% fee arithmetic. Actual offers at our Gandhinagar counter use the live Vijayawada bullion market rate at the exact time of evaluation.',
      examples: [
        {
          id: 'direct-sale-example',
          badge: 'WORKED EXAMPLE 01 · SELL OLD GOLD',
          title: 'Selling a 21.20g Gold Necklace (with 1.20g Stones)',
          scenario:
            'Suppose you bring a 22K (916 Hallmark) necklace weighing 21.20g gross, which contains 1.20g of stones that we remove and hand back to you.',
          rows: [
            {
              label: 'Gross Ornament Weight on Scale',
              value: '21.20 g',
            },
            {
              label: 'Less: Stones Removed & Returned to You',
              value: '− 1.20 g',
              note: 'Handed back to you in a pouch',
            },
            {
              label: 'Verified Net 22K (916) Gold Weight',
              value: '20.00 g',
              highlight: true,
            },
            {
              label: 'Sample Illustrative 22K Market Rate',
              value: '× ₹7,000 / g',
              note: 'Illustrative rate for calculation clarity',
            },
            {
              label: 'Gross Gold Market Value (100%)',
              value: '₹1,40,000',
            },
            {
              label: 'Less: Trust Gold 1% Processing Fee',
              value: '− ₹1,400',
              note: 'Flat 1% of ₹1,40,000 (Zero extra wastage cut)',
            },
          ],
          finalLabel: 'Net Spot Payout to Customer (99% Value)',
          finalValue: '₹1,38,600',
          footnote:
            'Paid immediately via Cash / UPI / IMPS / RTGS once you approve the written sheet.',
        },
        {
          id: 'pledge-release-example',
          badge: 'WORKED EXAMPLE 02 · RELEASE PLEDGED GOLD',
          title: 'Releasing 40.00g Pledged Gold from a Bank Loan',
          scenario:
            'Suppose 40.00g net of 22K (916) gold is pledged in a bank with ₹1,95,000 total principal + interest due to close the loan.',
          rows: [
            {
              label: 'Verified Net 22K (916) Gold Weight Released',
              value: '40.00 g',
            },
            {
              label: 'Sample Illustrative 22K Market Rate',
              value: '× ₹7,000 / g',
              note: 'Illustrative rate for calculation clarity',
            },
            {
              label: 'Gross Gold Market Value (100%)',
              value: '₹2,80,000',
            },
            {
              label: 'Less: Trust Gold 1% Processing Fee',
              value: '− ₹2,800',
              note: 'Flat 1% of ₹2,80,000',
            },
            {
              label: 'Net Gold Value After 1% Fee (99%)',
              value: '₹2,77,200',
              highlight: true,
            },
            {
              label: 'Less: Bank Loan Principal + Interest Paid by Us',
              value: '− ₹1,95,000',
              note: 'Paid directly at your bank counter',
            },
          ],
          finalLabel: 'Surplus Balance Paid to Customer on the Spot',
          finalValue: '₹82,200',
          footnote:
            'Your bank loan is closed in full and ₹82,200 surplus is transferred to your account.',
        },
      ],
      comparisonTitle: 'What We Commit to Before You Decide',
      comparisonRows: [
        {
          feature: 'Service & Processing Fee',
          trustGold: 'Flat 1% processing fee on verified gross gold value (99% payout)',
          whyItMatters: 'You know the exact deduction upfront before handing over ornaments.',
        },
        {
          feature: 'Direct Valuation vs. Melting',
          trustGold: '100% Customer’s Choice — Direct purchase or open melting',
          whyItMatters: 'Your ornaments are never melted without your explicit instruction.',
        },
        {
          feature: 'Stones, Beads & Gems',
          trustGold: 'Carefully removed in front of you and returned to you',
          whyItMatters: 'You keep your stones and pay zero arbitrary stone-weight penalties.',
        },
        {
          feature: 'Right to Review Offer',
          trustGold: 'Written rate & weight breakdown given before you commit',
          whyItMatters: 'Walk in for a free check and proceed only if you are happy with the value.',
        },
      ],
    },
    reviews: {
      tag: 'Customer Feedback · కస్టమర్ల అభిప్రాయాలు',
      heading: 'What families in Vijayawada say about our open-counter process.',
      goldWords: ['families', 'Vijayawada', 'open-counter'],
      sub: 'Customer feedback recorded from families who used our Gandhinagar branch for old gold sales and bank pledged loan releases.',
      transparencyNote:
        'Verified Counter Feedback from trustgoldservices.com · Want to verify our process yourself? Visit our Gandhinagar branch for a free, zero-obligation valuation.',
      items: [
        {
          name: 'Ramesh K.',
          location: 'Vijayawada',
          serviceTag: 'Sold Old Gold · Open Counter Valuation',
          quote:
            '“Very transparent process. They tested the gold right in front of me and gave the best market rate in Vijayawada. Instant account transfer!”',
        },
        {
          name: 'Lakshmi P.',
          location: 'Guntur / Vijayawada',
          serviceTag: 'Released Bank Pledged Gold',
          quote:
            '“I had gold pledged in a bank with high interest. Trust Gold Services cleared my loan smoothly and paid me the remaining balance immediately. Truly helpful!”',
        },
        {
          name: 'Suresh M.',
          location: 'Vijayawada',
          serviceTag: 'Direct Valuation · 1% Fee',
          quote:
            '“No hidden charges and very polite staff. They valued my old ornaments honestly with just a 1% fee as promised. Highly recommended.”',
        },
      ],
      ctaPrompt: 'Have questions before visiting our Gandhinagar office?',
      ctaButton: 'Chat with Our Counter on WhatsApp',
    },
    founder: {
      tag: 'Founder, Location & Hours · వ్యవస్థాపకులు & చిరునామా',
      heading: 'Built by Manohar Reddy to bring dignity and clarity to gold selling in Vijayawada.',
      goldWords: ['Manohar', 'Reddy', 'dignity', 'clarity'],
      portraitBadge: '100% Open-Counter Assurance',
      portraitRole: 'Founder · Gandhinagar, Vijayawada',
      quote:
        '“selling family gold or releasing a bank loan is an important financial moment. Every customer deserves to see the scale, understand the purity test, and receive their rightful value without confusion.”',
      storyP1:
        'Trust Gold Services is a trusted gold buying and pledged-gold assistance company based in Gandhinagar, Vijayawada, founded by Manohar Reddy. We help customers get the true market value for their gold through a simple, transparent, and quick process.',
      storyP2:
        'Whether you want to sell old gold or release pledged gold from banks or financiers, we test purity and weight directly in front of you, return removed stones to you, and provide instant payment with only a 1% processing fee.',
      visionLabel: 'OUR VISION · మా లక్ష్యం',
      visionTitle: 'Vijayawada’s Most Trusted Name in Gold Services',
      visionText:
        'To become the most trusted and transparent gold service provider in Vijayawada and surrounding regions by offering fair value and honest service to every customer.',
      missionLabel: 'OUR MISSION · మా నిబద్ధత',
      missionTitle: 'Four Commitments to Every Customer',
      missionPoints: [
        'Provide 100% transparent gold testing and weight checking in front of the customer.',
        'Help customers easily release pledged gold without financial stress.',
        'Offer maximum market value with minimal service charges (only 1%).',
        'Ensure instant, safe, and hassle-free payments.',
      ],
      branchCardTitle: 'Gandhinagar Branch, Vijayawada',
      addressLabel: 'Office Address',
      hoursLabel: 'Business Hours',
      phoneLabel: 'Direct Phone & WhatsApp',
      directionsBtn: 'Open in Google Maps',
    },
    documents: {
      tag: 'Required Documents Checklist · అవసరమైన పత్రాలు',
      heading: 'What to bring for a smooth 15-minute verification and settlement.',
      goldWords: ['15-minute', 'verification', 'settlement.'],
      sub: 'To keep every transaction 100% legal, safe, and compliant for both you and our branch, please bring the following documents.',
      filterAll: 'All Documents (5)',
      filterDirect: 'For Selling Old Gold',
      filterPledge: 'For Releasing Pledged Gold',
      requiredBadge: 'Mandatory KYC',
      recommendedBadge: 'If Available',
      pledgeOnlyBadge: 'For Pledged Release',
      ReassuranceTitle: 'Don’t have the original jewellery purchase bill?',
      ReassuranceBody:
        'Many ancestral or gifted family ornaments do not have original shop bills. Call or WhatsApp us—we can still evaluate your gold after standard Aadhaar & PAN KYC and residence verification.',
      ReassuranceCta: 'Confirm Your Documents on WhatsApp',
    },
    faq: {
      tag: 'Frequently Asked Questions · తరచుగా అడిగే ప్రశ్నలు',
      heading: 'Clear answers before you step into our Vijayawada branch.',
      goldWords: ['Clear', 'answers', 'Vijayawada'],
      sub: 'Everything you need to know about our 1% processing fee, direct purchase vs. melting, stone removal, and bank loan release.',
      items: [
        {
          question: 'Do you melt my gold ornaments, or do you buy them directly?',
          answer:
            'It is 100% your choice ("మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం"). If you prefer direct valuation without melting, we inspect the hallmark/touchstone purity and buy directly. If you ask for melting, we melt the gold in front of your eyes.',
        },
        {
          question: 'How is the 1% processing fee (99% payout) calculated?',
          answer:
            'First, non-gold stones and beads are carefully removed and returned to you. Next, we weigh the net gold on our 0.01g scale and multiply by the day’s Vijayawada market rate for its verified purity. From that 100% gross gold value, we deduct only a flat 1% processing fee and pay you the remaining 99%.',
        },
        {
          question: 'How do you release my gold pledged in a bank or finance company?',
          answer:
            'Bring your pledge receipt/loan slip and KYC documents to our Gandhinagar office. Our representative accompanies you to your bank or NBFC branch, pays the outstanding principal and interest directly at the bank counter to release your gold, tests the ornaments openly at our office, and transfers the remaining surplus value to you immediately.',
        },
        {
          question: 'What happens to stones, beads, or gems in my ornaments?',
          answer:
            'We never deduct arbitrary stone percentages from your gold weight. Instead, our technician carefully removes non-gold stones, beads, and wax in your presence and hands them right back to you before weighing your pure gold.',
        },
        {
          question: 'Can I walk away if I want time to think after seeing the valuation?',
          answer:
            'Yes, 100%. Our open-counter purity check and weight quotation are completely free of obligation. We hand you the written breakdown first so you can review the offer calmly before deciding.',
        },
        {
          question: 'What documents are required to sell old gold or release pledged gold?',
          answer:
            'Please bring your Aadhaar Card, PAN Card, and original purchase bills (if available). We also complete house verification. For bank/NBFC pledged gold release, please bring your pledge ticket and 2 security cheques.',
        },
      ],
    },
    contact: {
      tag: 'Visit or Enquire Now · సంప్రదించండి',
      heading: 'Get a transparent valuation or pledged loan release quote today.',
      goldWords: ['transparent', 'valuation', 'today.'],
      lead: 'Walk into our Gandhinagar, Vijayawada branch between 9:00 AM and 9:00 PM (Mon–Sat), call us directly, or send a quick WhatsApp enquiry below.',
      addressTitle: 'Gandhinagar Branch Address',
      phoneTitle: 'Direct Counter Phone & WhatsApp',
      hoursTitle: 'Working Hours',
      whatsappDirectBtn: 'Chat on WhatsApp Now',
      callDirectBtn: 'Call +91 93934 94455',
      formTitle: 'Quick Service Enquiry (Opens WhatsApp)',
      formSub:
        'Select your service and approximate gold weight. We will reply with today’s Vijayawada market rate and required steps.',
      noObligationNote:
        '100% Confidential · You can review our written offer at the counter before deciding.',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Srinivas Rao',
      phoneLabel: '10-Digit Mobile Number',
      phonePlaceholder: 'e.g. 98480 12345',
      serviceLabel: 'Select Service Needed',
      serviceOptions: {
        sell: 'Sell Old Gold (Instant Spot Payment)',
        release: 'Release Pledged Gold from Bank / Finance',
        rateCheck: 'Check Today’s Vijayawada Gold Rate',
      },
      goldTypeLabel: 'Ornament Category',
      weightLabel: 'Approximate Weight (Grams) — Optional',
      weightPlaceholder: 'e.g. 25',
      messageLabel: 'Bank Name / Additional Details (Optional)',
      messagePlaceholder:
        'Mention bank/NBFC name if releasing pledged gold, or any question...',
      submitBtn: 'Send Enquiry via WhatsApp',
      submittingBtn: 'Preparing WhatsApp Enquiry...',
      orCallText: 'Prefer speaking directly? Call',
      errors: {
        name: 'Please enter your name (minimum 2 characters).',
        phone: 'Please enter a valid 10-digit Indian mobile number.',
        weight: 'Please enter a valid weight between 0.5g and 10,000g.',
      },
      successTitle: 'Your Enquiry Summary is Ready',
      successBody:
        'Click the button below to open WhatsApp with your prefilled details and connect directly with our Gandhinagar counter.',
      openWhatsappBtn: 'Open WhatsApp with My Enquiry',
      resetBtn: 'Edit Details',
    },
    footer: {
      description:
        'Founded by Manohar Reddy in Gandhinagar, Vijayawada. We buy old gold ornaments (Hallmark 22K, 916 Mark & Unmarked) and release pledged gold from banks and financiers with 100% open-counter testing and a flat 1% processing fee.',
      followLabel: 'Follow Trust Gold Services',
      navHeading: 'Quick Navigation',
      servicesHeading: 'Our Services',
      officeHeading: 'Vijayawada Office',
      vijayawadaBranchLink: 'Vijayawada Branch & Directions (/vijayawada)',
      copyright: 'Trust Gold Services, Vijayawada. All rights reserved.',
      tagline: 'Transparent Gold Buying · Customer’s Choice · Clear Value.',
    },
    mobileBar: {
      callLabel: 'Call 93934 94455',
      whatsappLabel: 'WhatsApp Valuation',
    },
  },

  te: {
    meta: {
      langName: 'తెలుగు',
      switchLabel: 'Switch to English',
      topRibbonLocation:
        'ఫస్ట్ ఫ్లోర్, షాప్ నెం. 5, వశిష్ట ఎన్‌క్లేవ్, గాంధీనగర్, విజయవాడ – 520003',
      topRibbonHours: 'సోమ – శని: ఉదయం 9:00 – రాత్రి 9:00',
      topRibbonChoice:
        'మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం',
      branchPageLink: 'విజయవాడ బ్రాంచ్ వివరాలు',
    },
    nav: {
      services: 'సేవలు',
      howItWorks: 'పనిచేసే విధానం',
      whyTrustGold: 'మా ప్రత్యేకత (1% ఫీజు)',
      reviews: 'కస్టమర్ల అభిప్రాయాలు',
      contact: 'సంప్రదించండి',
      callNow: '93934 94455',
      whatsappCta: 'వాట్సాప్ విలువ నిర్ధారణ',
      brandSub: 'విజయవాడ · కేవలం 1% సర్వీస్ ఫీజు',
    },
    hero: {
      badge: 'గాంధీనగర్, విజయవాడ · పాత బంగారం కొనుగోలు & తాకట్టు బంగారం విడిపింపు',
      headlineStart: 'మీ కళ్ళ ముందే పారదర్శక పరీక్షతో మీ బంగారానికి',
      headlineGold: '99% నికర విలువ',
      headlineEnd: 'తక్షణమే పొందండి.',
      lead: 'ట్రస్ట్ గోల్డ్ సర్వీసెస్‌లో ప్రతి ఆభరణం మీ కళ్ళ ముందే 0.01g డిజిటల్ స్కేల్‌పై తూకం వేసి పరీక్షించబడుతుంది. మెల్టింగ్ లేదా డైరెక్ట్ కొనుగోలు పూర్తిగా మీ ఇష్టం — కేవలం 1% సర్వీస్ ఫీజు మాత్రమే తగ్గించి స్పాట్ పేమెంట్ అందిస్తాం.',
      whatsappCta: 'వాట్సాప్‌లో సంప్రదించండి',
      callCta: 'కాల్: 93934 94455',
      reassurance:
        'ఉచిత ఓపెన్-కౌంటర్ పరీక్ష · ముందుగా రాతపూర్వక కొటేషన్ చూడండి · అమ్మాలనే ఒత్తిడి లేదు',
      founderRole: 'వ్యవస్థాపకులు, ట్రస్ట్ గోల్డ్ సర్వీసెస్ · గాంధీనగర్, విజయవాడ',
      founderQuote:
        '“మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం.” ప్రతి గ్రాము మీ సమక్షంలోనే పరీక్షిస్తాం.',
      metrics: [
        {
          value: '1% మాత్రమే',
          label: 'పారదర్శక సర్వీస్ ఫీజు (99% వరకు చెల్లింపు)',
        },
        {
          value: '100% ఓపెన్',
          label: 'మీ కళ్ళ ముందే గీటు రాయి & డిజిటల్ తూకం',
        },
        {
          value: 'తక్షణ పేమెంట్',
          label: 'Cash / UPI / IMPS / RTGS ద్వారా స్పాట్ సెటిల్మెంట్',
        },
      ],
      stageTopBadge: 'ఓపెన్-కౌంటర్ పరీక్ష · గాంధీనగర్, విజయవాడ',
      stageBottomTitle: 'కస్టమర్ ఛాయిస్: డైరెక్ట్ కొనుగోలు లేదా మెల్టింగ్',
      stageBottomText:
        'ఆభరణాలలోని రాళ్ళు, పూసలు జాగ్రత్తగా తీసి ముందుగా మీకే తిరిగి ఇచ్చేస్తాం.',
    },
    trustPillars: {
      tag: 'మా 3 ప్రధాన నమ్మక స్తంభాలు',
      heading: 'విజయవాడ కుటుంబాలు తమ బంగారం అమ్మే ముందు మా కౌంటర్‌ను ఎందుకు నమ్ముతారు?',
      goldWords: ['విజయవాడ', 'నమ్ముతారు?'],
      sub: 'లోపలి గదుల్లో రహస్య పరీక్షలు లేవు, అనవసర తరుగు కోతలు లేవు. స్వచ్ఛత పరీక్ష, తూకం మరియు రేటు లెక్కింపు అన్నీ మీ కళ్ళ ముందే జరుగుతాయి.',
      items: [
        {
          index: '01',
          title: 'మీ కళ్ళ ముందే పారదర్శక స్వచ్ఛత పరీక్ష',
          subtitle: 'Open-Counter Purity Testing',
          description:
            'BIS 916 HUID హాల్‌మార్క్ మరియు గీటు రాయి (Basanite Touchstone) పరీక్షలు మీ ముందే నిర్వహిస్తాం. ఆభరణం కరిగించకుండా డైరెక్ట్‌గా అమ్మాలా లేదా మీ ముందే మెల్టింగ్ చేయాలా అనేది 100% మీ ఇష్టం.',
          proof: 'రహస్య పరీక్షలు లేవు · డైరెక్ట్ లేదా మెల్టింగ్ మీ ఎంపికే',
        },
        {
          index: '02',
          title: 'పారదర్శక తూకం & రాళ్ళు తిరిగి ఇవ్వడం',
          subtitle: '0.01g Calibrated Weighing & Stone Return',
          description:
            'బంగారంలో ఉన్న రాళ్ళు, పూసలు, లక్క మొదలైనవి ముందుగా జాగ్రత్తగా తీసి మీ చేతికే తిరిగి ఇచ్చేస్తాం. ఆ తర్వాత నికర బంగారాన్ని మీ వైపు కనిపించే 0.01g డిజిటల్ స్కేల్‌పై తూకం వేస్తాం.',
          proof: '0.01g కచ్చితమైన స్కేల్ · రాళ్ళు మీకే తిరిగి ఇస్తాం',
        },
        {
          index: '03',
          title: 'స్పష్టమైన ధర లెక్కింపు & కేవలం 1% ఫీజు',
          subtitle: 'Clear Market Rate & Flat 1% Fee',
          description:
            'నికర బంగారం బరువును ఆ రోజు విజయవాడ మార్కెట్ రేటుతో గుణించి, కేవలం 1% సర్వీస్ ఫీజు మాత్రమే తగ్గిస్తాం. మీరు అమ్మాలని నిర్ణయించుకునే ముందే పూర్తి రాతపూర్వక లెక్క చూపిస్తాం.',
          proof: 'రాతపూర్వక కొటేషన్ · అదనపు తరుగు కోతలు లేవు',
        },
      ],
    },
    services: {
      tag: 'మా 2 ప్రధాన సేవలు · Core Services',
      heading: 'బంగారం మీ చేతిలో ఉన్నా లేదా బ్యాంకు తాకట్టులో ఉన్నా, నిమిషాల్లో సులభమైన పరిష్కారం.',
      goldWords: ['బ్యాంకు', 'తాకట్టులో', 'పరిష్కారం.'],
      sub: 'మీకు కావలసిన సేవను ఎంచుకుని వాట్సాప్ ద్వారా మెసేజ్ చేయండి లేదా మా గాంధీనగర్ బ్రాంచ్‌కు కాల్ చేయండి.',
      sellGold: {
        badge: 'సేవ 01 · తక్షణ స్పాట్ పేమెంట్',
        title: 'పాత బంగారం కొనుగోలు (Sell Old Gold)',
        teluguSub: 'హాల్‌మార్క్ 22K, 916 మార్క్ & అన్‌మార్క్డ్ బంగారానికి గరిష్ట మార్కెట్ ధర',
        lead: 'పాత బంగారు ఆభరణాలు, విరిగిన నగలు లేదా వాడని బంగారాన్ని ఈరోజు విజయవాడ మార్కెట్ రేటు ప్రకారం కేవలం 1% సర్వీస్ ఫీజుతో అమ్మి తక్షణమే డబ్బు పొందండి.',
        points: [
          'హాల్‌మార్క్ 22K (916 HUID), ఓన్లీ 916 మార్క్ మరియు అన్‌మార్క్డ్ / పాత తరపు బంగారం కొంటాము.',
          'డైరెక్ట్ కొనుగోలు లేదా మీ ముందే మెల్టింగ్ — పూర్తిగా మీ ఇష్టం.',
          'రాళ్ళు, పూసలు జాగ్రత్తగా తీసి ముందుగా మీకే తిరిగి ఇచ్చేస్తాం.',
          'Cash (నిబంధనల మేరకు) లేదా UPI / IMPS / NEFT / RTGS ద్వారా తక్షణ బ్యాంక్ బదిలీ.',
        ],
        whatsappCta: 'పాత బంగారం అమ్మడానికి వాట్సాప్ చేయండి',
        callCta: 'కాల్: 93934 94455',
        whatsappPrefill:
          'నమస్కారం Trust Gold Services, నేను పాత బంగారం అమ్మాలనుకుంటున్నాను. ఈరోజు విజయవాడ గ్రాము రేటు మరియు వివరాలు తెలుపగలరు.',
      },
      releaseGold: {
        badge: 'సేవ 02 · బ్యాంకు & ఫైనాన్స్ లోన్ క్లియరెన్స్',
        title: 'తాకట్టు బంగారం విడిపింపు (Release Pledged Gold)',
        teluguSub: 'బ్యాంకు / NBFC లోన్ మేమే కట్టి, విడిపించి మిగులు డబ్బు మీకు చెల్లిస్తాం',
        lead: 'బ్యాంకు వడ్డీలు పెరిగిపోతున్నాయా లేదా వేలం నోటీసులు వచ్చాయా? మా సిబ్బంది మీతో పాటు బ్యాంకుకు వచ్చి లోన్ అసలు + వడ్డీ కట్టి బంగారం విడిపిస్తారు.',
        points: [
          'విజయవాడలోని ఏ బ్యాంకు, NBFC (Muthoot, Manappuram, IIFL మొదలైనవి) లేదా ఫైనాన్స్ సంస్థకైనా మా ప్రతినిధి మీతో వస్తారు.',
          'బ్యాంకు కౌంటర్ వద్ద లోన్ బకాయిని మేమే నేరుగా చెల్లించి మీ ఆభరణాలను విడిపిస్తాం.',
          'మా గాంధీనగర్ ఆఫీస్‌లో మీ సమక్షంలోనే బంగారం నాణ్యత, నికర బరువు పరీక్షిస్తాం.',
          'లోన్ చెల్లింపు మొత్తం + 1% సర్వీస్ ఫీజు మినహాయించి, మిగిలిన నికర సొమ్మును తక్షణమే మీ ఖాతాకు జమ చేస్తాం.',
        ],
        whatsappCta: 'తాకట్టు బంగారం విడిపించడానికి వాట్సాప్',
        callCta: 'లోన్ రిలీజ్ కోసం కాల్ చేయండి',
        whatsappPrefill:
          'నమస్కారం Trust Gold Services, బ్యాంకు / ఫైనాన్స్‌లో తాకట్టు పెట్టిన నా బంగారాన్ని విడిపించి మిగులు డబ్బు పొందే విధానం తెలుపగలరు.',
      },
      categoriesTag: 'మేము కొనుగోలు చేసే 3 రకాల బంగారం · Gold Categories',
      categoriesHeading: 'మూడు రకాల బంగారు ఆభరణాలను వాటి నిజమైన నాణ్యత ప్రకారం కొనుగోలు చేస్తాం.',
      categoriesSub:
        'మీ ఆభరణాలపై HUID ముద్ర ఉన్నా లేకపోయినా, పాత తరపు బంగారమైనా మీ కళ్ళ ముందే స్వచ్ఛత పరీక్షించి సరైన ధర అందిస్తాం.',
      categoriesCta: 'ఈ రకం బంగారం గురించి వాట్సాప్ చేయండి',
    },
    howItWorks: {
      tag: '4 సులభమైన దశల్లో ప్రక్రియ · 4-Step Process',
      heading: 'మా గాంధీనగర్ బ్రాంచ్‌కు వచ్చినప్పటి నుండి మీ ఖాతాలో డబ్బు పడే వరకు 4 స్పష్టమైన దశలు.',
      goldWords: ['గాంధీనగర్', '4', 'స్పష్టమైన', 'దశలు.'],
      sub: 'పాత బంగారం అమ్మకం లేదా తాకట్టు బంగారం విడిపింపు ఎలా జరుగుతుందో చూడటానికి క్రింది ట్రాక్‌లను ఎంచుకోండి.',
      trackSellBtn: 'ట్రాక్ 1: పాత బంగారం అమ్మకం (4 దశలు)',
      trackReleaseBtn: 'ట్రాక్ 2: తాకట్టు బంగారం విడిపింపు (4 దశలు)',
      sellSteps: [
        {
          step: '01',
          title: 'బ్రాంచ్ సందర్శన & రాళ్ళు తిరిగి ఇవ్వడం',
          telugu: 'Step 1 · Walk-In & Stone Return',
          description:
            'మీ బంగారు ఆభరణాలు మరియు ఆధార్, పాన్ కార్డుతో గాంధీనగర్ బ్రాంచ్‌కు రండి. ఆభరణాలలోని రాళ్ళు, పూసలు జాగ్రత్తగా తీసి ముందుగా మీకే ఇచ్చేస్తాం.',
        },
        {
          step: '02',
          title: 'మీ సమక్షంలోనే స్వచ్ఛత పరీక్ష',
          telugu: 'Step 2 · Purity Check in Your Presence',
          description:
            'ఓపెన్ కౌంటర్‌పై గీటు రాయి / హాల్‌మార్క్ పరీక్ష నిర్వహిస్తాం. డైరెక్ట్ కొనుగోలు కావాలా లేదా మీ ముందే మెల్టింగ్ చేయాలా అనేది మీరే నిర్ణయించవచ్చు.',
        },
        {
          step: '03',
          title: 'రాతపూర్వక 99% పేమెంట్ కొటేషన్',
          telugu: 'Step 3 · Written 99% Payout Offer',
          description:
            '0.01g స్కేల్‌పై నికర బరువు తూచి, ఆ రోజు విజయవాడ మార్కెట్ రేటుతో లెక్కించి, కేవలం 1% సర్వీస్ ఫీజుతో రాతపూర్వక కొటేషన్ చూపిస్తాం.',
        },
        {
          step: '04',
          title: 'తక్షణ స్పాట్ పేమెంట్',
          telugu: 'Step 4 · Instant Spot Settlement',
          description:
            'మీరు అంగీకరించిన వెంటనే Cash లేదా UPI / IMPS / NEFT / RTGS ద్వారా 99% నికర సొమ్మును మీ ముందే బదిలీ చేస్తాం.',
        },
      ],
      releaseSteps: [
        {
          step: '01',
          title: 'తాకట్టు రసీదు & పత్రాల పరిశీలన',
          telugu: 'Step 1 · Pledge Ticket Verification',
          description:
            'మీ బ్యాంకు/ఫైనాన్స్ తాకట్టు రసీదు, ఆధార్, పాన్, హౌస్ వెరిఫికేషన్ వివరాలు మరియు 2 సెక్యూరిటీ చెక్కులతో మా ఆఫీస్‌ను సంప్రదించండి.',
        },
        {
          step: '02',
          title: 'బ్యాంకు వద్ద లోన్ బకాయి చెల్లింపు',
          telugu: 'Step 2 · Bank Loan Closure by Our Team',
          description:
            'మా ప్రతినిధి మీతో పాటు బ్యాంకు లేదా ఫైనాన్స్ బ్రాంచ్‌కు వచ్చి, అసలు + వడ్డీ మొత్తాన్ని నేరుగా కౌంటర్‌లో చెల్లించి మీ ఆభరణాలను విడిపిస్తారు.',
        },
        {
          step: '03',
          title: 'ఓపెన్ కౌంటర్‌లో తూకం & నాణ్యత నిర్ధారణ',
          telugu: 'Step 3 · Open Weighing & Purity Check',
          description:
            'మా ఆఫీస్‌లో రాళ్ళు వేరు చేసి మీకు తిరిగి ఇచ్చి, నికర బంగారాన్ని మీ కళ్ళ ముందే తూకం వేసి పరీక్షిస్తాం.',
        },
        {
          step: '04',
          title: 'మిగులు సొమ్ము తక్షణ చెల్లింపు',
          telugu: 'Step 4 · Surplus Balance Payout',
          description:
            '99% నికర బంగారం విలువ నుండి మేము బ్యాంకులో కట్టిన లోన్ మొత్తాన్ని మినహాయించి, మిగిలిన పూర్తి డబ్బును వెంటనే మీకు చెల్లిస్తాం.',
        },
      ],
    },
    shopGallery: {
      tag: 'మా గాంధీనగర్ బ్రాంచ్ & ఓపెన్ కౌంటర్ · Real Office & Equipment',
      heading: 'మా గాంధీనగర్ ఆఫీస్ కౌంటర్ మరియు డిజిటల్ తూకం పరికరాలను చూడండి.',
      lead: 'మీ ఆభరణాలను మేము ఎప్పుడూ లోపలి గదుల్లోకి తీసుకెళ్ళము. ప్రతి గీటు రాయి పరీక్ష, రాళ్ళు తీయడం మరియు 0.01g డిజిటల్ తూకం మీ కళ్ళ ముందే ఉన్న ఓపెన్ టేబుల్‌పై జరుగుతాయి.',
      badges: [
        'షాప్ నెం. 5, ఫస్ట్ ఫ్లోర్, వశిష్ట ఎన్‌క్లేవ్, గాంధీనగర్',
        'కస్టమర్‌కు కనిపించే 0.01g క్యాలిబ్రేటెడ్ డిజిటల్ స్కేల్',
        '100% CCTV పర్యవేక్షణలో ఓపెన్ కౌంటర్',
      ],
      counterPhotoCaption:
        'విజయవాడ గాంధీనగర్ వశిష్ట ఎన్‌క్లేవ్‌లోని ట్రస్ట్ గోల్డ్ సర్వీసెస్ కన్సల్టేషన్ కౌంటర్.',
      scalePhotoCaption:
        'ఓపెన్-కౌంటర్ డిజిటల్ తూకం మిషన్ మరియు సాంప్రదాయ గీటు రాయి (Black Basanite Touchstone).',
    },
    touchstone: {
      tag: 'నిజాయితీ గల బంగారం విలువ నిర్ధారణ · గీటు రాయి & 916 పరీక్ష',
      heading: 'ప్రతి నిజాయితీ గల విలువ నిర్ధారణ గీటు రాయి మరియు తూకం నుండే మొదలవుతుంది.',
      goldWords: ['నిజాయితీ', 'గీటు', 'రాయి', 'తూకం'],
      lead: 'ధర చెప్పే ముందే మీ ఆభరణం యొక్క కచ్చితమైన క్యారెట్ స్వచ్ఛతను మీ కళ్ళ ముందే పరీక్షిస్తాం. క్రింద ఉన్న ఏదైనా బంగారు గీతపై క్లిక్ చేసి ఆ నాణ్యతను మేము ఎలా నిర్ధారిస్తామో చూడండి.',
      slabBadge: 'గీటు రాయి పరీక్ష · BLACK BASANITE TOUCHSTONE',
      slabHint: 'వివరాల కోసం ఏదైనా బంగారు గీతపై నొక్కండి',
      footerScale: '0.01g డిజిటల్ స్కేల్',
      footerStone: 'రాళ్ళు మీకే తిరిగి ఇస్తాం',
      footerChoice: 'డైరెక్ట్ లేదా మెల్టింగ్ మీ ఇష్టం',
      benchPrefix: 'ఓపెన్-కౌంటర్ పరీక్షా వివరాలు',
      pureContentLabel: 'నికర బంగారం శాతం',
      howWeVerifyLabel: 'మీ సమక్షంలో మేము పరీక్షించే విధానం',
      commonOrnamentsLabel: 'ఈ రకంలో సాధారణంగా ఉండే ఆభరణాలు',
      weightStandardsTitle: 'తెలుగు సాంప్రదాయ బంగారం తూకం ప్రమాణాలు',
      weightStandardsFee: 'కేవలం 1% సర్వీస్ ఫీజు మాత్రమే',
      whatsappBtnPrefix: 'ఈరోజు',
      whatsappBtnSuffix: 'విజయవాడ రేటు వాట్సాప్‌లో అడగండి',
    },
    whyTrustGold: {
      tag: '1% ఫీజు వివరణ & లెక్కింపు ఉదాహరణ · Transparent Fee Methodology',
      heading: 'మా 1% సర్వీస్ ఫీజు మరియు 99% చెల్లింపు లెక్క ఎలా పనిచేస్తుందో స్పష్టంగా చూడండి.',
      goldWords: ['1%', '99%', 'స్పష్టంగా'],
      sub: 'నోటి మాటల కంటే స్పష్టమైన లెక్కే అసలైన నమ్మకం. మా కస్టమర్ ఛాయిస్ భరోసా మరియు పాత బంగారం అమ్మకం / తాకట్టు విడిపింపు లెక్కల ఉదాహరణలు క్రింద ఉన్నాయి.',
      choiceBadge: 'మా ప్రత్యేక వాగ్దానం · CUSTOMER’S CHOICE GUARANTEE',
      choiceTitle: 'డైరెక్ట్ కొనుగోలు లేదా మెల్టింగ్ — 100% మీ ఇష్టం',
      choiceTelugu: '“మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం”',
      choiceBody:
        'చాలా చోట్ల బంగారం కొనకముందే నగలను కరిగించాలని ఒత్తిడి చేస్తారు. కానీ ట్రస్ట్ గోల్డ్ సర్వీసెస్‌లో మీ అనుమతి లేకుండా ఆభరణాలను ఎప్పుడూ కరిగించము.',
      choiceDirectTitle: 'ఆప్షన్ A: కరిగించకుండా డైరెక్ట్ కొనుగోలు',
      choiceDirectDesc:
        'హాల్‌మార్క్ మరియు గీటు రాయి ద్వారా నాణ్యత పరీక్షించి, ఆభరణాలను కరిగించకుండానే నేరుగా కొనుగోలు చేస్తాం.',
      choiceMeltTitle: 'ఆప్షన్ B: మీ కళ్ళ ముందే మెల్టింగ్',
      choiceMeltDesc:
        'మీరు మెల్టింగ్ కావాలని కోరితే మాత్రమే, మీ కళ్ళ ముందే బంగారాన్ని కరిగించి కచ్చితమైన స్వచ్ఛత ఆధారంగా ధర చెల్లిస్తాం.',
      feeExplainTitle: '1% సర్వీస్ ఫీజు దేనిపై లెక్కించబడుతుంది?',
      feeExplainLead:
        'ఎలాంటి అదనపు తరుగు (Wastage) లేదా మెల్టింగ్ చార్జీలు లేకుండా, మీ నికర బంగారం యొక్క మొత్తం మార్కెట్ విలువపై మాత్రమే 1% ఫీజు లెక్కిస్తాం:',
      feeFormulaSteps: [
        {
          label: '1. నికర బంగారం బరువు (Net Weight)',
          detail:
            'ఆభరణం మొత్తం బరువు నుండి రాళ్ళు, పూసలు, లక్క తీసివేసి (వాటిని మీకే తిరిగి ఇచ్చి) నికర బంగారం బరువును 0.01g స్కేల్‌పై తూస్తాం.',
        },
        {
          label: '2. పూర్తి బంగారం విలువ (100% Gross Value)',
          detail:
            'నికర బంగారం బరువు × ఆ స్వచ్ఛతకు ఆ రోజు ఉన్న విజయవాడ మార్కెట్ రేటు.',
        },
        {
          label: '3. మైనస్: 1% సర్వీస్ ఫీజు',
          detail:
            'మొత్తం బంగారం విలువలో కేవలం 1% మాత్రమే మా ప్రాసెసింగ్ ఫీజుగా తగ్గించబడుతుంది.',
        },
        {
          label: '4. మీకు అందే నికర సొమ్ము (99% Payout)',
          detail:
            'మిగిలిన 99% విలువ నేరుగా మీకు చెల్లిస్తాం (తాకట్టు బంగారం అయితే 99% విలువ నుండి బ్యాంకు లోన్ బకాయి మినహాయించి మిగులు చెల్లిస్తాం).',
        },
      ],
      workedExamplesTitle: 'లెక్కింపు ఉదాహరణలు (Worked Calculation Examples)',
      workedExamplesDisclaimer:
        'గమనిక (ఉదాహరణ లెక్క మాత్రమే): 1% ఫీజు లెక్క సులభంగా అర్థం కావడానికి క్రింది ఉదాహరణలలో 22K (916) బంగారం ధర గ్రాముకు ₹7,000 గా చూపబడింది. వాస్తవ కొనుగోలు సమయంలో ఆ రోజు విజయవాడ మార్కెట్‌లో ఉన్న లైవ్ రేటు ప్రకారం లెక్కించబడుతుంది.',
      examples: [
        {
          id: 'direct-sale-example',
          badge: 'ఉదాహరణ 01 · పాత బంగారం అమ్మకం',
          title: '21.20 గ్రాముల బంగారు నెక్లెస్ అమ్మకం (1.20g రాళ్ళతో)',
          scenario:
            'మీరు 21.20g బరువున్న 22K (916) నెక్లెస్ తెచ్చారనుకుందాం. అందులో 1.20g రాళ్ళు తీసి మీకే తిరిగి ఇస్తాం.',
          rows: [
            {
              label: 'స్కేల్‌పై ఆభరణం మొత్తం బరువు',
              value: '21.20 g',
            },
            {
              label: 'మైనస్: తీసి మీకు తిరిగి ఇచ్చిన రాళ్ళ బరువు',
              value: '− 1.20 g',
              note: 'రాళ్ళు మీకే తిరిగి ఇవ్వబడతాయి',
            },
            {
              label: 'నికర 22K (916) బంగారం బరువు',
              value: '20.00 g',
              highlight: true,
            },
            {
              label: 'ఉదాహరణ 22K మార్కెట్ రేటు (గ్రాముకు)',
              value: '× ₹7,000 / g',
              note: 'లెక్క స్పష్టత కోసం ఉదాహరణ రేటు',
            },
            {
              label: 'పూర్తి బంగారం మార్కెట్ విలువ (100%)',
              value: '₹1,40,000',
            },
            {
              label: 'మైనస్: ట్రస్ట్ గోల్డ్ 1% సర్వీస్ ఫీజు',
              value: '− ₹1,400',
              note: '₹1,40,000 పై 1% మాత్రమే (అదనపు తరుగు లేదు)',
            },
          ],
          finalLabel: 'కస్టమర్‌కు అందే నికర స్పాట్ పేమెంట్ (99% విలువ)',
          finalValue: '₹1,38,600',
          footnote:
            'మీరు కొటేషన్‌కు అంగీకరించిన వెంటనే Cash / UPI / IMPS / RTGS ద్వారా చెల్లించబడుతుంది.',
        },
        {
          id: 'pledge-release-example',
          badge: 'ఉదాహరణ 02 · తాకట్టు బంగారం విడిపింపు',
          title: 'బ్యాంకు లోన్ నుండి 40.00g తాకట్టు బంగారం విడిపింపు',
          scenario:
            'బ్యాంకులో 40.00g నికర 22K (916) బంగారం తాకట్టులో ఉండి, లోన్ క్లోజ్ చేయడానికి ₹1,95,000 అసలు + వడ్డీ కట్టాలనుకుందాం.',
          rows: [
            {
              label: 'విడిపించిన నికర 22K (916) బంగారం బరువు',
              value: '40.00 g',
            },
            {
              label: 'ఉదాహరణ 22K మార్కెట్ రేటు (గ్రాముకు)',
              value: '× ₹7,000 / g',
              note: 'లెక్క స్పష్టత కోసం ఉదాహరణ రేటు',
            },
            {
              label: 'పూర్తి బంగారం మార్కెట్ విలువ (100%)',
              value: '₹2,80,000',
            },
            {
              label: 'మైనస్: ట్రస్ట్ గోల్డ్ 1% సర్వీస్ ఫీజు',
              value: '− ₹2,800',
              note: '₹2,80,000 పై 1% మాత్రమే',
            },
            {
              label: '1% ఫీజు తర్వాత నికర బంగారం విలువ (99%)',
              value: '₹2,77,200',
              highlight: true,
            },
            {
              label: 'మైనస్: బ్యాంకులో మేము కట్టిన లోన్ బకాయి',
              value: '− ₹1,95,000',
              note: 'బ్యాంకు కౌంటర్‌లో నేరుగా చెల్లింపు',
            },
          ],
          finalLabel: 'కస్టమర్‌కు తక్షణమే అందే మిగులు సొమ్ము',
          finalValue: '₹82,200',
          footnote:
            'మీ బ్యాంకు లోన్ పూర్తిగా క్లోజ్ అవుతుంది మరియు మిగులు ₹82,200 మీ ఖాతాకు జమ అవుతుంది.',
        },
      ],
      comparisonTitle: 'మీరు నిర్ణయించుకునే ముందే మేము ఇచ్చే 4 హామీలు',
      comparisonRows: [
        {
          feature: 'సర్వీస్ & ప్రాసెసింగ్ ఫీజు',
          trustGold: 'నికర బంగారం విలువపై కేవలం 1% ఫీజు మాత్రమే (99% చెల్లింపు)',
          whyItMatters: 'ఎలాంటి రహస్య కోతలు లేకుండా ముందే పూర్తి లెక్క తెలుస్తుంది.',
        },
        {
          feature: 'డైరెక్ట్ కొనుగోలు vs మెల్టింగ్',
          trustGold: '100% కస్టమర్ ఛాయిస్ — డైరెక్ట్ కొనుగోలు లేదా మీ ముందే మెల్టింగ్',
          whyItMatters: 'మీ అనుమతి లేకుండా మీ ఆభరణాలను ఎప్పుడూ కరిగించము.',
        },
        {
          feature: 'రాళ్ళు & పూసల వాపసు',
          trustGold: 'మీ కళ్ళ ముందే జాగ్రత్తగా తీసి మీ చేతికే తిరిగి ఇచ్చేస్తాం',
          whyItMatters: 'రాళ్ళ బరువు పేరుతో బంగారం బరువులో కోత పడదు.',
        },
        {
          feature: 'ఆలోచించుకునే పూర్తి స్వేచ్ఛ',
          trustGold: 'ముందుగా రాతపూర్వక కొటేషన్ ఇస్తాం — నచ్చితేనే అమ్మవచ్చు',
          whyItMatters: 'ఉచితంగా విలువ తెలుసుకుని, సంతృప్తి చెందితేనే ముందుకు వెళ్ళవచ్చు.',
        },
      ],
    },
    reviews: {
      tag: 'కస్టమర్ల అభిప్రాయాలు · Customer Feedback',
      heading: 'మా ఓపెన్-కౌంటర్ ప్రక్రియ గురించి విజయవాడ కస్టమర్లు ఏమంటున్నారు.',
      goldWords: ['ఓపెన్-కౌంటర్', 'విజయవాడ', 'కస్టమర్లు'],
      sub: 'పాత బంగారం అమ్మకం మరియు బ్యాంకు తాకట్టు బంగారం విడిపింపు కోసం మా గాంధీనగర్ బ్రాంచ్‌ను సంప్రదించిన కస్టమర్ల అనుభవాలు.',
      transparencyNote:
        'trustgoldservices.com నుండి సేకరించిన కస్టమర్ అభిప్రాయాలు · స్వయంగా పరిశీలించాలనుకుంటున్నారా? ఉచిత విలువ నిర్ధారణ కోసం మా గాంధీనగర్ బ్రాంచ్‌కు విచ్చేయండి.',
      items: [
        {
          name: 'Ramesh K.',
          location: 'విజయవాడ',
          serviceTag: 'పాత బంగారం అమ్మకం · ఓపెన్ కౌంటర్ పరీక్ష',
          quote:
            '“చాలా పారదర్శకమైన విధానం. నా కళ్ళ ముందే బంగారాన్ని పరీక్షించి విజయవాడలో మంచి మార్కెట్ రేటు ఇచ్చారు. వెంటనే నా బ్యాంక్ ఖాతాకు డబ్బు బదిలీ చేశారు!”',
        },
        {
          name: 'Lakshmi P.',
          location: 'గుంటూరు / విజయవాడ',
          serviceTag: 'బ్యాంకు తాకట్టు బంగారం విడిపింపు',
          quote:
            '“బ్యాంకులో ఎక్కువ వడ్డీతో తాకట్టులో ఉన్న నా బంగారాన్ని ట్రస్ట్ గోల్డ్ సర్వీసెస్ వారు సులభంగా విడిపించి, మిగిలిన డబ్బును వెంటనే నాకు చెల్లించారు. చాలా సహాయపడ్డారు!”',
        },
        {
          name: 'Suresh M.',
          location: 'విజయవాడ',
          serviceTag: 'డైరెక్ట్ కొనుగోలు · 1% ఫీజు',
          quote:
            '“ఎలాంటి దాపరికం లేని చార్జీలు మరియు మర్యాదపూర్వకమైన సిబ్బంది. చెప్పినట్లే కేవలం 1% ఫీజుతో నా పాత ఆభరణాలకు నిజాయితీగా విలువ కట్టారు.”',
        },
      ],
      ctaPrompt: 'మా గాంధీనగర్ ఆఫీస్‌కు వచ్చే ముందు ఏవైనా సందేహాలు ఉన్నాయా?',
      ctaButton: 'వాట్సాప్‌లో మాతో చాట్ చేయండి',
    },
    founder: {
      tag: 'వ్యవస్థాపకులు, చిరునామా & పని వేళలు · Founder & Location',
      heading: 'విజయవాడలో బంగారం అమ్మకానికి పారదర్శకత తెచ్చేందుకు మనోహర్ రెడ్డి గారి ఆధ్వర్యంలో స్థాపించబడింది.',
      goldWords: ['మనోహర్', 'రెడ్డి', 'పారదర్శకత'],
      portraitBadge: '100% ఓపెన్-కౌంటర్ భరోసా',
      portraitRole: 'వ్యవస్థాపకులు · గాంధీనగర్, విజయవాడ',
      quote:
        '“కుటుంబ బంగారం అమ్మడం లేదా బ్యాంకు లోన్ విడిపించడం అనేది ఒక ముఖ్యమైన ఆర్థిక నిర్ణయం. ప్రతి కస్టమర్ తూకాన్ని స్వయంగా చూసి, స్వచ్ఛతను అర్థం చేసుకుని, తమ బంగారానికి సరైన విలువ పొందాలి.”',
      storyP1:
        'ట్రస్ట్ గోల్డ్ సర్వీసెస్ విజయవాడలోని గాంధీనగర్‌లో మనోహర్ రెడ్డి గారిచే స్థాపించబడిన విశ్వసనీయ పాత బంగారం కొనుగోలు మరియు తాకట్టు బంగారం విడిపింపు సంస్థ. సరళమైన, పారదర్శకమైన మరియు వేగవంతమైన ప్రక్రియ ద్వారా కస్టమర్లకు నిజమైన మార్కెట్ విలువను అందిస్తున్నాము.',
      storyP2:
        'పాత బంగారం అమ్మాలన్నా లేదా బ్యాంకు/ఫైనాన్స్ నుండి తాకట్టు బంగారం విడిపించాలన్నా, మీ కళ్ళ ముందే నాణ్యత మరియు బరువు పరీక్షించి, రాళ్ళు మీకే తిరిగి ఇచ్చి, కేవలం 1% సర్వీస్ ఫీజుతో తక్షణ పేమెంట్ అందిస్తాం.',
      visionLabel: 'మా లక్ష్యం · OUR VISION',
      visionTitle: 'విజయవాడలో అత్యంత నమ్మకమైన గోల్డ్ సర్వీస్ సంస్థ',
      visionText:
        'ప్రతి కస్టమర్‌కు సరైన విలువ మరియు నిజాయితీ గల సేవను అందించడం ద్వారా విజయవాడ మరియు పరిసర ప్రాంతాలలో అత్యంత నమ్మకమైన, పారదర్శకమైన గోల్డ్ సర్వీస్ ప్రొవైడర్‌గా నిలవడం.',
      missionLabel: 'మా నిబద్ధత · OUR MISSION',
      missionTitle: 'ప్రతి కస్టమర్‌కు మా 4 వాగ్దానాలు',
      missionPoints: [
        'కస్టమర్ కళ్ళ ముందే 100% పారదర్శకంగా బంగారం నాణ్యత మరియు తూకం పరీక్షించడం.',
        'ఎలాంటి ఆర్థిక ఒత్తిడి లేకుండా తాకట్టు పెట్టిన బంగారాన్ని సులభంగా విడిపించడం.',
        'అతి తక్కువ సర్వీస్ చార్జీతో (కేవలం 1%) గరిష్ట మార్కెట్ విలువను అందించడం.',
        'తక్షణమే, సురక్షితంగా మరియు ఇబ్బంది లేకుండా పేమెంట్ పూర్తి చేయడం.',
      ],
      branchCardTitle: 'గాంధీనగర్ బ్రాంచ్, విజయవాడ',
      addressLabel: 'ఆఫీస్ చిరునామా',
      hoursLabel: 'పని వేళలు',
      phoneLabel: 'ఫోన్ & వాట్సాప్ నంబర్',
      directionsBtn: 'గూగుల్ మ్యాప్స్‌లో చూడండి',
    },
    documents: {
      tag: 'అవసరమైన పత్రాలు · Required Documents',
      heading: '15 నిమిషాల్లో సులభమైన వెరిఫికేషన్ మరియు పేమెంట్ కోసం తీసుకురావలసిన పత్రాలు.',
      goldWords: ['15', 'నిమిషాల్లో', 'పత్రాలు.'],
      sub: 'ప్రతి లావాదేవీ చట్టబద్ధంగా మరియు సురక్షితంగా ఉండేందుకు దయచేసి క్రింది KYC పత్రాలను తీసుకురండి.',
      filterAll: 'అన్ని పత్రాలు (5)',
      filterDirect: 'పాత బంగారం అమ్మకానికి',
      filterPledge: 'తాకట్టు బంగారం విడిపింపుకు',
      requiredBadge: 'తప్పనిసరి KYC',
      recommendedBadge: 'అందుబాటులో ఉంటే',
      pledgeOnlyBadge: 'తాకట్టు విడిపింపుకు',
      ReassuranceTitle: 'బంగారం కొన్న అసలు బిల్లు (Purchase Bill) లేదా?',
      ReassuranceBody:
        'చాలా పాత తరపు లేదా బహుమతిగా వచ్చిన ఆభరణాలకు బిల్లులు ఉండకపోవచ్చు. మాకు కాల్ లేదా వాట్సాప్ చేయండి — ఆధార్, పాన్ KYC మరియు హౌస్ వెరిఫికేషన్ ద్వారా మేము మీ బంగారాన్ని కొనుగోలు చేయగలము.',
      ReassuranceCta: 'పత్రాల గురించి వాట్సాప్‌లో అడగండి',
    },
    faq: {
      tag: 'తరచుగా అడిగే ప్రశ్నలు · FAQs',
      heading: 'మా విజయవాడ బ్రాంచ్‌కు వచ్చే ముందు మీ సందేహాలకు స్పష్టమైన సమాధానాలు.',
      goldWords: ['స్పష్టమైన', 'సమాధానాలు.'],
      sub: '1% సర్వీస్ ఫీజు, డైరెక్ట్ కొనుగోలు vs మెల్టింగ్, రాళ్ళ వాపసు మరియు బ్యాంకు లోన్ రిలీజ్ గురించి పూర్తి వివరాలు.',
      items: [
        {
          question: 'నా బంగారాన్ని కరిగించి కొంటారా లేదా డైరెక్ట్‌గా కొంటారా?',
          answer:
            'అది 100% మీ ఇష్టం ("మెల్టింగ్ అడిగితే మెల్టింగ్ చేస్తాం — డైరెక్ట్‌గా కావాలంటే డైరెక్ట్‌గా కొంటాం"). మీరు కరిగించవద్దు అంటే హాల్‌మార్క్/గీటు రాయి ద్వారా పరీక్షించి డైరెక్ట్‌గా కొంటాం. మీరు మెల్టింగ్ కావాలని అడిగితే మీ కళ్ళ ముందే కరిగించి పరీక్షిస్తాం.',
        },
        {
          question: '1% సర్వీస్ ఫీజు (99% చెల్లింపు) ఎలా లెక్కిస్తారు?',
          answer:
            'ముందుగా ఆభరణంలోని రాళ్ళు, పూసలు తీసి మీకే తిరిగి ఇస్తాం. ఆపై నికర బంగారం బరువును ఆ రోజు విజయవాడ మార్కెట్ రేటుతో గుణిస్తాం. ఆ 100% విలువ నుండి కేవలం 1% సర్వీస్ ఫీజు మాత్రమే తగ్గించి మిగిలిన 99% సొమ్మును మీకు చెల్లిస్తాం.',
        },
        {
          question: 'బ్యాంకు లేదా ఫైనాన్స్‌లో తాకట్టు పెట్టిన బంగారాన్ని ఎలా విడిపిస్తారు?',
          answer:
            'మీ తాకట్టు రసీదు మరియు KYC పత్రాలతో మా గాంధీనగర్ ఆఫీస్‌కు రండి. మా ప్రతినిధి మీతో పాటు బ్యాంకుకు వచ్చి అసలు + వడ్డీ బకాయిని నేరుగా కౌంటర్‌లో చెల్లించి బంగారాన్ని విడిపిస్తారు. ఆపై మా ఆఫీస్‌లో పరీక్షించి మిగులు డబ్బును వెంటనే మీకు బదిలీ చేస్తారు.',
        },
        {
          question: 'ఆభరణాలలో ఉన్న రాళ్ళు లేదా పూసల బరువు ఏమవుతుంది?',
          answer:
            'రాళ్ళ పేరుతో బంగారం బరువులో అందాజా కోతలు వేయము. మీ కళ్ళ ముందే రాళ్ళు మరియు పూసలను జాగ్రత్తగా తీసి మీ చేతికే తిరిగి ఇచ్చేసి, నికర బంగారాన్ని మాత్రమే తూకం వేస్తాం.',
        },
        {
          question: 'కొటేషన్ చూసిన తర్వాత ఆలోచించుకుని నిర్ణయం తీసుకోవచ్చా?',
          answer:
            'తప్పకుండా! మా ఓపెన్-కౌంటర్ పరీక్ష మరియు రాతపూర్వక కొటేషన్ పూర్తిగా ఉచితం. మీకు ధర సంతృప్తికరంగా అనిపిస్తేనే అమ్మవచ్చు — ఎలాంటి ఒత్తిడి ఉండదు.',
        },
        {
          question: 'ఏయే పత్రాలు (Documents) తీసుకురావాలి?',
          answer:
            'ఆధార్ కార్డు, పాన్ కార్డు మరియు బంగారం బిల్లులు (అందుబాటులో ఉంటే) తీసుకురావాలి. హౌస్ వెరిఫికేషన్ కూడా చేస్తాము. తాకట్టు బంగారం విడిపింపు కోసం లోన్ రసీదు మరియు 2 సెక్యూరిటీ చెక్కులు అవసరం.',
        },
      ],
    },
    contact: {
      tag: 'ఇప్పుడే సంప్రదించండి · Visit or Enquire Now',
      heading: 'ఈరోజు విజయవాడ మార్కెట్ రేటు లేదా తాకట్టు విడిపింపు కొటేషన్ తెలుసుకోండి.',
      goldWords: ['విజయవాడ', 'మార్కెట్', 'రేటు'],
      lead: 'సోమవారం నుండి శనివారం వరకు (ఉదయం 9:00 – రాత్రి 9:00) మా గాంధీనగర్ బ్రాంచ్‌కు విచ్చేయండి, నేరుగా కాల్ చేయండి లేదా క్రింది ఫారమ్ ద్వారా వాట్సాప్ చేయండి.',
      addressTitle: 'గాంధీనగర్ బ్రాంచ్ చిరునామా',
      phoneTitle: 'డైరెక్ట్ ఫోన్ & వాట్సాప్',
      hoursTitle: 'పని వేళలు',
      whatsappDirectBtn: 'వాట్సాప్‌లో చాట్ చేయండి',
      callDirectBtn: 'కాల్: +91 93934 94455',
      formTitle: 'తక్షణ వాట్సాప్ ఎంక్వైరీ ఫారమ్',
      formSub:
        'మీకు కావలసిన సేవ మరియు సుమారు బంగారం బరువు నమోదు చేయండి. ఈరోజు విజయవాడ రేటుతో వెంటనే సమాధానం ఇస్తాం.',
      noObligationNote:
        '100% గోప్యత · కౌంటర్ వద్ద రాతపూర్వక ఆఫర్ చూసిన తర్వాతే మీరు నిర్ణయం తీసుకోవచ్చు.',
      nameLabel: 'మీ పేరు',
      namePlaceholder: 'ఉదా: శ్రీనివాస రావు',
      phoneLabel: '10 అంకెల మొబైల్ నంబర్',
      phonePlaceholder: 'ఉదా: 98480 12345',
      serviceLabel: 'కావలసిన సేవను ఎంచుకోండి',
      serviceOptions: {
        sell: 'పాత బంగారం అమ్మకం (Sell Old Gold)',
        release: 'తాకట్టు బంగారం విడిపింపు (Release Pledged Gold)',
        rateCheck: 'ఈరోజు విజయవాడ బంగారం రేటు తెలుసుకోవడం',
      },
      goldTypeLabel: 'బంగారం రకం',
      weightLabel: 'సుమారు బరువు (గ్రాములలో) — ఐచ్ఛికం',
      weightPlaceholder: 'ఉదా: 25',
      messageLabel: 'బ్యాంకు పేరు / ఇతర వివరాలు (ఐచ్ఛికం)',
      messagePlaceholder:
        'తాకట్టు విడిపింపు అయితే బ్యాంకు/ఫైనాన్స్ పేరు లేదా మీ ప్రశ్న రాయండి...',
      submitBtn: 'వాట్సాప్ ద్వారా వివరాలు పంపండి',
      submittingBtn: 'వాట్సాప్ మెసేజ్ సిద్ధమవుతోంది...',
      orCallText: 'నేరుగా మాట్లాడాలనుకుంటున్నారా? కాల్:',
      errors: {
        name: 'దయచేసి మీ పేరు నమోదు చేయండి (కనీసం 2 అక్షరాలు).',
        phone: 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',
        weight: 'దయచేసి 0.5g నుండి 10,000g మధ్య సరైన బరువు నమోదు చేయండి.',
      },
      successTitle: 'మీ ఎంక్వైరీ వివరాలు సిద్ధంగా ఉన్నాయి',
      successBody:
        'క్రింది బటన్‌పై నొక్కి వాట్సాప్ ఓపెన్ చేసి మా గాంధీనగర్ కౌంటర్‌తో నేరుగా కనెక్ట్ అవ్వండి.',
      openWhatsappBtn: 'వాట్సాప్‌లో మెసేజ్ పంపండి',
      resetBtn: 'వివరాలు మార్చండి',
    },
    footer: {
      description:
        'మనోహర్ రెడ్డి గారి ఆధ్వర్యంలో గాంధీనగర్, విజయవాడలో స్థాపించబడింది. 100% ఓపెన్-కౌంటర్ పరీక్ష మరియు కేవలం 1% సర్వీస్ ఫీజుతో పాత బంగారం కొనుగోలు (హాల్‌మార్క్ 22K, 916 మార్క్ & అన్‌మార్క్డ్) మరియు బ్యాంకు తాకట్టు బంగారం విడిపింపు సేవలు అందిస్తున్నాము.',
      followLabel: 'సోషల్ మీడియాలో మమ్మల్ని అనుసరించండి',
      navHeading: 'ముఖ్యమైన లింకులు',
      servicesHeading: 'మా సేవలు',
      officeHeading: 'విజయవాడ ఆఫీస్',
      vijayawadaBranchLink: 'విజయవాడ బ్రాంచ్ & రూట్ మ్యాప్ (/vijayawada)',
      copyright: 'Trust Gold Services, Vijayawada. సర్వ హక్కులు ప్రత్యేకించబడినవి.',
      tagline: 'పారదర్శక బంగారం కొనుగోలు · కస్టమర్ ఛాయిస్ · నిజమైన విలువ.',
    },
    mobileBar: {
      callLabel: 'కాల్: 93934 94455',
      whatsappLabel: 'వాట్సాప్ విలువ నిర్ధారణ',
    },
  },
}
