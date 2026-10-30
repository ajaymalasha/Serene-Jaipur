import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

type TextProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** "lines" slide up per line; "chars" cascade per character; "words" per word */
  type?: 'lines' | 'words' | 'chars'
  delay?: number
  stagger?: number
  duration?: number
  /** Start when element hits this viewport position */
  start?: string
  /** Play immediately (e.g. hero) instead of on scroll */
  immediate?: boolean
  once?: boolean
}

/**
 * Kinetic text reveal using SplitText. Masks each line/word/char and slides it in.
 */
export function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  type = 'lines',
  delay = 0,
  stagger,
  duration,
  start = 'top 85%',
  immediate = false,
  once = true,
}: TextProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    let split: SplitText | undefined
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: type === 'lines' ? 'lines' : type === 'words' ? 'words,lines' : 'chars,words,lines',
        mask: type === 'lines' ? 'lines' : type === 'words' ? 'words' : 'chars',
        linesClass: 'line',
        autoSplit: true,
        onSplit: (self) => {
          const targets = type === 'lines' ? self.lines : type === 'words' ? self.words : self.chars
          const tween = gsap.from(targets, {
            yPercent: type === 'chars' ? 120 : 110,
            rotate: type === 'chars' ? 6 : 0,
            opacity: type === 'chars' ? 0 : 1,
            duration: duration ?? (type === 'chars' ? 0.9 : 1.2),
            ease: 'power4.out',
            stagger: stagger ?? (type === 'lines' ? 0.1 : type === 'words' ? 0.04 : 0.018),
            delay,
            immediateRender: true,
            scrollTrigger: immediate
              ? undefined
              : { trigger: el, start, once, toggleActions: 'play none none reverse' },
          })
          return tween
        },
      })
    }, el)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [type, delay, stagger, duration, start, immediate, once])

  return (
    <Tag ref={ref} className={`${className}`}>
      {children}
    </Tag>
  )
}

type BlockProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  start?: string
  as?: ElementType
  /** Stagger direct children */
  stagger?: number
  scale?: boolean
}

/** Fade + rise reveal for blocks. If `stagger` is set, direct children are staggered. */
export function Reveal({ children, className = '', delay = 0, y = 40, start = 'top 88%', as: Tag = 'div', stagger, scale }: BlockProps) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const targets = stagger !== undefined ? Array.from(el.children) : el
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        scale: scale ? 0.96 : 1,
        duration: 1.3,
        delay,
        ease: 'power4.out',
        stagger: stagger ?? 0,
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [delay, y, start, stagger, scale])
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Image wipe reveal: clip-path from bottom + slight scale-down of inner media. */
export function RevealMedia({ children, className = '', delay = 0, start = 'top 85%', direction = 'up' }: {
  children: ReactNode
  className?: string
  delay?: number
  start?: string
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const inner = el.firstElementChild as HTMLElement | null
    const from =
      direction === 'up'
        ? 'inset(100% 0 0 0)'
        : direction === 'left'
          ? 'inset(0 100% 0 0)'
          : 'inset(0 0 0 100%)'
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true }, delay })
      tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' })
      if (inner) tl.fromTo(inner, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
    }, el)
    return () => ctx.revert()
  }, [delay, start, direction])
  return (
    <div ref={ref} className={`will-change-[clip-path] ${className}`}>
      {children}
    </div>
  )
}

export { ScrollTrigger }
