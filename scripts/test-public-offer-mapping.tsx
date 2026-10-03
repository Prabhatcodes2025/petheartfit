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

const richHtml='<h2>Training plan</h2><p>Calm <strong>reward-based</strong> practice with <em>patient</em> coaching.</p><ol><li>Start at home</li></ol><blockquote>A short quote</blockquote><p><a href="https://example.com">Read more</a></p><figure><img src="/assets/dog.webp" alt="Dog learning a cue"/><figcaption>Practice</figcaption></figure>'
const common={id:'row-1',slug:'cms-example',title:'CMS Example',category:'Dog Training',duration:'8 weeks',session_count:'16 sessions',price_from:18000,sale_price:15000,discount_label:'SAVE 17%',rating:4.8,savings:3000,inclusions:['First inclusion','Second inclusion'],benefits:['Confidence','Everyday manners'],content:richHtml,image_url:'/assets/dog.webp',alt_text:'Dog in training'}

const service=mapServiceRow({...common,kicker:'Personal support',short_description:'Summary',description:'Description',suitable_for:'Puppies and adult dogs'})
const serviceMarkup=renderToStaticMarkup(<><OfferMetadata duration={service.duration} sessions={service.sessions} originalPrice={service.originalPrice} currentPrice={service.price} discount={service.discount} savings={service.savings}/><OfferLists includes={service.includes} benefits={service.benefits}/><FullContent blocks={service.blocks}/></>)
for(const value of ['8 weeks','16 sessions','₹18,000','₹15,000','SAVE 17%','You Saved ₹3,000','First inclusion','Second inclusion','Confidence','Everyday manners','<h2>Training plan</h2>','<strong>reward-based</strong>','<em>patient</em>','<ol>','<blockquote>','href="https://example.com"','alt="Dog learning a cue"'])assert.ok(serviceMarkup.includes(value),`service rendering missing ${value}`)
assert.equal(service.suitable,'Puppies and adult dogs')
assert.equal(service.rating,'4.8') // Services have no existing public rating UI, so rating is not rendered.
assert.ok(!serviceMarkup.includes('4.8 Rating'))
assert.ok(!serviceMarkup.includes('&lt;h2&gt;'))

const program=mapProgramRow({...common,level:'Foundations',summary:'Package summary'})
const programMarkup=renderToStaticMarkup(<><OfferMetadata duration={program.duration} sessions={program.sessions} originalPrice={program.regularPrice} currentPrice={program.price} discount={program.discount} rating={program.rating} savings={program.savings} showRating/><OfferLists includes={program.includes} benefits={program.benefits}/><FullContent blocks={program.blocks}/></>)
for(const value of ['8 weeks','16 sessions','₹18,000','₹15,000','SAVE 17%','4.8 Rating','You Saved ₹3,000','First inclusion','Second inclusion','Confidence','Everyday manners','<h2>Training plan</h2>','alt="Dog learning a cue"'])assert.ok(programMarkup.includes(value),`package rendering missing ${value}`)

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
const routeService=mapServiceRow({...common,slug:'dog-training',title:'Dog Training CMS Fixture',duration:'TEST DURATION',session_count:'TEST SESSIONS',price_from:22222,sale_price:12345,discount_label:'TEST DISCOUNT',rating:4.8,savings:6789,inclusions:['TEST INCLUSION 1','TEST INCLUSION 2'],benefits:['TEST BENEFIT'],suitable_for:'TEST SUITABLE FOR',content:'<p>TEST FULL CONTENT</p>'})
const routePackage=mapProgramRow({...common,slug:'basic-training-for-dog',title:'Package CMS Fixture',duration:'TEST DURATION',session_count:'TEST SESSIONS',price_from:22222,sale_price:12345,discount_label:'TEST DISCOUNT',rating:4.8,savings:6789,inclusions:['TEST INCLUSION 1','TEST INCLUSION 2'],benefits:['TEST BENEFIT'],content:'<p>TEST FULL CONTENT</p>'})
services.splice(0,services.length,routeService)
programs.splice(0,programs.length,routePackage)
function renderRoute(url:string,route:string,element:React.ReactNode){return renderToStaticMarkup(<MemoryRouter initialEntries={[url]}><LeadPopupProvider><Routes><Route path={route} element={element}/></Routes></LeadPopupProvider></MemoryRouter>)}
const previousConsoleError=console.error
console.error=()=>{} // React Router emits useLayoutEffect warnings under the static renderer.
let servicePage='',packagePage=''
try{servicePage=renderRoute('/services/dog-training','/services/:slug',<ServiceDetail/>);packagePage=renderRoute('/packages/basic-training-for-dog','/packages/:slug',<ProgramDetail/>)}finally{console.error=previousConsoleError}
for(const value of ['Dog Training CMS Fixture','TEST DURATION','TEST SESSIONS','₹22,222','₹12,345','TEST DISCOUNT','You Saved ₹6,789','TEST INCLUSION 1','TEST INCLUSION 2','TEST BENEFIT','TEST SUITABLE FOR','TEST FULL CONTENT'])assert.ok(servicePage.includes(value),`existing Service route missing ${value}`)
for(const value of ['Package CMS Fixture','TEST DURATION','TEST SESSIONS','₹22,222','₹12,345','TEST DISCOUNT','4.8 Rating','You Saved ₹6,789','TEST INCLUSION 1','TEST INCLUSION 2','TEST BENEFIT','TEST FULL CONTENT'])assert.ok(packagePage.includes(value),`existing Package route missing ${value}`)
assert.ok(!servicePage.includes('&lt;p&gt;TEST FULL CONTENT'))
assert.ok(!packagePage.includes('&lt;p&gt;TEST FULL CONTENT'))

console.log('Public CMS mapping tests passed for Services, Packages, populated/empty optional fields, inclusion ordering, and rich HTML output.')
