export type NavigationItem={id:string;label:string;url:string;order:number;visible:boolean;parentId?:string}

const slug=(value:string)=>value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'item'

export function normalizeNavigation(value:unknown):NavigationItem[]{
 if(!Array.isArray(value))return []
 const seen=new Set<string>()
 const items=value.flatMap((entry,index)=>{
  if(!entry||typeof entry!=='object')return []
  const row=entry as Record<string,unknown>,label=String(row.label||'').trim(),url=String(row.url||'').trim()
  if(!label||!url||!(/^(?:\/|#|https?:\/\/|mailto:|tel:)/i.test(url)))return []
  const parent=String(row.parentId||row.parent||'').trim(),key=`${parent.toLowerCase()}|${label.toLowerCase()}|${url.toLowerCase()}`
  if(seen.has(key))return []
  seen.add(key)
  return [{id:String(row.id||`${slug(label)}-${index}`).trim(),label,url,order:Number.isFinite(Number(row.order))?Number(row.order):index,visible:row.visible!==false,parentId:parent||undefined,_index:index}]
 })
 const parents=items.filter(item=>!item.parentId)
 return items.map(item=>{
  if(!item.parentId)return item
  const parent=parents.find(candidate=>candidate.id.toLowerCase()===item.parentId!.toLowerCase()||candidate.label.toLowerCase()===item.parentId!.toLowerCase())
  return {...item,parentId:parent?.id}
 }).sort((a,b)=>a.order-b.order||a._index-b._index).map(({_index,...item})=>item)
}

export function navigationToText(value:unknown){
 const items=normalizeNavigation(value),labels=new Map(items.map(item=>[item.id,item.label]))
 return items.map(item=>[item.label,item.url,item.order,item.visible?'yes':'no',item.parentId?labels.get(item.parentId)||item.parentId:''].join(' | ')).join('\n')
}

export function navigationFromText(value:unknown){
 const rows=String(value||'').split('\n').map(line=>line.trim()).filter(Boolean).map((line,index)=>{
  const [label='',url='',order='',visible='yes',parent='']=line.split('|').map(part=>part.trim())
  return {id:`${slug(label)}-${index}`,label,url,order:order===''?index:Number(order),visible:!['no','false','hidden','0'].includes(visible.toLowerCase()),parentId:parent||undefined}
 })
 return normalizeNavigation(rows)
}
