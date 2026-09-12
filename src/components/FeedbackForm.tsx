import { Check, Star, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'

const initial={name:'',rating:'5',feedback:'',website:''}

export function FeedbackForm(){
 const [open,setOpen]=useState(false)
 const [form,setForm]=useState(initial)
 const [status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle')
 const [error,setError]=useState('')
 const dialog=useRef<HTMLDivElement>(null)
 useEffect(()=>{
  if(!open)return
  const previous=document.body.style.overflow
  document.body.style.overflow='hidden'
  dialog.current?.querySelector<HTMLElement>('button,input,textarea')?.focus()
  const key=(event:KeyboardEvent)=>{if(event.key==='Escape')close()}
  document.addEventListener('keydown',key)
  return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key)}
 },[open])
 async function submit(event:FormEvent){
  event.preventDefault()
  if(status==='loading')return
  setStatus('loading');setError('')
  try{
   const response=await fetch('/api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
   const body=await response.json()
   if(!response.ok)throw new Error(body.message||'Unable to submit feedback')
   setStatus('success');setForm(initial)
  }catch(reason){setError(reason instanceof Error?reason.message:'Unable to submit feedback.');setStatus('error')}
 }
 function close(){setOpen(false);setStatus('idle');setError('')}
 return <>
  <button className="button" type="button" onClick={()=>setOpen(true)}>Submit Feedback</button>
  {open&&<div className="feedback-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)close()}}>
   <div ref={dialog} className="feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
    <button className="feedback-close" type="button" onClick={close} aria-label="Close feedback form"><X/></button>
    {status==='success'?<div className="feedback-success"><Check/><p className="eyebrow">Feedback received</p><h2 id="feedback-title">Thank you for sharing.</h2><p>Your review has been sent for approval and will not appear publicly until the Pawrexio team verifies it.</p><button className="button button-outline" type="button" onClick={close}>Close</button></div>:<>
     <p className="eyebrow">Your experience matters</p><h2 id="feedback-title">Share Your Feedback</h2><p>Your review helps us improve our training and care.</p>
     <form className="feedback-form" onSubmit={submit}>
      <label>Name *<input required minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={event=>setForm({...form,name:event.target.value})}/></label>
      <label>Rating *<span className="rating-field"><Star aria-hidden="true"/><select required value={form.rating} onChange={event=>setForm({...form,rating:event.target.value})}><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Needs improvement</option></select></span></label>
      <label>Feedback / Review *<textarea required minLength={10} maxLength={3000} value={form.feedback} onChange={event=>setForm({...form,feedback:event.target.value})} placeholder="Tell us about your experience with Pawrexio"/></label>
      <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={event=>setForm({...form,website:event.target.value})}/>
      {status==='error'&&<p className="form-error" role="alert">{error}</p>}
      <button className="button" disabled={status==='loading'}>{status==='loading'?'Submitting…':'Submit Feedback'}</button>
     </form>
    </>}
   </div>
  </div>}
 </>
}
