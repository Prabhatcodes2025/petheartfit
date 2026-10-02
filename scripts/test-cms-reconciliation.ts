import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { definitions, schemaFor } from '../shared/cms.js'
import { draftOf, valuesOf } from '../src/lib/cms-form.js'
import { databaseFailure } from '../server/app.js'

const serviceFields=definitions.services.fields
const validService={title:'Basic service',slug:'basic-service',short_description:'Short',description:'Details'}
function serializeService(overrides:Record<string,unknown>={}){
  const draft={...draftOf(null,serviceFields),...validService,...overrides}
  const values=valuesOf('services',draft,serviceFields)
  const parsed=schemaFor('services').safeParse(values)
  assert.equal(parsed.success,true,parsed.success?'':JSON.stringify(parsed.error.issues))
  return parsed.data
}

// A: basic content; B: all offer fields; C: image and ALT URL ordering; D: blank optionals.
assert.equal(serializeService().title,'Basic service')
const offer=serializeService({duration:'45 minutes',session_count:'6',price_from:'12000',sale_price:'9500',discount_label:'NO',rating:'4.7',savings:'2500',inclusions:'Consultation\nFollow-up'})
assert.deepEqual([offer.duration,offer.session_count,offer.price_from,offer.sale_price,offer.discount_label,offer.rating,offer.savings,offer.inclusions],['45 minutes','6',12000,9500,'NO',4.7,2500,['Consultation','Follow-up']])
const imagePayload=serializeService({image_url:'/assets/main.webp',alt_text:'Dog training outdoors',additional_images:'/assets/one.webp\n/assets/two.webp',additional_image_alts:'A dog learning a sit\nA trainer rewarding a dog'})
assert.equal(imagePayload.alt_text,'Dog training outdoors')
assert.deepEqual(imagePayload.additional_images,['/assets/one.webp','/assets/two.webp'])
assert.deepEqual(imagePayload.additional_image_alts,['A dog learning a sit','A trainer rewarding a dog'])
const blank=serializeService({discount_label:'',rating:'',savings:'',session_count:'',additional_images:'',additional_image_alts:''})
assert.deepEqual([blank.discount_label,blank.rating,blank.savings,blank.session_count,blank.additional_images,blank.additional_image_alts],['',null,null,'',[],[]])

// Existing editable values round-trip through form state and remain in the save payload.
const existing={id:'service-id',...imagePayload,discount_label:'20% off',rating:4.5,savings:500}
const edited=valuesOf('services',{...draftOf(existing,serviceFields),title:'Updated title'},serviceFields)
assert.equal(edited.title,'Updated title')
assert.equal(edited.suitable_for,existing.suitable_for)
assert.deepEqual(edited.additional_images,existing.additional_images)
assert.deepEqual(edited.additional_image_alts,existing.additional_image_alts)
assert.deepEqual(edited.inclusions,existing.inclusions)

// Representative Packages and Blogs payloads.
for(const [key,required] of [['programs',{title:'Training package',slug:'training-package',summary:'A concise summary'}],['blog',{title:'A blog post',slug:'a-blog-post',excerpt:'An excerpt',content:'<p>Article body</p>'}]] as const){
  const fields=definitions[key].fields
  const values=valuesOf(key,{...draftOf(null,fields),...required},fields)
  const parsed=schemaFor(key).safeParse(values)
  assert.equal(parsed.success,true,`${key}: ${parsed.success?'':JSON.stringify(parsed.error.issues)}`)
}

// “NO” is a valid optional discount label. Only backend missing-column codes
// receive the schema-mismatch classification; unrelated database failures do not.
const request={params:{id:'service-id'},body:{discount_label:'NO'},res:{locals:{user:{id:'admin-id'}}}} as unknown as Parameters<typeof databaseFailure>[3]
const realMissingColumn=databaseFailure('services','update',{code:'PGRST204',message:'Could not find discount_label column'},request)
assert.equal(realMissingColumn.code,'SCHEMA_MISMATCH')
assert.equal(realMissingColumn.field,'discount_label')
const otherDatabaseError=databaseFailure('services','update',{code:'23514',message:'check constraint violation'},request)
assert.notEqual(otherDatabaseError.code,'SCHEMA_MISMATCH')
assert.equal(otherDatabaseError.message.includes('database schema is missing'),false)

// The one corrective migration is additive, idempotent, and covers all known gaps.
const migration=readFileSync(new URL('../supabase/reconcile-cms-fields-2026-10-02.sql',import.meta.url),'utf8')
for(const column of ['discount_label text','rating numeric(2,1)','savings numeric(10,2)'])assert.ok(migration.includes(`add column if not exists ${column}`),column)
assert.match(migration,/information_schema\.columns/i)
assert.doesNotMatch(migration,/\bdrop\s+(column|table)\b|\btruncate\b/i)

console.log('CMS reconciliation tests passed: Services A–D, edit preservation, ALT pairing, Packages, Blogs, and error classification.')
