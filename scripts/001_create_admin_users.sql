-- Create admin_users table for admin authentication
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.admin_users enable row level security;

-- Allow authenticated users to read their own admin record
create policy "admin_users_select_own"
  on public.admin_users for select
  using (auth.uid() is not null and email = (select email from auth.users where id = auth.uid()));

-- Insert the admin user
insert into public.admin_users (email)
values ('brianonyango1605@gmail.com')
on conflict (email) do nothing;
