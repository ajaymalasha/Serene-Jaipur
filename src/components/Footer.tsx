import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { NAV, SITE } from '../data/site'
import { Logo } from './Logo'
import { Magnetic } from './ui/Magnetic'

const YEAR = new Date().getFullYear()

export function Footer() {
  const root = useRef<HTMLElement>(null)
  const word = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const letters = word.current!.querySelectorAll('span')
      gsap.from(letters, {
        yPercent: 100,
        duration: 1.4,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: { trigger: word.current, start: 'top 95%', once: true },
      })
      gsap.to(word.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={root} data-theme="dark" className="relative overflow-hidden bg-forest-ink text-cream">
      <div className="container-x grid grid-cols-12 gap-y-12 pb-10 pt-[10vh] md:gap-x-10 md:pt-[12vh]">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" animate />
            <span className="font-display text-3xl">Serene</span>
          </div>
          <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-cream/65">
            {SITE.tagline}. The calm side of strong — a luxury fitness and wellness club in Mansarovar, Jaipur.
          </p>
          <div className="mt-8 flex gap-3">
            <Magnetic>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="btn-fill group flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-500 hover:text-forest-ink [--btn-fill:var(--color-cream)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>
            </Magnetic>
            {SITE.whatsapp && (
              <Magnetic>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="btn-fill group flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-500 hover:text-forest-ink [--btn-fill:var(--color-cream)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M4 20l1.3-3.8A8 8 0 1 1 8 19.2L4 20Z" />
                    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </Magnetic>
            )}
          </div>
        </div>

        <div className="col-span-6 md:col-span-3 md:col-start-7">
          <p className="eyebrow text-cream/45">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-line font-sans text-sm text-cream/80 hover:text-cream">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#membership" className="link-line font-sans text-sm text-cream/80 hover:text-cream">
                Membership
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow text-cream/45">Visit</p>
          <p className="mt-4 font-sans text-sm leading-relaxed text-cream/80">
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
          </p>
          <p className="mt-5 font-sans text-sm text-cream/60">
            {SITE.hours[0].label}
            <br />
            <span className="text-cream/80">{SITE.hours[0].value}</span>
          </p>
        </div>
      </div>

      <div className="container-x">
        <div ref={word} className="font-display flex select-none justify-between overflow-hidden pt-4 text-[clamp(5rem,20vw,19rem)] leading-[0.85] tracking-[-0.04em] text-cream/95">
          {'Serene'.split('').map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-cream/10 py-6 font-sans text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
        <p>© {YEAR} Serene Fitness & Wellness Club, Jaipur. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sage" /> Now open · Mansarovar, Jaipur
        </p>
      </div>
    </footer>
  )
}
