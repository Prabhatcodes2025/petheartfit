import { Plus } from 'lucide-react'
import { useState } from 'react'
export function FAQList({items}:{items:string[][]}){const [open,setOpen]=useState(0);return <div className="faq-list">{items.map(([q,a],i)=><div className={`faq-item ${open===i?'open':''}`} key={q}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{String(i+1).padStart(2,'0')}</span><b>{q}</b><Plus/></button><div className="faq-answer"><p>{a}</p></div></div>)}</div>}
