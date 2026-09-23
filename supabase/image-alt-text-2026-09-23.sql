-- Additive, legacy-safe image alt-text support for CMS records and static site media.
alter table public.services
  add column if not exists alt_text text,
  add column if not exists additional_image_alts jsonb not null default '[]'::jsonb;

alter table public.training_programs
  add column if not exists alt_text text,
  add column if not exists additional_image_alts jsonb not null default '[]'::jsonb;

alter table public.locations add column if not exists alt_text text;
alter table public.blog_posts add column if not exists alt_text text;
alter table public.gallery add column if not exists alt_text text;
alter table public.testimonials add column if not exists alt_text text;
alter table public.site_settings add column if not exists image_alt_texts jsonb not null default '{}'::jsonb;
