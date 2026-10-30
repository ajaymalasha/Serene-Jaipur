import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, isTouch } from '../../lib/gsap'

type Props = {
  children: ReactNode
  strength?: number
  className?: string
}

/** Wraps a child and lets it gently follow the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el || isTouch()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power3.out' })
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className || 'inline-block'}>
      {children}
    </div>
  )
}
