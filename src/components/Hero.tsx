import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { siteSettings } from '../data'
import { LeadButton } from './LeadPopup'
const slides = [
  {
    image: '/assets/hero-reference/hero-dog-run.jpg',
    desktopPosition: '50% 50%',
    tabletPosition: '50% 50%',
    mobilePosition: '58% 50%',
    eyebrow: '15+ Years of Experience.',
    title: '15+ Years Experience | 5000+ Pets Trained'
  },
  {
    image: '/assets/hero-reference/hero-dog-training.jpg',
    desktopPosition: '50% 50%',
    tabletPosition: '50% 50%',
    mobilePosition: '61% 50%',
    eyebrow: '15+ Years of Experience.',
    title: 'Puppy Training | Obedience Training | Behaviour Training | Leash Training'
  },
  {
    image: '/assets/hero-reference/hero-dog-portrait.jpg',
    desktopPosition: '50% 50%',
    tabletPosition: '50% 50%',
    mobilePosition: '46% 50%',
    eyebrow: '15+ Years of Experience.',
    title: 'Professional Dog Training for Happier, Better-Behaved Pets'
  }
]
export function Hero() { const [current, setCurrent] = useState(0), [playing, setPlaying] = useState(true); const touch = useRef(0); useEffect(() => { if (!playing) return; const id = setInterval(() => setCurrent(v => (v + 1) % slides.length), 6000); return () => clearInterval(id) }, [playing]); const go = (n: number) => setCurrent((n + slides.length) % slides.length); const s = slides[current]; return <section className="hero legacy-hero" style={{'--hero-desktop-position':s.desktopPosition,'--hero-tablet-position':s.tabletPosition,'--hero-mobile-position':s.mobilePosition} as CSSProperties} onMouseEnter={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)} onTouchStart={e => touch.current = e.touches[0].clientX} onTouchEnd={e => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(current + (d < 0 ? 1 : -1)) }}><img className="legacy-hero-bg" key={`image-${current}`} src={s.image} alt="Pawrexio professional pet training" fetchPriority={current===0?'high':'auto'} width="1366" height="550"/><div className="legacy-hero-overlay"/><div className="container hero-grid"><div className="hero-content" key={current}><p className="eyebrow">{s.eyebrow}</p><h2>{s.title}</h2><div className="hero-actions">
  <a
    className="button"
    href={`tel:${siteSettings.phone}`}
  >
    CALL NOW
  </a>

  <LeadButton service={current === 0 ? 'Puppy Training' : 'Dog Training'}>
    BOOK YOUR SERVICE
  </LeadButton>
</div></div></div><div className="container hero-controls"><div className="hero-dots">{slides.map((_, i) => <button className={i === current ? 'active' : ''} onClick={() => go(i)} key={i} aria-label={`Go to slide ${i + 1}`}><span /></button>)}</div><div className="hero-arrows"><button onClick={() => go(current - 1)} aria-label="Previous slide"><ArrowLeft /></button><button onClick={() => go(current + 1)} aria-label="Next slide"><ArrowRight /></button></div></div></section> }
