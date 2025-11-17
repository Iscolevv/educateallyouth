-- Create learning_posts table
create table if not exists public.learning_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image_url text,
  category text not null,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.learning_posts enable row level security;

-- Allow everyone to view published posts
create policy "learning_posts_select_published"
  on public.learning_posts for select
  using (published = true);

-- Allow authenticated admin users to view all posts
create policy "learning_posts_select_admin"
  on public.learning_posts for select
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to insert posts
create policy "learning_posts_insert_admin"
  on public.learning_posts for insert
  with check (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to update posts
create policy "learning_posts_update_admin"
  on public.learning_posts for update
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Allow authenticated admin users to delete posts
create policy "learning_posts_delete_admin"
  on public.learning_posts for delete
  using (
    auth.uid() is not null and 
    exists (
      select 1 from public.admin_users 
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Create index for better query performance
create index if not exists idx_learning_posts_published on public.learning_posts(published);
create index if not exists idx_learning_posts_category on public.learning_posts(category);
create index if not exists idx_learning_posts_created_at on public.learning_posts(created_at desc);
