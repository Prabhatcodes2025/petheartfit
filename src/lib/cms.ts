import { supabase } from './supabase'
import { definitions, schemaFor } from '../../shared/cms'
export type Row=Record<string,unknown>&{id:string}
function client(){if(!supabase)throw new Error('Unable to access data. Please try again.');return supabase}
export async function listRecords(key:string){const {data,error}=await client().from(definitions[key].table).select('*').limit(1000);if(error)throw error;return data as Row[]}
export async function saveRecord(key:string,values:Record<string,unknown>,id?:string){const payload=schemaFor(key).parse(values);if(key==='settings'){const social_links:Record<string,unknown>={};for(const k of ['facebook','instagram','youtube','linkedin']){social_links[k]=payload[k];delete payload[k]}payload.social_links=social_links}
 for(const k of ['published_at','follow_up_at'])if(k in payload)payload[k]=payload[k]?new Date(String(payload[k])).toISOString():null;
 const query=id?client().from(definitions[key].table).update({...payload,updated_at:new Date().toISOString()}).eq('id',id):client().from(definitions[key].table).insert(key==='settings'?{...payload,id:'default'}:payload);const {error}=await query;if(error)throw error}
export async function deleteRecord(key:string,id:string){const {error}=await client().from(definitions[key].table).delete().eq('id',id);if(error)throw error}
export async function uploadMedia(file:File,folder=''){if(!['image/jpeg','image/png','image/webp','video/mp4'].includes(file.type)||file.size>25*1024*1024)throw new Error('Use JPG, PNG, WebP or MP4 up to 25 MB.');const name=crypto.randomUUID()+'.'+file.name.split('.').pop()!.toLowerCase(),path=folder?`${folder}/${name}`:name;const c=client();const {error}=await c.storage.from('media').upload(path,file,{contentType:file.type,upsert:false});if(error)throw error;return c.storage.from('media').getPublicUrl(path).data.publicUrl}
