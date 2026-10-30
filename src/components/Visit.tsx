import { SITE } from '../data/site'
import { Img } from './ui/Img'
import { Reveal, RevealMedia, RevealText } from './ui/Reveal'
import { Button } from './ui/Button'

export function Visit() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapsQuery)}`
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address.mapsQuery)}&z=15&output=embed`

  return (
    <section id="visit" className="relative bg-cream py-[12vh] md:py-[16vh]">
      <div className="container-x grid grid-cols-12 gap-y-12 md:gap-x-10">
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5">Visit</p>
          </Reveal>
          <RevealText as="h2" type="lines" className="display-md text-ink">
            Find us in <em className="text-forest">Mansarovar.</em>
          </RevealText>

          <Reveal className="mt-10 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2 md:grid-cols-1" stagger={0.1}>
            <div>
              <p className="eyebrow">Address</p>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-soft">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </p>
              <a href={mapsHref} target="_blank" rel="noreferrer" className="link-line mt-3 inline-block font-sans text-sm font-medium text-ink">
                Open in Google Maps
              </a>
            </div>
            <div>
              <p className="eyebrow">Hours</p>
              <ul className="mt-3 space-y-1.5 font-sans text-[15px] text-ink-soft">
                {SITE.hours.map((h) => (
                  <li key={h.label} className="flex justify-between gap-6 border-b border-dotted border-ink/15 pb-1.5">
                    <span>{h.label}</span>
                    <span className="text-ink">{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Connect</p>
              <div className="mt-3 flex flex-col gap-1.5 font-sans text-[15px] text-ink-soft">
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="link-line w-max">
                  Instagram {SITE.instagramHandle}
                </a>
                {SITE.phoneDisplay && (
                  <a href={`tel:+${SITE.whatsapp}`} className="link-line w-max">
                    {SITE.phoneDisplay}
                  </a>
                )}
                {SITE.email && (
                  <a href={`mailto:${SITE.email}`} className="link-line w-max">
                    {SITE.email}
                  </a>
                )}
              </div>
            </div>
            <div className="pt-2">
              <Button href="#membership" variant="outline">
                Request a tour
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7">
          <div className="grid grid-cols-5 gap-4 md:gap-6">
            <RevealMedia className="col-span-3 aspect-[4/5] overflow-hidden rounded-2xl" delay={0.1}>
              <Img name="facade" alt="Serene at dusk, Mansarovar" className="h-full w-full" />
            </RevealMedia>
            <div className="col-span-2 flex flex-col gap-4 md:gap-6">
              <RevealMedia className="aspect-square overflow-hidden rounded-2xl" delay={0.2} direction="right">
                <Img name="reception" alt="Reception" className="h-full w-full" />
              </RevealMedia>
              <RevealMedia className="flex-1 overflow-hidden rounded-2xl border border-ink/10 bg-cream-2" delay={0.3} direction="right">
                <iframe
                  title="Map to Serene"
                  src={embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[180px] w-full grayscale-[0.4] contrast-[1.05] sepia-[0.15] transition-all duration-700 hover:grayscale-0 hover:sepia-0"
                />
              </RevealMedia>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
