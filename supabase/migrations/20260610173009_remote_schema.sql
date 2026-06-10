drop extension if exists "pg_net";

create type "public"."theme_color" as enum ('Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Teal', 'Lime', 'Cyan', 'Gray', 'Black', 'White');

create type "public"."theme_tag" as enum ('SaaS', 'Minimal', 'Corporate', 'Brutalism', 'Light', 'Cyberpunk', 'Playful', 'Elegant', 'Modern', 'Vibrant', 'Retro', 'Clean', 'Dashboard', 'E-commerce', 'High Contrast', 'Pastel', 'Monochromatic', 'Professional', 'Startup', 'Agency', 'Glassmorphism', 'Neumorphism', 'Blog', 'Portfolio', 'Nature', 'Neon');

create type "public"."theme_tag_list" as enum ('SaaS', 'Minimal', 'Corporate', 'Cyberpunk', 'Playful', 'Elegant', 'Modern', 'Vibrant', 'Retro', 'Clean', 'Dashboard', 'E-commerce', 'High Contrast', 'Pastel', 'Monochromatic', 'Professional', 'Startup', 'Agency', 'Brutalism', 'Glassmorphism', 'Neumorphism', 'Blog', 'Portfolio', 'Gaming', 'Web3', 'Nature', 'Neon');


  create table "public"."themes" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "theme_code" jsonb not null,
    "is_public" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "overrides" text,
    "tags" public.theme_tag[] default '{}'::public.theme_tag[],
    "likes" smallint not null default '0'::smallint,
    "user_id" uuid not null,
    "liked_by" uuid[],
    "colors" public.theme_color[],
    "isDarkMode" boolean not null default false
      );


alter table "public"."themes" enable row level security;


  create table "public"."user" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text
      );


alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX themes_pkey ON public.themes USING btree (id);

CREATE UNIQUE INDEX user_name_key ON public."user" USING btree (name);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."themes" add constraint "themes_pkey" PRIMARY KEY using index "themes_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."themes" add constraint "themes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."themes" validate constraint "themes_user_id_fkey";

alter table "public"."user" add constraint "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user" validate constraint "user_id_fkey";

alter table "public"."user" add constraint "user_name_key" UNIQUE using index "user_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_user()
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  delete from auth.users where id = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.search_themes(search_term text, filter_color text)
 RETURNS SETOF public.themes
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT *
  FROM themes
  WHERE 
    -- 1. Exact Color Filter (if provided)
    (filter_color IS NULL OR filter_color = '' OR filter_color::theme_color = ANY(colors))
    
    AND
    -- 2. Partial Search across all string/array columns except id and user_id
    (
      search_term IS NULL OR search_term = '' OR
      name ILIKE '%' || search_term || '%' OR
      theme_code::TEXT ILIKE '%' || search_term || '%' OR
      COALESCE(overrides, '') ILIKE '%' || search_term || '%' OR
      tags::TEXT ILIKE '%' || search_term || '%' OR
      colors::TEXT ILIKE '%' || search_term || '%'
    );
END;
$function$
;

grant delete on table "public"."themes" to "anon";

grant insert on table "public"."themes" to "anon";

grant references on table "public"."themes" to "anon";

grant select on table "public"."themes" to "anon";

grant trigger on table "public"."themes" to "anon";

grant truncate on table "public"."themes" to "anon";

grant update on table "public"."themes" to "anon";

grant delete on table "public"."themes" to "authenticated";

grant insert on table "public"."themes" to "authenticated";

grant references on table "public"."themes" to "authenticated";

grant select on table "public"."themes" to "authenticated";

grant trigger on table "public"."themes" to "authenticated";

grant truncate on table "public"."themes" to "authenticated";

grant update on table "public"."themes" to "authenticated";

grant delete on table "public"."themes" to "service_role";

grant insert on table "public"."themes" to "service_role";

grant references on table "public"."themes" to "service_role";

grant select on table "public"."themes" to "service_role";

grant trigger on table "public"."themes" to "service_role";

grant truncate on table "public"."themes" to "service_role";

grant update on table "public"."themes" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


  create policy "Enable delete for users based on user_id"
  on "public"."themes"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for users based on user_id"
  on "public"."themes"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Public themes are viewable by everyone."
  on "public"."themes"
  as permissive
  for select
  to public
using ((is_public = true));



  create policy "Enable delete for users based on user_id"
  on "public"."user"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable insert for users based on user_id"
  on "public"."user"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable read access for all users"
  on "public"."user"
  as permissive
  for select
  to public
using (true);



