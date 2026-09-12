import { FormEvent, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const empty={fullName:'',email:'',breed:'',phone:'',city:'',message:'',website:''}

export function EnquiryVisual({contact=false}:{contact?:boolean}){
 return <div className="home-enquiry-visual">
  <img src="/assets/real/attention.webp" alt="Pawrexio trainer working attentively with a dog" loading="lazy" width="720" height="960"/>
  <div className="enquiry-image-copy">
   <span>{contact?'Personal support':'Professional pet care'}</span>
   <h3>{contact?"Let's Talk About Your Pet":'Expert Guidance Starts Here'}</h3>
   <p>15+ years of positive, practical pet training experience.</p>
  </div>
 </div>
}

export function HomeEnquiry({contactCopy=false,source='homepage',originatingPage='/'}:{contactCopy?:boolean;source?:string;originatingPage?:string}={}){
 const [form,setForm]=useState(empty)
 const [status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle')
 const [error,setError]=useState('')
 async function submit(e:FormEvent){
  e.preventDefault();if(status==='loading')return;setStatus('loading');setError('')
  try{
   const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:form.fullName,phone:form.phone,email:form.email,city:form.city,petType:'Dog',petName:'',breed:form.breed,petAge:'',service:'not-sure',concern:form.message,preferredDate:'',preferredTime:'',message:form.message,website:form.website,source,originatingPage})})
   const body=await response.json();if(!response.ok)throw new Error(body.message||'Unable to send enquiry')
   setForm(empty);setStatus('success')
  }catch(err){setError(err instanceof Error?err.message:'Unable to send your enquiry.');setStatus('error')}
 }
 return <form className="booking-form home-enquiry-form" onSubmit={submit}>
  <div className="enquiry-form-heading"><p className="eyebrow">{contactCopy?'Get In Touch':'Tell Us About Your Pet'}</p><h2>Send Your Enquiry</h2><p>Share a few details and our team will contact you shortly with the right support for your pet.</p></div>
  <div className="field-row"><label>Your Name *<input required minLength={2} maxLength={100} autoComplete="name" value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/></label><label>{contactCopy?'Email Address':'Your Email'}<input type="email" autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label></div>
  <div className="field-row"><label>Pet Breed Name<input maxLength={100} value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})}/></label><label>Contact Number *<input required type="tel" minLength={7} maxLength={25} autoComplete="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label></div>
  <label>{contactCopy?'Your Location *':'Location *'}<input required maxLength={100} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label>
  <label>{contactCopy?'Your Message *':'Message *'}<textarea required maxLength={1000} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label>
  <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/>
  {status==='error'&&<p className="form-error" role="alert">{error}</p>}{status==='success'&&<p className="form-success" role="status">Thank you. Your enquiry has been saved.</p>}
  <button className="button" disabled={status==='loading'}>{status==='loading'?'Sending…':'Send Enquiry'} <ArrowRight/></button>
 </form>
}
