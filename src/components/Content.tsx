import { Link } from 'react-router-dom'
import type { ContentBlock } from '../types'
export function Content({blocks}:{blocks?:ContentBlock[]}){return <div className="rich-content">{blocks?.map((b,i)=>b.kind==='heading'?<h2 key={i}>{b.text}</h2>:b.kind==='list'?<p className="content-bullet" key={i}>• {b.text}</p>:<p key={i}>{b.text}</p>)}</div>}
export function Breadcrumb({items}:{items:{label:string;to?:string}[]}){return <nav className="breadcrumb container" aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map((x,i)=><span key={i}> / {x.to?<Link to={x.to}>{x.label}</Link>:<span aria-current="page">{x.label}</span>}</span>)}</nav>}
