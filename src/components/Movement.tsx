import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { gsap, isTouch, prefersReducedMotion } from '../lib/gsap'
import { PROGRAMS } from '../data/site'
import { Img } from './ui/Img'
import { Reveal, RevealText } from './ui/Reveal'
import { Button } from './ui/Button'

/** Program list: rows reveal on scroll; a floating image follows the cursor on hover. */
export function Movement() {
  const root = useRef<HTMLElement>(null)
  const floater = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const xTo = useRef<((v: number) => void) | null>(null)
  const yTo = useRef<((v: number) => void) | null>(null)

  useLayoutEffect(() => {
    if (!floater.current) return
    xTo.current = gsap.quickTo(floater.current, 'x', { duration: 0.7, ease: 'power3.out' })
    yTo.current = gsap.quickTo(floater.current, 'y', { duration: 0.7, ease: 'power3.out' })
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const rows = list.current!.querySelectorAll('li')
      gsap.from(rows, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: list.current, start: 'top 80%', once: true },
      })
      gsap.from(list.current!.querySelectorAll('.rule'), {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.4,
        stagger: 0.08,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: list.current, start: 'top 80%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onMove = (e: MouseEvent) => {
    if (isTouch()) return
    const r = root.current!.getBoundingClientRect()
    xTo.current?.(e.clientX - r.left)
    yTo.current?.(e.clientY - r.top)
  }

  return (
    <section ref={root} id="movement" className="relative bg-cream py-[12vh] md:py-[16vh]" onMouseMove={onMove}>
      <div className="container-x">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5">Movement</p>
            </Reveal>
            <RevealText as="h2" type="lines" className="display-md text-ink">
              Train with <em className="text-forest">intention.</em>
            </RevealText>
            <Reveal className="mt-8 max-w-sm font-sans text-[15px] leading-relaxed text-ink-soft md:text-base" delay={0.1}>
              <p>
                Programmes that respect your time and your body. Coached sessions, considered progressions, and the space
                to go at your own pace.
              </p>
              <div className="mt-8">
                <Button href="#membership" variant="outline">
                  Plan my first session
                </Button>
              </div>
            </Reveal>
          </div>

          <ul ref={list} className="col-span-12 md:col-span-8" onMouseLeave={() => setActive(null)}>
            {PROGRAMS.map((p, i) => (
              <li
                key={p.title}
                className="group relative"
                onMouseEnter={() => setActive(i)}
              >
                <div className="rule absolute inset-x-0 top-0 h-px bg-ink/15" />
                <a href="#membership" className="relative flex items-center justify-between gap-6 py-6 md:py-8">
                  <span className="absolute inset-0 -mx-4 origin-bottom scale-y-0 rounded-xl bg-forest transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                  <div className="relative flex items-baseline gap-5 md:gap-8">
                    <span className="font-sans text-xs tabular-nums tracking-[0.3em] text-ink-mute transition-colors duration-500 group-hover:text-cream/60">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[clamp(1.9rem,4vw,3.6rem)] leading-none tracking-tight text-ink transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-cream">
                      {p.title}
                    </span>
                  </div>
                  <div className="relative flex items-center gap-6">
                    <span className="hidden font-sans text-xs uppercase tracking-[0.22em] text-ink-soft transition-colors duration-500 group-hover:text-cream/70 md:block">
                      {p.meta}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-cream/40 group-hover:text-cream">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
                {/* inline image for touch devices */}
                <div className="mb-6 overflow-hidden rounded-xl md:hidden">
                  <Img name={p.image} alt={p.title} className="aspect-[16/10]" />
                </div>
              </li>
            ))}
            <div className="rule h-px bg-ink/15" />
          </ul>
        </div>
      </div>

      {/* floating image follows cursor */}
      <div
        ref={floater}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 md:block"
        aria-hidden
      >
        <div
          className={`relative h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-forest-ink/20 transition-[clip-path,scale] duration-700 ease-[var(--ease-out-expo)] ${
            active !== null ? '[clip-path:inset(0_0_0_0_round_16px)] scale-100' : '[clip-path:inset(50%_0_50%_0_round_16px)] scale-90'
          }`}
        >
          {PROGRAMS.map((p, i) => (
            <div
              key={p.title}
              className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}
            >
              <Img name={p.image} alt="" className="h-full w-full" imgClassName={active === i ? 'scale-100' : 'scale-110'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
