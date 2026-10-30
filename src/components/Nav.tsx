import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, SITE } from '../data/site'
import { Logo, Wordmark } from './Logo'
import { Magnetic } from './ui/Magnetic'
import { useLenis } from '../lib/lenis-context'

export function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [dark, setDark] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > last && y > 300 && !open)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Invert nav colour over dark sections
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-theme="dark"]')
    const io = new IntersectionObserver(
      (entries) => {
        // dark when any dark section covers the nav bar area
        const any = entries.some((e) => e.isIntersecting)
        if (entries.length) setDark(any)
      },
      { rootMargin: '-1px 0px -92% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ready])

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  const inverted = dark || open
  const fg = inverted ? 'text-cream' : 'text-ink'

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: hidden ? -110 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[900] transition-colors duration-500 ${fg}`}
      >
        <div
          className={`container-x flex h-[var(--nav-h)] items-center justify-between transition-all duration-500 ${
            scrolled && !open ? 'backdrop-blur-md [background:color-mix(in_oklab,var(--color-cream)_55%,transparent)]' : ''
          } ${scrolled && dark && !open ? '[background:color-mix(in_oklab,var(--color-forest-ink)_45%,transparent)]' : ''}`}
        >
          <a href="#top" className="group flex items-center gap-3" aria-label="Serene — home">
            <Logo className="h-7 w-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[360deg]" />
            <Wordmark className="text-[1.6rem]" />
          </a>

          <nav className={`hidden items-center gap-9 transition-opacity duration-300 lg:flex ${open ? 'pointer-events-none opacity-0' : 'opacity-100'}`} aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="link-line font-sans text-[13px] font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <a
                href="#membership"
                className={`btn-fill group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium tracking-wide transition-colors duration-500 ${
                  inverted
                    ? 'border-cream/40 hover:text-forest-ink [--btn-fill:var(--color-cream)]'
                    : 'border-ink/25 hover:text-cream [--btn-fill:var(--color-forest)]'
                }`}
              >
                <span className="swap">
                  <span>Request a tour</span>
                  <span aria-hidden>Request a tour</span>
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="menu"
                onClick={() => setOpen((v) => !v)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
                  inverted ? 'border-cream/30' : 'border-ink/20'
                }`}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <span
                  className={`absolute h-px w-[18px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    open ? 'rotate-45' : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`absolute h-px w-[18px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    open ? '-rotate-45' : 'translate-y-[3px]'
                  }`}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            key="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[800] flex flex-col bg-forest text-cream"
          >
            <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-[calc(var(--nav-h)+2rem)] md:flex-row md:items-end">
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-1"
                    >
                      <span className="font-sans text-xs tabular-nums tracking-[0.3em] text-cream/50">0{i + 1}</span>
                      <span className="font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:italic">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-10 flex flex-col gap-6 md:mt-0 md:items-end md:text-right"
              >
                <div>
                  <p className="eyebrow text-cream/50">Visit</p>
                  <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-cream/80">
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-cream/50">Follow</p>
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" className="link-line mt-2 inline-block font-sans text-sm text-cream/80">
                    {SITE.instagramHandle}
                  </a>
                </div>
                <a
                  href="#membership"
                  onClick={() => setOpen(false)}
                  className="btn-fill group inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3.5 font-sans text-sm font-medium text-forest-ink [--btn-fill:var(--color-sand)]"
                >
                  <span className="swap">
                    <span>Request a tour</span>
                    <span aria-hidden>Request a tour</span>
                  </span>
                </a>
              </motion.div>
            </div>
            <div className="pointer-events-none absolute -bottom-[6vw] left-0 right-0 select-none overflow-hidden font-display text-[28vw] leading-none text-cream/[0.06]">
              Serene
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
