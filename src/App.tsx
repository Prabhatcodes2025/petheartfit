import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Seo } from './components/Seo'
import { LeadPopupProvider } from './components/LeadPopup'
import Home from './pages/Home'
import { ProgramDetail, Programs } from './pages/Programs'
import { ServiceDetail, Services } from './pages/Services'
import { About, Blog, BlogDetail, Booking, FAQPage, Gallery, Legal, LocationDetail, Locations, NotFound, Testimonials } from './pages/Pages'
import Contact from './pages/Contact'
import { AdminCollection, AdminEnquiries, AdminLogin, AdminOverview, AdminSeo, AdminSettings, AdminShell } from './pages/Admin'

export default function App(){return <LeadPopupProvider><Seo/><Routes>
 <Route element={<Layout/>}><Route index element={<Home/>}/><Route path="about" element={<About/>}/><Route path="services" element={<Services/>}/><Route path="services/:slug" element={<ServiceDetail/>}/><Route path="destination/dog-training" element={<Navigate replace to="/services/dog-training"/>}/><Route path="destination/cat-training" element={<Navigate replace to="/services/cat-training"/>}/><Route path="destination/grooming" element={<Navigate replace to="/services/grooming"/>}/><Route path="destination/walking" element={<Navigate replace to="/services/dog-walking"/>}/><Route path="packages" element={<Programs/>}/><Route path="packages/:slug" element={<ProgramDetail/>}/><Route path="programs" element={<Programs/>}/><Route path="programs/:slug" element={<ProgramDetail/>}/><Route path="locations" element={<Locations/>}/><Route path="locations/:slug" element={<LocationDetail/>}/><Route path="gallery" element={<Gallery/>}/><Route path="testimonials" element={<Testimonials/>}/><Route path="feedback" element={<Navigate replace to="/testimonials"/>}/><Route path="blog" element={<Blog/>}/><Route path="blog/:slug" element={<BlogDetail/>}/><Route path="contact" element={<Contact/>}/><Route path="book" element={<Booking/>}/><Route path="faq" element={<FAQPage/>}/><Route path="privacy" element={<Legal type="privacy"/>}/><Route path="terms" element={<Legal type="terms"/>}/><Route path="*" element={<NotFound/>}/></Route>
 <Route path="admin/login" element={<AdminLogin/>}/><Route path="admin" element={<AdminShell/>}><Route index element={<AdminOverview/>}/><Route path="enquiries" element={<AdminEnquiries/>}/>{(['services','programs','locations','gallery','testimonials','blog'] as const).map(x=><Route key={x} path={x} element={<AdminCollection type={x}/>}/>) }<Route path="seo" element={<AdminSeo/>}/><Route path="settings" element={<AdminSettings/>}/></Route>
 </Routes></LeadPopupProvider>}
