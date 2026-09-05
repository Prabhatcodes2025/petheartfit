const allowed=new Set(['P','H2','H3','STRONG','B','EM','I','UL','OL','LI','BLOCKQUOTE','A','FIGURE','IMG','FIGCAPTION','BR'])
const safeUrl=(value:string,image=false)=>{const v=value.trim();return /^(https?:\/\/|\/assets\/)/i.test(v)||(image&&/^data:image\/(jpeg|png|webp);base64,/i.test(v))}

export function sanitizeBlogHtml(value:string){
 if(typeof document==='undefined')return value
 const doc=new DOMParser().parseFromString(`<div>${value}</div>`,'text/html'),root=doc.body.firstElementChild!
 for(const el of [...root.querySelectorAll('*')]){
  if(!allowed.has(el.tagName)){el.replaceWith(...el.childNodes);continue}
  for(const attr of [...el.attributes])if(!['href','src','alt','title','target','rel','width','height','class'].includes(attr.name))el.removeAttribute(attr.name)
  if(el.tagName==='A'){const href=el.getAttribute('href')||'';if(!safeUrl(href))el.removeAttribute('href');else{el.setAttribute('rel','noopener noreferrer');if(/^https?:/i.test(href))el.setAttribute('target','_blank')}}
  if(el.tagName==='IMG'){const src=el.getAttribute('src')||'';if(!safeUrl(src,true)){el.remove();continue}el.removeAttribute('style');el.setAttribute('loading','lazy');el.setAttribute('decoding','async')}
  if(el.tagName!=='FIGURE')el.removeAttribute('class')
  if(el.tagName==='FIGURE'){el.className=[...el.classList].filter(x=>/^align-(left|center|right)$|^size-(small|medium|large)$/.test(x)).join(' ');if(![...el.classList].some(x=>x.startsWith('align-')))el.classList.add('align-center');if(![...el.classList].some(x=>x.startsWith('size-')))el.classList.add('size-large')}
 }
 return root.innerHTML
}

export function plainTextToHtml(value:string){return value.split(/\n\s*\n/).filter(Boolean).map(text=>`<p>${text.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]!)).replace(/\n/g,'<br>')}</p>`).join('')}
export const isRichBlogHtml=(value:string)=>/<\/?(?:p|h2|h3|figure|ul|ol|blockquote)\b/i.test(value)
