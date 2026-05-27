-- ============================================================
-- HAFIZ AL FARIZ PORTFOLIO DATABASE
-- Single SQL file for schema, policies, storage, and seed data.
-- Run this once in Supabase SQL Editor.
-- ============================================================

create extension if not exists "pgcrypto";

-- 1) CORE TABLES
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null default 'Hafiz Al Fariz',
  headline text not null default 'Neobrutalist UI/UX Designer & Creative Student',
  school_info text not null default '',
  bio text not null default '',
  phone text not null default '',
  email text not null default 'hafizalfariz.support@gmail.com',
  address text not null default '',
  social_links jsonb not null default '{}'::jsonb
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  hero_badge text not null default 'Neobrutal Portfolio / UI UX',
  hero_title text not null default 'Hafiz Al Fariz builds bold visual systems with neobrutalist energy and clear UX flow.',
  hero_subtitle text not null default 'A tactile portfolio experience with thick borders, loud contrast, clear sections, and fast access to protected project assets.',
  about_title text not null default 'About Me',
  about_body text not null default 'I focus on building UI/UX presentations that feel bold, useful, and easy to scan. Every section uses clear hierarchy, strong contrast, and tactile visual blocks so viewers can understand the work quickly.',
  about_highlights jsonb not null default '["Neobrutal UI/UX", "Brand Identity", "Poster & Editorial"]'::jsonb,
  focus_title text not null default 'Software I Use',
  focus_items jsonb not null default '["Figma", "Adobe Photoshop", "Adobe Lightroom"]'::jsonb,
  software_stack jsonb not null default '[{"name":"Figma","icon_url":"https://cdn.simpleicons.org/figma/111111"},{"name":"Adobe Photoshop","icon_url":"https://cdn.simpleicons.org/adobephotoshop/111111"},{"name":"Adobe Lightroom","icon_url":"https://cdn.simpleicons.org/adobelightroomclassic/111111"}]'::jsonb,
  portfolio_drive_url text not null default '',
  contact_title text not null default 'Let’s build something bold, useful, and unmistakable.',
  contact_body text not null default 'Open for student collaborations, personal branding work, neobrutalist UI experiments, and selected digital design projects.'
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  description text not null default '',
  category text not null default 'Visual Design',
  year text not null default '',
  client_name text not null default 'Personal Project',
  image_url text not null default '',
  download_link text not null default '',
  cover_url text not null default '',
  asset_url text not null default '',
  cover_label text not null default 'Image 1 · Cover preview',
  asset_label text not null default 'Image 2 · Downloadable asset',
  gallery jsonb not null default '[]'::jsonb,
  featured boolean not null default false
);

create table if not exists public.project_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  created_at timestamptz not null default now(),
  file_url text not null default '',
  image_url text not null default '',
  label text,
  caption text,
  sort_order integer not null default 0
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.security_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  ip_address text not null default 'unknown',
  user_agent text not null default 'unknown',
  project_slug text,
  metadata jsonb not null default '{}'::jsonb
);

-- 2) SAFE COLUMN UPGRADES FOR OLD DATABASES
alter table public.profiles
  add column if not exists headline text not null default 'Neobrutalist UI/UX Designer & Creative Student',
  add column if not exists school_info text not null default '',
  add column if not exists bio text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists email text not null default 'hafizalfariz.support@gmail.com',
  add column if not exists address text not null default '',
  add column if not exists social_links jsonb not null default '{}'::jsonb;

alter table public.site_content
  add column if not exists hero_badge text not null default 'Neobrutal Portfolio / UI UX',
  add column if not exists hero_title text not null default 'Hafiz Al Fariz builds bold visual systems with neobrutalist energy and clear UX flow.',
  add column if not exists hero_subtitle text not null default 'A tactile portfolio experience with thick borders, loud contrast, clear sections, and fast access to protected project assets.',
  add column if not exists about_title text not null default 'About Me',
  add column if not exists about_body text not null default 'I focus on building UI/UX presentations that feel bold, useful, and easy to scan. Every section uses clear hierarchy, strong contrast, and tactile visual blocks so viewers can understand the work quickly.',
  add column if not exists about_highlights jsonb not null default '["Neobrutal UI/UX", "Brand Identity", "Poster & Editorial"]'::jsonb,
  add column if not exists focus_title text not null default 'Software I Use',
  add column if not exists focus_items jsonb not null default '["Figma", "Adobe Photoshop", "Adobe Lightroom"]'::jsonb,
  add column if not exists software_stack jsonb not null default '[{"name":"Figma","icon_url":"https://cdn.simpleicons.org/figma/111111"}]'::jsonb,
  add column if not exists portfolio_drive_url text not null default '',
  add column if not exists contact_title text not null default 'Let’s build something bold, useful, and unmistakable.',
  add column if not exists contact_body text not null default 'Open for student collaborations, personal branding work, neobrutalist UI experiments, and selected digital design projects.';

alter table public.projects
  add column if not exists title text not null default 'Untitled Project',
  add column if not exists slug text not null default gen_random_uuid()::text,
  add column if not exists image_url text not null default '',
  add column if not exists download_link text not null default '',
  add column if not exists summary text not null default '',
  add column if not exists year text not null default '',
  add column if not exists client_name text not null default 'Personal Project',
  add column if not exists cover_url text not null default '',
  add column if not exists asset_url text not null default '',
  add column if not exists cover_label text not null default 'Image 1 · Cover preview',
  add column if not exists asset_label text not null default 'Image 2 · Downloadable asset',
  add column if not exists gallery jsonb not null default '[]'::jsonb,
  add column if not exists featured boolean not null default false;

alter table public.project_assets
  add column if not exists file_url text not null default '',
  add column if not exists image_url text not null default '',
  add column if not exists label text,
  add column if not exists caption text,
  add column if not exists sort_order integer not null default 0;

-- Keep old project records compatible with the new UI.
update public.projects
set
  summary = case when summary = '' then left(description, 120) else summary end,
  year = case when year = '' then to_char(created_at, 'YYYY') else year end,
  client_name = case when client_name = '' then 'Personal Project' else client_name end,
  cover_url = case when cover_url = '' then image_url else cover_url end,
  asset_url = case when asset_url = '' then download_link else asset_url end;

update public.project_assets
set image_url = file_url
where image_url = '' and file_url <> '';

update public.project_assets
set file_url = image_url
where file_url = '' and image_url <> '';

create index if not exists projects_featured_idx on public.projects (featured desc, created_at desc);
create index if not exists project_assets_project_sort_idx on public.project_assets (project_id, sort_order, created_at);

-- Keep site_content intentionally as one row for faster reads.
delete from public.site_content
where ctid not in (select ctid from public.site_content order by created_at asc limit 1);

create unique index if not exists site_content_singleton_idx on public.site_content ((true));

-- 3) ADMIN HELPER
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

-- 4) RLS
alter table public.profiles enable row level security;
alter table public.site_content enable row level security;
alter table public.projects enable row level security;
alter table public.project_assets enable row level security;
alter table public.admin_users enable row level security;
alter table public.security_events enable row level security;

-- Clean duplicated/old policies so this file can be rerun safely.
drop policy if exists "Public can read profiles" on public.profiles;
drop policy if exists "public read profiles" on public.profiles;
drop policy if exists "Admins manage profiles" on public.profiles;
drop policy if exists "admins manage profiles" on public.profiles;

drop policy if exists "Public can read site content" on public.site_content;
drop policy if exists "public read site content" on public.site_content;
drop policy if exists "Admins manage site content" on public.site_content;
drop policy if exists "admins manage site content" on public.site_content;

drop policy if exists "Public can read projects" on public.projects;
drop policy if exists "public read projects" on public.projects;
drop policy if exists "Admins manage projects" on public.projects;
drop policy if exists "admins manage projects" on public.projects;

drop policy if exists "Public can read project assets" on public.project_assets;
drop policy if exists "Admins manage project assets" on public.project_assets;

drop policy if exists "Only admins read admin_users" on public.admin_users;
drop policy if exists "admins read admin users" on public.admin_users;
drop policy if exists "Only admins manage admin_users" on public.admin_users;

drop policy if exists "admins manage security events" on public.security_events;
drop policy if exists "service insert security events" on public.security_events;

create policy "Public can read profiles" on public.profiles for select to public using (true);
create policy "Public can read site content" on public.site_content for select to public using (true);
create policy "Public can read projects" on public.projects for select to public using (true);
create policy "Public can read project assets" on public.project_assets for select to public using (true);

create policy "Admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage site content" on public.site_content for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage project assets" on public.project_assets for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Only admins read admin_users" on public.admin_users for select to authenticated using (public.is_admin());
create policy "Only admins manage admin_users" on public.admin_users for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Admins read security events" on public.security_events for select to authenticated using (public.is_admin());
create policy "Service insert security events" on public.security_events for insert to public with check (true);

-- 5) STORAGE BUCKETS
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('project-assets', 'project-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public can view project images" on storage.objects;
drop policy if exists "Public can view project assets" on storage.objects;
drop policy if exists "Admins manage project images" on storage.objects;
drop policy if exists "Admins manage project assets" on storage.objects;
drop policy if exists "public read project-images" on storage.objects;
drop policy if exists "public read project-assets" on storage.objects;
drop policy if exists "admins manage project-images" on storage.objects;
drop policy if exists "admins manage project-assets" on storage.objects;

create policy "Public can view project images"
on storage.objects for select to public
using (bucket_id = 'project-images');

create policy "Public can view project assets"
on storage.objects for select to public
using (bucket_id = 'project-assets');

create policy "Admins manage project images"
on storage.objects for all to authenticated
using (bucket_id = 'project-images' and public.is_admin())
with check (bucket_id = 'project-images' and public.is_admin());

create policy "Admins manage project assets"
on storage.objects for all to authenticated
using (bucket_id = 'project-assets' and public.is_admin())
with check (bucket_id = 'project-assets' and public.is_admin());

-- 6) SEED / BRANDING UPDATE
insert into public.profiles (full_name, headline, school_info, bio, phone, email, address, social_links)
select
  'Hafiz Al Fariz',
  'Neobrutalist UI/UX Designer & Creative Student',
  'DKV Student · Metland School',
  'I build bold neobrutalist visuals, identity systems, and portfolio-grade digital experiences with strong contrast, tactile hierarchy, and clear UX flow.',
  '+62 812 3456 7890',
  'hafizalfariz.support@gmail.com',
  'Bekasi, Indonesia',
  jsonb_build_object(
    'ig', 'https://instagram.com/hafizalfariz',
    'tiktok', 'https://tiktok.com/@hafizalfariz',
    'youtube', 'https://youtube.com/@hafizalfariz',
    'behance', 'https://behance.net/hafizalfariz'
  )
where not exists (select 1 from public.profiles);

update public.profiles
set
  full_name = 'Hafiz Al Fariz',
  headline = case when headline = '' or headline ilike '%Visual Designer%' then 'Neobrutalist UI/UX Designer & Creative Student' else headline end,
  email = case when email = '' or email <> 'hafizalfariz.support@gmail.com' then 'hafizalfariz.support@gmail.com' else email end,
  social_links = coalesce(nullif(social_links, '{}'::jsonb), jsonb_build_object(
    'ig', 'https://instagram.com/hafizalfariz',
    'tiktok', 'https://tiktok.com/@hafizalfariz',
    'youtube', 'https://youtube.com/@hafizalfariz',
    'behance', 'https://behance.net/hafizalfariz'
  ))
where id in (select id from public.profiles order by created_at asc limit 1);

insert into public.site_content (
  hero_badge,
  hero_title,
  hero_subtitle,
  about_title,
  about_body,
  about_highlights,
  focus_title,
  focus_items,
  software_stack,
  portfolio_drive_url,
  contact_title,
  contact_body
)
select
  'Neobrutal Portfolio / UI UX',
  'Hafiz Al Fariz builds bold visual systems with neobrutalist energy and clear UX flow.',
  'A tactile portfolio experience with thick borders, loud contrast, clear sections, and fast access to protected project assets.',
  'About Me',
  'I focus on building UI/UX presentations that feel bold, useful, and easy to scan. Every section uses clear hierarchy, strong contrast, and tactile visual blocks so viewers can understand the work quickly.',
  '["Neobrutal UI/UX","Brand Identity","Poster & Editorial"]'::jsonb,
  'Software I Use',
  '["Figma","Adobe Photoshop","Adobe Lightroom"]'::jsonb,
  '[{"name":"Figma","icon_url":"https://cdn.simpleicons.org/figma/111111"},{"name":"Adobe Photoshop","icon_url":"https://cdn.simpleicons.org/adobephotoshop/111111"},{"name":"Adobe Lightroom","icon_url":"https://cdn.simpleicons.org/adobelightroomclassic/111111"}]'::jsonb,
  'https://example.com/portfolio-drive',
  'Let’s build something bold, useful, and unmistakable.',
  'Open for student collaborations, personal branding work, neobrutalist UI experiments, and selected digital design projects.'
where not exists (select 1 from public.site_content);

update public.site_content
set
  hero_badge = 'Neobrutal Portfolio / UI UX',
  hero_title = 'Hafiz Al Fariz builds bold visual systems with neobrutalist energy and clear UX flow.',
  hero_subtitle = 'A tactile portfolio experience with thick borders, loud contrast, clear sections, and fast access to protected project assets.',
  about_highlights = '["Neobrutal UI/UX","Brand Identity","Poster & Editorial"]'::jsonb,
  contact_title = 'Let’s build something bold, useful, and unmistakable.',
  contact_body = 'Open for student collaborations, personal branding work, neobrutalist UI experiments, and selected digital design projects.'
where id in (select id from public.site_content order by created_at asc limit 1);
