-- Create news_events table
create table if not exists public.news_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image_url text,
  event_date timestamp with time zone,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.news_events enable row level security;

-- Allow everyone to view published news/events
create policy "news_events_select_published"
  on public.news_events for select
  using (published = true);

-- Allow authenticated admin users to view all news/events
create policy "news_events_select_admin"
  on public.news_events for select
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to insert news/events
create policy "news_events_insert_admin"
  on public.news_events for insert
  with check (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to update news/events
create policy "news_events_update_admin"
  on public.news_events for update
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete news/events
create policy "news_events_delete_admin"
  on public.news_events for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );
