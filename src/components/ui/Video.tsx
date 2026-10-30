import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { media } from '../../data/site'

type Props = {
  name: string
  className?: string
  videoClassName?: string
  style?: CSSProperties
  priority?: boolean
  /** Play only when hovered (used in cards) */
  hoverPlay?: boolean
  playing?: boolean
}

/**
 * Muted, looping, inline video that only plays when visible.
 * Poster is shown until the first frame is ready (skeleton under it).
 */
export function Video({ name, className = '', videoClassName = '', style, priority, hoverPlay, playing }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const shouldPlay = inView && (hoverPlay ? !!playing : true)
    if (shouldPlay) {
      const p = el.play()
      if (p) p.catch(() => {})
    } else {
      el.pause()
    }
  }, [inView, hoverPlay, playing])

  return (
    <div className={`relative overflow-hidden ${ready ? '' : 'skeleton'} ${className}`} style={style}>
      <video
        ref={ref}
        className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'} ${videoClassName}`}
        src={media.video(name)}
        poster={media.poster(name)}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
      />
    </div>
  )
}
