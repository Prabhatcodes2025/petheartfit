-- Add navigation to the existing singleton settings record. NULL deliberately
-- means “not configured”, allowing the bundled menu to remain a true fallback.
alter table public.site_settings
  add column if not exists header_navigation jsonb;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'site_settings_header_navigation_array'
      and conrelid = 'public.site_settings'::regclass
  ) then
    alter table public.site_settings
      add constraint site_settings_header_navigation_array
      check (header_navigation is null or jsonb_typeof(header_navigation) = 'array');
  end if;
end $$;
