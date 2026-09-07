-- Apply once to the existing Pawrexio production database. Safe to re-run.
begin;

-- Keep every record, but publish only the approved Dog Training collection.
update public.training_programs
set status = 'draft'
where category = 'Dog Training'
  and slug not in (
    'puppy-training',
    'basic-training-for-dog',
    'intermediate-dog-training',
    'smart-training-for-dog',
    'advanced-training-for-dog',
    'master-training-for-dog',
    'canine-behaviour-training',
    'canine-behavior-therapy-cbt'
  );

with approved(slug, title, sort_order) as (values
  ('puppy-training', 'Puppy Training', 1),
  ('basic-training-for-dog', 'Basic Training', 2),
  ('intermediate-dog-training', 'Intermediate Training', 3),
  ('smart-training-for-dog', 'Smart Training', 4),
  ('advanced-training-for-dog', 'Advanced Training', 5),
  ('master-training-for-dog', 'Master Training', 6),
  ('canine-behaviour-training', 'Canine Behaviour Training', 7),
  ('canine-behavior-therapy-cbt', 'Canine Behaviour Therapy Training (CBT)', 8)
)
update public.training_programs as program
set title = approved.title,
    sort_order = approved.sort_order,
    status = 'published'
from approved
where program.slug = approved.slug
  and program.category = 'Dog Training';

update public.training_programs
set duration = '4 Months',
    session_count = '48 Sessions | 4 Months',
    inclusions = '["Excessive Barking","Jumping","Leash Pulling","Basic Obedience","Poor Listening","Unwanted Habits","Basic Socialisation","Impulse Control","Recall Training","Home Manners","Owner Guidance"]'::jsonb,
    content = '[{"kind":"list","text":"Excessive Barking"},{"kind":"list","text":"Jumping"},{"kind":"list","text":"Leash Pulling"},{"kind":"list","text":"Basic Obedience"},{"kind":"list","text":"Poor Listening"},{"kind":"list","text":"Unwanted Habits"},{"kind":"list","text":"Basic Socialisation"},{"kind":"list","text":"Impulse Control"},{"kind":"list","text":"Recall Training"},{"kind":"list","text":"Home Manners"},{"kind":"list","text":"Owner Guidance"}]'::jsonb
where slug = 'canine-behaviour-training'
  and category = 'Dog Training';

update public.training_programs
set duration = '6 Months',
    session_count = '72 Sessions | 6 Months',
    inclusions = '["Aggression","Fear & Anxiety","Separation Problems","Excessive Barking","Leash Reactivity","Destructive Behaviour","Socialisation Problems","Hyperactivity","Impulse Control","Behaviour Modification","Owner Guidance","Regular Progress Check"]'::jsonb,
    content = '[{"kind":"list","text":"Aggression"},{"kind":"list","text":"Fear & Anxiety"},{"kind":"list","text":"Separation Problems"},{"kind":"list","text":"Excessive Barking"},{"kind":"list","text":"Leash Reactivity"},{"kind":"list","text":"Destructive Behaviour"},{"kind":"list","text":"Socialisation Problems"},{"kind":"list","text":"Hyperactivity"},{"kind":"list","text":"Impulse Control"},{"kind":"list","text":"Behaviour Modification"},{"kind":"list","text":"Owner Guidance"},{"kind":"list","text":"Regular Progress Check"}]'::jsonb
where slug = 'canine-behavior-therapy-cbt'
  and category = 'Dog Training';

-- Update the three approved Cat Training records; retain all other cat rows as drafts.
update public.training_programs
set status = 'draft'
where category = 'Cat Training'
  and slug not in ('kitten-training', 'basic-cat-training', 'smart-cat-training');

update public.training_programs
set title = 'Puppy Training',
    duration = '1 Month',
    session_count = '12 Sessions | 1 Month',
    price_from = 8999,
    sale_price = null,
    inclusions = '["Litter Training","Basic Commands","Behavior Correction","Scratching Management","Play & Socialization","Diet & Care Guidance"]'::jsonb,
    content = '[{"kind":"list","text":"Litter Training"},{"kind":"list","text":"Basic Commands"},{"kind":"list","text":"Behavior Correction"},{"kind":"list","text":"Scratching Management"},{"kind":"list","text":"Play & Socialization"},{"kind":"list","text":"Diet & Care Guidance"}]'::jsonb,
    sort_order = 9,
    status = 'published'
where slug = 'kitten-training'
  and category = 'Cat Training';

update public.training_programs
set title = 'Basic Training',
    duration = '2 Months',
    session_count = '24 Sessions',
    price_from = 17999,
    sale_price = null,
    inclusions = '["Litter Training","Basic Commands","Behavior Correction","Scratching Management","Play & Socialization","Diet & Care Guidance","Problem Solving"]'::jsonb,
    content = '[{"kind":"list","text":"Litter Training"},{"kind":"list","text":"Basic Commands"},{"kind":"list","text":"Behavior Correction"},{"kind":"list","text":"Scratching Management"},{"kind":"list","text":"Play & Socialization"},{"kind":"list","text":"Diet & Care Guidance"},{"kind":"list","text":"Problem Solving"}]'::jsonb,
    sort_order = 10,
    status = 'published'
where slug = 'basic-cat-training'
  and category = 'Cat Training';

update public.training_programs
set title = 'Smart Training',
    duration = '4 Months',
    session_count = '48 Sessions',
    price_from = 34999,
    sale_price = null,
    inclusions = '["Advanced Commands","Behavior Modification","Litter & Hygiene Training","Scratching Management","Socialization & Confidence","Diet & Care Guidance","Problem Solving","Lifetime Support"]'::jsonb,
    content = '[{"kind":"list","text":"Advanced Commands"},{"kind":"list","text":"Behavior Modification"},{"kind":"list","text":"Litter & Hygiene Training"},{"kind":"list","text":"Scratching Management"},{"kind":"list","text":"Socialization & Confidence"},{"kind":"list","text":"Diet & Care Guidance"},{"kind":"list","text":"Problem Solving"},{"kind":"list","text":"Lifetime Support"}]'::jsonb,
    sort_order = 11,
    status = 'published'
where slug = 'smart-cat-training'
  and category = 'Cat Training';

commit;
