export type Service = {
  id: string; slug: string; title: string; kicker: string; description: string;
  icon: string; duration: string; suitable: string; benefits: string[]; image: string;
  category: 'Dog Training'|'Cat Training'|'Grooming'|'Dog Walking'; includes?: string[]; content?: string[];
}

export type Program = {
  id: string; slug: string; title: string; level: string; duration: string;
  summary: string; includes: string[]; image: string; category: string; sessions?: string; price?: string;
}

export type Location = { id: string; slug: string; city: string; state: string; intro: string; heading?: string; content?: string[] }
export type BlogPost = { id: string; slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; content: string[] }
export type Testimonial = { id:string; name:string; location:string; pet?:string; quote:string }
