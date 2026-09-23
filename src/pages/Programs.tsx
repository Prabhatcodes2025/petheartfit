import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { packageAliases } from '../package-aliases'
import { LeadButton } from '../components/LeadPopup'
import { PageHero, whatsapp } from '../components/Layout'
import { Breadcrumb, Content } from '../components/Content'
import { imageAlt, programs, siteSettings } from '../data'
import type { Program } from '../types'
import { FAQList } from '../components/FAQ'

export function PackageCards({items,baseRoute='/packages'}:{items:Program[];baseRoute?:string}) {
 return <div className="package-grid">{items.map(p=><article className="package-card" key={p.id}>
  <img src={p.image} alt={p.imageAlt||imageAlt(p.image,p.category==='Cat Training'?'Cat in a Pawrexio care setting':'Pawrexio pet training')} width="600" height="500" loading="lazy"/>
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

const catIncluded=['Litter Box & Toilet Training','Biting & Scratching Behaviour Management','Socialization & Appropriate Behaviour','Handling & Touch Acceptance','Basic House Rules & Boundaries','Basic Cues & Interactive Training','Come, Sit, Stay, Down & High Five','Target & Recall Training','Unwanted Behaviour Management','Counter & Furniture Jumping Management','Food Manners & Boundary Training']
const catBenefits=['Strengthen the bond between you and your cat through positive training experiences','Improve communication and understanding between you and your cat','Encourage appropriate behaviour at home',"Build confidence and improve your cat's comfort with handling",'Make grooming, nail trimming and routine handling easier','Improve litter box habits and household manners','Help manage unwanted biting, scratching and jumping behaviours','Encourage calm, confident and well-adjusted behaviour']
const catBenefitCards=['Litter Box Training','Biting & Scratching Management','Socialization & Appropriate Behaviour','Handling & Touch Acceptance']

function CatTrainingShared(){return <section className="section package-assurance"><div className="container"><h2>What's Included</h2><div className="benefit-list">{catIncluded.map(text=><div key={text}><Check/><span>{text}</span></div>)}</div><h2>Cat Training Benefits</h2><div className="rich-content">{catBenefits.map(text=><p className="content-bullet" key={text}>• {text}</p>)}</div><h2>Benefits</h2><div className="trust-card-grid">{catBenefitCards.map(text=><article className="trust-card" key={text}><Check/><h3>{text}</h3></article>)}</div><h2>Personalised, Practical Progression</h2><p>Every cat is different. We assess your cat's age, personality, environment, current behaviour and training goals before creating a personalised training plan. Sessions are conducted at a comfortable pace using positive, reward-based methods, with practical guidance for you to continue training between sessions.</p><h2>How to Get Started</h2><div className="detail-steps">{["Share your cat's age, behaviour concerns, location and training goals.","Discuss your cat's needs, suitable training plan, schedule and package inclusions with our trainer.","Confirm your training plan and follow the trainer's guidance between sessions for better progress."].map((text,index)=><div key={text}><span>0{index+1}</span><p>{text}</p></div>)}</div><h2>Package Questions</h2><FAQList items={[["How long does cat training take?","The duration of training varies depending on your cat's age, temperament, behaviour concerns and training goals. Your trainer will recommend a suitable training schedule after assessing your cat's individual needs."],["What Behaviour Issues Can Cat Training Help With?","Cat training can help with common behaviour concerns such as litter box issues, biting, scratching, excessive jumping, unwanted behaviours, handling difficulties and household boundaries. The training plan is personalised according to your cat's individual needs."]]}/></div></section>}

export function WalkingServiceDetails(){return <section className="section package-assurance"><div className="container"><h2>What's Included</h2><div className="benefit-list">{['Professional & Supervised Walking','Safe & Controlled Outdoor Exercise','Physical Exercise & Activity','Fresh Air & Mental Stimulation','Basic Behaviour Observation','Water Breaks When Required','Safe Return Home After Every Walk'].map(text=><div key={text}><Check/><span>{text}</span></div>)}</div><h2>Weekly Schedule</h2><div className="rich-content"><p className="content-bullet">• Monday to Saturday: Walking Service</p><p className="content-bullet">• Sunday: Weekly Off</p></div><h2>Important Note</h2><p>Each walking session is either 30 minutes or 60 minutes, depending on the selected plan. Morning and evening walks are provided on scheduled service days. Sunday is a weekly off day. Walking schedules may be adjusted according to the dog's routine, age and energy level.</p></div></section>}

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
    <img className="legacy-package-image" src={p.image} alt={p.imageAlt||imageAlt(p.image,`Pawrexio ${p.title}`)}/><h2>{p.title}</h2><p className="legacy-duration">{p.sessions||p.duration}</p>
    <div className="legacy-price-row"><strong>{p.price||'Confirm on enquiry'}</strong>{p.regularPrice&&<del>{p.regularPrice}</del>}{p.discount&&<span>{p.discount}</span>}</div>
    {(p.rating||p.savings)&&<div className="legacy-rating-row">{p.rating&&<b>{p.rating} Rating</b>}{p.savings&&<b>You Saved {p.savings}</b>}</div>}
    {p.priceNote&&<p className="muted">{p.priceNote}</p>}<Content blocks={blocks}/>
    <div className="legacy-detail-actions"><LeadButton service={p.title} package={p.slug}>Book a Session</LeadButton><a className="button button-outline" href={whatsapp(p.title)} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></div>
   </article>
  </div></section>
  {p.category==='Cat Training'&&<CatTrainingShared/>}
  {p.category==='Dog Walking'&&<WalkingServiceDetails/>}
  <section className="section package-assurance"><div className="container"><p className="eyebrow">Fast, Certified &amp; Trusted Worldwide</p><h2>Professional Pet Training &amp; Care Services</h2><p>Pawrexio is your trusted partner for Professional Dog Training, Puppy Training, Cat Training, Dog Walking, Pet Grooming and Dog Grooming at Home. We help pet parents raise happy, healthy and well-behaved companions with certified trainers and positive training methods.</p><div className="trust-card-grid">{[['Affordable Pricing','Transparent and budget-friendly pricing with no hidden charges.'],['Guaranteed Results','Proven training methods with customer satisfaction guaranteed.'],['Certified Trainers','Experienced pet experts providing personalized care and training.'],['24/7 Support','Dedicated online support whenever you need guidance.']].map(([title,text])=><article className="trust-card" key={title}><Check/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="section legacy-owner-guide"><div className="container"><p className="eyebrow">First-Time Pet Owner Guide</p><h2>Give Your Pet the Best Start</h2><p>The first few weeks are the most important for building a lifelong bond. Follow these simple tips to keep your furry companion happy and healthy.</p><div className="owner-tip-grid">{ownerGuide.map(([title,text],i)=><article className="owner-tip-card" key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
 </>
}
