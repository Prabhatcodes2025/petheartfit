-- Apply to the existing Pawrexio production database. Safe to re-run.
begin;

update public.services
set price_from = 1299,
    sale_price = null,
    duration = '60–90 Minutes',
    suitable_for = 'Cats & Dogs',
    inclusions = '["Premium Shampoo Bath","Conditioner","Full Blow Dry","Complete Brushing","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Hygiene Cleaning","Pet-Friendly Fragrance"]'::jsonb,
    content = '[{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹1,299"},{"kind":"list","text":"Medium: ₹1,499"},{"kind":"list","text":"Large: ₹1,799"},{"kind":"list","text":"XL / Heavy Coat: ₹1,999+"},{"kind":"paragraph","text":"Additional charges may apply depending on breed, size and coat condition."}]'::jsonb,
    updated_at = now()
where slug = 'bath-and-brush'
  and category = 'Grooming';

update public.services
set price_from = 1799,
    sale_price = null,
    duration = '90–120 Minutes',
    suitable_for = 'Cats & Dogs',
    inclusions = '["Anti-Tick & Flea Treatment","Medicated Bath","Tick Removal","Premium Shampoo","Conditioner","Full Blow Dry","Deep Brushing","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Hygiene Cleaning","Pet-Friendly Fragrance"]'::jsonb,
    content = '[{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹1,799"},{"kind":"list","text":"Medium: ₹1,999"},{"kind":"list","text":"Large: ₹2,399"},{"kind":"list","text":"XL / Heavy Coat: ₹2,799+"},{"kind":"paragraph","text":"Additional charges may apply for severe tick/flea infestation or heavy coat conditions."}]'::jsonb,
    updated_at = now()
where slug = 'tick-treatment-bath-brush'
  and category = 'Grooming';

update public.services
set price_from = 2199,
    sale_price = null,
    duration = '90–150 Minutes',
    suitable_for = 'Cats & Dogs',
    inclusions = '["Premium Bath","Conditioner","Full Blow Dry","Complete Brushing","Full Body Haircut","Face & Head Styling","Paw Trimming","Sanitary / Hygiene Trimming","Nail Clipping","Ear Cleaning","Eye Cleaning","Paw Cleaning","Pet-Friendly Fragrance"]'::jsonb,
    content = '[{"kind":"heading","text":"Breed/Size Pricing"},{"kind":"list","text":"Small: ₹2,199"},{"kind":"list","text":"Medium: ₹2,499"},{"kind":"list","text":"Large: ₹2,999"},{"kind":"list","text":"XL / Heavy & Long Coat: ₹3,499+"},{"kind":"paragraph","text":"Additional charges may apply for severe matting, extra-long coat or special grooming requirements."}]'::jsonb,
    updated_at = now()
where slug = 'haircut-and-styling'
  and category = 'Grooming';

commit;
