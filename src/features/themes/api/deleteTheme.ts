import { createServerFn } from '@tanstack/react-start';
import { createSupabaseServerClient } from '#/shared/api/supabase';
import { getUser } from "#/features/auth/api/auth";
import { z } from 'zod';

export const deleteTheme = createServerFn({ method: 'POST' })
    .inputValidator(z.object({
        themeId: z.string()
    }))
    .handler(async (ctx) => {
        const { user, error: authError } = await getUser();

        if (authError || !user) {
            throw new Error("Unauthorized");
        }

        const supabase = createSupabaseServerClient();


        const { data: theme, error: fetchError } = await supabase
            .from('themes')
            .select('user_id')
            .eq('id', ctx.data.themeId)
            .single();

        if (fetchError || !theme) {
            throw new Error("Theme not found.");
        }

        if (theme.user_id !== user.id) {
            throw new Error("You can only delete your own themes.");
        }

        const { error: deleteError } = await supabase
            .from('themes')
            .delete()
            .eq('id', ctx.data.themeId);

        if (deleteError) {
            console.error("Error deleting theme:", deleteError);
            throw new Error("Failed to delete theme.");
        }

        return { success: true };
    });
