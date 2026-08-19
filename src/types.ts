export type Service = {
  id: string; slug: string; title: string; kicker: string; description: string;
  icon: string; duration: string; suitable: string; benefits: string[]; image: string;
}

export type Program = {
  id: string; slug: string; title: string; level: string; duration: string;
  summary: string; includes: string[]; image: string;
}

export type Location = { id: string; slug: string; city: string; state: string; intro: string }
export type BlogPost = { id: string; slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; content: string[] }
