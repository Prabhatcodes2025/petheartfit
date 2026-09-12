import { galleryMedia } from '../lib/public-content'
import { useEffect, useRef, useState } from 'react'
import photos from '../media.json'
import videos from '../videos.json'
export { photos, videos }
function TrainingVideoItem({video}:{video:(typeof videos)[number]}){
 const ref=useRef<HTMLVideoElement>(null)
 useEffect(()=>{
  const element=ref.current
  if(!element)return
  const observer=new IntersectionObserver(([entry])=>{
   if(entry.isIntersecting)void element.play().catch(()=>undefined)
   else element.pause()
  },{rootMargin:'120px 0px',threshold:.2})
  observer.observe(element)
  return()=>observer.disconnect()
 },[])
 return <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster={video.poster} width="480" height="720" aria-label="Pawrexio training video"><source src={video.url} type="video/mp4"/></video>
}
export function TrainingVideo(){return <section className="section real-video"><div className="container video-feature">{videos.slice(0,3).map(video=><TrainingVideoItem key={video.url} video={video}/>)}</div></section>}
export function MediaGallery(){const [filter,setFilter]=useState('All');return <><div className="filter-bar">{['All',...new Set(galleryMedia.map(v=>v.category)),'Videos'].map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="real-gallery">{galleryMedia.filter(v=>filter==='All'||filter===v.category||(filter==='Videos'&&v.type==='video')).map(v=><figure key={v.id}>{v.type==='video'?<video controls playsInline preload="none" poster={v.poster} width="480" height="720" onPlay={e=>{document.querySelectorAll('video').forEach(other=>{if(other!==e.currentTarget)other.pause()})}}><source src={v.url} type="video/mp4"/></video>:<a href={v.url} target="_blank" rel="noreferrer"><img src={v.url} width={v.width||600} height={v.height||800} loading="lazy" alt={v.title}/></a>}<figcaption>{v.title}</figcaption></figure>)}</div></>}
