import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { TECH } from '../data/site'
import { Img } from './ui/Img'
import { Video } from './ui/Video'
import { Reveal, RevealMedia, RevealText } from './ui/Reveal'

/** Technology — big video, parallax side images, animated counters-free facts. */
export function Technology() {
  const root = useRef<HTMLElement>(null)
  const big = useRef<HTMLDivElement>(null)
  const sideA = useRef<HTMLDivElement>(null)
  const sideB = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // scroll-based scale of the big video
      gsap.fromTo(
        big.current,
        { scale: 0.86, borderRadius: 32 },
        {
          scale: 1,
          borderRadius: 20,
          ease: 'none',
          scrollTrigger: { trigger: big.current, start: 'top 90%', end: 'top 25%', scrub: true },
        },
      )
      gsap.to(sideA.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to(sideB.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="technology" className="relative overflow-hidden bg-cream py-[12vh] md:py-[16vh]">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Technology</p>
            </Reveal>
            <RevealText as="h2" type="lines" className="display-lg max-w-[14ch] text-ink">
              Precision, powered by <em className="text-forest">Technogym.</em>
            </RevealText>
          </div>
          <Reveal className="max-w-sm font-sans text-[15px] leading-relaxed text-ink-soft md:text-base">
            <p>
              Every piece of equipment on the floor is connected. It learns your settings, tracks your output and quietly
              makes you better — one rep, one session, one season at a time.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div ref={big} className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-forest-ink sm:aspect-[16/10] md:aspect-[21/9]" data-cursor="Technogym">
            {/* ambient blurred copy behind the sharp portrait clip */}
            <div className="absolute inset-0 hidden sm:block">
              <Video name="technogym" className="h-full w-full" videoClassName="scale-125 blur-2xl opacity-60 saturate-[1.2]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full sm:w-auto sm:aspect-[9/16] sm:shadow-2xl sm:shadow-forest-ink/40">
                <Video name="technogym" className="h-full w-full" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-forest-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <p className="eyebrow text-cream/70">On the floor</p>
              <p className="font-display mt-2 text-2xl text-cream md:text-4xl">Connected strength & cardio</p>
            </div>
            <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-cream/20 bg-forest-ink/30 px-3 py-1.5 backdrop-blur-sm md:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage-light" />
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-cream/80">Live floor</span>
            </div>
          </div>

          {/* side images */}
          <div ref={sideA} className="absolute -right-4 top-[4%] hidden w-[22%] md:block lg:-right-10">
            <RevealMedia className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-forest-ink/20" delay={0.2}>
              <Img name="technogym-screen" alt="Technogym console" className="h-full w-full" />
            </RevealMedia>
          </div>
          <div ref={sideB} className="absolute -bottom-20 -left-4 hidden w-[18%] md:block lg:-left-8">
            <RevealMedia className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-forest-ink/20" delay={0.3} direction="left">
              <Img name="body-scanner" alt="Body composition analysis" className="h-full w-full" />
            </RevealMedia>
          </div>
        </div>

        <Reveal className="mt-20 grid gap-10 md:mt-32 md:grid-cols-3 md:gap-8" stagger={0.1}>
          {TECH.map((t, i) => (
            <div key={t.title} className="group border-t border-ink/15 pt-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">0{i + 1}</p>
                <span className="h-2 w-2 rounded-full bg-ink/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-forest" />
              </div>
              <h3 className="font-display mt-6 text-3xl leading-none text-ink md:text-4xl">{t.title}</h3>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-soft">{t.copy}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
