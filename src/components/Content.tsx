import { Link } from 'react-router-dom'
import type { ContentBlock } from '../types'
export function Content({blocks,locationHierarchy=false}:{blocks?:ContentBlock[];locationHierarchy?:boolean}){return <div className="rich-content">{blocks?.map((b,i)=>b.kind==='heading'?(locationHierarchy&&/^[1-4]\.\s/.test(b.text)?<h3 className="location-training-heading" key={i}>{b.text}</h3>:<h2 key={i}>{b.text}</h2>):b.kind==='list'?<p className="content-bullet" key={i}>• {b.text}</p>:<p key={i}>{b.text}</p>)}</div>}
function compactLabel(label:string){
 if(label.length<=34)return label
 const beforePunctuation=label.split(/[:|–—]/)[0].trim()
 const words=(beforePunctuation||label).split(/\s+/)
 return words.slice(0,Math.min(3,words.length)).join(' ')
}
export function Breadcrumb({items}:{items:{label:string;to?:string}[]}){return <nav className="breadcrumb container" aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map((x,i)=>{const label=compactLabel(x.label);return <span key={i}> / {x.to?<Link to={x.to} title={x.label}>{label}</Link>:<span aria-current="page" title={x.label}>{label}</span>}</span>})}</nav>}
