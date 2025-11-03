-- Create gallery table
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.gallery enable row level security;

-- Allow everyone to view gallery images
create policy "gallery_select_all"
  on public.gallery for select
  using (true);

-- Allow authenticated admin users to insert gallery images
create policy "gallery_insert_admin"
  on public.gallery for insert
  with check (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete gallery images
create policy "gallery_delete_admin"
  on public.gallery for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );
