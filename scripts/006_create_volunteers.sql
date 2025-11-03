-- Create volunteers table to store volunteer form submissions
create table if not exists public.volunteers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.volunteers enable row level security;

-- Allow anyone to insert volunteer submissions
create policy "volunteers_insert_all"
  on public.volunteers for insert
  with check (true);

-- Allow authenticated admin users to view volunteer submissions
create policy "volunteers_select_admin"
  on public.volunteers for select
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete volunteer submissions
create policy "volunteers_delete_admin"
  on public.volunteers for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );
