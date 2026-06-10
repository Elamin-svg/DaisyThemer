import { createServerFn } from '@tanstack/react-start';
import { createSupabaseServerClient } from '#/shared/api/supabase';
import { getUser } from "#/features/auth/api/auth";
import { z } from 'zod';
import type { DatabaseTheme } from '#/shared/types/db';
import { extractThemeColors } from '#/shared/utils/extractMainColor';

export const publishTheme = createServerFn({ method: 'POST' })
    .inputValidator(z.object({
        name: z.string().min(1, "Name is required").max(20, "Theme name must be 20 characters or less"),
        theme_code: z.any(),
        css_overrides: z.string().optional(),
        isDarkMode: z.boolean(),
        tags: z.array(z.string()).max(3, "Maximum 3 tags allowed").min(1, "At least 1 tag required")
    }))
    .handler(async (ctx) => {
        const { user, error: authError } = await getUser();

        if (authError || !user) {
            throw new Error("Unauthorized");
        }

        const supabase = createSupabaseServerClient();

        // Enforce 50-theme-per-user limit
        const { count, error: countError } = await supabase
            .from('themes')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (countError) {
            console.error("Error counting user themes:", countError);
            throw new Error("Failed to validate theme limit.");
        }

        if ((count ?? 0) >= 50) {
            throw new Error("You've reached the limit of 50 published themes. Please delete an existing theme before publishing a new one.");
        }

        // Check for existing name
        const { data: existingTheme } = await supabase
            .from('themes')
            .select('id')
            .eq('name', ctx.data.name)
            .maybeSingle();

        if (existingTheme) {
            throw new Error("A theme with this name already exists.");
        }

        const { data, error } = await supabase.from('themes').insert({
            name: ctx.data.name,
            theme_code: ctx.data.theme_code,
            overrides: ctx.data.css_overrides || "",
            user_id: user.id,
            is_public: true,
            tags: ctx.data.tags as DatabaseTheme["tags"],
            isDarkMode: ctx.data.isDarkMode,
            colors: extractThemeColors({
                primary: ctx.data.theme_code?.primary as string,
                secondary: ctx.data.theme_code?.secondary as string,
                accent: ctx.data.theme_code?.accent as string,
            })
        }).select('id').single();

        if (error) {
            console.error("Error publishing theme:", error);
            throw new Error("Failed to publish theme: " + error.message);
        }

        return data;
    });
