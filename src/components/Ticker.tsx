import { Marquee } from './ui/Marquee'
import { Logo } from './Logo'

const WORDS = ['Move', 'Lift', 'Flow', 'Recover', 'Nourish', 'Belong']

/** Kinetic typography strip between hero and philosophy. */
export function Ticker() {
  return (
    <section aria-hidden className="relative border-y border-ink/10 bg-cream py-5 md:py-7">
      <Marquee speed={70}>
        {WORDS.map((w, i) => (
          <span key={w} className="flex items-center">
            <span className={`font-display px-6 text-[clamp(2.2rem,5.5vw,5rem)] leading-none tracking-[-0.02em] md:px-10 ${i % 2 ? 'italic text-forest' : 'text-ink'}`}>
              {w}
            </span>
            <Logo className="h-5 w-5 text-sand-deep md:h-7 md:w-7" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
