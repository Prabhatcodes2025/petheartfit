-- Safe, targeted ordering update. No package content is changed or reseeded.
update public.training_programs
set sort_order = case slug
  when 'puppy-training' then 1
  when 'basic-training-for-dog' then 2
  when 'intermediate-dog-training' then 3
  when 'smart-training-for-dog' then 4
  when 'advanced-training-for-dog' then 5
  when 'master-training-for-dog' then 6
  when 'canine-behaviour-training' then 7
  when 'canine-behavior-therapy-cbt' then 8
end,
updated_at = now()
where category = 'Dog Training'
  and slug in (
    'puppy-training',
    'basic-training-for-dog',
    'intermediate-dog-training',
    'smart-training-for-dog',
    'advanced-training-for-dog',
    'master-training-for-dog',
    'canine-behaviour-training',
    'canine-behavior-therapy-cbt'
  );
