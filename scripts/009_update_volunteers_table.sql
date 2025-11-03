-- Add new columns to volunteers table
alter table public.volunteers
add column if not exists availability text,
add column if not exists interest text;
