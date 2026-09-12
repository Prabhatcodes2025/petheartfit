import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogContent } from '../components/BlogContent'
import { Breadcrumb, Content } from '../components/Content'
import { FAQList } from '../components/FAQ'
import { PageHero, SectionTitle } from '../components/Layout'
import { LeadButton } from '../components/LeadPopup'
import { MediaGallery } from '../components/Media'
import { faqs, locations, posts, siteSettings, testimonials } from '../data'

const aboutStrengths = [
  ['Expert Trainers with Real Results', 'Our certified and experienced trainers use proven, positive reinforcement techniques to shape well-behaved, confident dogs. Whether it’s basic obedience or complex behaviour correction, we focus on lasting improvements.'],
  ['Flexible & Personalized Training Options', 'Choose practical home, outdoor or hybrid support based on your pet’s age, behaviour, learning style and daily routine.'],
  ['Transparent Pricing & 24/7 Support', 'Service scope and pricing are confirmed clearly, with dedicated online guidance whenever you need support.']
]

const aboutFaqs = faqs.slice(0, 7).map((item, index) => index === 2
  ? ['What questions should I ask a dog trainer?', item[1]]
  : item)

export function About() {
  return <>
    <PageHero eyebrow="" title="About Us" text="Learn about Pawrexio and our approach to professional pet training and care." image="/assets/real/companions.webp" />
    <section className="section reference-about">
      <div className="container">
        <div className="reference-about-title">
          <p className="eyebrow">We Are Pawrexio</p>
          <h2>“Pawrexio: Your Trusted Partner in Raising Happy, Well-Trained Dogs for a Balanced and Joyful Life.”</h2>
        </div>
        <div className="reference-about-copy">
          <div>
            <h1>Pet Training &amp; Puppy Training – The Heart Behind Pawrexio</h1>
            <p>In India, pets are family, and that's the inspiration behind Pawrexio. We are passionate about providing professional Pet Training and Puppy Training that help build trust, confidence, and a lifelong bond between pets and their families. Our positive, reward-based approach ensures every dog and cat learns in a safe, stress-free, and enjoyable environment. Every pet has a unique personality, and our experienced trainers create personalised training plans with patience, compassion, and care.</p>
          </div>
          <img src="/assets/real/obedience.webp" alt="Pawrexio trainer with a dog" loading="lazy" />
        </div>
        <div className="reference-about-columns">
          <article><h2>Leash Training for Dogs, Cat Training Services &amp; Dog Walking Services</h2><p>Whether you have a playful puppy, an energetic adult dog, or a curious cat, we offer training programs for every stage. Our services include Leash Training for Dogs, Cat Training Services, Puppy Training, Basic, Intermediate, Smart, Advanced, and our complete All-in-One Training Package. We also provide specialised Canine Behaviour Therapy (CBT) to help pets overcome aggression, anxiety, fear, excessive barking, and other behavioural challenges. For pets who benefit from a calm outdoor environment, we also offer farmhouse training sessions where they can learn, play, and socialise under expert supervision. We also provide reliable Dog Walking Services to help keep your pet active, healthy, and happy.</p></article>
          <article><h2>Pet Grooming Services &amp; Dog Grooming at Home</h2><p>At Pawrexio, we believe grooming is just as important as training for your pet's health and happiness. Our professional Pet Grooming Services include bathing, coat care, nail trimming, ear cleaning, and hygiene care for both dogs and cats. For added convenience, we also offer Dog Grooming at Home, allowing your furry companion to enjoy a comfortable and stress-free grooming experience. What truly makes Pawrexio special is the love, attention, and dedication we give every pet. Because at the end of the day, a happy pet means a happy family.</p></article>
        </div>
      </div>
    </section>
    <section className="section reference-about-strengths"><div className="container"><FAQList items={aboutStrengths} /></div></section>
    <section className="section"><div className="container narrow"><FAQList items={aboutFaqs} /></div></section>
  </>
}

const blogTitles: Record<string, string> = {
  'puppy-training-in-gurgaon-happy-well-behaved-companion': 'Puppy Training in Gurgaon – Build a Happy, Well-Behaved Companion',
  'basic-to-advanced-dog-training': 'Basic to Advance Dog Training Service – Build Discipline from Day One',
  'dog-training-in-mumbai-professional-trusted-services': 'Dog Training in Mumbai – Professional & Trusted Pet Training Services',
  'pet-training-happy-obedient-well-behaved-pets': 'Pet Training for Happy, Obedient & Well-Behaved Pets',
  'leash-training-practical-guide': 'Leash Training for Dogs – A Practical Guide for Better Control & Behavior',
  'puppy-obedience-classes-perfect-foundation': 'Puppy Obedience Classes: Build the Perfect Foundation for Your Dog',
  'dog-behaviour-training-lasting-results': 'Dog Behavior Training: A Niche Approach for Lasting Results'
}

export function Blog() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => posts.filter(post => `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <>
    <PageHero eyebrow="" title="Our Blogs" text="Professional guidance for training, behaviour and everyday pet care." />
    <section className="section reference-blog"><div className="container">
      <SectionTitle eyebrow="" title="Trusted for our services" />
      <label className="reference-blog-search"><Search /><span className="sr-only">Search our blogs</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search our blogs" /></label>
      <div className="reference-blog-grid">{filtered.map(post => <Link to={`/blog/${post.slug}`} key={post.id}>
        <div className="reference-blog-image"><img src={post.image} alt="" loading="lazy" /></div>
        <div><p>{post.category} · {post.date}</p><h2>{blogTitles[post.slug] || post.title}</h2><span>{post.excerpt}</span><b>Read More <ArrowRight /></b></div>
      </Link>)}</div>
    </div></section>
  </>
}

export function BlogDetail() {
  const { slug } = useParams()
  const post = posts.find(item => item.slug === slug)
  if (!post) return null
  const title = blogTitles[post.slug] || post.title
  const related = posts.filter(item => item.id !== post.id).slice(0, 3)
  return <>
    <PageHero eyebrow={`${post.category} · ${post.readTime}`} title={title} text={post.excerpt} image={post.image} />
    <Breadcrumb items={[{ label: 'Blogs', to: '/blog' }, { label: title }]} />
    <article className="article container"><div className="article-meta"><span>Published {post.date}</span></div><BlogContent content={post.content} /><LeadButton service={post.category}>Discuss your pet</LeadButton></article>
    <section className="section related"><div className="container"><SectionTitle eyebrow="Keep learning" title="Related blogs" /><div className="blog-mini-grid">{related.map(item => <Link to={`/blog/${item.slug}`} key={item.id}><img src={item.image} alt="" loading="lazy" /><p>{item.category} · {item.readTime}</p><h3>{blogTitles[item.slug] || item.title}</h3><span>Read More <ArrowRight /></span></Link>)}</div></div></section>
  </>
}

export function Gallery() {
  return <>
    <PageHero eyebrow="" title="Our Gallery" text="Real Pawrexio training and pet-care moments." image="/assets/real/attention.webp" />
    <section className="section reference-gallery-section"><div className="container"><h2>What we have done</h2><MediaGallery /></div></section>
  </>
}

export function Locations() {
  return <>
    <PageHero eyebrow="" title="Our Locations" text="Explore Pawrexio pet training, grooming and walking support across India." />
    <section className="section reference-locations"><div className="container reference-location-grid">{locations.map(location => <Link to={`/location/pet-training-in-${location.slug}`} key={location.id}>
      <img src={location.image} alt={`Pawrexio pet training in ${location.city}`} loading="lazy" />
      <div><h2>{location.heading}</h2><p>{location.intro.slice(0, 190)}…</p><b>Explore Location <ArrowRight /></b></div>
    </Link>)}</div></section>
  </>
}

export function LocationDetail() {
  const { slug: routeSlug } = useParams()
  const slug = routeSlug?.replace(/^pet-training-in-/, '')
  const location = locations.find(item => item.slug === slug)
  if (!location) return null
  return <>
    <PageHero eyebrow="" title={location.heading || `Pet Training in ${location.city}`} text={location.intro} image={location.image} />
    <Breadcrumb items={[{ label: 'Locations', to: '/locations' }, { label: location.city }]} />
    <section className="section legacy-detail-section"><div className="container legacy-detail-grid">
      <aside className="legacy-detail-sidebar">
        <nav aria-label="Other locations"><h2>Other Locations</h2>{locations.filter(item => item.id !== location.id).map(item => <Link key={item.id} to={`/location/pet-training-in-${item.slug}`}>{item.city}</Link>)}</nav>
        <div className="detail-aside"><p className="eyebrow">Have Any Questions?</p><h3>Talk to Pawrexio</h3><p>Share your locality and your pet’s needs so we can confirm coverage and the right service.</p><a href={`tel:${siteSettings.phone}`}>{siteSettings.phone}</a><LeadButton location={location.city}>Book Your Service</LeadButton></div>
      </aside>
      <article className="legacy-package-main"><img className="legacy-package-image" src={location.image} alt={`Pawrexio pet training in ${location.city}`} /><Content blocks={location.blocks} /><div className="legacy-detail-actions"><LeadButton location={location.city}>Book Your Service</LeadButton><a className="button button-outline" href={`tel:${siteSettings.phone}`}>Call Now</a></div></article>
    </div></section>
  </>
}

export function Testimonials() {
  return <>
    <PageHero eyebrow="" title="Feedback" text="Share your experience with Pawrexio." />
    <section className="section reference-feedback"><div className="container reference-feedback-grid">
      <div><p className="eyebrow">Feedback</p><h1>Share Your Experience With Us</h1><p>Your feedback helps us continue improving the care and training support we provide to pets and their families.</p></div>
      <div className="reference-feedback-card"><h2>You can submit your feedback.</h2><p>Tell us your name, location and experience. Our team will collect the details securely through the existing enquiry form.</p><LeadButton service="Feedback">Submit Feedback</LeadButton></div>
    </div><div className="container feedback-review-grid">{testimonials.map((item,index)=><article className="feedback-review-card" key={item.id}><span aria-hidden="true">“</span><p>{item.quote}</p><footer><b>{item.name}</b><small>{item.location||item.pet}</small><em>0{index+1}</em></footer></article>)}</div></section>
  </>
}
