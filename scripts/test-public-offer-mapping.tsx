import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { LeadPopupProvider } from '../src/components/LeadPopup'
import { FullContent, OfferLists, OfferMetadata } from '../src/components/PublicOfferDetails'
import { mapProgramRow, mapServiceRow } from '../src/lib/public-cms-mapping'
import { ServiceDetail } from '../src/pages/Services'
import { ProgramDetail } from '../src/pages/Programs'
import { programs, services } from '../src/data'
import { definitions } from '../shared/cms'
import { calculatedPriceFields, draftOf, valuesOf } from '../src/lib/cms-form'

const richHtml='<h2>Training plan</h2><p>Calm <strong>reward-based</strong> practice with <em>patient</em> coaching.</p><ol><li>Start at home</li></ol><blockquote>A short quote</blockquote><p><a href="https://example.com">Read more</a></p><figure><img src="/assets/dog.webp" alt="Dog learning a cue"/><figcaption>Practice</figcaption></figure>'
const common={id:'row-1',slug:'cms-example',title:'CMS Example',category:'Dog Training',duration:'8 weeks',session_count:'16 sessions',price_from:18000,sale_price:15000,discount_label:'SAVE 17%',rating:4.8,savings:3000,inclusions:['First inclusion','Second inclusion'],benefits:['Confidence','Everyday manners'],content:richHtml,image_url:'/assets/dog.webp',alt_text:'Dog in training'}

const service=mapServiceRow({...common,kicker:'Personal support',short_description:'Summary',description:'Description',suitable_for:'Puppies and adult dogs'})
const serviceMarkup=renderToStaticMarkup(<><OfferMetadata duration={service.duration} sessions={service.sessions} originalPrice={service.originalPrice} currentPrice={service.price} discount={service.discount} rating={service.rating} savings={service.savings} showRating/><OfferLists includes={service.includes} benefits={service.benefits}/><FullContent blocks={service.blocks}/></>)
for(const value of ['<b>Duration</b> 8 weeks','<b>Sessions</b> 16 sessions','₹18,000','₹15,000','SAVE 17%','Save ₹3,000','★ 4.8','First inclusion','Second inclusion','Confidence','Everyday manners','<h2>Training plan</h2>','<strong>reward-based</strong>','<em>patient</em>','<ol>','<blockquote>','href="https://example.com"','alt="Dog learning a cue"'])assert.ok(serviceMarkup.includes(value),`service rendering missing ${value}`)
assert.equal(service.suitable,'Puppies and adult dogs')
assert.equal(service.rating,'4.8')
assert.ok(serviceMarkup.includes('★ 4.8'))
assert.ok(!serviceMarkup.includes('&lt;h2&gt;'))

const program=mapProgramRow({...common,level:'Foundations',summary:'Package summary'})
const programMarkup=renderToStaticMarkup(<><OfferMetadata duration={program.duration} sessions={program.sessions} originalPrice={program.regularPrice} currentPrice={program.price} discount={program.discount} rating={program.rating} savings={program.savings} showRating/><OfferLists includes={program.includes} benefits={program.benefits}/><FullContent blocks={program.blocks}/></>)
for(const value of ['<b>Duration</b> 8 weeks','<b>Sessions</b> 16 sessions','₹18,000','₹15,000','SAVE 17%','★ 4.8','Save ₹3,000','First inclusion','Second inclusion','Confidence','Everyday manners','<h2>Training plan</h2>','alt="Dog learning a cue"'])assert.ok(programMarkup.includes(value),`package rendering missing ${value}`)

const emptyMarkup=renderToStaticMarkup(<><OfferMetadata/><OfferLists/><FullContent blocks={[]}/></>)
assert.equal(emptyMarkup,'')
const emptyPrices=mapProgramRow({...common,price_from:null,sale_price:null,discount_label:'',rating:null,savings:null,session_count:''})
assert.equal(emptyPrices.price,'')
assert.equal(emptyPrices.regularPrice,'')
assert.equal(emptyPrices.discount,'')
assert.equal(emptyPrices.rating,'')
assert.equal(emptyPrices.savings,'')

// Render the actual existing public routes using DB-shaped CMS fixtures. These
// rows are mapped exactly like public-content.ts and never written to Supabase.
const fixtureFields={duration:'4 Months',session_count:'48 Sessions',price_from:50000,sale_price:46000,discount_label:'8% OFF',rating:4.8,savings:4000,inclusions:['TEST INCLUSION 1','TEST INCLUSION 2','TEST INCLUSION 3'],benefits:['TEST BENEFIT'],content:'<h2>TEST FULL CONTENT</h2><p>Formatted public content.</p><figure><img src="/assets/test.webp" alt="Test image ALT"/></figure>'}
const routeService=mapServiceRow({...common,slug:'dog-training',title:'Dog Training CMS Fixture',...fixtureFields,suitable_for:'TEST SUITABLE FOR'})
const routePackage=mapProgramRow({...common,slug:'basic-training-for-dog',title:'Package CMS Fixture',...fixtureFields})
services.splice(0,services.length,routeService)
programs.splice(0,programs.length,routePackage)
function renderRoute(url:string,route:string,element:React.ReactNode){return renderToStaticMarkup(<MemoryRouter initialEntries={[url]}><LeadPopupProvider><Routes><Route path={route} element={element}/></Routes></LeadPopupProvider></MemoryRouter>)}
const previousConsoleError=console.error
console.error=()=>{} // React Router emits useLayoutEffect warnings under the static renderer.
let servicePage='',packagePage=''
try{servicePage=renderRoute('/services/dog-training','/services/:slug',<ServiceDetail/>);packagePage=renderRoute('/packages/basic-training-for-dog','/packages/:slug',<ProgramDetail/>)}finally{console.error=previousConsoleError}
for(const value of ['Dog Training CMS Fixture','Duration</b> 4 Months','Sessions</b> 48 Sessions','₹50,000','₹46,000','8% OFF','Save ₹4,000','★ 4.8','TEST INCLUSION 1','TEST INCLUSION 2','TEST INCLUSION 3','TEST BENEFIT','TEST SUITABLE FOR','<h2>TEST FULL CONTENT</h2>','alt="Test image ALT"'])assert.ok(servicePage.includes(value),`existing Service route missing ${value}`)
for(const value of ['Package CMS Fixture','Duration</b> 4 Months','Sessions</b> 48 Sessions','₹50,000','₹46,000','8% OFF','Save ₹4,000','★ 4.8','TEST INCLUSION 1','TEST INCLUSION 2','TEST INCLUSION 3','TEST BENEFIT','<h2>TEST FULL CONTENT</h2>','alt="Test image ALT"'])assert.ok(packagePage.includes(value),`existing Package route missing ${value}`)
assert.ok(!servicePage.includes('&lt;p&gt;TEST FULL CONTENT'))
assert.ok(!packagePage.includes('&lt;p&gt;TEST FULL CONTENT'))

// Simulate Admin edit → computed fields → DB payload → reopened editor.
for(const type of ['services','programs']){
 const fields=definitions[type].fields
 const entered={...draftOf(null,fields),price_from:'₹50,000',sale_price:'46,000',duration:'4 Months',session_count:'48 Sessions',rating:'4.8',inclusions:'First\nSecond\nThird',benefits:'Benefit',content:'<h2>Saved heading</h2><p>Saved paragraph.</p><img src="/assets/test.webp" alt="Saved ALT"/>'}
 assert.deepEqual(calculatedPriceFields(entered),{savings:'4000',discount_label:'8% OFF'})
 const payload=valuesOf(type,entered,fields)
 assert.equal(payload.price_from,50000);assert.equal(payload.sale_price,46000);assert.equal(payload.savings,4000);assert.equal(payload.discount_label,'8% OFF')
 assert.equal(payload.duration,'4 Months');assert.equal(payload.session_count,'48 Sessions');assert.equal(payload.rating,4.8)
 assert.deepEqual(payload.inclusions,['First','Second','Third'])
 const reopened=draftOf(payload as Record<string,unknown>,fields)
 assert.equal(reopened.content,entered.content);assert.equal(reopened.duration,'4 Months');assert.equal(reopened.session_count,'48 Sessions')
 const empty=calculatedPriceFields({...entered,sale_price:''});assert.deepEqual(empty,{savings:'',discount_label:''})
 const invalid=calculatedPriceFields({...entered,sale_price:'50000'});assert.deepEqual(invalid,{savings:'',discount_label:''})
}

console.log('Public CMS render and edit/save/reopen checks passed for Services and Packages.')
