import type { ReactNode, ComponentProps } from 'react'
import { Magnetic } from './Magnetic'

type Variant = 'forest' | 'cream' | 'outline' | 'outline-cream'

type Props = {
  children: ReactNode
  variant?: Variant
  href?: string
  magnetic?: boolean
  className?: string
  icon?: boolean
} & Omit<ComponentProps<'a'>, 'children' | 'href'> &
  Omit<ComponentProps<'button'>, 'children'>

const styles: Record<Variant, string> = {
  forest: 'bg-forest text-cream [--btn-fill:var(--color-forest-ink)]',
  cream: 'bg-cream text-forest-ink [--btn-fill:var(--color-sand)]',
  outline: 'border border-ink/30 text-ink hover:text-cream [--btn-fill:var(--color-forest)]',
  'outline-cream': 'border border-cream/40 text-cream hover:text-forest-ink [--btn-fill:var(--color-cream)]',
}

export function Button({ children, variant = 'forest', href, magnetic = true, className = '', icon = true, ...rest }: Props) {
  const inner = (
    <>
      <span className="swap">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      {icon && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        >
          <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )
  const cls = `group btn-fill inline-flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-3.5 md:px-7 md:py-4 font-sans text-[13px] md:text-sm font-medium tracking-wide transition-colors duration-500 ${styles[variant]} ${className}`

  const el = href ? (
    <a href={href} className={cls} {...(rest as ComponentProps<'a'>)}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} {...(rest as ComponentProps<'button'>)}>
      {inner}
    </button>
  )

  return magnetic ? <Magnetic>{el}</Magnetic> : el
}
