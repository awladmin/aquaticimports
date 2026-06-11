-- Private bucket for weekly stocklists. Files are NOT publicly readable —
-- access is gated by RLS via authenticated session + signed download URLs.
insert into storage.buckets (id, name, public)
values ('stocklists', 'stocklists', false)
on conflict (id) do nothing;

-- Any authenticated user can list and read objects in the bucket.
create policy "authenticated read stocklists"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'stocklists');

-- Only admins can upload, update, or delete.
create policy "admins upload stocklists"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'stocklists' and public.is_admin());

create policy "admins update stocklists"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'stocklists' and public.is_admin())
  with check (bucket_id = 'stocklists' and public.is_admin());

create policy "admins delete stocklists"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'stocklists' and public.is_admin());
