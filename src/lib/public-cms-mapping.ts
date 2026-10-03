import type { ContentBlock, Program, Service } from '../types'

export type CmsRow=Record<string,any>
export const contentBlocks=(value:unknown):ContentBlock[]=>typeof value==='string'?[{kind:'html',text:value}]:Array.isArray(value)?value.map(x=>typeof x==='string'?{kind:'paragraph',text:x}:x):[]
export const displayMoney=(value:unknown)=>value===null||value===undefined||value===''?'':`₹${Number(value).toLocaleString('en-IN')}`
const optionalText=(value:unknown)=>value===null||value===undefined?'':String(value)

export function mapServiceRow(r:CmsRow):Service{
 const blocks=contentBlocks(r.content)
 const hasCurrent=r.sale_price!==null&&r.sale_price!==undefined&&r.sale_price!==''
 return {id:r.id,slug:r.slug,title:r.title,kicker:r.kicker||'',description:r.description||r.short_description,category:r.category,icon:'dog',duration:optionalText(r.duration),sessions:optionalText(r.session_count),suitable:optionalText(r.suitable_for),benefits:Array.isArray(r.benefits)?r.benefits:[],includes:Array.isArray(r.inclusions)?r.inclusions:[],price:displayMoney(hasCurrent?r.sale_price:r.price_from),originalPrice:hasCurrent?displayMoney(r.price_from):'',discount:optionalText(r.discount_label),rating:optionalText(r.rating),savings:displayMoney(r.savings),content:[],blocks:blocks.length?blocks:undefined,richContent:typeof r.content==='string'?r.content:undefined,image:r.image_url||'/assets/real/companions.webp',imageAlt:r.alt_text||''}
}

export function mapProgramRow(r:CmsRow):Program{
 const blocks=contentBlocks(r.content)
 const hasCurrent=r.sale_price!==null&&r.sale_price!==undefined&&r.sale_price!==''
 return {id:r.id,slug:r.slug,title:r.title,category:r.category,level:r.level||'',duration:optionalText(r.duration),sessions:optionalText(r.session_count),summary:r.summary||r.description||'',includes:Array.isArray(r.inclusions)?r.inclusions:[],benefits:Array.isArray(r.benefits)?r.benefits:[],content:[],blocks,richContent:typeof r.content==='string'?r.content:undefined,price:displayMoney(hasCurrent?r.sale_price:r.price_from),regularPrice:hasCurrent?displayMoney(r.price_from):'',discount:optionalText(r.discount_label),rating:r.rating===null||r.rating===undefined||r.rating===''?'':String(r.rating),savings:displayMoney(r.savings),image:r.image_url||'/assets/real/companions.webp',imageAlt:r.alt_text||''}
}
