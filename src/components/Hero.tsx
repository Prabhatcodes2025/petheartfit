import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LeadButton } from './LeadPopup'
const slides = [{ image: '/assets/hero-companionship.webp', eyebrow: 'Training • Care • Better Together', title: 'A Well-Trained Pet. A Happier Home.', text: 'Professional pet training, behaviour guidance and practical support that help pets and their people thrive together.' }, { image: '/assets/hero-dog.webp', eyebrow: 'Professional Dog Training', title: 'Clear Guidance. Confident Companions.', text: 'Personalised obedience, leash and behaviour programs designed around your dog’s age, temperament and everyday life.' }, { image: '/assets/hero-puppy.webp', eyebrow: 'Puppy Training', title: 'Good Habits Begin With The Right Start.', text: 'Build routines, social confidence and essential manners during your puppy’s most important learning stage.' }, { image: '/assets/hero-cat.webp', eyebrow: 'Behaviour & Bonding', title: 'Understand Behaviour. Strengthen Trust.', text: 'Humane, behaviour-led coaching gives pet parents the tools to create calmer, more connected homes.' }]
export function Hero() { const [current, setCurrent] = useState(0), [playing, setPlaying] = useState(true); const touch = useRef(0); useEffect(() => { if (!playing) return; const id = setInterval(() => setCurrent(v => (v + 1) % slides.length), 6500); return () => clearInterval(id) }, [playing]); const go = (n: number) => setCurrent((n + slides.length) % slides.length); const s = slides[current]; return <section className="hero" onMouseEnter={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)} onTouchStart={e => touch.current = e.touches[0].clientX} onTouchEnd={e => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(current + (d < 0 ? 1 : -1)) }}><div className="hero-orbit" /><div className="container hero-grid"><div className="hero-content" key={current}><p className="eyebrow">{s.eyebrow}</p><h1>{s.title}</h1><div className="hero-actions">
  <a
    className="button"
    href="tel:+919211630927"
  >
    CALL NOW
  </a>

  <LeadButton service={current === 0 ? 'Puppy Training' : 'Dog Training'}>
    BOOK YOUR SERVICE
  </LeadButton>
</div></div><div className="hero-media" key={`image-${current}`}><img src={s.image} alt="Pawrexio professional pet training" fetchPriority={current === 0 ? 'high' : 'auto'} /><span>LOVE<br />CARE<br />COMPANIONSHIP</span></div></div><div className="container hero-controls"><div className="hero-dots">{slides.map((_, i) => <button className={i === current ? 'active' : ''} onClick={() => go(i)} key={i} aria-label={`Go to slide ${i + 1}`}><span /></button>)}</div><div className="hero-arrows"><button onClick={() => go(current - 1)} aria-label="Previous slide"><ArrowLeft /></button><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause slider' : 'Play slider'}>{playing ? <Pause /> : <Play />}</button><button onClick={() => go(current + 1)} aria-label="Next slide"><ArrowRight /></button></div></div></section> }
