import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { SPACES, type Space } from '../data/site'
import { Img } from './ui/Img'
import { Video } from './ui/Video'
import { Reveal, RevealText } from './ui/Reveal'

function SpaceCard({ s, index }: { s: Space; index: number }) {
  const [hover, setHover] = useState(false)
  return (
    <article
      className="group relative h-[68vh] w-[min(84vw,380px)] shrink-0 snap-center md:h-[clamp(360px,calc(100vh-22rem),66vh)] md:w-[min(42vw,520px)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor={s.video ? 'Play' : 'View'}
      style={{ marginTop: index % 2 ? 'clamp(0px, 6vh, 64px)' : 0 }}
    >
      <div className="relative h-[78%] overflow-hidden rounded-2xl">
        <Img
          name={s.image}
          alt={s.title}
          className="absolute inset-0 h-full w-full"
          imgClassName="scale-[1.12] group-hover:scale-[1.2]"
        />
        {s.video && (
          <div className={`absolute inset-0 transition-opacity duration-700 ${hover ? 'opacity-100' : 'opacity-0'}`}>
            <Video name={s.video} hoverPlay playing={hover} className="h-full w-full" videoClassName="scale-[1.02]" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-ink/50 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute left-5 top-5 rounded-full border border-cream/30 bg-forest-ink/20 px-3 py-1 font-sans text-[11px] tracking-[0.25em] text-cream backdrop-blur-sm">
          {s.index}
        </span>
        <p className="absolute bottom-5 left-5 right-5 translate-y-3 font-sans text-sm leading-relaxed text-cream/90 opacity-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100">
          {s.copy}
        </p>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl leading-none tracking-tight text-ink md:text-4xl">{s.title}</h3>
        <p className="eyebrow text-right">{s.kicker}</p>
      </div>
    </article>
  )
}

/** Pinned horizontal gallery on desktop; snap-scroll on touch. */
export function Spaces() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const t = track.current!
        const getX = () => -(t.scrollWidth - window.innerWidth)
        const tween = gsap.to(t, {
          x: getX,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${t.scrollWidth - window.innerWidth + window.innerHeight * 0.4}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.scale = `${self.progress} 1`
            },
          },
        })
        // subtle parallax of images inside cards
        const imgs = t.querySelectorAll<HTMLElement>('article img:last-of-type')
        imgs.forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: img.closest('article'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="spaces" className="relative bg-cream-2 py-[10vh] md:h-screen md:py-0">
      <div className="container-x flex flex-col justify-between md:h-screen md:pb-10 md:pt-[calc(var(--nav-h)+2vh)]">
        <div className="mb-10 flex flex-col gap-6 md:mb-0 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">The spaces</p>
            </Reveal>
            <RevealText as="h2" type="lines" className="display-md max-w-[16ch] text-ink">
              Seven rooms. One <em className="text-forest">unhurried</em> rhythm.
            </RevealText>
          </div>
          <Reveal className="hidden items-center gap-4 md:flex md:pb-2">
            <p className="hidden font-sans text-sm text-ink-soft md:block">Scroll to explore</p>
            <div className="h-px w-40 overflow-hidden bg-ink/10">
              <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-forest" />
            </div>
          </Reveal>
        </div>

        <div className="-mx-[var(--gutter)] overflow-x-auto overflow-y-visible px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden">
          <div ref={track} className="flex w-max gap-5 pr-[var(--gutter)] md:gap-8 md:pr-[20vw]">
            {SPACES.map((s, i) => (
              <SpaceCard key={s.id} s={s} index={i} />
            ))}
            <div className="hidden w-[18vw] shrink-0 flex-col justify-center md:flex">
              <p className="font-display text-4xl leading-tight text-ink">
                And a few <em className="text-forest">quiet corners</em> we’d rather you discover in person.
              </p>
              <a href="#membership" className="link-line mt-6 w-max font-sans text-sm font-medium text-ink">
                Book a walkthrough
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
