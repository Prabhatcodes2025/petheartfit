-- Pawrexio public-content completion. Safe to re-run against the existing production database.
begin;

-- Correct the approved feline package label without touching other cat records.
update public.training_programs
set title = 'Kitten Training', updated_at = now()
where slug = 'kitten-training' and category = 'Cat Training';

insert into public.blog_posts
  (title, slug, excerpt, content, category, published_at, featured_image_url, status, robots_index)
values
  ('Dog Training in Mumbai: Professional & Trusted Pet Training Services',
   'dog-training-in-mumbai-professional-trusted-services',
   'Practical training support for Mumbai pet parents, from puppy foundations and obedience to behaviour and leash skills.',
   '<p>Life in Mumbai brings busy homes, lifts, traffic, visitors and stimulating walks. A useful training plan prepares dogs for those everyday situations instead of focusing only on commands in a quiet room.</p><p>Puppy training can establish toilet routines, calm handling, social confidence and early leash manners. Adult dogs may need structured obedience, recall practice, impulse control or individual support for barking, fear and reactivity.</p><p>Professional dog training should be adapted to your dog''s age, breed, health, history and home environment. Pawrexio uses positive, practical methods and gives pet parents clear exercises to continue between sessions.</p><p>For availability in your neighbourhood, explore our Mumbai service area or share your locality with the Pawrexio team.</p>',
   'Dog Training', '2026-07-10T09:00:00Z', '/assets/real/outdoor-focus.webp', 'published', true),
  ('Pet Training for Happy, Obedient & Well-Behaved Pets',
   'pet-training-happy-obedient-well-behaved-pets',
   'How personalised, reward-based pet training builds clearer communication, confidence and dependable everyday habits.',
   '<p>Pet training is most effective when it improves daily life for both the animal and the family. Clear routines and consistent rewards help pets understand which choices work, while patient practice builds confidence.</p><p>A personalised plan can cover puppy foundations, dog obedience, leash training, cat home habits and behaviour concerns. The right starting point depends on age, temperament, learning history and the situations that are difficult now.</p><p>Short sessions are usually easier to repeat well. Practise one goal at a time, reward progress promptly and increase distraction only after the skill is understood.</p><p>Training is also pet-parent education. When everyone at home uses the same cues and boundaries, new habits become easier to maintain.</p>',
   'Pet Training', '2026-07-03T09:00:00Z', '/assets/real/training-session.webp', 'published', true),
  ('Puppy Obedience Classes: Build the Perfect Foundation for Your Dog',
   'puppy-obedience-classes-perfect-foundation',
   'Give your puppy an early foundation in household routines, communication, social confidence and essential cues.',
   '<p>The first months are an important learning period, but good puppy training is not about rushing. Begin with predictable sleep, feeding and toilet routines, then add short lessons that keep the puppy engaged and successful.</p><p>Useful early skills include responding to their name, coming when called, settling, gentle handling, bite inhibition and walking comfortably on a leash. Sit and stay matter, but calm everyday behaviour matters just as much.</p><p>Socialisation means safe, positive exposure to people, sounds, surfaces, places and suitable animals. Let the puppy observe at a comfortable distance and avoid forcing interaction when they are worried.</p><p>Puppy obedience classes work best when pet parents practise the same reward-based techniques at home. Consistency turns a lesson into a reliable life skill.</p>',
   'Puppy Training', '2026-06-26T09:00:00Z', '/assets/real/puppy-sit.webp', 'published', true)
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category = excluded.category,
  published_at = excluded.published_at,
  featured_image_url = excluded.featured_image_url,
  status = excluded.status,
  robots_index = excluded.robots_index,
  updated_at = now();

insert into public.testimonials
  (customer_name, location, content, rating, verified, active, sort_order)
select 'Mariyanus Beck', 'Gurgaon',
       'They trained my dog exceptionally well. The team was polite and professional, and my experience with them was really great.',
       5, true, true, 5
where not exists (select 1 from public.testimonials where customer_name = 'Mariyanus Beck');

insert into public.testimonials
  (customer_name, location, content, rating, verified, active, sort_order)
select 'Rubina Ekka', 'Noida',
       'Excellent dog training service. The trainers were professional, patient and genuinely cared about my dog''s progress.',
       5, true, true, 6
where not exists (select 1 from public.testimonials where customer_name = 'Rubina Ekka');

commit;
