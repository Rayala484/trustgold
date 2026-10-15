import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { GoldOpening } from '@/components/GoldOpening'
import { BUSINESS_INFO } from '@/lib/gold-calculator'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500', '600'],
  display: 'swap',
})

// Runs before first paint: enables scroll reveals (html.motion-ok with a 4s hydration failsafe)
// and plays the Trust Gold Bullion Forging & 916 Assay Opening unless prefers-reduced-motion or ?nointro is present.
const introBootScript = `try{var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("motion-ok");setTimeout(function(){if(!window.__tgMotion)d.classList.remove("motion-ok")},4000);if(!/[?&]nointro/.test(location.search)){d.classList.add("intro");setTimeout(function(){d.classList.remove("intro")},3600)}}}catch(e){}`

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://trustgold.vercel.app'
  ),
  title: {
    default:
      'Trust Gold Services | Sell Old Gold & Release Pledged Gold in Vijayawada',
    template: '%s | Trust Gold Services, Vijayawada',
  },
  description:
    'Transparent gold buying & bank-pledged gold loan release in Gandhinagar, Vijayawada. We buy Hallmark 22K, 916 Mark & unmarked gold. Customer choice of direct valuation or melting in your presence. 1% processing fee, instant spot payment.',
  keywords: [
    'Trust Gold Services Vijayawada',
    'sell old gold Vijayawada',
    'pledged gold release Vijayawada',
    'gold buyers Gandhinagar Vijayawada',
    'bank gold loan release Andhra Pradesh',
    'Manohar Reddy Trust Gold Services',
    '916 hallmark gold buyers Vijayawada',
  ],
  openGraph: {
    title: 'Trust Gold Services | Transparent Gold Buying. Customer’s Choice. Clear Value.',
    description:
      'Sell old gold or release bank/NBFC pledged gold in Vijayawada. Open valuation in your presence, transparent 1% fee structure, and instant spot payout.',
    type: 'website',
    locale: 'en_IN',
    images: ['/images/owner-2.png', '/images/hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trust Gold Services | Vijayawada',
    description:
      'Transparent Gold Buying & Pledged Gold Loan Release in Gandhinagar, Vijayawada.',
    images: ['/images/owner-2.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#051024',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: BUSINESS_INFO.name,
    AlternateName: BUSINESS_INFO.teluguTagline,
    description: BUSINESS_INFO.uspHeadline,
    url: 'https://trustgold.vercel.app',
    telephone: `+91-${BUSINESS_INFO.phone}`,
    email: BUSINESS_INFO.email,
    founder: {
      '@type': 'Person',
      name: BUSINESS_INFO.founderName,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'First Floor, Shop No. 5, Vasisth Enclave, Gandhinagar',
      addressLocality: 'Vijayawada',
      addressRegion: 'Andhra Pradesh',
      postalCode: '520003',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      BUSINESS_INFO.socials.instagram,
      BUSINESS_INFO.socials.facebook,
      BUSINESS_INFO.socials.youtube,
    ],
  }

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <GoldOpening />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

