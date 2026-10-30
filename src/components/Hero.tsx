import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../lib/gsap'
import { Video } from './ui/Video'
import { Button } from './ui/Button'
import { SITE } from '../data/site'

/**
 * Hero: kinetic headline + a portrait video card that expands to fill the
 * viewport as you scroll (pinned, scrubbed). Entry animation runs once the
 * preloader finishes.
 */
export function Hero({ ready }: { ready: boolean }) {
  const section = useRef<HTMLElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const headline = useRef<HTMLHeadingElement>(null)
  const headBlock = useRef<HTMLDivElement>(null)
  const meta = useRef<HTMLDivElement>(null)
  const caption = useRef<HTMLDivElement>(null)
  const scrollHint = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  // Scroll-driven expansion
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add(
        { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' },
        (c) => {
          const { desktop } = c.conditions as { desktop: boolean }
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
              invalidateOnRefresh: true,
              onRefreshInit: () => gsap.set(card.current, { clearProps: 'left,top,width,height,borderRadius' }),
            },
          })
          tl.to(
            card.current,
            {
              left: 0,
              top: 0,
              width: () => window.innerWidth,
              height: () => window.innerHeight,
              borderRadius: 0,
              ease: 'power2.inOut',
              duration: 1,
            },
            0,
          )
            .to(headBlock.current, { y: desktop ? -160 : -80, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0)
            .to([meta.current, scrollHint.current], { opacity: 0, y: -20, duration: 0.3 }, 0)
            .fromTo(caption.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6)
        },
      )
    }, section)
    return () => ctx.revert()
  }, [])

  // Entry
  useLayoutEffect(() => {
    if (!ready || played.current) return
    played.current = true
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const split = SplitText.create(headline.current!, { type: 'chars,words,lines', mask: 'lines' })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(split.chars, { yPercent: 115, rotate: 5, duration: 1.2, stagger: 0.022 }, 0.1)
        .fromTo(
          card.current,
          { clipPath: 'inset(100% 0 0 0 round 18px)', scale: 1.06 },
          { clipPath: 'inset(0% 0 0 0 round 18px)', scale: 1, duration: 1.6, ease: 'power4.inOut' },
          0.2,
        )
        .from(meta.current!.children, { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)
        .from(scrollHint.current, { opacity: 0, y: 10, duration: 1 }, 1.2)
      ScrollTrigger.refresh()
    }, section)
    return () => {
      ctx.revert()
      played.current = false
    }
  }, [ready])

  return (
    <section ref={section} id="top" className="relative h-[200vh]">
      <div ref={sticky} className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Video card */}
        <div
          ref={card}
          className="absolute left-[calc(50%-min(36vw,170px))] top-[15vh] z-0 h-[36vh] w-[min(72vw,340px)] overflow-hidden rounded-[18px] md:left-[calc(92vw-min(34vw,460px))] md:top-[max(16vh,calc(var(--nav-h)+3.5rem))] md:h-[min(62vh,calc(100vh-var(--nav-h)-9rem))] md:w-[min(34vw,460px)]"
          data-cursor="Scroll"
        >
          <Video name="hero" priority className="h-full w-full" />
          <div className="grain pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-ink/55 via-transparent to-forest-ink/25" />
          <div
            ref={caption}
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--gutter)] pb-10 text-cream opacity-0"
          >
            <div>
              <p className="eyebrow text-cream/70">Now open</p>
              <p className="font-display mt-2 text-3xl md:text-5xl">Mansarovar, Jaipur</p>
            </div>
            <p className="hidden max-w-xs text-right font-sans text-sm leading-relaxed text-cream/80 md:block">
              Technogym floors, Pilates & yoga studios, a pool and a recovery lounge — under one quiet roof.
            </p>
          </div>
        </div>

        {/* Top meta */}
        <div ref={meta} className="container-x relative z-10 flex items-start justify-between pt-[calc(var(--nav-h)+1.25rem)]">
          <p className="eyebrow">
            {SITE.tagline} <span className="mx-2 text-ink-mute">—</span> {SITE.city}
          </p>
          <p className="eyebrow hidden md:block">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-forest align-middle" />
            Now open
          </p>
        </div>

        {/* Headline */}
        <div ref={headBlock} className="container-x relative z-10 mt-auto pb-[8vh] md:pb-[9vh]">
          <h1 ref={headline} className="display-xl max-w-[12ch] text-ink">
            The calm side <br className="hidden md:block" />
            of <em className="text-forest">strong.</em>
          </h1>
          <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
            <p className="hidden max-w-sm font-sans text-[15px] leading-relaxed text-ink-soft md:block md:text-base">
              A luxury fitness & wellness club in Jaipur, designed around one idea — that progress and peace belong in
              the same room.
            </p>
            <div className="flex items-center gap-4">
              <Button href="#membership">Request a tour</Button>
              <a href="#spaces" className="link-line font-sans text-sm font-medium text-ink">
                Explore the club
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHint} className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 md:flex">
          <span className="eyebrow">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_1.6s_var(--ease-in-out-quart)_infinite] bg-forest" />
          </span>
        </div>
      </div>
      <style>{`@keyframes scrollhint { 0% { transform: translateY(-100%);} 100% { transform: translateY(200%);} }`}</style>
    </section>
  )
}
