import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

type Props = {
  children: ReactNode
  className?: string
  /** base px per second */
  speed?: number
  /** reverse direction */
  reverse?: boolean
  /** scroll-velocity reactive */
  reactive?: boolean
}

/** Infinite marquee that speeds up & skews with scroll velocity. */
export function Marquee({ children, className = '', speed = 60, reverse = false, reactive = true }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const t = track.current
    const w = wrap.current
    if (!t || !w) return
    if (prefersReducedMotion()) return

    const first = t.firstElementChild as HTMLElement
    let width = first.offsetWidth
    const dir = reverse ? 1 : -1
    let x = 0
    let vel = 1
    let skew = 0

    const update = () => {
      width = first.offsetWidth
    }
    window.addEventListener('resize', update)

    const tick = (_: number, delta: number) => {
      const dt = delta / 1000
      x += dir * speed * vel * dt
      // wrap seamlessly
      if (dir < 0 && x <= -width) x += width
      if (dir > 0 && x >= 0) x -= width
      gsap.set(t, { x, skewX: skew })
      vel += (1 - vel) * 0.06
      skew += (0 - skew) * 0.08
    }
    gsap.ticker.add(tick)

    let st: ScrollTrigger | undefined
    if (reactive) {
      st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 300
          vel = 1 + Math.min(Math.abs(v), 6)
          skew = gsap.utils.clamp(-8, 8, v * 0.6)
        },
      })
    }

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('resize', update)
      st?.kill()
    }
  }, [speed, reverse, reactive])

  return (
    <div ref={wrap} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
