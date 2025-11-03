-- Fix RLS policy for admin_users to allow proper authentication check
drop policy if exists "admin_users_select_own" on public.admin_users;

-- Allow any authenticated user to check if they are an admin
create policy "admin_users_select_authenticated"
  on public.admin_users for select
  using (auth.uid() is not null);
