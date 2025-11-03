-- Create testimonials table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text not null,
  image_url text,
  rating integer default 5,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.testimonials enable row level security;

-- Allow everyone to view testimonials
create policy "testimonials_select_all"
  on public.testimonials for select
  using (true);

-- Allow authenticated admin users to insert testimonials
create policy "testimonials_insert_admin"
  on public.testimonials for insert
  with check (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to update testimonials
create policy "testimonials_update_admin"
  on public.testimonials for update
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete testimonials
create policy "testimonials_delete_admin"
  on public.testimonials for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );
