-- Roles for the application. 'admin' = Rob/Annie. 'trade' = customer.
create type public.user_role as enum ('admin', 'trade');

-- One row per auth user. Holds the application-side role + display name.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'trade',
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- SECURITY DEFINER helper to check the current user's role without
-- triggering RLS recursion on the profiles policies.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Read: a user can always read their own profile; admins can read all.
create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- Write: only admins can update profiles (e.g., promote users, change names).
create policy "admins update profiles"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

-- Auto-create a profile row whenever an auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
