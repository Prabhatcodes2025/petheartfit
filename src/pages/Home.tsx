import { Activity, ArrowRight, Award, BadgeCheck, CalendarClock, Cat, Check, Footprints, GraduationCap, Headphones, HeartHandshake, House, MessageCircle, Phone, Scissors, Stethoscope } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQList } from '../components/FAQ'
import { Hero } from '../components/Hero'
import { EnquiryVisual, HomeEnquiry } from '../components/HomeEnquiry'
import { SectionTitle, whatsapp } from '../components/Layout'
import { LeadButton } from '../components/LeadPopup'
import { TrainingVideo } from '../components/Media'
import { Reveal } from '../components/Reveal'
import { faqs, imageAlt, locations, services, siteSettings, testimonials } from '../data'
import { galleryMedia } from '../lib/public-content'

const behaviours=[
 ['Puppy Training','Give your puppy the right start with basic commands, good manners, socialization, and healthy everyday habits.'],
 ['Leash Training','Help your dog enjoy calmer walks by reducing pulling and teaching them to walk confidently beside you.'],
 ['Dog Obedience Training','Build better responses to essential commands such as sit, stay, come, and down with structured training.'],
 ['Excessive Barking','Understand the reason behind excessive barking and work toward calmer, more appropriate behaviour.'],
 ['Aggression & Behaviour Issues','Get professional guidance for challenging behaviours and help your dog build confidence in different situations.'],
 ['Dog Training at Home',"Address your pet's behaviour where it happens every day with convenient home-based dog training sessions."]
]
const behaviourIcons=[GraduationCap,Footprints,BadgeCheck,Headphones,HeartHandshake,House]
const ownerTips=[
 [House,'Create a Safe Home','Prepare a comfortable, clean, and secure environment where your pet feels protected and relaxed.'],
 [GraduationCap,'Start Training Early','Early puppy training teaches good behaviour, basic commands, and builds lifelong confidence.'],
 [CalendarClock,'Follow a Routine','Regular feeding, exercise, sleep, and training help your pet adapt quickly.'],
 [Footprints,'Leash Training','Proper leash manners make walks enjoyable, safe, and improve overall obedience.'],
 [Activity,'Keep Them Active','Daily walks and exercise improve fitness, mental stimulation, and social behaviour.'],
 [Scissors,'Regular Grooming','Professional grooming keeps your pet clean, healthy, comfortable, and looking their best.'],
 [Cat,'Understand Your Cat','Encourage positive habits and better communication through expert cat training.'],
 [Award,'Reward Good Behaviour','Positive reinforcement using praise and treats helps pets learn faster.'],
 [Stethoscope,'Routine Vet Care','Regular health check-ups and vaccinations ensure a long, happy, and healthy life.']
] as const
const featuredLocations=['gurgaon','delhi-ncr','noida']
const categoryCopy:Record<string,string>={
 'dog-training':'Pawrexio’s dog training programs are thoughtfully designed to nurture well-behaved, confid..',
 'cat-training':'In addition to its renowned dog training programs, Pawrexio also offers specialized cat trai..',
 grooming:'Pawrexio offers professional grooming services that go beyond just keeping your pet looking ..',
 'dog-walking':'Pawrexio’s dog walking service is designed to keep your furry friend physically active, me..'
}

function CountUp({target,label}:{target:number;label:string}){
 const [value,setValue]=useState(0)
 const node=useRef<HTMLDivElement>(null)
 const played=useRef(false)
 useEffect(()=>{
  const element=node.current
  if(!element)return
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting||played.current)return
   played.current=true
   if(reduce){setValue(target);observer.disconnect();return}
   const started=performance.now(),duration=1400
   const tick=(now:number)=>{const progress=Math.min((now-started)/duration,1);setValue(Math.round(target*(1-Math.pow(1-progress,3))));if(progress<1)requestAnimationFrame(tick)}
   requestAnimationFrame(tick)
   observer.disconnect()
  },{threshold:.35})
  observer.observe(element)
  return()=>observer.disconnect()
 },[target])
 return <div ref={node}><strong>{value}+</strong><span>{label}</span></div>
}

export default function Home(){
 const categories=services.filter(s=>['dog-training','cat-training','grooming','dog-walking'].includes(s.slug))
 const featured=featuredLocations.map(slug=>locations.find(location=>location.slug===slug)).filter((location):location is NonNullable<typeof location>=>Boolean(location))
 return <>
  <Hero/>
<section className="section why-copy-section">
  <div className="container">
    <Reveal className="why-copy-card">
      <p className="eyebrow">Why Choose Pawrexio?</p>
      <p>At <strong>Pawrexio</strong>, we believe effective dog training and pet training is about more than teaching commands, it’s about understanding your pet and building a stronger bond between you and them. With 15+ years of experience, our professional pet trainers provide personalized dog training services based on your pet’s age, behaviour, breed, and individual needs. From puppy training and dog obedience training to leash training for dogs and behaviour correction, we focus on practical training that helps your pet become more confident, well-behaved, and easier to manage in everyday life. Whether you are looking for a professional dog trainer near you, dog training at home, or support with a specific behaviour concern, our goal is to give you the guidance and confidence to create a happier life with your pet.</p>
    </Reveal>
  </div>
</section>
  <section className="section behaviour-section"><div className="container"><SectionTitle center eyebrow="Pet behaviour & training" title="Is Your Pet Struggling With These Behaviours?" text="Every pet has different needs, and some behaviours can be difficult to manage on your own. Pawrexio provides professional dog and pet training services focused on practical, everyday results."/><div className="behaviour-grid">{behaviours.map(([title,text],i)=>{const Icon=behaviourIcons[i];return <Reveal key={title}><div className="behaviour-icon"><Icon/></div><span>0{i+1}</span><h3>{title}</h3><p>{text}</p><Link to="/contact" className="behaviour-link">Get guidance <ArrowRight/></Link></Reveal>})}</div></div></section>

  <section className="consult-band"><div className="container"><div><p className="eyebrow">We're here to help</p><h2>Not Sure What Training Your Pet Needs?</h2><p>Tell us about your pet, the behaviour you're struggling with, and your location. Our professional dog trainers can help you find the right training approach and dog training service for your pet.</p></div><div className="band-actions"><LeadButton>Get personalized guidance</LeadButton><Link className="button trainer-cta" to="/contact">Talk to a Pet Trainer <ArrowRight/></Link></div></div></section>

  <section className="section services-home"><div className="container"><SectionTitle eyebrow="All Services" title="Our Services"/><div className="service-category-grid">{categories.map((s,i)=>{const title=s.slug==='grooming'?'Grooming':s.slug==='dog-walking'?'Walking':s.title;return <Reveal className="service-category" key={s.id}><span>{String(i+1).padStart(2,'0')}</span><img src={s.image} alt={s.imageAlt||imageAlt(s.image,title)} loading="lazy"/><div><h3>{title}</h3><small>{categoryCopy[s.slug]}</small><div className="card-actions"><Link className="service-know-more" to={`/services/${s.slug}`}>Know More <ArrowRight/></Link><a className="button service-whatsapp" href={whatsapp(title)} target="_blank" rel="noreferrer">Whatsapp</a></div></div></Reveal>})}</div></div></section>

  <section className="section home-enquiry"><div className="container home-enquiry-grid"><EnquiryVisual/><HomeEnquiry/></div></section>

  <section className="section worldwide-section"><div className="container worldwide-grid"><Reveal className="worldwide-media"><img src="/assets/real/obedience.webp" alt="Pawrexio trainer working with a dog" loading="lazy"/></Reveal><Reveal><p className="eyebrow">Pawrexio</p><h2>Professional Pet Training &amp; Care Services in India</h2><p>Pawrexio helps pet parents train and care for their pets. We provide professional dog training, puppy training and cat training services to help pets develop good habits and behave better at home and outdoors. Our services also include leash training for dogs, dog walking, pet grooming and dog grooming at home. Our trainers understand that every pet is different, so we provide training based on each pet's behaviour, age and needs.</p><p>At Pawrexio, we focus on making pet training simple, practical and effective.</p><h3>Why Pet Parents Choose Us</h3><ul className="worldwide-benefits"><li><Check/>Transparent pricing with affordable service packages.</li><li><Check/>Personalised training based on your pet's needs.</li><li><Check/>Experienced trainers who focus on positive training methods.</li><li><Check/>Dedicated online support to guide pet parents.</li></ul><Link className="button" to="/about">Know More <ArrowRight/></Link></Reveal></div></section>

  <div className="home-video-heading container"><p className="eyebrow">Our Videos</p><h2>Explore Our Locations</h2><p>Take a closer look at our training, facilities and the experience we provide to pet parents.</p></div><TrainingVideo/>

  <section className="section pawrexio-story"><div className="container"><div className="pawrexio-story-grid"><Reveal><h2 className="story-title">Pawrexio – Helping Pets Become Happy, Well-Behaved Companions</h2><p>A pet is more than an animal. It's a part of your family. Every pet has its own personality, habits and way of communicating. Understanding their behaviour is the first step towards building a happy relationship.</p><h3>How Pawrexio Can Help</h3><p>With over 15 years of experience, Pawrexio helps pet parents train and care for their pets through patience, understanding and positive training methods.</p><p>Whether you have a new puppy, a dog with behaviour problems or a cat that needs training, our professional trainers are here to help.</p><p>We offer a range of pet services, including:</p><ul className="story-services"><li><strong>Dog Training:</strong> Basic obedience and good behaviour.</li><li><strong>Puppy Training:</strong> Helping puppies learn good habits from an early age.</li><li><strong>Leash Training:</strong> Teaching dogs to walk calmly on a leash.</li><li><strong>Cat Training:</strong> Helping cats develop better home habits.</li><li><strong>Dog Walking:</strong> Safe and regular exercise for your dog.</li><li><strong>Pet Grooming:</strong> Keeping your pet clean and comfortable.</li><li><strong>Dog Grooming at Home:</strong> Convenient grooming services at your doorstep.</li></ul><h3>Building Better Relationships Between Pets and People</h3><p>At Pawrexio, our goal is simple: to help pets become happier, more confident and easier to manage in everyday life.</p><p>We guide pet parents with practical training and help them understand their pets better. Because a well-trained pet means a happier home and a stronger bond with the family.</p></Reveal><Reveal className="story-real-media"><img src="/assets/real/reward-training.webp" alt="Pawrexio positive pet training session" loading="lazy"/></Reveal></div><div className="trust-card-grid">{[[Award,'15+ Years Experience','Trusted by thousands of happy pet parents across India.'],[BadgeCheck,'5000+ Pets Trained','Professional training for dogs, puppies & cats.'],[HeartHandshake,'Positive Training','Reward-based methods that create confident pets.'],[Headphones,'24/7 Support','Always available to guide you through every step.']].map(([Icon,title,text])=><Reveal className="trust-card" key={String(title)}>{typeof Icon!=='string'&&<Icon/>}<h3>{String(title)}</h3><p>{String(text)}</p></Reveal>)}</div><div className="counter-row"><CountUp target={5000} label="Pets Trained"/><CountUp target={1457} label="Happy Customers"/><CountUp target={15} label="Experience"/><CountUp target={20} label="Our Staffs"/></div></div></section>

  <section className="section location-preview"><div className="container"><SectionTitle eyebrow="Our Locations" title="Find Us Near You" text="Visit our conveniently located offices across Delhi NCR. Choose your nearest location and connect with our team today."/><div className="location-mini-grid featured-location-grid">{featured.map(l=><Link to={`/locations/${l.slug}`} key={l.id}><span>{l.state}</span><h3>{l.heading}</h3><p>{l.intro.slice(0,150)}…</p><b>Explore Location <ArrowRight/></b></Link>)}</div><div className="center-action"><Link className="button button-ghost" to="/locations">View All Locations <ArrowRight/></Link></div></div></section>

  <section className="section first-owner-tips"><div className="container"><SectionTitle eyebrow="🐾 First-Time Pet Owner Tips" title="Everything You Need to Give Your Pet the Best Start" text="Becoming a pet parent is exciting and rewarding. With the right care, routine, training, and expert guidance, your furry companion can enjoy a happy, healthy, and confident life from day one."/><div className="owner-tip-grid">{ownerTips.map(([Icon,title,text],i)=><Reveal className="owner-tip-card" key={title}><span>0{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>

  <section className="final-cta trusted-partner"><div className="container"><h3>Your Trusted Partner in Pet Care</h3><p>From Professional Dog Trainer, Pet Training, Dog Walking Services, Leash Training for Dogs, Pet Grooming Services, Cat Training Services, and Dog Grooming at Home, Pawrexio is here to support every step of your pet parenting journey.</p><LeadButton>Book Your Service</LeadButton></div></section>

  <section className="section testimonials-home"><div className="container"><h2>What our customer say.</h2><div className="testimonial-grid">{testimonials.map((t,i)=><Reveal key={t.id}><span>“</span><p>{t.quote}</p><div><b>{t.name}</b><small>{t.pet||t.location}</small></div><em>0{i+1}</em></Reveal>)}</div></div></section>

  <section className="section faq-home"><div className="container faq-grid"><SectionTitle eyebrow="Frequently Asked Questions" title="Frequently Asked Questions"/><FAQList items={faqs.slice(0,7)}/></div></section>

  <section className="section gallery-preview"><div className="container"><h2>What we have done</h2><div className="home-old-gallery">{galleryMedia.filter(item=>item.type==='image').slice(0,13).map(item=><a href={item.url} target="_blank" rel="noreferrer" key={item.id}><img src={item.url} alt={item.alt||item.title||''} loading="lazy"/></a>)}</div></div></section>

  <section className="section where-we-serve"><div className="container"><SectionTitle eyebrow="Service areas" title="Where We Serve" text="Choose your nearest Pawrexio service area."/><div className="service-area-links">{locations.map(l=><Link to={`/locations/${l.slug}`} key={l.id}>{l.heading||`Pet Training In ${l.city}`}<ArrowRight/></Link>)}</div><a className="button where-we-serve-call" href={`tel:${siteSettings.phone}`}><Phone/>Call Pawrexio</a></div></section>
 </>
}
