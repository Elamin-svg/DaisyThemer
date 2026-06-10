
  create policy "Enable insert for authenticated users only"
  on "public"."themes"
  as permissive
  for update
  to authenticated
using (true);



