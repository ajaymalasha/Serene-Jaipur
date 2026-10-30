import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { Img } from './ui/Img'
import { Reveal, RevealMedia, RevealText } from './ui/Reveal'
import { Video } from './ui/Video'

const FACTS = [
  { k: 'Est.', v: 'Oct 2026', s: 'Mansarovar, Jaipur' },
  { k: 'Floors', v: 'Technogym', s: 'Connected equipment' },
  { k: 'Studios', v: 'Pilates · Yoga', s: 'Dedicated, daylit' },
  { k: 'Recovery', v: 'Light · Cold · Heat', s: 'Red light, plunge, sauna' },
]

/** Editorial intro with parallax imagery and a word-by-word statement. */
export function Philosophy() {
  const root = useRef<HTMLElement>(null)
  const imgA = useRef<HTMLDivElement>(null)
  const imgB = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(imgA.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to(imgB.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="philosophy" className="relative overflow-hidden bg-cream py-[12vh] md:py-[16vh]">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-10">
          {/* Statement */}
          <div className="col-span-12 md:col-span-9 md:col-start-1 lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-8">The Serene way</p>
            </Reveal>
            <RevealText as="h2" type="words" className="display-lg text-balance text-ink">
              A sanctuary for the body, <em className="text-forest">built for the long run.</em>
            </RevealText>
          </div>

          {/* Image A — tall, right */}
          <div className="col-span-7 col-start-6 row-start-2 md:col-span-4 md:col-start-9 md:row-start-1 md:row-span-2 md:mt-[22vh]">
            <RevealMedia className="aspect-[3/4] overflow-hidden rounded-2xl" delay={0.1}>
              <div ref={imgA} className="h-[125%] w-full -translate-y-[10%]">
                <Img name="childs-pose" alt="Child’s pose in morning light" className="h-full w-full" />
              </div>
            </RevealMedia>
          </div>

          {/* Copy */}
          <div className="col-span-12 md:col-span-5 md:col-start-4 md:row-start-2 md:mt-8">
            <Reveal className="space-y-6 font-sans text-[15px] leading-[1.75] text-ink-soft md:text-[17px]" stagger={0.12}>
              <p>
                Serene is a fitness and wellness club in Mansarovar, Jaipur. Sunlit arches, warm wood and quiet corners frame
                a Technogym-equipped training floor, dedicated Pilates and yoga studios, a pool, and a recovery lounge where
                red light, cold water and heat finish what the workout started.
              </p>
              <p>
                We don’t believe in louder. We believe in better — better programming, better recovery, better mornings. A
                club you look forward to walking into, and leave feeling more like yourself.
              </p>
            </Reveal>
          </div>

          {/* Image B — small, left, offset */}
          <div className="col-span-6 md:col-span-3 md:col-start-1 md:row-start-2 md:mt-[18vh]">
            <RevealMedia className="aspect-[4/5] overflow-hidden rounded-2xl" delay={0.2} direction="left">
              <div ref={imgB} className="h-[125%] w-full -translate-y-[12%]">
                <Video name="community" className="h-full w-full" />
              </div>
            </RevealMedia>
          </div>
        </div>

        {/* Facts */}
        <Reveal className="mt-[14vh] grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-4" stagger={0.08}>
          {FACTS.map((f) => (
            <div key={f.k} className="group relative bg-cream p-6 transition-colors duration-500 hover:bg-forest md:p-8">
              <p className="eyebrow transition-colors duration-500 group-hover:text-cream/60">{f.k}</p>
              <p className="font-display mt-6 text-3xl leading-none tracking-tight text-ink transition-colors duration-500 group-hover:text-cream md:mt-10 md:text-4xl">
                {f.v}
              </p>
              <p className="mt-2 font-sans text-sm text-ink-mute transition-colors duration-500 group-hover:text-cream/70">{f.s}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
