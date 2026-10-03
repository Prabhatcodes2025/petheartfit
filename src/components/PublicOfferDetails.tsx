import { Check } from 'lucide-react'
import { Content } from './Content'
import type { ContentBlock } from '../types'

export function OfferMetadata({duration,sessions,originalPrice,currentPrice,discount,rating,savings,showRating=false}:{duration?:string;sessions?:string;originalPrice?:string;currentPrice?:string;discount?:string;rating?:string;savings?:string;showRating?:boolean}){
 const hasPrice=Boolean(originalPrice||currentPrice||discount||savings)
 const hasRating=showRating&&Boolean(rating)
 return <>
  {(duration||sessions)&&<p className="legacy-duration">{duration&&<span><b>Duration</b> {duration}</span>}{sessions&&<span>{duration?' · ':''}<b>Sessions</b> {sessions}</span>}</p>}
  {hasPrice&&<div className="legacy-price-row">{originalPrice&&<del>{originalPrice}</del>}{currentPrice&&<strong>{currentPrice}</strong>}{discount&&<span>{discount}</span>}</div>}
  {(hasRating||savings)&&<div className="legacy-rating-row">{hasRating&&<b>★ {rating}</b>}{savings&&<b>Save {savings}</b>}</div>}
 </>
}

export function OfferLists({includes=[],benefits=[]}:{includes?:string[];benefits?:string[]}){
 return <>
  {includes.length>0&&<><h2>What’s Included</h2><div className="benefit-list">{includes.map((item,index)=><div key={`${index}-${item}`}><Check/><span>{item}</span></div>)}</div></>}
  {benefits.length>0&&<><h2>Benefits</h2><div className="benefit-list">{benefits.map((item,index)=><div key={`${index}-${item}`}><Check/><span>{item}</span></div>)}</div></>}
 </>
}

export function FullContent({blocks,paragraphs=[]}:{blocks?:ContentBlock[];paragraphs?:string[]}){
 if(blocks?.length)return <Content blocks={blocks}/>
 return <>{paragraphs.map((paragraph,index)=><p className="lead" key={`${index}-${paragraph}`}>{paragraph}</p>)}</>
}
