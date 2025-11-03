-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  status text default 'completed',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.projects enable row level security;

-- Allow everyone to view projects
create policy "projects_select_all"
  on public.projects for select
  using (true);

-- Allow authenticated admin users to insert projects
create policy "projects_insert_admin"
  on public.projects for insert
  with check (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to update projects
create policy "projects_update_admin"
  on public.projects for update
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete projects
create policy "projects_delete_admin"
  on public.projects for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );
