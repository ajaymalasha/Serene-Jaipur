import { useId } from 'react'

/**
 * Serene mark — a single leaf / flame form split by a stem.
 * Stroke paths draw themselves on when `animate` is set.
 */
export function Logo({ className = 'h-7 w-7', animate = false }: { className?: string; animate?: boolean }) {
  const key = 'lg' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      {animate && (
        <style>{`
          .${key}-p { stroke-dasharray: 160; stroke-dashoffset: 160; animation: ${key}-draw 1.8s var(--ease-out-expo) forwards; }
          .${key}-s { stroke-dasharray: 30; stroke-dashoffset: 30; animation: ${key}-draw 1.2s 0.6s var(--ease-out-expo) forwards; }
          @keyframes ${key}-draw { to { stroke-dashoffset: 0; } }
        `}</style>
      )}
      <path
        className={`${key}-p`}
        d="M32 8c-8 10-15 16-15 27a15 15 0 0 0 30 0C47 24 40 18 32 8Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path className={`${key}-s`} d="M32 22v26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".8" />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display leading-none tracking-[-0.02em] ${className}`} translate="no">
      Serene
    </span>
  )
}
