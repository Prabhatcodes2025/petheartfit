import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { faqs, locations, posts, programs, services, siteSettings } from '../data'

const base = 'https://www.pawrexio.com'
const pages: Record<string, [string, string]> = {
  '/': ['Pawrexio | Professional Pet Training & Pet Care', 'Positive dog training, puppy training, cat training, grooming and dog walking for happier pets and stronger family bonds.'],
  '/about': ['About Pawrexio | Positive Pet Training & Care', 'Learn about Pawrexio’s personalised approach to pet training, behaviour guidance and everyday care.'],
  '/services': ['Pet Training & Care Services | Pawrexio', 'Explore dog training, cat training, grooming, dog walking and behaviour support from Pawrexio.'],
  '/packages': ['Pet Training Packages | Pawrexio', 'Compare puppy, basic, intermediate, smart, advanced and master pet training packages.'],
  '/locations': ['Pet Training Locations in India | Pawrexio', 'Find active Pawrexio training, behaviour, grooming and dog-walking service areas.'],
  '/gallery': ['Pet Training Gallery | Pawrexio', 'See Pawrexio pet training, puppy, cat and care sessions.'],
  '/testimonials': ['Pet Parent Feedback | Pawrexio', 'Read pet-parent feedback about Pawrexio training and care.'],
  '/blog': ['Pet Training Blog & Guides | Pawrexio', 'Practical guidance for puppy training, dog behaviour, leash walking, grooming and cat care.'],
  '/contact': ['Contact Pawrexio | Pet Training Enquiry', 'Tell Pawrexio about your pet, location and training or care needs.'],
  '/book': ['Book a Free Pet Training Consultation | Pawrexio', 'Request a free Pawrexio consultation for dog training, cat training, grooming or dog walking.']
}

function upsertMeta(selector:string, key:'name'|'property', keyValue:string, content:string){
  let element=document.head.querySelector(selector) as HTMLMetaElement|null
  if(!element){element=document.createElement('meta');element.setAttribute(key,keyValue);document.head.appendChild(element)}
  element.content=content
}

export function Seo(){
  const { pathname }=useLocation()
  useEffect(()=>{
    let meta=pages[pathname]
    let schema:Record<string,unknown>={'@context':'https://schema.org','@type':'LocalBusiness',name:'Pawrexio',url:base,telephone:siteSettings.phone,email:siteSettings.email,address:siteSettings.address,image:`${base}/assets/hero-companionship.webp`}
    const slug=pathname.split('/').pop()
    if(pathname.startsWith('/services/')){const item=services.find(x=>x.slug===slug);if(item){meta=[`${item.title} | Pawrexio`,item.description];schema={'@context':'https://schema.org','@type':'Service',name:item.title,description:item.description,provider:{'@type':'Organization',name:'Pawrexio'}}}}
    else if(pathname.startsWith('/packages/')){const item=programs.find(x=>x.slug===slug);if(item){meta=[`${item.title} Package | Pawrexio`,item.summary];schema={'@context':'https://schema.org','@type':'Service',name:item.title,description:item.summary,provider:{'@type':'Organization',name:'Pawrexio'}}}}
    else if(pathname.startsWith('/locations/')){const item=locations.find(x=>x.slug===slug);if(item)meta=[`Pet Training in ${item.city} | Pawrexio`,item.intro]}
    else if(pathname.startsWith('/blog/')){const item=posts.find(x=>x.slug===slug);if(item){meta=[`${item.title} | Pawrexio`,item.excerpt];schema={'@context':'https://schema.org','@type':'Article',headline:item.title,description:item.excerpt,image:`${base}${item.image}`,author:{'@type':'Organization',name:'Pawrexio'}}}}
    else if(pathname==='/faq')schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
    if(!meta)meta=['Pawrexio | Love, Care, Companionship','Professional pet training and care from Pawrexio.']
    document.title=meta[0]
    upsertMeta('meta[name="description"]','name','description',meta[1])
    upsertMeta('meta[property="og:title"]','property','og:title',meta[0])
    upsertMeta('meta[property="og:description"]','property','og:description',meta[1])
    upsertMeta('meta[property="og:image"]','property','og:image',`${base}/assets/hero-companionship.webp`)
    upsertMeta('meta[name="robots"]','name','robots',pathname.startsWith('/admin')?'noindex,nofollow':'index,follow')
    let canonical=document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement|null
    if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
    canonical.href=`${base}${pathname}`
    let script=document.querySelector('#pawrexio-schema') as HTMLScriptElement|null
    if(!script){script=document.createElement('script');script.id='pawrexio-schema';script.type='application/ld+json';document.head.appendChild(script)}
    script.text=JSON.stringify(schema)
  },[pathname])
  return null
}
