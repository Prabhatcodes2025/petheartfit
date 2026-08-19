import { useEffect, useState } from 'react'
import { ChevronRight, Instagram, Linkedin, Mail, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const nav = [['Home','/'],['About','/about'],['Services','/services'],['Programs','/programs'],['Locations','/locations'],['Gallery','/gallery'],['Journal','/blog'],['Contact','/contact']]

export function Layout() {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const loc=useLocation()
  useEffect(()=>{ const fn=()=>setScrolled(scrollY>24); addEventListener('scroll',fn); return()=>removeEventListener('scroll',fn)},[])
  useEffect(()=>{setOpen(false); scrollTo({top:0,behavior:'smooth'})},[loc.pathname])
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled?'scrolled':''}`}>
      <Link to="/" className="brand" aria-label="PAWREXIO home"><img src="/assets/logo.png" alt="PAWREXIO" /><span><b>PAWREXIO</b><small>TRAIN • TRUST • TRANSFORM</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([n,p])=><NavLink key={p} to={p} end={p==='/' }>{n}</NavLink>)}</nav>
      <Link className="button button-small header-cta" to="/book">Book a session</Link>
      <button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Open menu">{open?<X/>:<Menu/>}</button>
      <div className={`mobile-panel ${open?'open':''}`}><div className="mobile-tag">Professional care. Personal attention.</div>{nav.map(([n,p],i)=><NavLink key={p} to={p}><span>0{i+1}</span>{n}<ChevronRight/></NavLink>)}<Link className="button" to="/book">Book a session</Link></div>
    </header>
    <main id="main"><Outlet/></main>
    <a className="whatsapp" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Talk to PAWREXIO on WhatsApp"><MessageCircle/><span>Talk to a trainer</span></a>
    <footer className="footer">
      <div className="footer-top"><div className="footer-brand"><img src="/assets/logo.png" alt="PAWREXIO"/><p>Thoughtful training for confident pets, calm homes and stronger lifelong bonds.</p><div className="socials"><a href="#" aria-label="Instagram"><Instagram/></a><a href="#" aria-label="LinkedIn"><Linkedin/></a></div></div>
        <div><h4>Explore</h4><Link to="/about">Our approach</Link><Link to="/services">Services</Link><Link to="/programs">Programs</Link><Link to="/gallery">Gallery</Link></div>
        <div><h4>Useful</h4><Link to="/locations">Service areas</Link><Link to="/blog">Training journal</Link><Link to="/faq">FAQs</Link><Link to="/book">Book a session</Link></div>
        <div><h4>Contact</h4><a href="mailto:hello@pawrexio.com"><Mail/> hello@pawrexio.com</a><span><Phone/> Contact number on request</span><p className="muted">India · Sessions by appointment</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} PAWREXIO. All rights reserved.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/admin/login">Admin</Link></div></div>
    </footer>
  </>
}

export function whatsapp(context='pet training programs'){ const n=import.meta.env.VITE_WHATSAPP_NUMBER || ''; const msg=encodeURIComponent(`Hi PAWREXIO, I would like to know more about ${context}.`); return n?`https://wa.me/${n.replace(/\D/g,'')}?text=${msg}`:`/contact?subject=${encodeURIComponent(context)}` }

export function PageHero({eyebrow,title,text,image='/assets/hero-dog.webp'}:{eyebrow:string,title:string,text:string,image?:string}){
  return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(3,3,3,.96) 0%,rgba(3,3,3,.78) 48%,rgba(3,3,3,.18) 100%),url(${image})`}}><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p></div></section>
}

export function SectionTitle({eyebrow,title,text,center=false}:{eyebrow:string,title:string,text?:string,center?:boolean}){return <div className={`section-title ${center?'center':''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text&&<p>{text}</p>}</div>}
