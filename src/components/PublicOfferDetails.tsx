import { Check } from 'lucide-react'
import { Content } from './Content'
import type { ContentBlock } from '../types'

export function OfferMetadata({duration,sessions,originalPrice,currentPrice,discount,rating,savings,showRating=false}:{duration?:string;sessions?:string;originalPrice?:string;currentPrice?:string;discount?:string;rating?:string;savings?:string;showRating?:boolean}){
 const schedule=[duration,sessions&&sessions!==duration?sessions:''].filter(Boolean).join(' · ')
 const hasPrice=Boolean(originalPrice||currentPrice||discount)
 const hasRating=showRating&&Boolean(rating)
 return <>
  {schedule&&<p className="legacy-duration">{schedule}</p>}
  {hasPrice&&<div className="legacy-price-row">{originalPrice&&<del>{originalPrice}</del>}{currentPrice&&<strong>{currentPrice}</strong>}{discount&&<span>{discount}</span>}</div>}
  {(hasRating||savings)&&<div className="legacy-rating-row">{hasRating&&<b>{rating} Rating</b>}{savings&&<b>You Saved {savings}</b>}</div>}
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
