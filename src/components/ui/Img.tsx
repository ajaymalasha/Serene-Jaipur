import { useState, type CSSProperties } from 'react'
import { media } from '../../data/site'

type Props = {
  name: string
  alt: string
  className?: string
  imgClassName?: string
  style?: CSSProperties
  priority?: boolean
  sizes?: string
}

/**
 * Blur-up image: tiny placeholder + skeleton shimmer until the full asset decodes.
 */
export function Img({ name, alt, className = '', imgClassName = '', style, priority, sizes }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative overflow-hidden ${loaded ? '' : 'skeleton'} ${className}`}
      style={style}
      aria-busy={!loaded}
    >
      <img
        src={media.tiny(name)}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={media.img(name)}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`relative h-full w-full object-cover transition-[opacity,scale,transform] duration-[1200ms] ease-[var(--ease-out-expo)] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
