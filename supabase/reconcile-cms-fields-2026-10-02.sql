-- Add the three persisted fields exposed by the Services admin editor but
-- absent from the checked-in services table definition and prior migrations.
-- These additions are safe to rerun and preserve all existing records.
alter table public.services
  add column if not exists discount_label text,
  add column if not exists rating numeric(2,1),
  add column if not exists savings numeric(10,2);

-- Read-only verification: each mapped database column used by these CMS forms
-- is returned with present=false if it is missing in the current database.
with expected(table_name, column_name) as (
  values
    ('services','title'),('services','slug'),('services','category'),('services','kicker'),
    ('services','short_description'),('services','description'),('services','content'),
    ('services','image_url'),('services','alt_text'),('services','duration'),('services','session_count'),
    ('services','price_from'),('services','sale_price'),('services','discount_label'),('services','rating'),('services','savings'),
    ('services','inclusions'),('services','additional_images'),('services','additional_image_alts'),('services','related_slugs'),
    ('services','sort_order'),('services','status'),('services','seo_title'),('services','seo_description'),
    ('services','canonical_url'),('services','og_image_url'),('services','robots_index'),
    ('training_programs','title'),('training_programs','slug'),('training_programs','category'),('training_programs','level'),
    ('training_programs','image_url'),('training_programs','alt_text'),('training_programs','duration'),('training_programs','session_count'),
    ('training_programs','price_from'),('training_programs','sale_price'),('training_programs','discount_label'),('training_programs','rating'),
    ('training_programs','savings'),('training_programs','inclusions'),('training_programs','additional_images'),
    ('training_programs','additional_image_alts'),('training_programs','related_slugs'),('training_programs','sort_order'),
    ('training_programs','status'),('training_programs','seo_title'),('training_programs','seo_description'),
    ('training_programs','canonical_url'),('training_programs','og_image_url'),('training_programs','robots_index'),
    ('training_programs','summary'),('training_programs','description'),('training_programs','benefits'),('training_programs','content'),
    ('blog_posts','title'),('blog_posts','slug'),('blog_posts','excerpt'),('blog_posts','content'),('blog_posts','category'),
    ('blog_posts','tags'),('blog_posts','author_name'),('blog_posts','published_at'),('blog_posts','featured_image_url'),
    ('blog_posts','alt_text'),('blog_posts','status'),('blog_posts','seo_title'),('blog_posts','seo_description'),
    ('blog_posts','canonical_url'),('blog_posts','og_image_url'),('blog_posts','robots_index'),
    ('locations','city'),('locations','state'),('locations','slug'),('locations','heading'),('locations','intro'),
    ('locations','content'),('locations','image_url'),('locations','alt_text'),('locations','available_services'),
    ('locations','sort_order'),('locations','active'),('locations','seo_title'),('locations','seo_description'),
    ('locations','canonical_url'),('locations','og_image_url'),('locations','robots_index'),
    ('gallery','title'),('gallery','image_url'),('gallery','alt_text'),('gallery','media_type'),('gallery','poster_url'),
    ('gallery','caption'),('gallery','category'),('gallery','sort_order'),('gallery','active'),
    ('testimonials','customer_name'),('testimonials','pet_name'),('testimonials','location'),('testimonials','content'),
    ('testimonials','rating'),('testimonials','image_url'),('testimonials','alt_text'),('testimonials','verified'),('testimonials','active'),('testimonials','sort_order'),
    ('site_settings','site_title'),('site_settings','tagline'),('site_settings','public_email'),('site_settings','phone'),
    ('site_settings','alternate_phone'),('site_settings','whatsapp_number'),('site_settings','address'),('site_settings','footer_text'),
    ('site_settings','image_alt_texts'),('site_settings','default_meta_title'),('site_settings','default_meta_description'),
    ('site_settings','default_og_image_url'),('site_settings','social_links')
)
select e.table_name, e.column_name, (c.column_name is not null) as present
from expected e
left join information_schema.columns c
  on c.table_schema = 'public'
 and c.table_name = e.table_name
 and c.column_name = e.column_name
order by e.table_name, e.column_name;
