import { supabase } from './supabase'
import { definitions, schemaFor } from '../../shared/cms'
export type Row=Record<string,unknown>&{id:string}
export type SaveFailure={message:string;field?:string;code?:string}
export class CmsSaveError extends Error{field?:string;code?:string;constructor(failure:SaveFailure){super(failure.message);this.name='CmsSaveError';this.field=failure.field;this.code=failure.code}}
function client(){if(!supabase)throw new Error('Unable to access data. Please try again.');return supabase}
export async function listRecords(key:string){const {data,error}=await client().from(definitions[key].table).select('*').limit(1000);if(error)throw error;return data as Row[]}
export async function saveRecord(key:string,values:Record<string,unknown>,id?:string){const payload=schemaFor(key).parse(values);for(const k of ['published_at','follow_up_at'])if(k in payload)payload[k]=payload[k]?new Date(String(payload[k])).toISOString():null
 const {data:{session}}=await client().auth.getSession();if(!session)throw new CmsSaveError({message:'Your admin session has expired. Please log in again.',code:'SESSION_EXPIRED'})
 let response:Response
 try{response=await fetch(`/api/admin/${definitions[key].table}${id?`/${encodeURIComponent(id)}`:''}`,{method:id?'PATCH':'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify(payload)})}
 catch(error){console.error('[cms:save:network]',{resource:key,error});throw new CmsSaveError({message:'Network connection failed. Please retry.',code:'NETWORK_ERROR'})}
 let body:SaveFailure={message:'Database update was rejected. Please contact the administrator.'}
 try{body=await response.json() as SaveFailure}catch{/* Keep the safe fallback for non-JSON responses. */}
 if(!response.ok){console.error('[cms:save]',{resource:key,status:response.status,code:body.code,field:body.field});throw new CmsSaveError(body)}
}
export async function deleteRecord(key:string,id:string){const {error}=await client().from(definitions[key].table).delete().eq('id',id);if(error)throw error}
export async function uploadMedia(file:File,folder=''){if(!['image/jpeg','image/png','image/webp','video/mp4'].includes(file.type)||file.size>25*1024*1024)throw new Error('Use JPG, PNG, WebP or MP4 up to 25 MB.');const name=crypto.randomUUID()+'.'+file.name.split('.').pop()!.toLowerCase(),path=folder?`${folder}/${name}`:name;const c=client();const {error}=await c.storage.from('media').upload(path,file,{contentType:file.type,upsert:false});if(error)throw error;return c.storage.from('media').getPublicUrl(path).data.publicUrl}
