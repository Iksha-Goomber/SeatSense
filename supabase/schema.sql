-- SeatSense database schema. Run in Supabase SQL Editor.
create extension if not exists "pgcrypto";
create table if not exists public.seats (
  id text primary key,
  floor integer not null check (floor > 0),
  zone text not null,
  type text not null check (type in ('Quiet','Standard','Window')),
  status text not null default 'available' check (status in ('available','occupied','reserved')),
  features text[] not null default '{}',
  updated_at timestamptz not null default now()
);
create table if not exists public.study_rooms (
  id text primary key,
  name text not null,
  floor integer not null,
  capacity integer not null check (capacity > 0),
  features text[] not null default '{}',
  status text not null default 'Available' check (status in ('Available','In use'))
);
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  resource_id text not null,
  resource_name text not null,
  resource_type text not null check (resource_type in ('Seat','Room')),
  booking_date date not null,
  start_time time not null,
  end_time time not null,
  student_name text not null,
  created_at timestamptz not null default now(),
  constraint valid_booking_time check (end_time > start_time)
);
create index if not exists bookings_resource_date_idx on public.bookings(resource_id, booking_date);
-- Demo-friendly RLS policies. For a real campus rollout, add authenticated user IDs,
-- verified student identities, booking limits, and admin-only inventory policies.
alter table public.seats enable row level security;
alter table public.study_rooms enable row level security;
alter table public.bookings enable row level security;
create policy "Anyone can view seats" on public.seats for select using (true);
create policy "Anyone can view rooms" on public.study_rooms for select using (true);
create policy "Anyone can view bookings" on public.bookings for select using (true);
create policy "Anyone can create demo bookings" on public.bookings for insert with check (true);
create policy "Anyone can cancel demo bookings" on public.bookings for delete using (true);
