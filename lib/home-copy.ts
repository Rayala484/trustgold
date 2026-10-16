import type { Language } from './i18n'

// Homepage copy. Every claim here comes from the owner's own brief (Downloads/Mano notes)
// or the original trustgoldservices.com. Do not add stats, reviews or promises that the
// owner has not confirmed.

export interface HomeCopy {
  nav: { services: string; how: string; faq: string; visit: string }
  hero: {
    eyebrow: string
    titleA: string
    titleGold: string
    lead: string
    whatsapp: string
    call: string
    chips: [string, string, string]
  }
  services: {
    tag: string
    heading: string
    sell: { title: string; text: string; cta: string; prefill: string }
    release: { title: string; text: string; cta: string; prefill: string }
  }
  how: {
    tag: string
    heading: string
    steps: { title: string; text: string }[]
  }
  faq: {
    tag: string
    heading: string
    items: { q: string; a: string }[]
  }
  visit: {
    tag: string
    heading: string
    founderRole: string
    addressLabel: string
    hoursLabel: string
    hours: string
    directions: string
    whatsapp: string
    call: string
  }
  footer: { usp: string; rights: string }
  dock: { call: string; whatsapp: string }
  whatsappPrefill: string
}

export const HOME_COPY: Record<Language, HomeCopy> = {
  en: {
    nav: { services: 'Services', how: 'How it works', faq: 'FAQ', visit: 'Visit us' },
    hero: {
      eyebrow: 'Gandhinagar, Vijayawada',
      titleA: 'Transparent gold buying.',
      titleGold: 'Your choice. Clear value.',
      lead: 'Sell old gold or release gold pledged with a bank or NBFC. We test it in front of you and charge only a 1% processing fee.',
      whatsapp: 'WhatsApp us',
      call: 'Call 93934 94455',
      chips: ['Tested in front of you', '1% processing fee', 'Melt or direct — you choose'],
    },
    services: {
      tag: 'What we do',
      heading: 'Two simple services.',
      sell: {
        title: 'Sell old gold',
        text: 'Hallmark 22K, 916-marked or unmarked jewellery. We explain the day’s rate, purity and final value before you decide.',
        cta: 'WhatsApp to sell',
        prefill: 'Hi Trust Gold Services, I want to sell old gold. Please share today’s rate.',
      },
      release: {
        title: 'Release pledged gold',
        text: 'Gold locked in a bank or NBFC loan? We settle the loan, release your gold and pay you the remaining value.',
        cta: 'WhatsApp to release',
        prefill: 'Hi Trust Gold Services, I need help releasing my pledged gold.',
      },
    },
    how: {
      tag: 'How it works',
      heading: 'Three steps. No surprises.',
      steps: [
        { title: 'Visit our counter', text: 'Bring your gold, Aadhaar and PAN.' },
        { title: 'See it tested', text: 'Purity, weight and the day’s rate — explained before you decide.' },
        { title: 'Get paid', text: 'Quick, secure payment. Only a 1% processing fee.' },
      ],
    },
    faq: {
      tag: 'Questions',
      heading: 'Good to know.',
      items: [
        {
          q: 'Will you melt my gold?',
          a: 'Only if you want. We can buy it as it is, or melt it in front of you. The choice is yours.',
        },
        {
          q: 'How much is the fee?',
          a: 'A 1% processing fee on the total value. We show you the full calculation before you decide.',
        },
        {
          q: 'What kind of gold do you buy?',
          a: 'Hallmark 22K jewellery, jewellery with only the 916 mark, and jewellery with other marks or no mark.',
        },
        {
          q: 'What should I bring?',
          a: 'Aadhaar, PAN, address proof, bank details and bills if you have them. To release pledged gold, also two security cheques.',
        },
      ],
    },
    visit: {
      tag: 'Visit us',
      heading: 'Come and see for yourself.',
      founderRole: 'Founder, Trust Gold Services',
      addressLabel: 'Address',
      hoursLabel: 'Hours',
      hours: 'Monday – Saturday · 9 AM – 9 PM',
      directions: 'Get directions',
      whatsapp: 'WhatsApp',
      call: 'Call',
    },
    footer: {
      usp: 'Transparent Gold Buying. Customer’s Choice. Clear Value.',
      rights: 'All rights reserved.',
    },
    dock: { call: 'Call', whatsapp: 'WhatsApp us' },
    whatsappPrefill: 'Hi Trust Gold Services, I would like to know today’s gold rate.',
  },

  te: {
    nav: { services: 'సేవలు', how: 'ఎలా పనిచేస్తుంది', faq: 'ప్రశ్నలు', visit: 'మమ్మల్ని కలవండి' },
    hero: {
      eyebrow: 'గాంధీనగర్, విజయవాడ',
      titleA: 'పారదర్శకంగా బంగారం కొనుగోలు.',
      titleGold: 'మీ ఇష్టం. స్పష్టమైన విలువ.',
      lead: 'పాత బంగారం అమ్మాలన్నా, బ్యాంకు లేదా ఫైనాన్స్‌లో తాకట్టు పెట్టిన బంగారం విడిపించాలన్నా — మీ కళ్ళ ముందే పరీక్షిస్తాం. ప్రాసెసింగ్ ఫీజు కేవలం 1%.',
      whatsapp: 'వాట్సాప్ చేయండి',
      call: 'కాల్ 93934 94455',
      chips: ['మీ కళ్ళ ముందే పరీక్ష', '1% ప్రాసెసింగ్ ఫీజు', 'మెల్టింగ్ లేదా డైరెక్ట్ — మీ ఇష్టం'],
    },
    services: {
      tag: 'మా సేవలు',
      heading: 'రెండు సులభమైన సేవలు.',
      sell: {
        title: 'పాత బంగారం అమ్మకం',
        text: 'హాల్‌మార్క్ 22K, 916 మార్క్ లేదా మార్క్ లేని ఆభరణాలు. మీరు నిర్ణయించే ముందే ఆ రోజు రేటు, స్వచ్ఛత, తుది విలువ వివరిస్తాం.',
        cta: 'అమ్మడానికి వాట్సాప్',
        prefill: 'నమస్కారం Trust Gold Services, నేను పాత బంగారం అమ్మాలనుకుంటున్నాను. ఈరోజు రేటు చెప్పండి.',
      },
      release: {
        title: 'తాకట్టు బంగారం విడిపింపు',
        text: 'బ్యాంకు లేదా NBFC లోన్‌లో బంగారం ఉందా? లోన్ సెటిల్ చేసి, బంగారం విడిపించి, మిగిలిన విలువ మీకు చెల్లిస్తాం.',
        cta: 'విడిపింపు కోసం వాట్సాప్',
        prefill: 'నమస్కారం Trust Gold Services, నా తాకట్టు బంగారం విడిపించడానికి సహాయం కావాలి.',
      },
    },
    how: {
      tag: 'ఎలా పనిచేస్తుంది',
      heading: 'మూడు అడుగులు. ఆశ్చర్యాలు లేవు.',
      steps: [
        { title: 'మా కౌంటర్‌కు రండి', text: 'మీ బంగారం, ఆధార్, పాన్ తీసుకురండి.' },
        { title: 'మీ ముందే పరీక్ష', text: 'స్వచ్ఛత, బరువు, ఆ రోజు రేటు — మీరు నిర్ణయించే ముందే వివరిస్తాం.' },
        { title: 'చెల్లింపు పొందండి', text: 'వేగంగా, సురక్షితంగా చెల్లింపు. ప్రాసెసింగ్ ఫీజు కేవలం 1%.' },
      ],
    },
    faq: {
      tag: 'ప్రశ్నలు',
      heading: 'తెలుసుకోవలసినవి.',
      items: [
        {
          q: 'మీరు నా బంగారాన్ని కరిగిస్తారా?',
          a: 'మీరు కోరితేనే. అలాగే నేరుగా కొంటాం, లేదా మీ ముందే మెల్టింగ్ చేస్తాం. నిర్ణయం మీదే.',
        },
        {
          q: 'ఫీజు ఎంత?',
          a: 'మొత్తం విలువపై 1% ప్రాసెసింగ్ ఫీజు. మీరు నిర్ణయించే ముందే పూర్తి లెక్క చూపిస్తాం.',
        },
        {
          q: 'ఏ రకం బంగారం కొంటారు?',
          a: 'హాల్‌మార్క్ 22K ఆభరణాలు, 916 మార్క్ మాత్రమే ఉన్న ఆభరణాలు, ఇతర మార్కులు లేదా మార్క్ లేని ఆభరణాలు.',
        },
        {
          q: 'ఏమి తీసుకురావాలి?',
          a: 'ఆధార్, పాన్, చిరునామా ధృవీకరణ, బ్యాంకు వివరాలు, ఉంటే బిల్లులు. తాకట్టు బంగారం విడిపింపుకు రెండు సెక్యూరిటీ చెక్కులు కూడా.',
        },
      ],
    },
    visit: {
      tag: 'మమ్మల్ని కలవండి',
      heading: 'మీరే వచ్చి చూడండి.',
      founderRole: 'వ్యవస్థాపకులు, Trust Gold Services',
      addressLabel: 'చిరునామా',
      hoursLabel: 'సమయం',
      hours: 'సోమవారం – శనివారం · ఉదయం 9 – రాత్రి 9',
      directions: 'దారి చూపించు',
      whatsapp: 'వాట్సాప్',
      call: 'కాల్',
    },
    footer: {
      usp: 'పారదర్శక బంగారం కొనుగోలు. మీ ఇష్టం. స్పష్టమైన విలువ.',
      rights: 'అన్ని హక్కులు రక్షించబడ్డాయి.',
    },
    dock: { call: 'కాల్', whatsapp: 'వాట్సాప్ చేయండి' },
    whatsappPrefill: 'నమస్కారం Trust Gold Services, ఈరోజు బంగారం రేటు తెలుసుకోవాలనుకుంటున్నాను.',
  },
}
