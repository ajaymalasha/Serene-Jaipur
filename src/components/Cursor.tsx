import { useEffect, useRef, useState } from 'react'
import { gsap, isTouch } from '../lib/gsap'

/**
 * Custom cursor: a small dot + lagging ring. Grows on interactive elements,
 * and shows a label when hovering elements with [data-cursor="..."].
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [enabled] = useState(() => typeof window !== 'undefined' && !isTouch())

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-cursor')

    const d = dot.current!
    const r = ring.current!
    const xTo = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3.out' })
    const dxTo = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power2.out' })
    const dyTo = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power2.out' })

    let shown = false
    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true
        gsap.to([d, r], { opacity: 1, duration: 0.4 })
      }
      xTo(e.clientX)
      yTo(e.clientY)
      dxTo(e.clientX)
      dyTo(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const labelled = t.closest<HTMLElement>('[data-cursor]')
      const interactive = t.closest('a, button, [role="button"], input, textarea, select, label')
      if (labelled) {
        setLabel(labelled.dataset.cursor || '')
        gsap.to(r, { scale: 4.2, backgroundColor: 'rgba(75,88,65,0.92)', borderColor: 'rgba(75,88,65,0)', duration: 0.5, ease: 'power3.out' })
        gsap.to(d, { scale: 0, duration: 0.3 })
      } else if (interactive) {
        setLabel('')
        gsap.to(r, { scale: 1.8, backgroundColor: 'rgba(75,88,65,0.12)', borderColor: 'rgba(75,88,65,0.6)', duration: 0.5, ease: 'power3.out' })
        gsap.to(d, { scale: 0.5, duration: 0.3 })
      } else {
        setLabel('')
        gsap.to(r, { scale: 1, backgroundColor: 'rgba(75,88,65,0)', borderColor: 'rgba(75,88,65,0.5)', duration: 0.5, ease: 'power3.out' })
        gsap.to(d, { scale: 1, duration: 0.3 })
      }
    }
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3 })
    const enter = () => gsap.to([d, r], { opacity: 1, duration: 0.3 })
    const down = () => gsap.to(r, { scale: '-=0.3', duration: 0.15 })
    const up = () => gsap.to(r, { scale: '+=0.3', duration: 0.3, ease: 'back.out(2)' })

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.body.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest opacity-0 mix-blend-multiply"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-forest/50 opacity-0"
      >
        <span
          className={`font-sans text-[3px] font-semibold uppercase tracking-[0.2em] text-cream transition-opacity duration-300 ${
            label ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {label}
        </span>
      </div>
    </>
  )
}
