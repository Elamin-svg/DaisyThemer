


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."theme_color" AS ENUM (
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Pink',
    'Purple',
    'Orange',
    'Teal',
    'Lime',
    'Cyan',
    'Gray',
    'Black',
    'White'
);


ALTER TYPE "public"."theme_color" OWNER TO "postgres";


CREATE TYPE "public"."theme_tag" AS ENUM (
    'SaaS',
    'Minimal',
    'Corporate',
    'Brutalism',
    'Light',
    'Cyberpunk',
    'Playful',
    'Elegant',
    'Modern',
    'Vibrant',
    'Retro',
    'Clean',
    'Dashboard',
    'E-commerce',
    'High Contrast',
    'Pastel',
    'Monochromatic',
    'Professional',
    'Startup',
    'Agency',
    'Glassmorphism',
    'Neumorphism',
    'Blog',
    'Portfolio',
    'Nature',
    'Neon'
);


ALTER TYPE "public"."theme_tag" OWNER TO "postgres";


CREATE TYPE "public"."theme_tag_list" AS ENUM (
    'SaaS',
    'Minimal',
    'Corporate',
    'Cyberpunk',
    'Playful',
    'Elegant',
    'Modern',
    'Vibrant',
    'Retro',
    'Clean',
    'Dashboard',
    'E-commerce',
    'High Contrast',
    'Pastel',
    'Monochromatic',
    'Professional',
    'Startup',
    'Agency',
    'Brutalism',
    'Glassmorphism',
    'Neumorphism',
    'Blog',
    'Portfolio',
    'Gaming',
    'Web3',
    'Nature',
    'Neon'
);


ALTER TYPE "public"."theme_tag_list" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_user"() RETURNS "void"
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
  delete from auth.users where id = auth.uid();
$$;


ALTER FUNCTION "public"."delete_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."themes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "theme_code" "jsonb" NOT NULL,
    "is_public" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "overrides" "text",
    "tags" "public"."theme_tag"[] DEFAULT '{}'::"public"."theme_tag"[],
    "likes" smallint DEFAULT '0'::smallint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "liked_by" "uuid"[],
    "colors" "public"."theme_color"[],
    "isDarkMode" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."themes" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_themes"("search_term" "text", "filter_color" "text") RETURNS SETOF "public"."themes"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."search_themes"("search_term" "text", "filter_color" "text") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text"
);


ALTER TABLE "public"."user" OWNER TO "postgres";


ALTER TABLE ONLY "public"."themes"
    ADD CONSTRAINT "themes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."themes"
    ADD CONSTRAINT "themes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Enable delete for users based on user_id" ON "public"."themes" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."user" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."themes" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."user" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable read access for all users" ON "public"."user" FOR SELECT USING (true);



CREATE POLICY "Public themes are viewable by everyone." ON "public"."themes" FOR SELECT USING (("is_public" = true));



ALTER TABLE "public"."themes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."delete_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "service_role";



GRANT ALL ON TABLE "public"."themes" TO "anon";
GRANT ALL ON TABLE "public"."themes" TO "authenticated";
GRANT ALL ON TABLE "public"."themes" TO "service_role";



GRANT ALL ON FUNCTION "public"."search_themes"("search_term" "text", "filter_color" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."search_themes"("search_term" "text", "filter_color" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_themes"("search_term" "text", "filter_color" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


