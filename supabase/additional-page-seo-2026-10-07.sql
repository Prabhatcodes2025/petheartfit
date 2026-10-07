-- Ensure these five existing public routes have editable SEO rows.
-- Current public fallbacks are used only for new rows; existing custom SEO is preserved.
insert into public.seo_metadata (page_key, meta_title, meta_description, robots_index)
values
  ('/services', 'Pet Training & Care Services | Pawrexio', 'Explore dog training, cat training, grooming, dog walking and behaviour support from Pawrexio.', true),
  ('/terms', 'Terms & Conditions | Pawrexio', 'Read the terms that apply to Pawrexio enquiries, appointments and pet training or care services.', true),
  ('/packages', 'Pet Training Packages | Pawrexio', 'Compare puppy, basic, intermediate, smart, advanced and master pet training packages.', true),
  ('/packages/premium-dog-walking-package', '60-Minute Walking Package | Pawrexio', 'Morning and evening 60-minute walks, Monday to Saturday.', true),
  ('/packages/kitten-training', 'Kitten Training Package | Pawrexio', 'Personalised kitten training with structured sessions and practical pet-parent guidance.', true)
on conflict (page_key) do nothing;
