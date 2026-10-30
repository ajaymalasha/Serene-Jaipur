import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { SITE } from '../data/site'
import { Img } from './ui/Img'
import { Reveal, RevealText } from './ui/Reveal'
import { Button } from './ui/Button'

const INTERESTS = ['Membership', 'Personal training', 'Pilates & yoga', 'Recovery lounge', 'Corporate / group']

function buildMessage(d: Record<string, string>) {
  return `Hi Serene — I'd like to request a tour.\nName: ${d.name}\nPhone: ${d.phone}\nInterested in: ${d.interest}${
    d.note ? `\nNote: ${d.note}` : ''
  }`
}

/**
 * Invitation / lead form. With no backend, the form hands off to WhatsApp (if a
 * number is configured) or Instagram, with the message pre-filled.
 */
export function Membership() {
  const root = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg.current,
        { yPercent: -12, scale: 1.1 },
        { yPercent: 12, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const d = Object.fromEntries(fd.entries()) as Record<string, string>
    const text = encodeURIComponent(buildMessage(d))
    const url = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${text}` : SITE.instagram
    window.open(url, '_blank', 'noopener')
    setSent(true)
  }

  const field =
    'peer w-full border-b border-cream/25 bg-transparent py-4 font-sans text-base text-cream outline-none transition-colors duration-500 placeholder:text-transparent focus:border-cream'
  const label = (active: boolean) =>
    `pointer-events-none absolute left-0 font-sans text-xs uppercase tracking-[0.22em] text-cream/55 transition-all duration-500 ease-[var(--ease-out-expo)] ${
      active ? 'top-0 -translate-y-1 text-[10px]' : 'top-5'
    }`

  return (
    <section ref={root} id="membership" data-theme="dark" className="relative overflow-hidden bg-forest text-cream">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <Img name="signage" alt="" className="h-full w-full opacity-[0.28] mix-blend-luminosity" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/85 to-forest" />

      <div className="container-x relative grid grid-cols-12 gap-y-14 py-[14vh] md:gap-x-10 md:py-[18vh]">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <p className="eyebrow mb-6 text-cream/60">Membership & tours</p>
          </Reveal>
          <RevealText as="h2" type="words" className="display-lg text-cream">
            Begin your <em className="text-sage-light">Serene</em> chapter.
          </RevealText>
          <Reveal className="mt-8 max-w-md space-y-6 font-sans text-[15px] leading-relaxed text-cream/75 md:text-base" delay={0.1}>
            <p>
              Tell us a little about you and we’ll arrange a private walkthrough of the club — the floor, the studios, the
              recovery lounge, and a coffee at the end.
            </p>
            <ul className="grid gap-3 border-t border-cream/15 pt-6 text-sm text-cream/80">
              {['Private tour, at your pace', 'Complimentary body composition scan', 'Flexible membership terms', 'Founding-member benefits for early joiners'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-sage-light" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl border border-cream/15 p-8 md:p-10"
                >
                  <p className="eyebrow text-cream/60">Thank you</p>
                  <h3 className="font-display mt-4 text-4xl leading-tight">We’ll see you soon.</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-cream/75">
                    Your message has been prepared{SITE.whatsapp ? ' on WhatsApp' : ' — send it to us on Instagram'} and we’ll
                    get back to you within a day.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="link-line mt-8 font-sans text-sm text-cream">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-7 rounded-3xl border border-cream/15 bg-forest-deep/30 p-7 backdrop-blur-sm md:p-10"
                >
                  <div className="relative">
                    <input id="f-name" name="name" required className={field} placeholder="Name" autoComplete="name" onFocus={() => setFocus('name')} onBlur={(e) => !e.target.value && setFocus(null)} />
                    <label htmlFor="f-name" className={`${label(focus === 'name')} peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                      Your name
                    </label>
                  </div>
                  <div className="relative">
                    <input id="f-phone" name="phone" required type="tel" inputMode="tel" className={field} placeholder="Phone" autoComplete="tel" onFocus={() => setFocus('phone')} onBlur={(e) => !e.target.value && setFocus(null)} />
                    <label htmlFor="f-phone" className={`${label(focus === 'phone')} peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                      Phone / WhatsApp
                    </label>
                  </div>
                  <div className="relative">
                    <p className="font-sans text-xs uppercase tracking-[0.22em] text-cream/55">I’m interested in</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {INTERESTS.map((i, idx) => (
                        <label key={i} className="cursor-pointer">
                          <input type="radio" name="interest" value={i} defaultChecked={idx === 0} className="peer sr-only" />
                          <span className="inline-block rounded-full border border-cream/25 px-4 py-2 font-sans text-xs tracking-wide text-cream/80 transition-all duration-400 hover:border-cream/60 peer-checked:border-cream peer-checked:bg-cream peer-checked:text-forest-ink peer-focus-visible:ring-2 peer-focus-visible:ring-cream/50">
                            {i}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <textarea id="f-note" name="note" rows={2} className={`${field} resize-none`} placeholder="Note" onFocus={() => setFocus('note')} onBlur={(e) => !e.target.value && setFocus(null)} />
                    <label htmlFor="f-note" className={`${label(focus === 'note')} peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                      Anything we should know? (optional)
                    </label>
                  </div>
                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" variant="cream" magnetic={false}>
                      Request a tour
                    </Button>
                    <p className="font-sans text-xs text-cream/50">
                      {SITE.whatsapp ? 'Opens WhatsApp with your details pre-filled.' : 'Opens Instagram — paste your details to us there.'}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
