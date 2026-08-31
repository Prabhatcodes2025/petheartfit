import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const app=express()
app.set('trust proxy',1)
app.use(helmet({contentSecurityPolicy:false,crossOriginResourcePolicy:{policy:'cross-origin'}}))
app.use(cors({origin:(process.env.CORS_ORIGINS||'http://localhost:5173').split(','),credentials:true}))
app.use(express.json({limit:'250kb'}))
const limiter=rateLimit({windowMs:15*60*1000,limit:20,standardHeaders:'draft-7',legacyHeaders:false,message:{message:'Too many requests. Please wait and try again.'}})

const enquirySchema=z.object({
 fullName:z.string().trim().min(2).max(100),phone:z.string().trim().min(7).max(25),email:z.string().email().max(160).or(z.literal('')),
 city:z.string().trim().min(2).max(100),petType:z.enum(['Dog','Cat','Other']),petName:z.string().trim().max(80),breed:z.string().trim().max(100),
 petAge:z.string().trim().max(50),service:z.string().trim().min(1).max(100),concern:z.string().trim().min(5).max(2000),
 preferredDate:z.string().max(20),preferredTime:z.string().max(30),message:z.string().trim().max(3000),website:z.string().max(0)
})

function adminClient(){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;return url&&key?createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}):null}
function publicClient(){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_ANON_KEY;return url&&key?createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}):null}

app.get('/api/health',(_req,res)=>res.json({ok:true,database:Boolean(adminClient()),time:new Date().toISOString()}))
app.post('/api/enquiries',limiter,async(req,res)=>{
 const parsed=enquirySchema.safeParse(req.body)
 if(!parsed.success)return res.status(400).json({message:'Please review the highlighted information.',issues:parsed.error.flatten().fieldErrors})
 const client=adminClient()
 if(!client){if(process.env.NODE_ENV==='production')return res.status(503).json({message:'Online enquiry storage is being configured. Please contact us by email.'});console.info('[enquiry:development]',{name:parsed.data.fullName,city:parsed.data.city,service:parsed.data.service});return res.status(201).json({ok:true,mode:'development-fallback'})}
 const d=parsed.data
 const {error}=await client.from('enquiries').insert({full_name:d.fullName,phone:d.phone,email:d.email||null,city:d.city,pet_type:d.petType.toLowerCase(),pet_name:d.petName||null,breed:d.breed||null,pet_age:d.petAge||null,service_slug:d.service,behaviour_concern:d.concern,preferred_date:d.preferredDate||null,preferred_time:d.preferredTime||null,message:d.message||null,status:'new'})
 if(error){console.error('[enquiry:create]',error.code);return res.status(500).json({message:'We could not save your enquiry. Please try again shortly.'})}
 res.status(201).json({ok:true})
})

async function requireAdmin(req:express.Request,res:express.Response,next:express.NextFunction){const token=req.headers.authorization?.replace(/^Bearer\s+/,'');const client=publicClient();if(!token||!client)return res.status(401).json({message:'Authentication required'});const {data,error}=await client.auth.getUser(token);if(error||!data.user)return res.status(401).json({message:'Invalid session'});const admin=adminClient();if(!admin)return res.status(503).json({message:'Database not configured'});const {data:profile}=await admin.from('profiles').select('role').eq('id',data.user.id).single();if(!profile||!['admin','editor'].includes(profile.role))return res.status(403).json({message:'Not authorised'});res.locals.user=data.user;res.locals.role=profile.role;next()}

for(const resource of ['services','training_programs','locations','gallery','testimonials','blog_posts','faqs','seo_metadata','site_settings']){
 app.get(`/api/admin/${resource}`,requireAdmin,async(_req,res)=>{const c=adminClient()!;const {data,error}=await c.from(resource).select('*').order('created_at',{ascending:false});if(error)return res.status(500).json({message:'Unable to load records'});res.json(data)})
 app.post(`/api/admin/${resource}`,requireAdmin,async(req,res)=>{const c=adminClient()!;const {data,error}=await c.from(resource).insert(req.body).select().single();if(error)return res.status(400).json({message:'Unable to create record'});res.status(201).json(data)})
 app.patch(`/api/admin/${resource}/:id`,requireAdmin,async(req,res)=>{const c=adminClient()!;const {data,error}=await c.from(resource).update({...req.body,updated_at:new Date().toISOString()}).eq('id',req.params.id).select().single();if(error)return res.status(400).json({message:'Unable to update record'});res.json(data)})
 app.delete(`/api/admin/${resource}/:id`,requireAdmin,async(req,res)=>{if(res.locals.role!=='admin')return res.status(403).json({message:'Administrator access required'});const c=adminClient()!;const {error}=await c.from(resource).delete().eq('id',req.params.id);if(error)return res.status(400).json({message:'Unable to delete record'});res.status(204).end()})
}

app.use('/api',(_req,res)=>res.status(404).json({message:'Endpoint not found'}))
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error('[server]',err instanceof Error?err.message:'Unknown error');res.status(500).json({message:'An unexpected error occurred'})})
export default app
