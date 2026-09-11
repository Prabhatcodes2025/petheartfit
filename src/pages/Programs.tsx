import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { packageAliases } from '../package-aliases'
import { LeadButton } from '../components/LeadPopup'
import { PageHero, whatsapp } from '../components/Layout'
import { Breadcrumb, Content } from '../components/Content'
import { programs, siteSettings } from '../data'
import type { Program } from '../types'

export function PackageCards({items,baseRoute='/packages'}:{items:Program[];baseRoute?:string}) {
 return <div className="package-grid">{items.map(p=><article className="package-card" key={p.id}>
  <img src={p.image} alt={p.category==='Cat Training'?'Cat in a Pawrexio care setting':'Pawrexio pet training'} width="600" height="500" loading="lazy"/>
  <div><p className="eyebrow">{p.category}</p><h3>{p.title}</h3><b className="package-duration">{p.sessions||p.duration}</b>{p.price&&<p className="package-price">{p.regularPrice&&<del>{p.regularPrice}</del>} <strong>{p.price}</strong></p>}<p>{p.summary}</p>
   <div className="card-actions"><Link className="button" to={`${baseRoute}/${p.slug}`}>Check Price <ArrowRight/></Link><a className="button button-outline" href={whatsapp(p.title)} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></div>
  </div>
 </article>)}</div>
}

export function Programs(){return <><PageHero eyebrow="Training & care packages" title="A clear path for every stage." text="Explore dog and cat training, grooming and walking. Each package has a full breakdown before you book."/><Breadcrumb items={[{label:'Packages'}]}/><section className="section"><div className="container"><PackageCards items={programs}/></div></section></>}

const ownerGuide=[
 ['Create a Safe Home','Prepare a clean, secure space where your pet can relax.'],
 ['Start Puppy Training Early','Teach basic commands and good behaviour from day one.'],
 ['Daily Routine','Maintain consistent feeding, exercise and sleep schedules.'],
 ['Leash Training','Build safe, calm walking manners with patient practice.'],
 ['Dog Walking','Regular walks keep pets physically active and mentally stimulated.'],
 ['Pet Grooming','Keep your pet clean and healthy with professional grooming.'],
 ['Cat Behaviour','Encourage positive habits and stress-free living with expert guidance.'],
 ['Reward Good Behaviour','Use praise, food and play to reinforce useful choices.'],
 ['Regular Vet Visits','Routine health check-ups and vaccinations keep pets healthy.']
]

export function ProgramDetail(){
 const {slug}=useParams(),{pathname}=useLocation()
 if(slug&&packageAliases[slug])return <Navigate replace to={`/packages/${packageAliases[slug]}`}/>
 const p=programs.find(x=>x.slug===slug)
 if(!p)return <section className="section container"><h1>Package unavailable</h1><Link to="/packages">Explore packages</Link></section>
 const fromServices=pathname.startsWith('/services/')
 const blocks=p.blocks?.length?p.blocks:[...(p.content||[]).map(text=>({kind:'paragraph',text})),...p.includes.map(text=>({kind:'list',text}))]
 return <>
  <section className="legacy-detail-title"><div className="container"><h1>{p.title}</h1></div></section>
  <Breadcrumb items={[{label:fromServices?'Services':'Packages',to:fromServices?'/services':'/packages'},{label:p.title}]}/>
  <section className="section legacy-detail-section"><div className="container legacy-detail-grid">
   <aside className="legacy-detail-sidebar">
    <nav aria-label="Service categories"><h2>Services</h2><Link to="/services/dog-training">Dog Training</Link><Link to="/services/cat-training">Cat Training</Link><Link to="/services/grooming">Grooming</Link><Link to="/services/dog-walking">Walking</Link></nav>
    <div className="detail-aside"><p className="eyebrow">Have Any Questions?</p><a href={`tel:${siteSettings.phone}`}><Phone/>{siteSettings.phone}</a><a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a><LeadButton service={p.title} package={p.slug}>Book Your Service</LeadButton><a className="button whatsapp-action" href={whatsapp(p.title)} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></div>
   </aside>
   <article className="legacy-package-main">
    <img className="legacy-package-image" src={p.image} alt={`Pawrexio ${p.title}`}/><h2>{p.title}</h2><p className="legacy-duration">{p.sessions||p.duration}</p>
    <div className="legacy-price-row"><strong>{p.price||'Confirm on enquiry'}</strong>{p.regularPrice&&<del>{p.regularPrice}</del>}{p.discount&&<span>{p.discount}</span>}</div>
    {(p.rating||p.savings)&&<div className="legacy-rating-row">{p.rating&&<b>{p.rating} Rating</b>}{p.savings&&<b>You Saved {p.savings}</b>}</div>}
    {p.priceNote&&<p className="muted">{p.priceNote}</p>}<Content blocks={blocks}/>
    <div className="legacy-detail-actions"><LeadButton service={p.title} package={p.slug}>Book a Session</LeadButton><a className="button button-outline" href={whatsapp(p.title)} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></div>
   </article>
  </div></section>
  <section className="section package-assurance"><div className="container"><p className="eyebrow">Fast, Certified &amp; Trusted Worldwide</p><h2>Professional Pet Training &amp; Care Services</h2><p>Pawrexio is your trusted partner for Professional Dog Training, Puppy Training, Cat Training, Dog Walking, Pet Grooming and Dog Grooming at Home. We help pet parents raise happy, healthy and well-behaved companions with certified trainers and positive training methods.</p><div className="trust-card-grid">{[['Affordable Pricing','Transparent and budget-friendly pricing with no hidden charges.'],['Guaranteed Results','Proven training methods with customer satisfaction guaranteed.'],['Certified Trainers','Experienced pet experts providing personalized care and training.'],['24/7 Support','Dedicated online support whenever you need guidance.']].map(([title,text])=><article className="trust-card" key={title}><Check/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="section legacy-owner-guide"><div className="container"><p className="eyebrow">First-Time Pet Owner Guide</p><h2>Give Your Pet the Best Start</h2><p>The first few weeks are the most important for building a lifelong bond. Follow these simple tips to keep your furry companion happy and healthy.</p><div className="owner-tip-grid">{ownerGuide.map(([title,text],i)=><article className="owner-tip-card" key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
 </>
}
