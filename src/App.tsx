import { useCallback, useEffect, useState } from 'react'
import { SmoothScroll } from './lib/SmoothScroll'
import { ScrollTrigger } from './lib/gsap'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { Philosophy } from './components/Philosophy'
import { Spaces } from './components/Spaces'
import { Movement } from './components/Movement'
import { Recovery } from './components/Recovery'
import { Technology } from './components/Technology'
import { Gallery } from './components/Gallery'
import { Pillars } from './components/Pillars'
import { Membership } from './components/Membership'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    // Make sure pinned sections measure correctly once fonts/media settle.
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      clearTimeout(t)
      window.removeEventListener('load', onLoad)
    }
  }, [ready])

  return (
    <SmoothScroll>
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Ticker />
        <Philosophy />
        <Spaces />
        <Movement />
        <Recovery />
        <Technology />
        <Gallery />
        <Pillars />
        <Membership />
        <Visit />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
