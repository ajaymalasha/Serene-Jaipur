import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { GALLERY, SITE } from '../data/site'
import { Img } from './ui/Img'
import { Reveal, RevealText } from './ui/Reveal'

/** Three parallax columns moving at different speeds, with a centred statement. */
export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const cols = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const speeds = [-14, 10, -22]
        cols.current.forEach((col, i) => {
          if (!col) return
          gsap.fromTo(
            col,
            { yPercent: -speeds[i] },
            { yPercent: speeds[i], ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
      gsap.utils.toArray<HTMLElement>('.g-item').forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const columns = [GALLERY.slice(0, 3), GALLERY.slice(3, 6), GALLERY.slice(6, 9)]

  return (
    <section ref={root} className="relative overflow-hidden bg-cream-2 py-[12vh] md:py-[16vh]">
      <div className="container-x mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Atmosphere</p>
          </Reveal>
          <RevealText as="h2" type="lines" className="display-md max-w-[16ch] text-ink">
            Light, wood, water — <em className="text-forest">and room to breathe.</em>
          </RevealText>
        </div>
        <Reveal>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="link-line font-sans text-sm font-medium text-ink">
            {SITE.instagramHandle}
          </a>
        </Reveal>
      </div>

      <div className="container-x grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {columns.map((col, ci) => (
          <div
            key={ci}
            ref={(el) => {
              cols.current[ci] = el
            }}
            className={`flex flex-col gap-3 md:gap-6 ${ci === 1 ? 'md:mt-[14vh]' : ''} ${ci === 2 ? 'hidden md:flex' : ''}`}
          >
            {col.map((g) => (
              <div
                key={g.image}
                className={`g-item group relative overflow-hidden rounded-2xl ${g.span === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                data-cursor="Serene"
              >
                <Img
                  name={g.image}
                  alt={g.alt}
                  className="h-full w-full"
                  imgClassName="scale-100 group-hover:scale-[1.07]"
                />
                <div className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-700 group-hover:bg-forest/15" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
