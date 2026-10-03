import { supabase } from './supabase'
import { services, programs, locations, posts, testimonials, siteSettings, socialLinks, sortProgramsInPlace } from '../data'
import photos from '../media.json'
import videos from '../videos.json'
import { contentBlocks, mapProgramRow, mapServiceRow } from './public-cms-mapping'
type DbRow=Record<string,any>
export const pageMetadata:Record<string,DbRow>={}
export const galleryMedia:DbRow[]=[...photos.map((p,i)=>({id:'photo-'+i,title:p.title,url:p.file,poster:p.file,type:'image',category:'Training',alt:p.title,width:p.width,height:p.height})),...videos]
const blocks=contentBlocks
const paragraphs=(value:unknown)=>blocks(value).map(b=>b.text)
const richContent=(value:unknown)=>typeof value==='string'?value:undefined
export async function loadPublicContent(){if(!supabase)return;const keys=['services','training_programs','locations','blog_posts','gallery','testimonials','site_settings','seo_metadata'];await Promise.all(keys.map(async key=>{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),5000);try{let query=supabase!.from(key).select('*');if(['services','training_programs','blog_posts'].includes(key))query=query.eq('status','published');if(['locations','gallery','testimonials'].includes(key))query=query.eq('active',true);if(key==='testimonials')query=query.eq('verified',true);if(key==='blog_posts')query=query.lte('published_at',new Date().toISOString());const {data,error}=await query.abortSignal(controller.signal);if(error||!data)return;const rows=(data as DbRow[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
 if(key==='services')services.splice(0,services.length,...rows.map(mapServiceRow));
 if(key==='training_programs')programs.splice(0,programs.length,...sortProgramsInPlace(rows.map(mapProgramRow)));
 if(key==='locations')locations.splice(0,locations.length,...rows.map(r=>({id:r.id,slug:r.slug,city:r.city,state:r.state,heading:r.heading,intro:r.intro,content:paragraphs(r.content),blocks:blocks(r.content),richContent:richContent(r.content),image:r.image_url||'/assets/real/companions.webp',imageAlt:r.alt_text||''})));
 if(key==='blog_posts')posts.splice(0,posts.length,...rows.map(r=>({id:r.id,slug:r.slug,title:r.title,excerpt:r.excerpt,category:r.category||'Pet Care',date:r.published_at?.slice(0,10)||'',readTime:Math.max(1,Math.ceil(String(r.content||'').replace(/<[^>]+>/g,' ').split(/\s+/).length/200))+' min read',image:r.featured_image_url||'/assets/real/companions.webp',imageAlt:r.alt_text||'',content:String(r.content||'')})));
 if(key==='testimonials')testimonials.splice(0,testimonials.length,...rows.map(r=>({id:r.id,name:r.customer_name,pet:r.pet_name,location:r.location||'',quote:r.content,image:r.image_url||'',imageAlt:r.alt_text||''})));
 if(key==='gallery')galleryMedia.splice(0,galleryMedia.length,...rows.map(r=>({id:r.id,title:r.title,url:r.image_url,poster:r.poster_url||r.image_url,type:r.media_type||'image',category:r.category||'Training',alt:r.alt_text||'',width:600,height:800})));
 if(key==='site_settings'&&rows[0]){const r=rows[0];Object.assign(siteSettings,{strapline:r.tagline||siteSettings.strapline,phone:r.phone||siteSettings.phone,email:r.public_email||siteSettings.email,whatsapp:r.whatsapp_number||siteSettings.whatsapp,address:r.address||siteSettings.address,footer:r.footer_text||siteSettings.footer,imageAlts:{...siteSettings.imageAlts,...(r.image_alt_texts||{})},socials:{...(r.social_links||siteSettings.socials),...socialLinks}})}
 if(key==='seo_metadata')for(const r of rows)pageMetadata[r.page_key]=r;
 if(['services','training_programs','locations','blog_posts'].includes(key)){const prefix={services:'/services/',training_programs:'/packages/',locations:'/locations/',blog_posts:'/blog/'}[key]!;for(const r of rows)pageMetadata[prefix+r.slug]={meta_title:r.seo_title,meta_description:r.seo_description,canonical_url:r.canonical_url,og_image_url:r.og_image_url,robots_index:r.robots_index}}
 }catch{ /* Keep approved bundled content if the connection is unavailable. */ }finally{clearTimeout(timer)}}))}
