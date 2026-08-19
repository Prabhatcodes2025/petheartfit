import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const slides=[
 {image:'/assets/hero-dog.webp',eyebrow:'Professional training · Personalised approach',title:'Training pets. Building bonds. Transforming lives.',text:'Structured, humane training that helps your pet make better choices—and helps you understand one another.',cta:'Find the right program'},
 {image:'/assets/hero-puppy.webp',eyebrow:'Puppy foundations',title:'Better behaviour starts with better beginnings.',text:'Build calm routines, confident social skills and essential manners during the stage that matters most.',cta:'Explore puppy training'},
 {image:'/assets/hero-cat.webp',eyebrow:'Training beyond expectations',title:'Care designed around the animal in front of us.',text:'From canine behaviour to feline enrichment, every plan respects personality, pace and wellbeing.',cta:'Discover our approach'}
]

export function Hero(){
 const [current,setCurrent]=useState(0),[playing,setPlaying]=useState(true); const touch=useRef(0)
 useEffect(()=>{if(!playing)return; const id=setInterval(()=>setCurrent(v=>(v+1)%slides.length),6500); return()=>clearInterval(id)},[playing])
 const go=(n:number)=>setCurrent((n+slides.length)%slides.length)
 return <section className="hero" onMouseEnter={()=>setPlaying(false)} onMouseLeave={()=>setPlaying(true)} onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-touch.current;if(Math.abs(d)>50)go(current+(d<0?1:-1))}}>
  {slides.map((s,i)=><div className={`hero-slide ${i===current?'active':''}`} key={s.title} style={{backgroundImage:`url(${s.image})`}} aria-hidden={i!==current}><div className="hero-shade"/></div>)}
  <div className="hero-content container" key={current}><p className="eyebrow">{slides[current].eyebrow}</p><h1>{slides[current].title}</h1><p>{slides[current].text}</p><div className="hero-actions"><Link className="button" to="/book">{slides[current].cta}</Link><Link className="text-link" to="/services">View all services <ArrowRight/></Link></div></div>
  <div className="hero-controls container"><div className="slide-count"><span>0{current+1}</span><i/><span>0{slides.length}</span></div><div className="hero-dots">{slides.map((_,i)=><button className={i===current?'active':''} onClick={()=>go(i)} key={i} aria-label={`Go to slide ${i+1}`}><span/></button>)}</div><div className="hero-arrows"><button onClick={()=>go(current-1)} aria-label="Previous slide"><ArrowLeft/></button><button onClick={()=>setPlaying(!playing)} aria-label={playing?'Pause slider':'Play slider'}>{playing?<Pause/>:<Play/>}</button><button onClick={()=>go(current+1)} aria-label="Next slide"><ArrowRight/></button></div></div>
  <div className="hero-progress" key={`p${current}`} style={{animationPlayState:playing?'running':'paused'}}/>
 </section>
}
