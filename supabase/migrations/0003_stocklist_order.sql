-- Manual sort positions for stocklists, set by admin drag-and-drop.
-- Files without a row sort above positioned files (newest-first by upload date);
-- files with a row sort below in the admin's manual order.
create table public.stocklist_order (
  name text primary key,
  position double precision not null,
  updated_at timestamptz not null default now()
);

create index stocklist_order_position_idx
  on public.stocklist_order (position);

alter table public.stocklist_order enable row level security;

create policy "authenticated read stocklist_order"
  on public.stocklist_order for select
  to authenticated
  using (true);

create policy "admins write stocklist_order"
  on public.stocklist_order for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
