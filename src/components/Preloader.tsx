import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { Logo } from './Logo'

type Props = { onDone: () => void }

/**
 * Entry sequence: forest panel, wordmark letters rise in, counter runs to 100,
 * then the panel lifts like a curtain to reveal the hero.
 */
export function Preloader({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const word = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    if (prefersReducedMotion()) {
      el.style.display = 'none'
      onDone()
      return
    }
    document.documentElement.classList.add('lenis-stopped')
    const ctx = gsap.context(() => {
      const letters = word.current!.querySelectorAll('span')
      const n = { v: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          document.documentElement.classList.remove('lenis-stopped')
          onDone()
        },
      })
      tl.fromTo(letters, { yPercent: 120, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.06, ease: 'power4.out' }, 0.1)
        .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: 'power3.inOut' }, 0.2)
        .to(
          n,
          {
            v: 100,
            duration: 1.7,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(n.v)).padStart(3, '0')
            },
          },
          0.2,
        )
        .to(letters, { yPercent: -120, duration: 0.8, stagger: 0.03, ease: 'power4.in' }, 1.9)
        .to([counter.current, line.current], { opacity: 0, duration: 0.4 }, 2.0)
        .to(el, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, 2.35)
        .set(el, { display: 'none' })
    }, el)

    return () => {
      ctx.revert()
    }
  }, [onDone])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-forest text-cream"
      aria-hidden
    >
      <div className="absolute left-[var(--gutter)] top-8 opacity-70">
        <Logo className="h-6 w-6" />
      </div>
      <div ref={word} className="font-display flex overflow-hidden text-[clamp(3.5rem,14vw,12rem)] leading-none tracking-[-0.03em]">
        {'Serene'.split('').map((c, i) => (
          <span key={i} className="inline-block will-change-transform">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-8 flex w-[min(60vw,420px)] items-center gap-5">
        <div ref={line} className="h-px flex-1 origin-left scale-x-0 bg-cream/60" />
        <span ref={counter} className="font-sans text-xs tabular-nums tracking-[0.3em] text-cream/80">
          000
        </span>
      </div>
      <div className="eyebrow absolute bottom-8 text-cream/60">Fitness & Wellness Club · Jaipur</div>
    </div>
  )
}
