import { Field } from '../../shared/cms'
import { Row } from './cms'
import { sanitizeBlogHtml } from './blog-content'

const escapeHtml=(value:string)=>value.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]!))
function displayContent(value:unknown){if(!Array.isArray(value))return String(value||'');return value.map(x=>{if(typeof x==='string')return `<p>${escapeHtml(x)}</p>`;const text=escapeHtml(String(x.text||''));return x.kind==='heading'?`<h2>${text}</h2>`:x.kind==='list'?`<ul><li>${text}</li></ul>`:`<p>${text}</p>`}).join('')}

export function draftOf(row:Row|null,fields:Field[]){return Object.fromEntries(fields.map(f=>{const value=row?.[f.key];return [f.key,f.type==='content'?displayContent(value):f.type==='list'?(Array.isArray(value)?value.join('\n'):''):f.type==='alt-map'&&value&&typeof value==='object'?Object.entries(value).map(([path,alt])=>`${path} | ${String(alt)}`).join('\n'):f.type==='boolean'?Boolean(value??(f.key==='robots_index')):f.type==='datetime-local'?(value&&!Number.isNaN(new Date(String(value)).getTime())?new Date(String(value)).toISOString().slice(0,16):''):value??(f.type==='select'?f.options?.[0]:'')]}))}

export function parsePrice(value:unknown):number|null{
 if(value===null||value===undefined||String(value).trim()==='')return null
 const normalized=String(value).replace(/[₹,\s]/g,'')
 if(!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized))return null
 const parsed=Number(normalized)
 return Number.isFinite(parsed)?parsed:null
}

export function calculatedPriceFields(draft:Record<string,unknown>){
 const original=parsePrice(draft.price_from),current=parsePrice(draft.sale_price)
 if(original===null||current===null||original<=0||current>=original)return {savings:'',discount_label:''}
 const savings=Number((original-current).toFixed(2))
 const percentage=Math.round((savings/original)*100)
 return {savings:String(savings),discount_label:`${percentage}% OFF`}
}

export function valuesOf(type:string,draft:Record<string,unknown>,fields:Field[]){const derived=type==='services'||type==='programs'?calculatedPriceFields(draft):{};const values:Record<string,unknown>={};for(const f of fields){const value=f.key in derived?derived[f.key as keyof typeof derived]:draft[f.key];values[f.key]=(type==='blog'&&f.key==='content')||f.type==='content'?sanitizeBlogHtml(String(value||'')):f.type==='number'?(value===''?(f.key==='sort_order'?0:null):(f.key==='price_from'||f.key==='sale_price'||f.key==='savings'?parsePrice(value):Number(value))):f.type==='list'?String(value||'').split('\n').filter(Boolean):f.type==='alt-map'?Object.fromEntries(String(value||'').split('\n').map(line=>line.split('|')).filter(parts=>parts.length>1&&parts[0].trim()).map(([path,...alt])=>[path.trim(),alt.join('|').trim()])):value}return values}
