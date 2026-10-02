-- Ensure the seven existing top-level pages have editable SEO rows.
-- Values mirror the current Seo.tsx fallbacks; existing admin customisations
-- are preserved by the page_key conflict handler.
insert into public.seo_metadata (page_key, meta_title, meta_description, robots_index)
values
  ('/', 'Pawrexio | Professional Pet Training & Pet Care', 'Positive dog training, puppy training, cat training, grooming and dog walking for happier pets and stronger family bonds.', true),
  ('/about', 'About Pawrexio | Positive Pet Training & Care', 'Learn about Pawrexio’s personalised approach to pet training, behaviour guidance and everyday care.', true),
  ('/contact', 'Contact Pawrexio | Pet Training Enquiry', 'Tell Pawrexio about your pet, location and training or care needs.', true),
  ('/blog', 'Pet Training Blog & Guides | Pawrexio', 'Practical guidance for puppy training, dog behaviour, leash walking, grooming and cat care.', true),
  ('/locations', 'Pet Training Locations in India | Pawrexio', 'Find active Pawrexio training, behaviour, grooming and dog-walking service areas.', true),
  ('/gallery', 'Pet Training Gallery | Pawrexio', 'See Pawrexio pet training, puppy, cat and care sessions.', true),
  ('/feedback', 'Pet Parent Feedback | Pawrexio', 'Read pet-parent feedback about Pawrexio training and care.', true)
on conflict (page_key) do nothing;
