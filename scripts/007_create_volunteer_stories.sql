-- Create volunteer_stories table for the "Share Your Impact" platform
create table if not exists public.volunteer_stories (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text,
  project_title text not null,
  location text not null,
  activity_date date not null,
  description text not null,
  category text not null,
  image_urls text[] default '{}'::text[],
  consent_given boolean default false,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.volunteer_stories enable row level security;

-- Policy: Anyone can view approved volunteer stories
create policy "Anyone can view approved stories"
  on public.volunteer_stories for select
  using (status = 'approved' or auth.role() = 'authenticated');

-- Policy: Anyone can submit volunteer stories
create policy "Anyone can submit stories"
  on public.volunteer_stories for insert
  with check (true);

-- Policy: Admin can manage all stories
create policy "Authenticated users can manage stories"
  on public.volunteer_stories for all
  using (auth.role() = 'authenticated');

-- Create index for faster queries
create index idx_volunteer_stories_status on public.volunteer_stories(status);
create index idx_volunteer_stories_created_at on public.volunteer_stories(created_at desc);
