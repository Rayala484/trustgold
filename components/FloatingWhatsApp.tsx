'use client'

import { BUSINESS_INFO } from '@/lib/gold-calculator'
import { type Language } from '@/lib/i18n'
import { Magnetic } from '@/components/animations/Magnetic'

export function FloatingWhatsApp({ lang = 'en' }: { lang?: Language }) {
  const prefill =
    lang === 'te'
      ? 'నమస్కారం Trust Gold Services (విజయవాడ), పాత బంగారం అమ్మకం / తాకట్టు బంగారం విడిపింపు మరియు ఈరోజు గ్రాము రేటు వివరాలు తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hi Trust Gold Services (Vijayawada), I would like a free valuation enquiry for my gold ornaments and today’s per-gram rate.'

  const whatsappUrl = `https://wa.me/${
    BUSINESS_INFO.whatsappNumber
  }?text=${encodeURIComponent(prefill)}`

  const labelText = lang === 'te' ? 'వాట్సాప్ చాట్' : 'WhatsApp Us'
  const subText = lang === 'te' ? 'తక్షణ సమాధానం' : 'Instant Reply'

  return (
    <div className="floating-whatsapp-wrap">
      <Magnetic strength={0.28}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn pressable"
          aria-label="Chat with Trust Gold Services on WhatsApp (+91 93934 94455)"
          title="Chat with Trust Gold Services on WhatsApp (+91 93934 94455)"
        >
          <span className="floating-whatsapp-pulse" aria-hidden="true" />
          <span className="floating-whatsapp-icon" aria-hidden="true">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.359 4.984L2 22l5.188-1.359c1.453.797 3.109 1.219 4.843 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.828 14.125c-.25.703-1.453 1.344-2.016 1.422-.516.078-1.172.109-1.906-.125-.453-.141-1.031-.328-1.766-.641-3.094-1.344-5.109-4.469-5.266-4.672-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.312.609-.391.812-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.328-.312.5-.156.172-.328.391-.469.531-.156.156-.312.328-.141.625.172.297.766 1.266 1.641 2.047 1.125 1 2.078 1.312 2.375 1.469.297.156.469.125.641-.078.172-.203.734-.859.938-1.156.203-.297.406-.25.672-.156.266.094 1.703.812 1.984.953.281.141.469.219.547.344.078.125.078.719-.172 1.422z" />
            </svg>
          </span>
          <span className="floating-whatsapp-text">
            <small>
              <span className="floating-whatsapp-dot" />
              {subText}
            </small>
            <strong>{labelText}</strong>
          </span>
        </a>
      </Magnetic>
    </div>
  )
}
