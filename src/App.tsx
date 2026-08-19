import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { ProgramDetail, Programs } from './pages/Programs'
import { ServiceDetail, Services } from './pages/Services'
import { About, Blog, BlogDetail, Booking, FAQPage, Gallery, Legal, LocationDetail, Locations, NotFound, Testimonials } from './pages/Pages'
import { AdminCollection, AdminEnquiries, AdminLogin, AdminOverview, AdminSettings, AdminShell } from './pages/Admin'

export default function App(){return <Routes>
 <Route element={<Layout/>}><Route index element={<Home/>}/><Route path="about" element={<About/>}/><Route path="services" element={<Services/>}/><Route path="services/:slug" element={<ServiceDetail/>}/><Route path="programs" element={<Programs/>}/><Route path="programs/:slug" element={<ProgramDetail/>}/><Route path="locations" element={<Locations/>}/><Route path="locations/:slug" element={<LocationDetail/>}/><Route path="gallery" element={<Gallery/>}/><Route path="testimonials" element={<Testimonials/>}/><Route path="blog" element={<Blog/>}/><Route path="blog/:slug" element={<BlogDetail/>}/><Route path="contact" element={<Booking contact/>}/><Route path="book" element={<Booking/>}/><Route path="faq" element={<FAQPage/>}/><Route path="privacy" element={<Legal type="privacy"/>}/><Route path="terms" element={<Legal type="terms"/>}/><Route path="*" element={<NotFound/>}/></Route>
 <Route path="admin/login" element={<AdminLogin/>}/><Route path="admin" element={<AdminShell/>}><Route index element={<AdminOverview/>}/><Route path="enquiries" element={<AdminEnquiries/>}/>{(['services','programs','locations','gallery','testimonials','blog','faqs'] as const).map(x=><Route key={x} path={x} element={<AdminCollection type={x}/>}/>) }<Route path="settings" element={<AdminSettings/>}/></Route>
 </Routes>}
