-- Create creative_submissions table for youth-generated content
create table if not exists public.creative_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_name text not null,
  author_email text not null,
  author_phone text,
  author_bio text,
  author_instagram text,
  category text not null,
  image_url text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.creative_submissions enable row level security;

-- Allow everyone to view published submissions
create policy "creative_submissions_select_published"
  on public.creative_submissions for select
  using (published = true);

-- Allow authenticated admin users to view all submissions
create policy "creative_submissions_select_admin"
  on public.creative_submissions for select
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow anyone to insert submissions
create policy "creative_submissions_insert_public"
  on public.creative_submissions for insert
  with check (true);

-- Allow authenticated admin users to update submissions
create policy "creative_submissions_update_admin"
  on public.creative_submissions for update
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete submissions
create policy "creative_submissions_delete_admin"
  on public.creative_submissions for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Create indexes for better performance
create index if not exists idx_creative_submissions_published on public.creative_submissions(published);
create index if not exists idx_creative_submissions_category on public.creative_submissions(category);
create index if not exists idx_creative_submissions_created_at on public.creative_submissions(created_at desc);
