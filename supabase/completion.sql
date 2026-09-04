-- Run after schema.sql, or once on an existing Pawrexio database.
alter table public.services add column if not exists sale_price numeric(10,2), add column if not exists additional_images jsonb not null default '[]', add column if not exists related_slugs jsonb not null default '[]';
alter table public.training_programs add column if not exists sale_price numeric(10,2), add column if not exists additional_images jsonb not null default '[]', add column if not exists related_slugs jsonb not null default '[]', add column if not exists content jsonb not null default '[]';
alter table public.locations add column if not exists sort_order integer not null default 0;
alter table public.blog_posts add column if not exists category text, add column if not exists author_name text;
alter table public.gallery add column if not exists media_type text not null default 'image' check(media_type in ('image','video')), add column if not exists poster_url text;
alter table public.enquiries add column if not exists source text not null default 'website', add column if not exists originating_page text, add column if not exists package_slug text;
create index if not exists enquiries_followup_idx on public.enquiries(follow_up_at) where follow_up_at is not null;
create index if not exists enquiries_source_idx on public.enquiries(source,city);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('media','media',true,26214400,array['image/jpeg','image/png','image/webp','video/mp4']) on conflict(id) do update set file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
-- Prevent non-staff uploads regardless of client behaviour. Existing storage RLS remains active.
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;
do $$ declare t text; begin foreach t in array array['services','training_programs','locations','blog_posts','gallery','testimonials','seo_metadata','site_settings','enquiries'] loop
execute format('drop policy if exists "admin delete restriction" on public.%I',t);
execute format('create policy "admin delete restriction" on public.%I as restrictive for delete to authenticated using (public.is_admin())',t);
end loop;end $$;
