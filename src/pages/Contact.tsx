import { Clock3, HeartPulse, MapPinned, Mail, MessageCircle, Phone } from 'lucide-react'
import { HomeEnquiry } from '../components/HomeEnquiry'
import { PageHero, SectionTitle, whatsapp } from '../components/Layout'
import { siteSettings } from '../data'

export default function Contact(){return <>
 <PageHero eyebrow="Get In Touch" title="Let's Talk About Your Pet" text="Have questions about breeds, availability, care, training or pricing? Send us your enquiry and our team will contact you shortly." image="/assets/real/puppy-focus.webp"/>
 <section className="contact-trust"><div className="container trust-inner">{[[Clock3,'Quick Response Support'],[HeartPulse,'Healthy, Pet-First Care'],[MapPinned,'Available Across India']].map(([Icon,label])=><div key={String(label)}>{typeof Icon!=='string'&&<Icon/>}<span>{String(label)}</span></div>)}</div></section>
 <section className="section"><div className="container home-enquiry-grid"><div><SectionTitle eyebrow="Send Your Enquiry" title="Fill the form and we'll contact you soon."/><p>Share your name, contact details, pet breed, location and message. Your enquiry is saved only after the server confirms the Supabase submission.</p><img src="/assets/real/attention.webp" alt="Pawrexio pet training support" loading="lazy"/></div><HomeEnquiry/></div></section>
 <section className="section contact-details-section"><div className="container"><SectionTitle eyebrow="Contact Us" title="Let's Connect With You" text="We're ready to help with pet enquiries, bookings, training, care, availability and pricing."/><div className="contact-detail-grid"><article><Phone/><h3>Call Us</h3><a href={`tel:${siteSettings.phone}`}>{siteSettings.phone}</a></article><article><Mail/><h3>Email Address</h3><a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a></article><article><MapPinned/><h3>Office Location</h3><p>{siteSettings.address}</p></article><article><MessageCircle/><h3>WhatsApp</h3><a href={whatsapp()} target="_blank" rel="noreferrer">Talk to Pawrexio</a></article></div></div></section>
 </>}
