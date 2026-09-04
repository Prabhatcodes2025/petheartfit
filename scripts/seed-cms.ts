import { writeFileSync } from 'node:fs'
import { fallbackRecords } from '../src/pages/Cms'
import { definitions } from '../shared/cms'
const quote=(x:unknown)=>x===null||x===undefined?'null':typeof x==='boolean'||typeof x==='number'?String(x):"'"+(typeof x==='string'?x:JSON.stringify(x)).replaceAll("'","''")+"'"
let sql='-- Apply after schema.sql and completion.sql. Approved fallback content; does not overwrite existing records.\n'
for(const key of ['services','programs','locations','blog','gallery','testimonials','seo']){
 for(const [index,row] of fallbackRecords(key).entries()){
 const fields=definitions[key].fields.map(x=>x.key);const payload=Object.fromEntries(fields.filter(k=>row[k]!==undefined).map(k=>[k,row[k]]));if(fields.includes('sort_order'))payload.sort_order=index;if(fields.includes('robots_index'))payload.robots_index=true;
 const keys=Object.keys(payload);const unique=key==='seo'?'page_key':keys.includes('slug')?'slug':key==='testimonials'?'customer_name':'title';
 sql+=`insert into public.${definitions[key].table} (${keys.join(',')}) select ${keys.map(k=>quote(payload[k])).join(',')} where not exists (select 1 from public.${definitions[key].table} where ${unique}=${quote(payload[unique])});\n`
 }
}
writeFileSync('supabase/content-seed.sql',sql)
const paths=['','about','services','packages','locations','gallery','blog','testimonials','contact','faq',...(['services','programs','locations','blog'] as const).flatMap(key=>fallbackRecords(key).map(r=>`${key==='programs'?'packages':key}/${r.slug}`))]
writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+paths.map(p=>`<url><loc>https://www.pawrexio.com/${p}</loc></url>`).join('\n')+'\n</urlset>\n')
