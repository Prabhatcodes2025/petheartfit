import { Field } from '../../shared/cms'
import { Row } from './cms'
import { sanitizeBlogHtml } from './blog-content'

const escapeHtml=(value:string)=>value.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]!))
function displayContent(value:unknown){if(!Array.isArray(value))return String(value||'');return value.map(x=>{if(typeof x==='string')return `<p>${escapeHtml(x)}</p>`;const text=escapeHtml(String(x.text||''));return x.kind==='heading'?`<h2>${text}</h2>`:x.kind==='list'?`<ul><li>${text}</li></ul>`:`<p>${text}</p>`}).join('')}

export function draftOf(row:Row|null,fields:Field[]){return Object.fromEntries(fields.map(f=>{const value=row?.[f.key];return [f.key,f.type==='content'?displayContent(value):f.type==='list'?(Array.isArray(value)?value.join('\n'):''):f.type==='alt-map'&&value&&typeof value==='object'?Object.entries(value).map(([path,alt])=>`${path} | ${String(alt)}`).join('\n'):f.type==='boolean'?Boolean(value??(f.key==='robots_index')):f.type==='datetime-local'?(value&&!Number.isNaN(new Date(String(value)).getTime())?new Date(String(value)).toISOString().slice(0,16):''):value??(f.type==='select'?f.options?.[0]:'')]}))}

export function valuesOf(type:string,draft:Record<string,unknown>,fields:Field[]){const values:Record<string,unknown>={};for(const f of fields){const value=draft[f.key];values[f.key]=(type==='blog'&&f.key==='content')||f.type==='content'?sanitizeBlogHtml(String(value||'')):f.type==='number'?(value===''?(f.key==='sort_order'?0:null):Number(value)):f.type==='list'?String(value||'').split('\n').filter(Boolean):f.type==='alt-map'?Object.fromEntries(String(value||'').split('\n').map(line=>line.split('|')).filter(parts=>parts.length>1&&parts[0].trim()).map(([path,...alt])=>[path.trim(),alt.join('|').trim()])):value}return values}
