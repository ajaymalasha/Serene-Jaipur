import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { RECOVERY } from '../data/site'
import { Img } from './ui/Img'
import { Video } from './ui/Video'
import { Reveal, RevealText } from './ui/Reveal'
import { Button } from './ui/Button'

/** Dark section — sticky copy on the left, stacking media cards on the right. */
export function Recovery() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        const next = cards[i + 1]
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          filter: 'blur(2px)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 20%', scrub: true },
        })
      })
      // scroll-based media scaling inside each card
      cards.forEach((card) => {
        const media = card.querySelector('.media')
        gsap.fromTo(
          media,
          { scale: 1.25 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 20%', scrub: true } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="recovery" data-theme="dark" className="relative bg-forest-ink text-cream grain">
      <div className="container-x grid grid-cols-12 gap-x-6 py-[12vh] md:gap-x-10 md:py-[14vh]">
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-[18vh]">
            <Reveal>
              <p className="eyebrow mb-5 text-cream/50">Recovery lounge</p>
            </Reveal>
            <RevealText as="h2" type="lines" className="display-lg text-cream">
              Recover like it <em className="text-sage">matters.</em>
            </RevealText>
            <Reveal className="mt-8 max-w-md font-sans text-[15px] leading-relaxed text-cream/70 md:text-base" delay={0.1}>
              <p>
                Most clubs stop at the last rep. Ours doesn’t. Red light, cold water and heat sit at the heart of Serene —
                because the body you’re building is built between sessions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Red-light beds', 'Cold plunge', 'Sauna', 'Steam', 'Massage chairs'].map((t) => (
                  <span key={t} className="rounded-full border border-cream/20 px-4 py-1.5 font-sans text-xs tracking-wide text-cream/80">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-10">
                <Button href="#membership" variant="outline-cream">
                  Book a recovery session
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="col-span-12 mt-14 flex flex-col gap-[6vh] md:col-span-6 md:col-start-7 md:mt-0">
          {RECOVERY.map((r, i) => (
            <article
              key={r.title}
              className="stack-card relative overflow-hidden rounded-3xl bg-forest-deep md:sticky"
              style={{ top: `calc(14vh + ${i * 2.5}rem)` }}
              data-cursor="Breathe"
            >
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/4.6]">
                <div className="media absolute inset-0 origin-center">
                  {'video' in r && r.video ? (
                    <Video name={r.video} className="h-full w-full" />
                  ) : (
                    <Img name={(r as { image: string }).image} alt={r.title} className="h-full w-full" />
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-ink via-forest-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <p className="eyebrow text-cream/50">0{i + 1}</p>
                  <h3 className="font-display mt-3 text-4xl leading-none text-cream md:text-5xl">{r.title}</h3>
                  <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/75 md:text-[15px]">{r.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
