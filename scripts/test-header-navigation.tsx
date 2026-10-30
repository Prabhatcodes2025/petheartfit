import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { definitions, schemaFor } from '../shared/cms'
import { HeaderNavigation } from '../src/components/HeaderNavigation'
import { draftOf, valuesOf } from '../src/lib/cms-form'
import { normalizeNavigation } from '../src/lib/navigation'

const fields=definitions.settings.fields
const savedFixture=[
 {id:'home',label:'Home',url:'/',order:10,visible:true},
 {id:'services',label:'Services',url:'#',order:20,visible:true},
 {id:'dog',label:'Dog Training',url:'/services/dog-training',order:20,visible:true,parentId:'services'},
 {id:'cat',label:'Cat Training',url:'/services/cat-training',order:10,visible:true,parentId:'services'},
 {id:'about',label:'About Us',url:'/about',order:30,visible:true},
 {id:'gallery',label:'Gallery',url:'/gallery',order:40,visible:false}
]

// Admin load → edit → save payload → reload preserves the changed fixture.
const draft=draftOf({id:'default',header_navigation:savedFixture},fields)
draft.header_navigation=String(draft.header_navigation)
 .replace('Dog Training','Canine Coaching')
 .replace('About Us | /about | 30','About Us | /about | 5')
 +'\nHome | / | 10 | yes' // an accidental duplicate must be discarded
const payload=valuesOf('settings',draft,fields)
const parsed=schemaFor('settings').parse(payload)
const reopened=draftOf({id:'default',...parsed},fields)
assert.match(String(reopened.header_navigation),/Canine Coaching \| \/services\/dog-training/)
assert.doesNotMatch(String(reopened.header_navigation),/Dog Training \|/)

const navigation=normalizeNavigation(parsed.header_navigation)
assert.equal(navigation.filter(item=>item.label==='Home').length,1)
const parent=navigation.find(item=>item.label==='Services')!
function render(mobile=false){return renderToStaticMarkup(<MemoryRouter initialEntries={['/services/dog-training']}><HeaderNavigation items={navigation} mobile={mobile} openDropdown={mobile?parent.id:null} onToggle={()=>{}} pathname="/services/dog-training"/></MemoryRouter>)}
const desktop=render(),mobile=render(true)
for(const markup of [desktop,mobile]){
 assert.match(markup,/Canine Coaching/)
 assert.match(markup,/href="\/services\/dog-training"/)
 assert.doesNotMatch(markup,/>Dog Training</)
 assert.doesNotMatch(markup,/>Gallery</)
 assert.equal((markup.match(/>Home</g)||[]).length,1)
 assert.ok(markup.indexOf('About Us')<markup.indexOf('Home'),'saved top-level order was not rendered')
 assert.ok(markup.indexOf('Cat Training')<markup.indexOf('Canine Coaching'),'saved dropdown order was not rendered')
}
assert.match(desktop,/nav-dropdown/)
assert.match(mobile,/mobile-submenu/)
assert.match(mobile,/aria-expanded="true"/)

const migration=readFileSync(new URL('../supabase/header-navigation-2026-10-30.sql',import.meta.url),'utf8')
assert.match(migration,/add column if not exists header_navigation jsonb/i)
assert.doesNotMatch(migration,/\bdrop\b|\btruncate\b/i)

console.log('Header navigation fixture passed: save/reload, labels, URLs, ordering, visibility, deduplication, desktop, mobile, and dropdown rendering.')
