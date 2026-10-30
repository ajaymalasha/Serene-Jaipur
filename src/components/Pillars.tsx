import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { PILLARS } from '../data/site'
import { Reveal, RevealText } from './ui/Reveal'

/** Line icons whose strokes draw themselves on scroll. */
function Icon({ name }: { name: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  switch (name) {
    case 'move':
      return (
        <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20" {...common}>
          <path className="draw" d="M8 40c10-18 20-18 30 0s14 10 18-6" />
          <circle className="draw" cx="48" cy="18" r="4" />
          <path className="draw" d="M14 52h36" />
        </svg>
      )
    case 'restore':
      return (
        <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20" {...common}>
          <path className="draw" d="M32 8c-8 10-15 16-15 27a15 15 0 0 0 30 0C47 24 40 18 32 8Z" />
          <path className="draw" d="M24 40c2 4 5 6 8 6s6-2 8-6" />
        </svg>
      )
    case 'nourish':
      return (
        <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20" {...common}>
          <path className="draw" d="M14 28h32v6a16 16 0 0 1-32 0v-6Z" />
          <path className="draw" d="M46 32h4a5 5 0 0 1 0 10h-5" />
          <path className="draw" d="M24 20c0-4 4-4 4-8M32 20c0-4 4-4 4-8" />
          <path className="draw" d="M10 56h40" />
        </svg>
      )
    case 'belong':
      return (
        <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20" {...common}>
          <circle className="draw" cx="24" cy="26" r="7" />
          <circle className="draw" cx="42" cy="26" r="7" />
          <path className="draw" d="M8 52c2-10 8-14 16-14s14 4 16 14" />
          <path className="draw" d="M36 40c6-2 14 0 18 12" />
        </svg>
      )
    default:
      return null
  }
}

export function Pillars() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.pillar').forEach((p, i) => {
        const paths = p.querySelectorAll<SVGPathElement | SVGCircleElement>('.draw')
        paths.forEach((path) => {
          const len = (path as SVGGeometryElement).getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        })
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.6,
          stagger: 0.15,
          ease: 'power3.inOut',
          delay: i * 0.1,
          scrollTrigger: { trigger: p, start: 'top 85%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative bg-cream py-[12vh] md:py-[16vh]">
      <div className="container-x">
        <div className="mb-14 max-w-3xl md:mb-20">
          <Reveal>
            <p className="eyebrow mb-5">Four quiet promises</p>
          </Reveal>
          <RevealText as="h2" type="lines" className="display-md text-ink">
            Everything here serves one of <em className="text-forest">four things.</em>
          </RevealText>
        </div>
        <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {PILLARS.map((p, i) => (
            <div key={p.key} className="pillar group relative flex min-h-[340px] md:min-h-[400px] flex-col justify-between bg-cream p-7 transition-colors duration-700 hover:bg-forest md:p-9">
              <div className="flex items-start justify-between">
                <span className="text-forest transition-colors duration-700 group-hover:text-cream">
                  <Icon name={p.key} />
                </span>
                <span className="eyebrow transition-colors duration-700 group-hover:text-cream/60">0{i + 1}</span>
              </div>
              <div>
                <h3 className="font-display text-4xl leading-none text-ink transition-colors duration-700 group-hover:text-cream md:text-5xl">{p.title}</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft transition-colors duration-700 group-hover:text-cream/75 md:text-[15px]">
                  {p.copy}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
