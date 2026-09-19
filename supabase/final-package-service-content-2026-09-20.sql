-- Targeted, idempotent Pawrexio package and service content update.
-- No inserts, deletes, reseeds, status changes, RLS changes, or URL changes.
begin;

update public.training_programs set
  title='Canine Behaviour Training', duration='4 Months', session_count='48 Sessions | 4 Months',
  price_from=50000, sale_price=46000, savings=4000, discount_label='',
  summary='Canine Behaviour Training — 48 Sessions | 4 Months.',
  inclusions=$json$["Excessive Barking Control","Jumping Control","Leash Pulling & Walking","Basic Obedience","Improved Listening Skills","Unwanted Habits Correction","Basic Socialisation","Impulse Control","Recall Training","Home Manners","Owner Guidance & Handling"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"Excessive Barking Control"},{"kind":"list","text":"Jumping Control"},{"kind":"list","text":"Leash Pulling & Walking"},{"kind":"list","text":"Basic Obedience"},{"kind":"list","text":"Improved Listening Skills"},{"kind":"list","text":"Unwanted Habits Correction"},{"kind":"list","text":"Basic Socialisation"},{"kind":"list","text":"Impulse Control"},{"kind":"list","text":"Recall Training"},{"kind":"list","text":"Home Manners"},{"kind":"list","text":"Owner Guidance & Handling"}]$json$::jsonb,
  updated_at=now()
where slug='canine-behaviour-training' and category='Dog Training';

update public.training_programs set
  title='Canine Behaviour Therapy (CBT)', duration='6 Months', session_count='72 Sessions | 6 Months',
  price_from=75000, sale_price=69000, savings=6000, discount_label='8% OFF',
  summary='Canine Behaviour Therapy — 72 Sessions | 6 Months.',
  inclusions=$json$["Aggression Management","Fear & Anxiety","Separation Problems","Excessive Barking","Leash Reactivity","Destructive Behaviour","Socialisation Problems","Hyperactivity Management","Impulse Control","Behaviour Modification","Owner Guidance & Handling","Regular Progress Checks"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"Aggression Management"},{"kind":"list","text":"Fear & Anxiety"},{"kind":"list","text":"Separation Problems"},{"kind":"list","text":"Excessive Barking"},{"kind":"list","text":"Leash Reactivity"},{"kind":"list","text":"Destructive Behaviour"},{"kind":"list","text":"Socialisation Problems"},{"kind":"list","text":"Hyperactivity Management"},{"kind":"list","text":"Impulse Control"},{"kind":"list","text":"Behaviour Modification"},{"kind":"list","text":"Owner Guidance & Handling"},{"kind":"list","text":"Regular Progress Checks"}]$json$::jsonb,
  updated_at=now()
where slug='canine-behavior-therapy-cbt' and category='Dog Training';

update public.training_programs set
  title='Kitten Training', duration='1 Month', session_count='12 Sessions | 1 Month', price_from=null, sale_price=8999, savings=null, discount_label='',
  inclusions=$json$["Litter Training","Basic Commands","Behavior Correction","Scratching Management","Play & Socialization","Diet & Care Guidance"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"Litter Training"},{"kind":"list","text":"Basic Commands"},{"kind":"list","text":"Behavior Correction"},{"kind":"list","text":"Scratching Management"},{"kind":"list","text":"Play & Socialization"},{"kind":"list","text":"Diet & Care Guidance"}]$json$::jsonb, updated_at=now()
where slug='kitten-training' and category='Cat Training';

update public.training_programs set
  title='Basic Cat Training', duration='24 Sessions', session_count='24 Sessions', price_from=null, sale_price=17999, savings=null, discount_label='',
  inclusions=$json$["Litter Training","Basic Commands","Behavior Correction","Scratching Management","Play & Socialization","Diet & Care Guidance","Problem Solving"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"Litter Training"},{"kind":"list","text":"Basic Commands"},{"kind":"list","text":"Behavior Correction"},{"kind":"list","text":"Scratching Management"},{"kind":"list","text":"Play & Socialization"},{"kind":"list","text":"Diet & Care Guidance"},{"kind":"list","text":"Problem Solving"}]$json$::jsonb, updated_at=now()
where slug='basic-cat-training' and category='Cat Training';

update public.training_programs set
  title='Smart Cat Training', duration='48 Sessions', session_count='48 Sessions', price_from=null, sale_price=34999, savings=null, discount_label='',
  inclusions=$json$["Advanced Commands","Behavior Modification","Litter & Hygiene Training","Scratching Management","Socialization & Confidence","Diet & Care Guidance","Problem Solving","Lifetime Support"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"Advanced Commands"},{"kind":"list","text":"Behavior Modification"},{"kind":"list","text":"Litter & Hygiene Training"},{"kind":"list","text":"Scratching Management"},{"kind":"list","text":"Socialization & Confidence"},{"kind":"list","text":"Diet & Care Guidance"},{"kind":"list","text":"Problem Solving"},{"kind":"list","text":"Lifetime Support"}]$json$::jsonb, updated_at=now()
where slug='smart-cat-training' and category='Cat Training';

update public.training_programs set title='Bath & Brush', duration='60–90 Minutes', session_count='60–90 Minutes', price_from=null, sale_price=1299, savings=null, discount_label='',
  inclusions=$json$["Premium Shampoo Bath","Conditioner","Full Blow Dry","Complete Brushing","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Hygiene Cleaning","Pet-Friendly Fragrance"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"What's Included"},{"kind":"list","text":"Premium Shampoo Bath"},{"kind":"list","text":"Conditioner"},{"kind":"list","text":"Full Blow Dry"},{"kind":"list","text":"Complete Brushing"},{"kind":"list","text":"Nail Clipping"},{"kind":"list","text":"Ear Cleaning"},{"kind":"list","text":"Eye Cleaning"},{"kind":"list","text":"Paw Cleaning"},{"kind":"list","text":"Hygiene Cleaning"},{"kind":"list","text":"Pet-Friendly Fragrance"},{"kind":"paragraph","text":"Suitable For: Cats & Dogs"},{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹1,299"},{"kind":"list","text":"Medium: ₹1,499"},{"kind":"list","text":"Large: ₹1,799"},{"kind":"list","text":"XL / Heavy Coat: ₹1,999+"},{"kind":"paragraph","text":"Additional charges may apply depending on breed, size and coat condition."}]$json$::jsonb, updated_at=now()
where slug='bath--brush' and category='Grooming';

update public.training_programs set title='Tick Treatment With Bath & Brush', duration='90–120 Minutes', session_count='90–120 Minutes', price_from=null, sale_price=1799, savings=null, discount_label='',
  inclusions=$json$["Anti-Tick & Flea Treatment","Medicated Bath","Tick Removal","Premium Shampoo","Conditioner","Full Blow Dry","Deep Brushing","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Hygiene Cleaning","Pet-Friendly Fragrance"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"What's Included"},{"kind":"list","text":"Anti-Tick & Flea Treatment"},{"kind":"list","text":"Medicated Bath"},{"kind":"list","text":"Tick Removal"},{"kind":"list","text":"Premium Shampoo"},{"kind":"list","text":"Conditioner"},{"kind":"list","text":"Full Blow Dry"},{"kind":"list","text":"Deep Brushing"},{"kind":"list","text":"Nail Clipping"},{"kind":"list","text":"Ear Cleaning"},{"kind":"list","text":"Eye Cleaning"},{"kind":"list","text":"Paw Cleaning"},{"kind":"list","text":"Hygiene Cleaning"},{"kind":"list","text":"Pet-Friendly Fragrance"},{"kind":"paragraph","text":"Suitable For: Cats & Dogs"},{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹1,799"},{"kind":"list","text":"Medium: ₹1,999"},{"kind":"list","text":"Large: ₹2,399"},{"kind":"list","text":"XL / Heavy Coat: ₹2,799+"},{"kind":"paragraph","text":"Additional charges may apply for severe tick/flea infestation or heavy coat conditions."}]$json$::jsonb, updated_at=now()
where slug='tick-treatment-with-bath-brush' and category='Grooming';

update public.training_programs set title='Haircut & Styling', duration='90–150 Minutes', session_count='90–150 Minutes', price_from=null, sale_price=2199, savings=null, discount_label='',
  inclusions=$json$["Premium Bath","Conditioner","Full Blow Dry","Complete Brushing","Full Body Haircut","Face & Head Styling","Paw Trimming","Sanitary / Hygiene Trimming","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Pet-Friendly Fragrance"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"What's Included"},{"kind":"list","text":"Premium Bath"},{"kind":"list","text":"Conditioner"},{"kind":"list","text":"Full Blow Dry"},{"kind":"list","text":"Complete Brushing"},{"kind":"list","text":"Full Body Haircut"},{"kind":"list","text":"Face & Head Styling"},{"kind":"list","text":"Paw Trimming"},{"kind":"list","text":"Sanitary / Hygiene Trimming"},{"kind":"list","text":"Nail Clipping"},{"kind":"list","text":"Ear Cleaning"},{"kind":"list","text":"Eye Cleaning"},{"kind":"list","text":"Paw Cleaning"},{"kind":"list","text":"Pet-Friendly Fragrance"},{"kind":"paragraph","text":"Suitable For: Cats & Dogs"},{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹2,199"},{"kind":"list","text":"Medium: ₹2,499"},{"kind":"list","text":"Large: ₹2,999"},{"kind":"list","text":"XL / Heavy & Long Coat: ₹3,499+"},{"kind":"paragraph","text":"Additional charges may apply for severe matting, extra-long coat or special grooming requirements."}]$json$::jsonb, updated_at=now()
where slug='haircut-styling' and category='Grooming';

update public.training_programs set title='30-Minute Walking', duration='30 Minutes, Morning + Evening', session_count='30-Minute Walk × 2 Daily', price_from=null, sale_price=8000, savings=null, discount_label='', summary='Morning and evening 30-minute walks, Monday to Saturday.',
  inclusions=$json$["Professional & Supervised Walking","Safe & Controlled Outdoor Exercise","Physical Exercise & Activity","Fresh Air & Mental Stimulation","Basic Behaviour Observation","Water Breaks When Required","Safe Return Home After Every Walk"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"3 Months: ₹24,000"},{"kind":"list","text":"6 Months: ₹48,000"},{"kind":"list","text":"1 Year: ₹96,000"}]$json$::jsonb, updated_at=now()
where slug='standard-dog-walking-package' and category='Dog Walking';

update public.training_programs set title='60-Minute Walking', duration='60 Minutes, Morning + Evening', session_count='60-Minute Walk × 2 Daily', price_from=null, sale_price=15000, savings=null, discount_label='', summary='Morning and evening 60-minute walks, Monday to Saturday.',
  inclusions=$json$["Professional & Supervised Walking","Safe & Controlled Outdoor Exercise","Physical Exercise & Activity","Fresh Air & Mental Stimulation","Basic Behaviour Observation","Water Breaks When Required","Safe Return Home After Every Walk"]$json$::jsonb,
  content=$json$[{"kind":"list","text":"3 Months: ₹45,000"},{"kind":"list","text":"6 Months: ₹90,000"},{"kind":"list","text":"1 Year: ₹1,80,000"}]$json$::jsonb, updated_at=now()
where slug='premium-dog-walking-package' and category='Dog Walking';

update public.training_programs set title='Dog Walking Service', duration='Morning + Evening', session_count='30 or 60 Minutes × 2 Daily', price_from=null, sale_price=8000, savings=null, discount_label='', summary='Give your dog a healthy, active and happy daily routine with our professional dog walking service.',
  inclusions=$json$["Professional & Supervised Walking","Safe & Controlled Outdoor Exercise","Physical Exercise & Activity","Fresh Air & Mental Stimulation","Basic Behaviour Observation","Water Breaks When Required","Safe Return Home After Every Walk"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"30-Minute Walking"},{"kind":"list","text":"₹8,000 / Month"},{"kind":"list","text":"3 Months: ₹24,000"},{"kind":"list","text":"6 Months: ₹48,000"},{"kind":"list","text":"1 Year: ₹96,000"},{"kind":"heading","text":"60-Minute Walking"},{"kind":"list","text":"₹15,000 / Month"},{"kind":"list","text":"3 Months: ₹45,000"},{"kind":"list","text":"6 Months: ₹90,000"},{"kind":"list","text":"1 Year: ₹1,80,000"}]$json$::jsonb, updated_at=now()
where slug='proffesional-dog-walker' and category='Dog Walking';

update public.services set duration='60–90 Minutes', suitable_for='Cats & Dogs', sale_price=1299,
  inclusions=$json$["Premium Shampoo Bath","Conditioner","Full Blow Dry","Complete Brushing","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Hygiene Cleaning","Pet-Friendly Fragrance"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹1,299"},{"kind":"list","text":"Medium: ₹1,499"},{"kind":"list","text":"Large: ₹1,799"},{"kind":"list","text":"XL / Heavy Coat: ₹1,999+"},{"kind":"paragraph","text":"Additional charges may apply depending on breed, size and coat condition."}]$json$::jsonb, updated_at=now()
where slug='bath-and-brush' and category='Grooming';

update public.services set duration='90–120 Minutes', suitable_for='Cats & Dogs', sale_price=1799,
  inclusions=$json$["Anti-Tick & Flea Treatment","Medicated Bath","Tick Removal","Premium Shampoo","Conditioner","Full Blow Dry","Deep Brushing","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Hygiene Cleaning","Pet-Friendly Fragrance"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹1,799"},{"kind":"list","text":"Medium: ₹1,999"},{"kind":"list","text":"Large: ₹2,399"},{"kind":"list","text":"XL / Heavy Coat: ₹2,799+"},{"kind":"paragraph","text":"Additional charges may apply for severe tick/flea infestation or heavy coat conditions."}]$json$::jsonb, updated_at=now()
where slug='tick-treatment-bath-brush' and category='Grooming';

update public.services set duration='90–150 Minutes', suitable_for='Cats & Dogs', sale_price=2199,
  inclusions=$json$["Premium Bath","Conditioner","Full Blow Dry","Complete Brushing","Full Body Haircut","Face & Head Styling","Paw Trimming","Sanitary / Hygiene Trimming","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Pet-Friendly Fragrance"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹2,199"},{"kind":"list","text":"Medium: ₹2,499"},{"kind":"list","text":"Large: ₹2,999"},{"kind":"list","text":"XL / Heavy & Long Coat: ₹3,499+"},{"kind":"paragraph","text":"Additional charges may apply for severe matting, extra-long coat or special grooming requirements."}]$json$::jsonb, updated_at=now()
where slug='haircut-and-styling' and category='Grooming';

update public.services set short_description='Give your dog a healthy, active and happy daily routine with our professional dog walking service.', description='Give your dog a healthy, active and happy daily routine with our professional dog walking service.', duration='30 or 60 minutes, morning and evening', suitable_for='Dogs needing consistent exercise', sale_price=8000,
  benefits=$json$["Professional & supervised walking","Safe & controlled outdoor exercise","Fresh air & mental stimulation"]$json$::jsonb,
  inclusions=$json$["Professional & Supervised Walking","Safe & Controlled Outdoor Exercise","Physical Exercise & Activity","Fresh Air & Mental Stimulation","Basic Behaviour Observation","Water Breaks When Required","Safe Return Home After Every Walk"]$json$::jsonb,
  content=$json$[{"kind":"heading","text":"30-Minute Walking"},{"kind":"paragraph","text":"Morning + Evening · 30-Minute Walk × 2 Daily"},{"kind":"list","text":"₹8,000 / Month"},{"kind":"list","text":"3 Months: ₹24,000"},{"kind":"list","text":"6 Months: ₹48,000"},{"kind":"list","text":"1 Year: ₹96,000"},{"kind":"heading","text":"60-Minute Walking"},{"kind":"paragraph","text":"Morning + Evening · 60-Minute Walk × 2 Daily"},{"kind":"list","text":"₹15,000 / Month"},{"kind":"list","text":"3 Months: ₹45,000"},{"kind":"list","text":"6 Months: ₹90,000"},{"kind":"list","text":"1 Year: ₹1,80,000"},{"kind":"heading","text":"Weekly Schedule"},{"kind":"list","text":"Monday to Saturday: Walking Service"},{"kind":"list","text":"Sunday: Weekly Off"},{"kind":"heading","text":"Important Note"},{"kind":"paragraph","text":"Each walking session is either 30 minutes or 60 minutes, depending on the selected plan. Morning and evening walks are provided on scheduled service days. Sunday is a weekly off day. Walking schedules may be adjusted according to the dog's routine, age and energy level."}]$json$::jsonb,
  updated_at=now()
where slug in ('dog-walking','professional-dog-walker') and category='Dog Walking';

commit;
