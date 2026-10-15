import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lato, Marcellus } from 'next/font/google'
import './globals.css'

const marcellus = Marcellus({ subsets: ['latin'], variable: '--font-marcellus', weight: '400', display: 'swap' })
const lato = Lato({ subsets: ['latin'], variable: '--font-lato', weight: ['400', '700', '900'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trustgoldservices.com'),
  title: { default: 'Trust Gold Services | Sell Old Gold & Release Pledged Gold in Vijayawada', template: '%s | Trust Gold Services, Vijayawada' },
  description: 'Sell old gold or release bank-pledged gold in Vijayawada at fair market price. Transparent valuation, spot payment, low fees. Get a free WhatsApp estimate today.',
  keywords: ['sell old gold Vijayawada', 'gold buyers Vijayawada', 'pledged gold release Vijayawada', 'gold loan release near me', 'Gandhinagar gold buyers'],
  openGraph: { title: 'Trust Gold Services | Transparent Gold. Instant Trust.', description: 'Fair gold valuation, spot payment and pledged gold release support in Vijayawada.', type: 'website', images: ['/images/hero.png'] },
  twitter: { card: 'summary_large_image', images: ['/images/hero.png'] },
  icons: { icon: '/logo.png', apple: '/logo.png' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#011738' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${marcellus.variable} ${lato.variable}`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
